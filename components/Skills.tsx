import React from 'react';
import { PORTFOLIO_DATA } from '../constants';

const Skills: React.FC = () => {
  const { skills, about } = PORTFOLIO_DATA;

  return (
    <section id="about" className="py-24 bg-darker/50 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* About Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">About Me</h2>
            <div className="prose prose-invert prose-lg text-slate-400">
              <p className="leading-relaxed whitespace-pre-line">
                {about}
              </p>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-6">
              <div>
                <span className="block text-sm text-slate-500 mb-1">Location</span>
                <span className="text-lg font-medium text-white">{PORTFOLIO_DATA.location}</span>
              </div>
              <div>
                <span className="block text-sm text-slate-500 mb-1">Availability</span>
                <span className="text-lg font-medium text-green-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  {PORTFOLIO_DATA.availability}
                </span>
              </div>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="bg-card rounded-2xl p-8 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10"></div>
            
            <h3 className="text-2xl font-bold text-white mb-8">Technical Proficiency</h3>
            
            <div className="space-y-8">
              {skills.map((skillGroup) => (
                <div key={skillGroup.category}>
                  <h4 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
                    {skillGroup.category}
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {skillGroup.items.map((skill) => (
                      <span 
                        key={skill}
                        className="px-4 py-2 bg-darker border border-white/5 rounded-lg text-slate-300 text-sm hover:border-primary/50 hover:text-white transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;