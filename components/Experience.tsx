import React from 'react';
import { Briefcase } from 'lucide-react';
import { PORTFOLIO_DATA } from '../constants';

const Experience: React.FC = () => {
  const { experience } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="py-24 scroll-mt-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Work Experience</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
        </div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
          {experience.map((job, index) => (
            <div 
              key={job.id} 
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-darker shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:border-primary transition-colors">
                <Briefcase className="w-5 h-5 text-slate-400 group-hover:text-primary" />
              </div>
              
              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-card border border-white/5 shadow-lg group-hover:border-primary/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="font-bold text-lg text-white">{job.role}</h3>
                  <span className="text-sm font-medium text-primary px-2 py-1 bg-primary/10 rounded rounded-md inline-block w-fit mt-1 sm:mt-0">
                    {job.period}
                  </span>
                </div>
                <div className="text-slate-300 font-medium mb-4">{job.company}</div>
                <ul className="space-y-2">
                  {job.description.map((point, i) => (
                    <li key={i} className="text-slate-400 text-sm leading-relaxed flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-2 shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;