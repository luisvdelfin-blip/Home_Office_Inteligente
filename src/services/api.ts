const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:3001/api';

export interface DatabasePost {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image: string;
  status: 'draft' | 'published';
  product_id?: string;
  created_at: string;
  updated_at?: string;
}

export interface DatabaseProduct {
  id: string;
  name: string;
  affiliate_url: string;
  image_url: string;
  price: number;
  category: string;
  created_at: string;
}

class ApiService {
  private async fetchWithErrorHandling<T>(url: string): Promise<T> {
    try {
      console.log(`🔄 Fetching: ${API_BASE_URL}${url}`);
      const response = await fetch(`${API_BASE_URL}${url}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(`❌ API Error ${response.status}:`, errorData);
        throw new Error(`HTTP error! status: ${response.status} - ${errorData.error || 'Unknown error'}`);
      }
      
      const data = await response.json();
      console.log(`✅ Successfully fetched data from ${url}:`, data.length || 'N/A', 'items');
      return data;
    } catch (error) {
      console.error(`💥 API Error for ${url}:`, error);
      throw error;
    }
  }

  async getPosts(): Promise<DatabasePost[]> {
    return this.fetchWithErrorHandling<DatabasePost[]>('/posts');
  }

  async getPost(slug: string): Promise<DatabasePost> {
    return this.fetchWithErrorHandling<DatabasePost>(`/posts/${slug}`);
  }

  async getProducts(): Promise<DatabaseProduct[]> {
    return this.fetchWithErrorHandling<DatabaseProduct[]>('/products');
  }

  async healthCheck(): Promise<{ status: string; database: string; records?: number }> {
    return this.fetchWithErrorHandling<{ status: string; database: string; records?: number }>('/health');
  }

  async debug(): Promise<any> {
    return this.fetchWithErrorHandling<any>('/debug');
  }
}

export const apiService = new ApiService();