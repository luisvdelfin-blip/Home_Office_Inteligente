import { Monitor, Lightbulb, Armchair, Keyboard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SetupGuides = () => {
  const guides = [
    {
      icon: Monitor,
      title: 'Setup de Monitores',
      description: 'Como configurar múltiplos monitores para máxima produtividade',
      status: 'Em Breve'
    },
    {
      icon: Lightbulb,
      title: 'Iluminação Perfeita',
      description: 'Guia completo para iluminar seu home office adequadamente',
      status: 'Em Breve'
    },
    {
      icon: Armchair,
      title: 'Ergonomia Essencial',
      description: 'Como ajustar sua cadeira e mesa para trabalhar sem dores',
      status: 'Em Breve'
    },
    {
      icon: Keyboard,
      title: 'Periféricos Pro',
      description: 'Escolhendo teclado, mouse e outros acessórios profissionais',
      status: 'Em Breve'
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Setup{' '}
            <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              Guides
            </span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Guias práticos para montar o home office perfeito, passo a passo
          </p>
        </div>

        {/* Coming Soon Message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-red-500/10 border border-red-500/20 rounded-full px-6 py-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-400 font-medium">
              Conteúdo em desenvolvimento
            </span>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guides.map((guide, index) => {
            const Icon = guide.icon;
            
            return (
              <Card key={index} className="bg-zinc-900/50 border-zinc-800 hover:border-red-500/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                      <Icon size={24} className="text-red-500" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-xl">
                        {guide.title}
                      </CardTitle>
                      <span className="text-red-400 text-sm font-medium">
                        {guide.status}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400">
                    {guide.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/20 rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Seja o Primeiro a Saber
            </h3>
            <p className="text-zinc-300 mb-6">
              Cadastre-se para receber uma notificação quando os guias estiverem prontos
            </p>
            <div className="text-zinc-400">
              <p>Em breve: sistema de notificações</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupGuides;