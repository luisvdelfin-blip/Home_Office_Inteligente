import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/3 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <div className="inline-flex items-center space-x-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-8">
            <Zap size={16} className="text-red-500" />
            <span className="text-red-400 text-sm font-medium">
              Tecnologia Premium para Profissionais
            </span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Transforme seu{' '}
          <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
            Espaço
          </span>
        </h1>
        
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-300 mb-8 tracking-tight">
          Eleve sua Produtividade
        </h2>

        <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Descubra os produtos mais inovadores para criar o home office dos seus sonhos. 
          Reviews detalhados, comparações técnicas e as melhores ofertas do mercado.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-lg"
            onClick={() => {
              document.getElementById('products-section')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
          >
            Explorar Produtos
            <ArrowRight size={20} className="ml-2" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 px-8 py-4 text-lg"
            onClick={() => {
              document.getElementById('products-section')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
          >
            Ver Reviews
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-zinc-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-red-500 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;