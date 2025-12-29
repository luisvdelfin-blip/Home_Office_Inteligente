import { useState, useEffect } from 'react';
import { apiService, DatabaseProduct } from '@/services/api';
import { mockProducts } from '@/data/mockData';

export const useProducts = () => {
  const [products, setProducts] = useState<DatabaseProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Starting to fetch products...');
      
      // First check health
      const health = await apiService.healthCheck();
      console.log('🏥 Health check:', health);
      
      // Then fetch products
      const data = await apiService.getProducts();
      console.log('📦 Products received:', data);
      
      setProducts(data);
    } catch (err) {
      console.error('💥 Failed to fetch products:', err);
      setError(`Failed to load products: ${err instanceof Error ? err.message : 'Unknown error'}`);
      
      // Fallback to mock data in development
      if (process.env.NODE_ENV === 'development') {
        console.log('🔄 Using mock products as fallback');
        setProducts(mockProducts as DatabaseProduct[]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
};