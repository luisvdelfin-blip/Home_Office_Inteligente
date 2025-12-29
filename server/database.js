import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create database connection
const dbPath = path.join(__dirname, '..', 'data', 'posts.db');
const db = new sqlite3.Database(dbPath);

// Promisify database methods
const dbRun = promisify(db.run.bind(db));
const dbGet = promisify(db.get.bind(db));
const dbAll = promisify(db.all.bind(db));

// Initialize database
const initDatabase = async () => {
  try {
    // Posts table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS posts (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        content TEXT NOT NULL,
        cover_image TEXT,
        price REAL,
        affiliate_url TEXT,
        category TEXT DEFAULT 'Produto',
        status TEXT DEFAULT 'published',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Products table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        affiliate_url TEXT NOT NULL,
        image_url TEXT,
        price REAL NOT NULL,
        category TEXT DEFAULT 'Produto',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Local SQLite database initialized');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
  }
};

// Generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Database operations
const dbOperations = {
  // Insert or update post
  upsertPost: async (postData) => {
    const { id, title, content, price, image_url, affiliate_url } = postData;
    const slug = generateSlug(title);
    
    try {
      // Insert or replace post
      await dbRun(`
        INSERT OR REPLACE INTO posts 
        (id, title, slug, content, cover_image, price, affiliate_url, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
      `, [id, title, slug, content, image_url, price, affiliate_url]);
      
      // Also update products table
      await dbRun(`
        INSERT OR REPLACE INTO products 
        (id, name, affiliate_url, image_url, price)
        VALUES (?, ?, ?, ?, ?)
      `, [id, title, affiliate_url, image_url, price]);
      
      return { success: true, id, title };
    } catch (error) {
      console.error('Error upserting post:', error);
      throw error;
    }
  },

  // Get all posts
  getAllPosts: async () => {
    try {
      const posts = await dbAll(`
        SELECT 
          id,
          title,
          slug,
          content,
          cover_image,
          status,
          id as product_id,
          created_at,
          updated_at
        FROM posts 
        WHERE content IS NOT NULL 
          AND content != ''
          AND status = 'published'
        ORDER BY created_at DESC
      `);
      
      return posts || [];
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  },

  // Get post by slug
  getPostBySlug: async (slug) => {
    try {
      const post = await dbGet(`
        SELECT 
          id,
          title,
          slug,
          content,
          cover_image,
          status,
          id as product_id,
          created_at,
          updated_at
        FROM posts 
        WHERE slug = ? 
          AND content IS NOT NULL 
          AND content != ''
          AND status = 'published'
        LIMIT 1
      `, [slug]);
      
      return post || null;
    } catch (error) {
      console.error('Error fetching post by slug:', error);
      return null;
    }
  },

  // Get all products
  getAllProducts: async () => {
    try {
      const products = await dbAll(`
        SELECT 
          id,
          name,
          affiliate_url,
          image_url,
          price,
          category,
          created_at
        FROM products 
        WHERE affiliate_url IS NOT NULL 
          AND affiliate_url != ''
        ORDER BY created_at DESC
      `);
      
      return products || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  // Get database stats
  getStats: async () => {
    try {
      const postsCount = await dbGet('SELECT COUNT(*) as count FROM posts');
      const productsCount = await dbGet('SELECT COUNT(*) as count FROM products');
      
      return {
        posts: postsCount?.count || 0,
        products: productsCount?.count || 0
      };
    } catch (error) {
      console.error('Error getting stats:', error);
      return { posts: 0, products: 0 };
    }
  }
};

// Initialize database on import
initDatabase();

export { db, dbOperations };