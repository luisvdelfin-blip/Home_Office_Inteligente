import HeroSection from '@/components/HeroSection';
import ProductsGrid from '@/components/ProductsGrid';
import SEO from '@/components/SEO';
import { mockProducts } from '@/data/mockData';

const Home = () => {
  return (
    <>
      <SEO 
        title="Home Office Inteligente | Transforme seu Espaço"
        description="Descubra os melhores produtos para elevar sua produtividade. Reviews detalhados, setups profissionais e tecnologia premium para seu home office."
        url="https://homeofficeinteligente.com.br"
      />
      <div className="min-h-screen bg-black">
        <HeroSection />
        <ProductsGrid products={mockProducts} />
      </div>
    </>
  );
};

export default Home;