import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">HOI</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                Home Office Inteligente
              </span>
            </div>
            <p className="text-zinc-400 text-sm max-w-md">
              Transforme seu espaço. Eleve sua produtividade. Descubra os melhores produtos para criar o home office dos seus sonhos.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-zinc-400 hover:text-white text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-zinc-400 hover:text-white text-sm transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/setup-guides" className="text-zinc-400 hover:text-white text-sm transition-colors">
                  Setup Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/politica-de-privacidade" 
                  className="text-zinc-400 hover:text-white text-sm transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-zinc-400 text-sm">
              © 2024 Home Office Inteligente. Todos os direitos reservados.
            </p>
            <p className="text-zinc-500 text-xs mt-2 md:mt-0">
              Contato: ai.luisdelfin@gmail.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;