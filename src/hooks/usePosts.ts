import { useState, useEffect } from 'react';
import { apiService, DatabasePost } from '@/services/api';
import { mockPosts } from '@/data/mockData';

export const usePosts = () => {
  const [posts, setPosts] = useState<DatabasePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Starting to fetch posts...');
      
      // First check health
      const health = await apiService.healthCheck();
      console.log('🏥 Health check:', health);
      
      // Then fetch posts
      const data = await apiService.getPosts();
      console.log('📝 Posts received:', data);
      
      setPosts(data);
    } catch (err) {
      console.error('💥 Failed to fetch posts:', err);
      setError(`Failed to load posts: ${err instanceof Error ? err.message : 'Unknown error'}`);
      
      // Fallback to mock data in development
      if (process.env.NODE_ENV === 'development') {
        console.log('🔄 Using mock posts as fallback');
        setPosts(mockPosts as DatabasePost[]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, error, refetch: fetchPosts };
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
        
        console.log(`🔄 Fetching post with slug: ${slug}`);
        const data = await apiService.getPost(slug);
        console.log('📄 Post received:', data);
        
        setPost(data);
      } catch (err) {
        console.error('💥 Failed to fetch post:', err);
        setError(`Failed to load post: ${err instanceof Error ? err.message : 'Unknown error'}`);
        
        // Fallback to mock data in development
        if (process.env.NODE_ENV === 'development') {
          const mockPost = mockPosts.find(p => p.slug === slug);
          if (mockPost) {
            console.log('🔄 Using mock post as fallback');
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