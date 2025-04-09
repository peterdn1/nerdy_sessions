require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const prisma = new PrismaClient();

// Test database connection
// Database connection with retry logic
// Prisma Client will connect lazily on first query
prisma.$connect()
  .then(() => console.log('Prisma connected'))
  .catch((err) => {
    console.error('Prisma connection error:', err);
    process.exit(1);
  });

// Serve static files from frontend
app.use(express.static('../frontend/dist'));

// Sample API endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to Nerdy Sessions Productivity Hub',
    version: '1.0.0',
    status: 'active'
  });
});
// --- Stocks API ---
app.get('/api/stocks', async (req, res) => {
  try {
    const stocks = await prisma.stocks.findMany();
    res.json(stocks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch stocks' });
  }
});

// --- Portfolio API ---
app.get('/api/portfolio', async (req, res) => {
  try {
    const userId = req.query.user_id;
    const portfolio = await prisma.user_portfolios.findMany({
      where: { user_id: userId }
    });
    res.json(portfolio);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch portfolio' });
  }
});

// --- Trades API ---
app.get('/api/trades', async (req, res) => {
  try {
    const userId = req.query.user_id;
    const trades = await prisma.trade_history.findMany({
      where: { user_id: userId },
      orderBy: { executed_at: 'desc' }
    });
    res.json(trades);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch trades' });
  }
});

// --- AI Impact Score API ---
app.get('/api/ai-score', async (req, res) => {
  try {
    const symbol = req.query.symbol;
    // Placeholder: call AI scoring service here
    const score = Math.floor(Math.random() * 201) - 100; // -100 to 100
    res.json({ symbol, ai_impact_score: score });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to compute AI score' });
  }
});

// --- News API ---
app.get('/api/news', async (req, res) => {
  try {
    const symbol = req.query.symbol;
    const news = await prisma.news_articles.findMany({
      where: { stock_symbol: symbol },
      orderBy: { publish_date: 'desc' },
      take: 10
    });
    res.json(news);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// All other routes should serve the frontend
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});