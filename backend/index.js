require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
const port = process.env.PORT || 5001;

const multer = require('multer');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadDir));

// Database connection
const prisma = new PrismaClient();

/**
 * Initialize Prisma connection
 * Prisma Client connects lazily on first query
 */
prisma.$connect()
  .then(() => console.log('Prisma connected'))
  .catch((err) => {
    console.error('Prisma connection error:', err);
    process.exit(1);
  });

// In development, don't serve frontend files since Vite handles that
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
}

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
    console.error('Error in /api/stocks:', err);
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
    console.error('Error in /api/portfolio:', err);
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
    console.error('Error in /api/trades:', err);
    res.status(500).json({ error: 'Failed to fetch trades' });
  }
});

// --- AI Impact Score API ---
app.get('/api/ai-score', async (req, res) => {
  try {
    const symbol = req.query.symbol;
    // TODO: Replace with real AI scoring service call
    const score = Math.floor(Math.random() * 201) - 100; // -100 to 100
    res.json({ symbol, ai_impact_score: score });
  } catch (err) {
    console.error('Error in /api/ai-score:', err);
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
    console.error('Error in /api/news:', err);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// --- Mockup Images Upload ---
app.post('/api/mockup-images', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    const userId = req.body.user_id || null;
    const description = req.body.description || null;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const imageUrl = `/uploads/${file.filename}`;

    const saved = await prisma.mockup_images.create({
      data: {
        filename: file.filename,
        original_name: file.originalname,
        url: imageUrl,
        description: description,
        uploaded_by: userId
      }
    });

    res.json(saved);
  } catch (err) {
    console.error('Error uploading mockup image:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// --- Mockup Images List ---
app.get('/api/mockup-images', async (req, res) => {
  try {
    const images = await prisma.mockup_images.findMany({
      orderBy: { uploaded_at: 'desc' }
    });
    res.json(images);
  } catch (err) {
    console.error('Error fetching mockup images:', err);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

// --- Mockup Images Delete ---
app.delete('/api/mockup-images/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const image = await prisma.mockup_images.findUnique({ where: { id } });
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Delete file from disk
    const filePath = path.join(uploadDir, image.filename);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.warn('File not found or already deleted:', filePath);
      }
    });

    // Delete from database
    await prisma.mockup_images.delete({ where: { id } });

    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting mockup image:', err);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

// --- Mockup Images Update ---
app.put('/api/mockup-images/:id', upload.single('image'), async (req, res) => {
  console.log('PUT /api/mockup-images/:id called with id:', req.params.id);
  const id = req.params.id;
  try {
    const image = await prisma.mockup_images.findUnique({ where: { id } });
    console.log('Prisma findUnique result for id', id, ':', image);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    let filename = image.filename;
    let url = image.url;

    if (req.file) {
      // Delete old file
      const oldPath = path.join(uploadDir, image.filename);
      fs.unlink(oldPath, (err) => {
        if (err) console.warn('Old file not found or already deleted:', oldPath);
      });

      filename = req.file.filename;
      url = `/uploads/${req.file.filename}`;
    }

    const updated = await prisma.mockup_images.update({
      where: { id },
      data: {
        description: req.body.description || image.description,
        filename,
        url
      }
    });

    res.json(updated);
  } catch (err) {
    console.error('Error updating mockup image:', err);
    res.status(500).json({ error: 'Failed to update image' });
  }
});

// All other routes should serve the frontend
// In development, don't handle frontend routes since Vite handles that
if (process.env.NODE_ENV === 'production') {
  app.use((req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
