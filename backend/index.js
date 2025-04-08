require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// Test database connection
// Database connection with retry logic
const connectWithRetry = () => {
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Database connection error, retrying in 5 seconds...', err.stack);
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log('Database connected at', res.rows[0].now);
    }
  });
};
connectWithRetry();

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

// All other routes should serve the frontend
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});