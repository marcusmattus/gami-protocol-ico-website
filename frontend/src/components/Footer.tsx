import { SiX, SiGithub, SiDiscord } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="border-t-[3px] border-black bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-black uppercase mb-4">GAMI PROTOCOL</h3>
            <p className="text-sm font-mono opacity-80">
              THE UNIVERSAL IDENTITY LAYER FOR GAMIFICATION
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase mb-4 tracking-wider">QUICK LINKS</h3>
            <ul className="space-y-2 text-sm font-mono">
              <li><a href="#" className="hover:text-gami-purple transition-colors">WHITEPAPER</a></li>
              <li><a href="#" className="hover:text-gami-purple transition-colors">TOKENOMICS</a></li>
              <li><a href="#" className="hover:text-gami-purple transition-colors">ROADMAP</a></li>
              <li><a href="#" className="hover:text-gami-purple transition-colors">TEAM</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase mb-4 tracking-wider">CONNECT</h3>
            <div className="flex gap-4">
              <a href="#" className="border-[3px] border-white p-3 hover:bg-gami-purple hover:border-gami-purple transition-colors">
                <SiX size={20} />
              </a>
              <a href="#" className="border-[3px] border-white p-3 hover:bg-gami-purple hover:border-gami-purple transition-colors">
                <SiGithub size={20} />
              </a>
              <a href="#" className="border-[3px] border-white p-3 hover:bg-gami-purple hover:border-gami-purple transition-colors">
                <SiDiscord size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t-[3px] border-white pt-8 text-center">
          <p className="text-sm font-mono">
            © 2025. Built with ❤️ using <a href="https://caffeine.ai" className="underline hover:text-gami-purple transition-colors">caffeine.ai</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
