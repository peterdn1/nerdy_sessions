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
    const user = await prisma.users.create({
      data: {
        email,
        username,
        hashed_password: hashedPassword,
        emailVerified: false
      }
    });

    // Generate a verification token
    const crypto = require('crypto');
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Save token to user
    await prisma.users.update({
      where: { id: user.id },
      data: { verificationToken }
    });

    // Construct verification URL
    const verifyUrl = `${req.protocol}://${req.get('host')}/api/auth/verify-email?token=${verificationToken}`;

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
  // TODO: Implement OAuth flow for Google, GitHub, etc.
  res.status(501).json({ error: `Social login with ${provider} not implemented yet` });
});

// Placeholder for email verification
router.get('/verify-email', async (req, res) => {
  const { token } = req.query;
  if (!token) return res.status(400).json({ error: 'Verification token required' });

  try {
    const user = await prisma.users.findFirst({ where: { verificationToken: token } });
    if (!user) return res.status(400).json({ error: 'Invalid or expired verification token' });

    await prisma.users.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null
      }
    });

    res.json({ message: 'Email successfully verified. You can now log in.' });
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