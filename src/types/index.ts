export interface Product {
  id: string;
  name: string;
  affiliate_url: string;
  image_url: string;
  price: number;
  category: string;
  created_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image: string;
  status: 'draft' | 'published';
  product_id?: string;
  product?: Product;
  created_at: string;
}

export interface BlogData {
  products: Product[];
  posts: Post[];
}