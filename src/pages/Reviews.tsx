import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import SEO from '@/components/SEO';
import { usePosts } from '@/hooks/usePosts';
import { useProducts } from '@/hooks/useProducts';

const Reviews = () => {
  const { posts, loading: postsLoading, error: postsError } = usePosts();
  const { products } = useProducts();

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(dateString));
  };

  const estimatedReadTime = (content: string) => {
    return Math.ceil(content.split(' ').length / 200);
  };

  const getProductForPost = (productId?: string) => {
    return products.find(p => p.id === productId);
  };

  if (postsLoading) {
    return (
      <>
        <SEO 
          title="Reviews | Home Office Inteligente"
          description="Análises detalhadas e honestas dos melhores produtos para home office. Reviews completos com prós, contras e recomendações."
          url="https://homeofficeinteligente.com.br/reviews"
        />
        <div className="min-h-screen bg-black pt-16">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-16">
              <Skeleton className="h-12 w-96 mx-auto mb-4 bg-zinc-800" />
              <Skeleton className="h-6 w-128 mx-auto bg-zinc-800" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="bg-zinc-900/50 border-zinc-800">
                  <Skeleton className="aspect-video w-full bg-zinc-800" />
                  <CardContent className="p-6 space-y-4">
                    <Skeleton className="h-4 w-full bg-zinc-800" />
                    <Skeleton className="h-6 w-full bg-zinc-800" />
                    <Skeleton className="h-4 w-3/4 bg-zinc-800" />
                    <Skeleton className="h-10 w-full bg-zinc-800" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (postsError) {
    return (
      <>
        <SEO 
          title="Reviews | Home Office Inteligente"
          description="Análises detalhadas e honestas dos melhores produtos para home office. Reviews completos com prós, contras e recomendações."
          url="https://homeofficeinteligente.com.br/reviews"
        />
        <div className="min-h-screen bg-black pt-16">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Nossos{' '}
                <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                  Reviews
                </span>
              </h1>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                Análises detalhadas e honestas dos melhores produtos para home office
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Erro ao Carregar Reviews
                </h3>
                <p className="text-zinc-300 mb-6">
                  Não foi possível conectar com o banco de dados. Tente novamente em alguns instantes.
                </p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"
                >
                  Tentar Novamente
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title="Reviews | Home Office Inteligente"
        description="Análises detalhadas e honestas dos melhores produtos para home office. Reviews completos com prós, contras e recomendações."
        url="https://homeofficeinteligente.com.br/reviews"
      />
      <div className="min-h-screen bg-black pt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Nossos{' '}
              <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                Reviews
              </span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Análises detalhadas e honestas dos melhores produtos para home office
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Reviews em Breve
                </h3>
                <p className="text-zinc-300">
                  Estamos preparando reviews incríveis para você. Volte em breve!
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Reviews Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => {
                  const product = getProductForPost(post.product_id);
                  
                  return (
                    <Card key={post.id} className="group bg-zinc-900/50 border-zinc-800 hover:border-red-500/50 transition-all duration-300 overflow-hidden">
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={post.cover_image || '/placeholder.svg'}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        {product && (
                          <Badge 
                            variant="secondary" 
                            className="absolute top-3 left-3 bg-red-500/90 text-white border-0"
                          >
                            {product.category}
                          </Badge>
                        )}
                      </div>
                      
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-3 text-sm text-zinc-400">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            {formatDate(post.created_at)}
                          </div>
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            {estimatedReadTime(post.content)} min
                          </div>
                        </div>

                        <h3 className="text-white font-semibold text-xl mb-3 line-clamp-2 group-hover:text-red-400 transition-colors">
                          {post.title}
                        </h3>

                        <p className="text-zinc-400 mb-4 line-clamp-3">
                          {post.content.substring(0, 150).replace(/[#*]/g, '')}...
                        </p>

                        <Button 
                          asChild
                          variant="outline" 
                          className="w-full border-zinc-700 text-zinc-300 hover:bg-red-500/10 hover:border-red-500 hover:text-red-400"
                        >
                          <Link to={`/reviews/${post.slug}`}>
                            Ler Review Completo
                            <ArrowRight size={16} className="ml-2" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-red-500"
                >
                  Carregar Mais Reviews
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Reviews;