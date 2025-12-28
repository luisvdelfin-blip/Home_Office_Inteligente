import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Test database connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
}

// API Routes

// Get all published posts with content
app.get('/api/posts', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        id,
        title,
        slug,
        post_content as content,
        cover_image,
        status,
        product_id,
        created_at,
        updated_at
      FROM phiai_afiliados 
      WHERE post_content IS NOT NULL 
        AND post_content != ''
        AND status = 'published'
      ORDER BY created_at DESC
    `);

    res.json(rows);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get single post by slug
app.get('/api/posts/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const [rows] = await pool.execute(`
      SELECT 
        id,
        title,
        slug,
        post_content as content,
        cover_image,
        status,
        product_id,
        created_at,
        updated_at
      FROM phiai_afiliados 
      WHERE slug = ? 
        AND post_content IS NOT NULL 
        AND post_content != ''
        AND status = 'published'
      LIMIT 1
    `, [slug]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        id,
        name,
        affiliate_url,
        image_url,
        price,
        category,
        created_at
      FROM phiai_afiliados 
      WHERE affiliate_url IS NOT NULL 
        AND affiliate_url != ''
      ORDER BY created_at DESC
    `);

    res.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await pool.execute('SELECT 1');
    res.json({ status: 'healthy', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'unhealthy', database: 'disconnected' });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 API Server running on port ${PORT}`);
  testConnection();
});

export default app;