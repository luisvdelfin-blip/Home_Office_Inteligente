import { useState, useEffect } from 'react';
import { apiService, DatabaseProduct } from '@/services/api';
import { mockProducts } from '@/data/mockData';

export const useProducts = () => {
  const [products, setProducts] = useState<DatabaseProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await apiService.getProducts();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products');
        
        // Fallback to mock data in development
        if (process.env.NODE_ENV === 'development') {
          console.log('Using mock products as fallback');
          setProducts(mockProducts as DatabaseProduct[]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error, refetch: () => fetchProducts() };
};