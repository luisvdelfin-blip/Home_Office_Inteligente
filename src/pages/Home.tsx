import HeroSection from '@/components/HeroSection';
import ProductsGrid from '@/components/ProductsGrid';
import SEO from '@/components/SEO';
import { useProducts } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';

const Home = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <>
        <SEO 
          title="Home Office Inteligente | Transforme seu Espaço"
          description="Descubra os melhores produtos para elevar sua produtividade. Reviews detalhados, setups profissionais e tecnologia premium para seu home office."
          url="https://homeofficeinteligente.com.br"
        />
        <div className="min-h-screen bg-black">
          <HeroSection />
          <div className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <Skeleton className="h-12 w-96 mx-auto mb-4 bg-zinc-800" />
                <Skeleton className="h-6 w-128 mx-auto bg-zinc-800" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-square w-full bg-zinc-800" />
                    <Skeleton className="h-4 w-full bg-zinc-800" />
                    <Skeleton className="h-4 w-3/4 bg-zinc-800" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SEO 
          title="Home Office Inteligente | Transforme seu Espaço"
          description="Descubra os melhores produtos para elevar sua produtividade. Reviews detalhados, setups profissionais e tecnologia premium para seu home office."
          url="https://homeofficeinteligente.com.br"
        />
        <div className="min-h-screen bg-black">
          <HeroSection />
          <div className="py-20 px-4">
            <div className="max-w-7xl mx-auto text-center">
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Erro ao Carregar Produtos
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
        title="Home Office Inteligente | Transforme seu Espaço"
        description="Descubra os melhores produtos para elevar sua produtividade. Reviews detalhados, setups profissionais e tecnologia premium para seu home office."
        url="https://homeofficeinteligente.com.br"
      />
      <div className="min-h-screen bg-black">
        <HeroSection />
        <ProductsGrid products={products} />
      </div>
    </>
  );
};

export default Home;