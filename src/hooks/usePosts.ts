import { useState, useEffect } from 'react';
import { apiService, DatabasePost } from '@/services/api';
import { mockPosts } from '@/data/mockData';

export const usePosts = () => {
  const [posts, setPosts] = useState<DatabasePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await apiService.getPosts();
        setPosts(data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        setError('Failed to load posts');
        
        // Fallback to mock data in development
        if (process.env.NODE_ENV === 'development') {
          console.log('Using mock data as fallback');
          setPosts(mockPosts as DatabasePost[]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error, refetch: () => fetchPosts() };
};

export const usePost = (slug: string) => {
  const [post, setPost] = useState<DatabasePost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await apiService.getPost(slug);
        setPost(data);
      } catch (err) {
        console.error('Failed to fetch post:', err);
        setError('Failed to load post');
        
        // Fallback to mock data in development
        if (process.env.NODE_ENV === 'development') {
          const mockPost = mockPosts.find(p => p.slug === slug);
          if (mockPost) {
            setPost(mockPost as DatabasePost);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  return { post, loading, error };
};