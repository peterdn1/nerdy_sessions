const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// JWT secret from environment
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

// Register new user
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  try {
    const existing = await prisma.users.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const username = email.split('@')[0];

    // Generate a verification token BEFORE creating user
    const crypto = require('crypto');
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const user = await prisma.users.create({
      data: {
        email,
        username,
        hashed_password: hashedPassword,
        emailVerified: false,
        verificationToken
      }
    });


    // Construct verification URL pointing to frontend
    const frontendBaseUrl = process.env.FRONTEND_BASE_URL || 'http://localhost:5173';
    const verifyUrl = `${frontendBaseUrl}/verify-email?token=${verificationToken}`;

    // Placeholder for sending email
    console.log(`Send verification email to ${email} with link: ${verifyUrl}`);

    res.json({ message: 'User registered. Please verify your email.' });
  } catch (err) {
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

    if (!user.emailVerified) return res.status(403).json({ error: 'Email not verified' });

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Placeholder for social login
router.post('/social/:provider', async (req, res) => {
  const { provider } = req.params;
// TEMP endpoint to delete two most recent users
router.delete('/delete-test-users', async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      orderBy: { created_at: 'desc' },
      take: 2
    });

    const deleted = [];
    for (const user of users) {
      await prisma.users.delete({ where: { id: user.id } });
      deleted.push(user.email);
    }

    res.json({ message: 'Deleted users', deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete users' });
  }
});
  // TODO: Implement OAuth flow for Google, GitHub, etc.
  res.status(501).json({ error: `Social login with ${provider} not implemented yet` });
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
  // TODO: Implement password reset request logic
  res.status(501).json({ error: 'Password reset request not implemented yet' });
});

// Placeholder for password reset confirmation
router.post('/reset-password', async (req, res) => {
  // TODO: Implement password reset confirmation logic
  res.status(501).json({ error: 'Password reset not implemented yet' });
// Refresh token endpoint
router.post('/refresh-token', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: 'Refresh token required' });

  try {
    const payload = jwt.verify(refreshToken, JWT_SECRET);

    // Optionally, check payload or token version here

    const newAccessToken = jwt.sign(
      { userId: payload.userId, email: payload.email },
      JWT_SECRET,
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