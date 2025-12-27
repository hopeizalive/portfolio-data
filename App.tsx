import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Footer from './components/Footer';
import AIChatWidget from './components/AIChatWidget';

const App: React.FC = () => {
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/813f001f-ddaf-4d47-965f-9d5a14ecfd58',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:9',message:'App component mounting',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H4'})}).catch(()=>{});
  // #endregion
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/813f001f-ddaf-4d47-965f-9d5a14ecfd58',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:15',message:'App useEffect running',data:{apiKeyExists:!!(process.env as any).API_KEY,apiKeyValue:((process.env as any).API_KEY||'').substring(0,10)+'...'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H2'})}).catch(()=>{});
    // #endregion
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-darker text-slate-300 font-sans selection:bg-primary selection:text-white">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled ? 'bg-darker/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="#" className="text-xl font-bold text-white tracking-tighter">
            DEV<span className="text-primary">FOLIO</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#home" className="hover:text-primary transition-colors">Home</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#projects" className="hover:text-primary transition-colors">Work</a>
            <a href="#experience" className="hover:text-primary transition-colors">Experience</a>
            <a href="#contact" className="px-4 py-2 rounded-full border border-primary/50 text-primary hover:bg-primary hover:text-white transition-all">
              Contact
            </a>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <Skills />
        <Projects />
        <Experience />
      </main>

      <Footer />
      
      {/* AI Assistant */}
      <AIChatWidget />
    </div>
  );
};

export default App;