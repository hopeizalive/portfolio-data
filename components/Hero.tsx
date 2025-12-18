import React from 'react';
import { ArrowDown, Github, Linkedin, Mail, Twitter, Phone } from 'lucide-react';
import { PORTFOLIO_DATA } from '../constants';

const Hero: React.FC = () => {
  const { name, role, tagline, socials, phone, email } = PORTFOLIO_DATA;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Github': return <Github className="w-5 h-5" />;
      case 'Linkedin': return <Linkedin className="w-5 h-5" />;
      case 'Twitter': return <Twitter className="w-5 h-5" />;
      case 'Mail': return <Mail className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden pt-16">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium tracking-wide">
          Available for Hire
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white">
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{name}</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-400 mb-6 max-w-2xl mx-auto font-light leading-relaxed">
          {role}. {tagline}
        </p>

        <div className="flex flex-col items-center gap-2 mb-8 text-slate-400">
           <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
             <Phone size={16} />
             <a href={`tel:${phone}`}>{phone}</a>
           </div>
           <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
             <Mail size={16} />
             <a href={`mailto:${email}`}>{email}</a>
           </div>
        </div>

        <div className="flex items-center justify-center gap-4 mb-12">
          {socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card border border-white/5 text-slate-400 hover:text-white hover:bg-white/5 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              aria-label={social.platform}
            >
              {getIcon(social.iconName)}
            </a>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#projects"
            className="px-8 py-3.5 rounded-full bg-primary text-white font-semibold shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/40 transition-all transform hover:-translate-y-0.5"
          >
            View My Work
          </a>
          <a 
            href="#experience"
            className="px-8 py-3.5 rounded-full bg-card border border-white/10 text-white font-semibold hover:bg-white/5 transition-all"
          >
            View Experience
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-500">
        <ArrowDown className="w-6 h-6" />
      </div>
    </section>
  );
};

export default Hero;