import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { PORTFOLIO_DATA } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-darker border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Let's Build Something Amazing</h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          Currently open to leadership and technical roles. Whether you have a project in mind or just want to discuss architectures, I'd love to connect.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
          <a 
            href={`mailto:${PORTFOLIO_DATA.email}`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-darker font-bold hover:bg-slate-200 transition-colors"
          >
            <Mail size={20} />
            {PORTFOLIO_DATA.email}
          </a>
          <a 
            href={`tel:${PORTFOLIO_DATA.phone}`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-bold hover:bg-white/5 transition-colors"
          >
            <Phone size={20} />
            {PORTFOLIO_DATA.phone}
          </a>
        </div>

        <div className="flex flex-col items-center gap-4 text-sm text-slate-600">
          <div className="flex gap-6">
            {PORTFOLIO_DATA.socials.map((social) => (
              <a 
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {social.platform}
              </a>
            ))}
          </div>
          <p>© {new Date().getFullYear()} {PORTFOLIO_DATA.name}. All rights reserved.</p>
          <p className="text-xs">Built with React, Tailwind & Gemini AI (Voice Enabled)</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;