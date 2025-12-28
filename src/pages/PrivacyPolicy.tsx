import { Shield, Mail, Database, Cookie } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SEO from '@/components/SEO';

const PrivacyPolicy = () => {
  return (
    <>
      <SEO 
        title="Política de Privacidade | Home Office Inteligente"
        description="Transparência total sobre como tratamos seus dados. Política de privacidade completa do Home Office Inteligente."
        url="https://homeofficeinteligente.com.br/politica-de-privacidade"
      />
      <div className="min-h-screen bg-black pt-16">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield size={32} className="text-red-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Política de{' '}
              <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                Privacidade
              </span>
            </h1>
            <p className="text-xl text-zinc-400">
              Transparência total sobre como tratamos seus dados
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Pinterest API Section */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Database size={20} className="mr-3 text-red-500" />
                  Uso da API do Pinterest
                </CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-300 space-y-4">
                <p>
                  A <strong className="text-white">Home Office Inteligente</strong> utiliza a API do Pinterest para automação de conteúdo e descoberta de produtos relevantes para nossos usuários.
                </p>
                <p>
                  <strong className="text-white">Importante:</strong> Não coletamos, armazenamos ou processamos dados pessoais sensíveis através da integração com o Pinterest. Nossa utilização da API é estritamente para fins de curadoria de conteúdo público.
                </p>
              </CardContent>
            </Card>

            {/* Data Collection */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Cookie size={20} className="mr-3 text-red-500" />
                  Coleta de Dados e Cookies
                </CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-300 space-y-4">
                <p>
                  O uso de cookies em nosso site é <strong className="text-white">restrito exclusivamente</strong> para:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Atribuição de links de afiliados (Amazon e Mercado Livre)</li>
                  <li>Análise básica de tráfego e performance do site</li>
                  <li>Preferências de tema (modo escuro/claro)</li>
                </ul>
                <p>
                  <strong className="text-white">Não utilizamos cookies para:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Rastreamento comportamental invasivo</li>
                  <li>Coleta de dados pessoais identificáveis</li>
                  <li>Compartilhamento com terceiros não autorizados</li>
                </ul>
              </CardContent>
            </Card>

            {/* Affiliate Links */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">
                  Links de Afiliados
                </CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-300 space-y-4">
                <p>
                  Este site contém links de afiliados para Amazon e Mercado Livre. Quando você clica em um link e faz uma compra, podemos receber uma pequena comissão sem custo adicional para você.
                </p>
                <p>
                  <strong className="text-white">Transparência:</strong> Todos os links de afiliados são claramente identificados e nossa opinião sobre os produtos permanece imparcial e honesta.
                </p>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">
                  Segurança dos Dados
                </CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-300 space-y-4">
                <p>
                  Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger qualquer informação que possamos coletar contra acesso não autorizado, alteração, divulgação ou destruição.
                </p>
                <p>
                  Nosso site utiliza conexões HTTPS criptografadas para garantir a segurança na transmissão de dados.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Mail size={20} className="mr-3 text-red-500" />
                  Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-300 space-y-4">
                <p>
                  Para dúvidas, solicitações ou esclarecimentos sobre esta política de privacidade, entre em contato conosco:
                </p>
                <div className="bg-zinc-800/50 p-4 rounded-lg">
                  <p className="text-white font-medium">
                    Email: <span className="text-red-400">ai.luisdelfin@gmail.com</span>
                  </p>
                </div>
                <p className="text-sm text-zinc-400">
                  Respondemos a todas as solicitações dentro de 48 horas úteis.
                </p>
              </CardContent>
            </Card>

            {/* Last Updated */}
            <div className="text-center pt-8 border-t border-zinc-800">
              <p className="text-zinc-500 text-sm">
                Última atualização: Janeiro de 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;