const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const REQUIRE_EMAIL_VERIFICATION = (process.env.REQUIRE_EMAIL_VERIFICATION || 'true').toLowerCase() === 'true';
console.log('REQUIRE_EMAIL_VERIFICATION:', REQUIRE_EMAIL_VERIFICATION);

const prisma = new PrismaClient();

const sgMail = require('@sendgrid/mail');
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}
const router = express.Router();
const rateLimit = require('express-rate-limit');

// Rate limiter for auth endpoints
const authRateLimiter = rateLimit({
  windowMs: parseInt(process.env.AUTH_RATE_LIMIT_WINDOW_MS || '60000', 10), // default 1 minute
  max: parseInt(process.env.AUTH_RATE_LIMIT_MAX || '5', 10), // limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,  // Disable the `X-RateLimit-*` headers
});

// Apply rate limiter to all auth routes
router.use(authRateLimiter);

// JWT secret from environment
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'dev_refresh_secret';

// Register new user
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  try {
    const existing = await prisma.users.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: 'User already exists' });

    const SALT_ROUNDS = parseInt(process.env.BCRYPT_COST || '12', 10);
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const username = email.split('@')[0];

    // Generate a verification token BEFORE creating user
    const crypto = require('crypto');
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const user = await prisma.users.create({
      data: {
        email,
        username,
        hashed_password: hashedPassword,
        emailVerified: REQUIRE_EMAIL_VERIFICATION ? false : true,
        verificationToken: REQUIRE_EMAIL_VERIFICATION ? verificationToken : null
      }
    });


    // Construct verification URL pointing to frontend
    const frontendBaseUrl = process.env.FRONTEND_BASE_URL || 'http://localhost:5173';
    const verifyUrl = `${frontendBaseUrl}/verify-email?token=${verificationToken}`;

    if (REQUIRE_EMAIL_VERIFICATION) {
      if (
        process.env.NODE_ENV !== 'test' &&
        process.env.SENDGRID_API_KEY
      ) {
        try {
          await sgMail.send({
            to: email,
            from: 'no-reply@example.com', // Replace with your verified sender
            subject: 'Verify your email',
            text: `Please verify your email by clicking the following link: ${verifyUrl}`,
            html: `<p>Please verify your email by clicking the link below:</p><p><a href="${verifyUrl}">${verifyUrl}</a></p>`,
          });
          console.log(`Verification email sent to ${email}`);
        } catch (emailErr) {
          console.error('Error sending verification email:', emailErr);
        }
      } else {
        console.log(`[Email skipped] Verification link for ${email}: ${verifyUrl}`);
      }
    } else {
      console.log('Email verification disabled by environment config; skipping verification email.');
    }
console.log('DEBUG: About to send response - REQUIRE_EMAIL_VERIFICATION:', REQUIRE_EMAIL_VERIFICATION);
if (REQUIRE_EMAIL_VERIFICATION) {
  res.json({ message: 'User registered. Please verify your email.' });
  return;
} else {
  res.json({ message: 'User registered successfully. Email verification not required.' });
  return;
}
  } catch (err) {
console.log('DEBUG: Entered catch block, about to send error response');
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  try {
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.hashed_password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    if (REQUIRE_EMAIL_VERIFICATION && !user.emailVerified) {
      return res.status(403).json({ error: 'Email not verified' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      token,
      email: user.email,
      username: user.username,
      fullName: user.fullName || user.username
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
});

const { google } = require('googleapis');

router.get('/social/:provider', async (req, res) => {
  const { provider } = req.params;
  if (provider !== 'google') {
    return res.status(400).json({ error: 'Unsupported provider' });
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const { code } = req.query;

  if (!code) {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['profile', 'email'],
      prompt: 'consent'
    });
    console.log('Generated Google OAuth URL:', authUrl);
    return res.redirect(authUrl);
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2'
    });

    const { data: profile } = await oauth2.userinfo.get();

    if (!profile.email) {
      return res.status(400).json({ error: 'Failed to retrieve email from Google' });
    }

    let user = await prisma.users.findUnique({ where: { email: profile.email } });

    if (!user) {
      user = await prisma.users.create({
        data: {
          email: profile.email,
          username: profile.email.split('@')[0],
          fullName: profile.name || profile.email.split('@')[0],
          emailVerified: true,
          provider: 'google'
        }
      });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Redirect back to frontend with token and user info as query params
    const frontendBaseUrl = process.env.FRONTEND_BASE_URL || 'http://localhost:5173';
    return res.redirect(`${frontendBaseUrl}/?token=${token}&username=${user.username}&fullName=${user.fullName || user.username}`);
  } catch (err) {
    console.error('Google OAuth error:', err);
    return res.status(500).json({ error: 'Google OAuth failed' });
  }
});

// Placeholder for email verification
router.get('/verify-email', async (req, res) => {
  const { token } = req.query;
  console.log('Received token:', token);
  if (!token) return res.status(400).json({ error: 'Verification token required' });

  try {
    let user = await prisma.users.findFirst({ where: { verificationToken: token } });
    console.log('User found with token:', user);

    if (user) {
      await prisma.users.update({
        where: { id: user.id },
        data: {
          emailVerified: true,
          verificationToken: null
        }
      });
      return res.json({ message: 'Email successfully verified. You can now log in.' });
    }

    // If no user with token, check if already verified
    user = await prisma.users.findFirst({
      where: {
        emailVerified: true,
        verificationToken: null
      }
    });
    console.log('User found already verified:', user);

    if (user) {
      return res.json({ message: 'Email already verified. You can now log in.' });
    }

    return res.status(400).json({ error: 'Invalid or expired verification token' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Email verification failed' });
  }
});

// Placeholder for password reset request
router.post('/request-password-reset', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  try {
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
      // Do not reveal if user exists for security
      return res.json({ message: 'If that email exists, a reset link has been sent.' });
    }

    // Generate secure token and expiry (1 hour)
    const crypto = require('crypto');
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.users.update({
      where: { email },
      data: { resetToken, resetTokenExpiry }
    });

    const frontendBaseUrl = process.env.FRONTEND_BASE_URL || 'http://localhost:5173';
    const resetUrl = `${frontendBaseUrl}/reset-password?token=${resetToken}`;

    if (REQUIRE_EMAIL_VERIFICATION) {
      // Send email logic (reuse SendGrid if configured)
      if (process.env.SENDGRID_API_KEY) {
        try {
          await sgMail.send({
            to: email,
            from: 'no-reply@example.com',
            subject: 'Password Reset Request',
            text: `Reset your password using this link: ${resetUrl}`,
            html: `<p>Reset your password by clicking the link below:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
          });
          console.log(`Password reset email sent to ${email}`);
        } catch (emailErr) {
          console.error('Error sending password reset email:', emailErr);
        }
      } else {
        console.log(`[Email skipped] Password reset link for ${email}: ${resetUrl}`);
      }
    } else {
      // Dev mode: print to console
      console.log(`Reset link: ${resetUrl}`);
    }

    return res.json({ message: 'If that email exists, a reset link has been sent.' });
  } catch (err) {
    console.error('Password reset request error:', err);
    res.status(500).json({ error: 'Failed to process password reset request' });
  }
});

// Placeholder for password reset confirmation
router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) return res.status(400).json({ error: 'Token and new password required' });

  try {
    const user = await prisma.users.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gte: new Date() }
      }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    const SALT_ROUNDS = parseInt(process.env.BCRYPT_COST || '12', 10);
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await prisma.users.update({
      where: { id: user.id },
      data: {
        hashed_password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      }
    });

    return res.json({ message: 'Password has been reset successfully.' });
  } catch (err) {
    console.error('Password reset error:', err);
    res.status(500).json({ error: 'Failed to reset password' });
  }
// Refresh token endpoint
router.post('/refresh-token', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: 'Refresh token required' });

  try {
    const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    // Optionally, check payload or token version here

    const newAccessToken = jwt.sign(
      { userId: payload.userId, email: payload.email },
      REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token: newAccessToken });
  } catch (err) {
    console.error('Invalid refresh token:', err);
    res.status(401).json({ error: 'Invalid or expired refresh token' });
  }
});
});

module.exports = router;