import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import { dbOperations } from './database.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Generate API key if not provided
const API_KEY = process.env.WEBHOOK_API_KEY || crypto.randomBytes(32).toString('hex');

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// API Key authentication middleware
const authenticateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ 
      error: 'Unauthorized', 
      message: 'Valid x-api-key header required' 
    });
  }
  
  next();
};

// API ROUTES
// ==========

// Webhook endpoint to receive posts from n8n
app.post('/api/receive-post', authenticateApiKey, async (req, res) => {
  try {
    const { id, title, content, price, image_url, affiliate_url } = req.body;
    
    // Validate required fields
    if (!id || !title || !content) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        required: ['id', 'title', 'content'] 
      });
    }

    console.log(`📝 Received post: ${title}`);
    
    // Save to local database
    const result = await dbOperations.upsertPost({
      id,
      title,
      content,
      price: price || 0,
      image_url: image_url || null,
      affiliate_url: affiliate_url || null
    });

    console.log(`✅ Post saved successfully: ${title}`);
    
    res.json({ 
      success: true, 
      message: 'Post received and saved',
      id: id,
      title: title
    });
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ 
      error: 'Failed to save post', 
      details: error.message 
    });
  }
});

// Get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await dbOperations.getAllPosts();
    console.log(`📝 Fetched ${posts.length} posts from local database`);
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts', details: error.message });
  }
});

// Get single post by slug
app.get('/api/posts/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await dbOperations.getPostBySlug(slug);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    console.log(`📄 Fetched post: ${post.title}`);
    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post', details: error.message });
  }
});

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await dbOperations.getAllProducts();
    console.log(`📦 Fetched ${products.length} products from local database`);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products', details: error.message });
  }
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const stats = await dbOperations.getStats();
    res.json({ 
      status: 'healthy', 
      database: 'local-sqlite',
      records: stats
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'unhealthy', 
      database: 'local-sqlite',
      error: error.message 
    });
  }
});

// Debug endpoint
app.get('/api/debug', async (req, res) => {
  try {
    const posts = await dbOperations.getAllPosts();
    const products = await dbOperations.getAllProducts();
    const stats = await dbOperations.getStats();
    
    res.json({
      message: 'Local database debug info',
      stats,
      sample_posts: posts.slice(0, 5),
      sample_products: products.slice(0, 5),
      api_key_configured: !!process.env.WEBHOOK_API_KEY
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Debug query failed', 
      details: error.message 
    });
  }
});

// API Key info endpoint (for setup)
app.get('/api/webhook-info', (req, res) => {
  res.json({
    endpoint: '/api/receive-post',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'YOUR_API_KEY'
    },
    sample_payload: {
      id: 'unique-product-id',
      title: 'Product Name',
      content: 'Full review content in markdown',
      price: 299.99,
      image_url: 'https://example.com/image.jpg',
      affiliate_url: 'https://affiliate-link.com'
    },
    api_key: API_KEY
  });
});

// STATIC FILE SERVING
// ===================

// Serve static files from the dist directory
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// Handle React Router - serve index.html for all non-API routes
app.get('*', (req, res) => {
  // Skip API routes
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  // Serve index.html for all other routes (React Router will handle routing)
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Full-stack server running on port ${PORT}`);
  console.log(`🌐 Website: http://localhost:${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📡 Webhook endpoint: http://localhost:${PORT}/api/receive-post`);
  console.log(`🔑 API Key: ${API_KEY}`);
  console.log(`ℹ️  Webhook info: http://localhost:${PORT}/api/webhook-info`);
  console.log(`📁 Serving static files from: ${distPath}`);
});

export default app;