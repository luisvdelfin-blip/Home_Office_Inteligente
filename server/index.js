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

// Database connection - prioritize DATABASE_URL if available
let dbConfig;

if (process.env.DATABASE_URL) {
  // Parse DATABASE_URL format: mysql://user:password@host:port/database
  const url = new URL(process.env.DATABASE_URL);
  dbConfig = {
    host: url.hostname,
    user: url.username,
    password: url.password,
    database: url.pathname.slice(1), // Remove leading slash
    port: url.port || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };
} else {
  // Fallback to individual environment variables
  dbConfig = {
    host: process.env.DB_HOST || '82.29.60.57',
    user: process.env.DB_USER || 'mysql',
    password: process.env.DB_PASSWORD || 'FdUvWfWC5pdSBx6r51fbcO5NfHoVTU1RLJTwS4K4dw32XPh7UEEys1vaskQ6SZHy',
    database: process.env.DB_NAME || 'phiai_afiliados',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };
}

const pool = mysql.createPool(dbConfig);

// Test database connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    console.log(`📊 Connected to: ${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`);
    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('🔧 Connection config:', {
      host: dbConfig.host,
      user: dbConfig.user,
      database: dbConfig.database,
      port: dbConfig.port
    });
  }
}

// API Routes

// Get all products with content (using new schema)
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        sku_id as id,
        producto_nombre as name,
        url_afiliado as affiliate_url,
        imagen_url as image_url,
        precio_actual as price,
        plataforma as category,
        posteado_en_telegram as created_at
      FROM phiai_afiliados 
      WHERE producto_nombre IS NOT NULL 
        AND producto_nombre != ''
        AND url_afiliado IS NOT NULL 
        AND url_afiliado != ''
      ORDER BY posteado_en_telegram DESC
    `);

    console.log(`📦 Fetched ${rows.length} products from database`);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products', details: error.message });
  }
});

// Get all posts (treating products as posts for now)
app.get('/api/posts', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        sku_id as id,
        producto_nombre as title,
        LOWER(REPLACE(REPLACE(producto_nombre, ' ', '-'), 'ñ', 'n')) as slug,
        producto_nombre as content,
        imagen_url as cover_image,
        'published' as status,
        sku_id as product_id,
        posteado_en_telegram as created_at,
        posteado_en_telegram as updated_at
      FROM phiai_afiliados 
      WHERE producto_nombre IS NOT NULL 
        AND producto_nombre != ''
      ORDER BY posteado_en_telegram DESC
    `);

    console.log(`📝 Fetched ${rows.length} posts from database`);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts', details: error.message });
  }
});

// Get single post by slug
app.get('/api/posts/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const [rows] = await pool.execute(`
      SELECT 
        sku_id as id,
        producto_nombre as title,
        LOWER(REPLACE(REPLACE(producto_nombre, ' ', '-'), 'ñ', 'n')) as slug,
        producto_nombre as content,
        imagen_url as cover_image,
        'published' as status,
        sku_id as product_id,
        posteado_en_telegram as created_at,
        posteado_en_telegram as updated_at
      FROM phiai_afiliados 
      WHERE LOWER(REPLACE(REPLACE(producto_nombre, ' ', '-'), 'ñ', 'n')) = ?
        AND producto_nombre IS NOT NULL 
        AND producto_nombre != ''
      LIMIT 1
    `, [slug]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    console.log(`📄 Fetched post: ${rows[0].title}`);
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post', details: error.message });
  }
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT COUNT(*) as count FROM phiai_afiliados');
    res.json({ 
      status: 'healthy', 
      database: 'connected',
      records: rows[0].count,
      config: {
        host: dbConfig.host,
        database: dbConfig.database,
        port: dbConfig.port
      }
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({ 
      status: 'unhealthy', 
      database: 'disconnected',
      error: error.message,
      config: {
        host: dbConfig.host,
        database: dbConfig.database,
        port: dbConfig.port
      }
    });
  }
});

// Debug endpoint to see raw data
app.get('/api/debug', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT * FROM phiai_afiliados 
      LIMIT 5
    `);
    
    res.json({
      message: 'Raw database data (first 5 records)',
      data: rows,
      config: {
        host: dbConfig.host,
        database: dbConfig.database,
        port: dbConfig.port
      }
    });
  } catch (error) {
    console.error('Debug query failed:', error);
    res.status(500).json({ 
      error: 'Debug query failed', 
      details: error.message,
      config: {
        host: dbConfig.host,
        database: dbConfig.database,
        port: dbConfig.port
      }
    });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 API Server running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🐛 Debug endpoint: http://localhost:${PORT}/api/debug`);
  testConnection();
});

export default app;