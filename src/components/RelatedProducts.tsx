import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from '@/types';

interface RelatedProductsProps {
  products: Product[];
  currentProductId?: string;
}

const RelatedProducts = ({ products, currentProductId }: RelatedProductsProps) => {
  // Filter out current product and limit to 3 items
  const relatedProducts = products
    .filter(product => product.id !== currentProductId)
    .slice(0, 3);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <Card className="bg-zinc-900/50 border-zinc-800 sticky top-24">
      <CardHeader>
        <CardTitle className="text-white text-xl">Produtos Relacionados</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {relatedProducts.map((product) => (
          <div key={product.id} className="flex space-x-3 p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-medium text-sm line-clamp-2 mb-1">
                {product.name}
              </h4>
              <p className="text-red-500 font-semibold text-sm mb-2">
                {formatPrice(product.price)}
              </p>
              <Button
                asChild
                size="sm"
                className="w-full bg-red-500 hover:bg-red-600 text-white text-xs"
              >
                <a 
                  href={product.affiliate_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={12} className="mr-1" />
                  Comprar
                </a>
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RelatedProducts;