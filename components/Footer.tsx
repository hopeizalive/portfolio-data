import React from 'react';
import { PORTFOLIO_DATA } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-darker border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Let's Build Something Amazing</h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          Currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        
        <a 
          href={`mailto:${PORTFOLIO_DATA.socials.find(s => s.platform === 'Mail')?.url.replace('mailto:', '')}`}
          className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-darker font-bold hover:bg-slate-200 transition-colors mb-12"
        >
          Say Hello
        </a>

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
          <p className="text-xs">Built with React, Tailwind & Gemini AI</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;