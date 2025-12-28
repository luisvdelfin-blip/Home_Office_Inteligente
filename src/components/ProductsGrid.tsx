import { useState } from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { mockPosts } from '@/data/mockData';

interface ProductsGridProps {
  products: Product[];
}

const ProductsGrid = ({ products }: ProductsGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  // Filter products by category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  // Check if product has a review
  const hasReview = (productId: string) => {
    return mockPosts.some(post => post.product_id === productId && post.status === 'published');
  };

  return (
    <section id="products-section" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Nossos{' '}
            <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              Achadinhos
            </span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Produtos cuidadosamente selecionados para elevar seu home office ao próximo nível
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-red-500"
              }
            >
              {category === 'all' ? 'Todos' : category}
              <Badge 
                variant="secondary" 
                className="ml-2 bg-zinc-700 text-zinc-300"
              >
                {category === 'all' 
                  ? products.length 
                  : products.filter(p => p.category === category).length
                }
              </Badge>
            </Button>
          ))}
        </div>

        {/* Products Grid - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`
                ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}
                ${index === 3 ? 'lg:col-span-2' : ''}
                ${index === 5 ? 'xl:col-span-2' : ''}
              `}
            >
              <ProductCard 
                product={product} 
                hasReview={hasReview(product.id)}
              />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {filteredProducts.length > 8 && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-red-500"
            >
              Carregar Mais Produtos
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsGrid;