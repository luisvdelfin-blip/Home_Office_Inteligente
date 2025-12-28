import HeroSection from '@/components/HeroSection';
import ProductsGrid from '@/components/ProductsGrid';
import { mockProducts } from '@/data/mockData';

const Home = () => {
  return (
    <div className="min-h-screen bg-black">
      <HeroSection />
      <ProductsGrid products={mockProducts} />
    </div>
  );
};

export default Home;