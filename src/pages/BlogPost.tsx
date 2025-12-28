import { useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import RelatedProducts from '@/components/RelatedProducts';
import { mockPosts, mockProducts } from '@/data/mockData';
import { Link } from 'react-router-dom';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Find the post by slug
  const post = mockPosts.find(p => p.slug === slug && p.status === 'published');
  
  if (!post) {
    return <Navigate to="/404" replace />;
  }

  // Find the related product
  const relatedProduct = mockProducts.find(p => p.id === post.product_id);

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(dateString));
  };

  const estimatedReadTime = Math.ceil(post.content.split(' ').length / 200);

  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          asChild
          variant="ghost"
          className="mb-8 text-zinc-400 hover:text-white"
        >
          <Link to="/">
            <ArrowLeft size={16} className="mr-2" />
            Voltar ao Início
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hero Image */}
            <div className="aspect-video relative overflow-hidden rounded-xl mb-8">
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center text-zinc-400 text-sm">
                  <Calendar size={16} className="mr-2" />
                  {formatDate(post.created_at)}
                </div>
                <div className="flex items-center text-zinc-400 text-sm">
                  <Clock size={16} className="mr-2" />
                  {estimatedReadTime} min de leitura
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                {post.title}
              </h1>

              {/* Product CTA */}
              {relatedProduct && (
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 mb-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                    <img
                      src={relatedProduct.image_url}
                      alt={relatedProduct.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg mb-2">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center space-x-4 mb-3">
                        <span className="text-2xl font-bold text-red-500">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(relatedProduct.price)}
                        </span>
                        <Badge variant="secondary" className="bg-red-500/10 text-red-400 border-red-500/20">
                          {relatedProduct.category}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      asChild
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      <a 
                        href={relatedProduct.affiliate_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={16} className="mr-2" />
                        Comprar Agora
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Article Content */}
            <article className="mb-12">
              <MarkdownRenderer content={post.content} />
            </article>

            {/* Bottom CTA */}
            {relatedProduct && (
              <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/20 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Gostou do Review?
                </h3>
                <p className="text-zinc-300 mb-6">
                  Aproveite nossa análise detalhada e garante o seu {relatedProduct.name} com o melhor preço!
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  <a 
                    href={relatedProduct.affiliate_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={20} className="mr-2" />
                    Comprar {relatedProduct.name}
                  </a>
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <RelatedProducts 
              products={mockProducts} 
              currentProductId={post.product_id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;