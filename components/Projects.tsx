import React from 'react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../constants';

const Projects: React.FC = () => {
  const { projects } = PORTFOLIO_DATA;

  return (
    <section id="projects" className="py-24 relative scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Work</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
          <p className="mt-4 text-slate-400 max-w-2xl">
            A selection of projects that demonstrate my passion for building clean, performant, and scalable web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="group relative rounded-2xl overflow-hidden bg-card border border-white/5 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-darker via-transparent to-transparent opacity-60 z-10"></div>
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  {project.github && (
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-darker/80 backdrop-blur-sm rounded-full text-white hover:text-primary transition-colors"
                      title="View Code"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {project.link && (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-darker/80 backdrop-blur-sm rounded-full text-white hover:text-primary transition-colors"
                      title="View Live Site"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  {project.link && (
                    <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-primary transition-colors" />
                  )}
                </div>
                
                <p className="text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-slate-300 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;