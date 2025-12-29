import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create database connection
const dbPath = path.join(__dirname, '..', 'data', 'posts.db');
const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Create tables if they don't exist
const initDatabase = () => {
  // Posts table
  const createPostsTable = `
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
  `;

  // Products table (derived from posts)
  const createProductsTable = `
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      affiliate_url TEXT NOT NULL,
      image_url TEXT,
      price REAL NOT NULL,
      category TEXT DEFAULT 'Produto',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.exec(createPostsTable);
  db.exec(createProductsTable);

  console.log('✅ Local database initialized');
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
  upsertPost: (postData) => {
    const { id, title, content, price, image_url, affiliate_url } = postData;
    const slug = generateSlug(title);
    
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO posts 
      (id, title, slug, content, cover_image, price, affiliate_url, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `);
    
    const result = stmt.run(id, title, slug, content, image_url, price, affiliate_url);
    
    // Also update products table
    const productStmt = db.prepare(`
      INSERT OR REPLACE INTO products 
      (id, name, affiliate_url, image_url, price)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    productStmt.run(id, title, affiliate_url, image_url, price);
    
    return result;
  },

  // Get all posts
  getAllPosts: () => {
    const stmt = db.prepare(`
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
    
    return stmt.all();
  },

  // Get post by slug
  getPostBySlug: (slug) => {
    const stmt = db.prepare(`
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
    `);
    
    return stmt.get(slug);
  },

  // Get all products
  getAllProducts: () => {
    const stmt = db.prepare(`
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
    
    return stmt.all();
  },

  // Get database stats
  getStats: () => {
    const postsCount = db.prepare('SELECT COUNT(*) as count FROM posts').get();
    const productsCount = db.prepare('SELECT COUNT(*) as count FROM products').get();
    
    return {
      posts: postsCount.count,
      products: productsCount.count
    };
  }
};

// Initialize database on import
initDatabase();

export { db, dbOperations };