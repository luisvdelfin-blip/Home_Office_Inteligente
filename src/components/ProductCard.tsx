import { ExternalLink, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  hasReview?: boolean;
}

const ProductCard = ({ product, hasReview = false }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const getSlugFromProduct = (productName: string) => {
    return productName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  return (
    <Card className="group bg-zinc-900/50 border-zinc-800 hover:border-red-500/50 transition-all duration-300 overflow-hidden">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <Badge 
          variant="secondary" 
          className="absolute top-3 left-3 bg-red-500/90 text-white border-0"
        >
          {product.category}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-red-500">
            {formatPrice(product.price)}
          </span>
        </div>

        <div className="flex gap-2">
          {hasReview && (
            <Button 
              asChild
              variant="outline" 
              size="sm" 
              className="flex-1 border-zinc-700 text-zinc-300 hover:bg-red-500/10 hover:border-red-500 hover:text-red-400"
            >
              <Link to={`/reviews/${getSlugFromProduct(product.name)}`}>
                <Eye size={16} className="mr-2" />
                Ver Review
              </Link>
            </Button>
          )}
          
          <Button 
            asChild
            size="sm" 
            className="flex-1 bg-red-500 hover:bg-red-600 text-white"
          >
            <a 
              href={product.affiliate_url} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <ExternalLink size={16} className="mr-2" />
              Comprar
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;