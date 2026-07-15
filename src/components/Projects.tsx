"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ExternalLink, X, ArrowUpRight, FolderGit2 } from "lucide-react";
import { portfolioData, ProjectDetail } from "@/data/portfolioData";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);

  // Close modal and restore scroll
  const closeModal = () => {
    setActiveProject(null);
    const lenis = (window as any).lenisInstance;
    if (lenis) lenis.start();
  };

  const openModal = (proj: ProjectDetail) => {
    setActiveProject(proj);
    const lenis = (window as any).lenisInstance;
    if (lenis) lenis.stop();
  };

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="relative min-h-screen w-full py-24 bg-[#050505] overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-blue-500 block mb-3">05 // Showcase</span>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-white leading-none">Featured Work</h2>
          </div>
          <span className="text-xs font-mono text-white/45 max-w-xs md:text-right">
            Click on any product card to expand deep-learning architectures, source code links, and production highlights.
          </span>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.projects.map((project: ProjectDetail, idx: number) => (
            <motion.div
              key={project.id}
              className="group cursor-pointer"
              onClick={() => openModal(project)}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard project={project} />
            </motion.div>
          ))}
        </div>

      </div>

      {/* Details Modal overlay */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#050505]/80 backdrop-blur-xl flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            {/* Modal Box */}
            <motion.div
              className="relative w-full max-w-2xl bg-[#0A0A0C] border border-white/10 rounded-2xl p-6 md:p-10 overflow-y-auto max-h-[85vh] shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={closeModal}
                className="absolute top-6 right-6 p-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300 interactive-hover cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Tagline / ID */}
              <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-400 block mb-2">
                PROJECT_SPEC_ID: {activeProject.id.toUpperCase()}
              </span>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 uppercase tracking-tight">
                {activeProject.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-text-secondary leading-relaxed mb-6 font-light">
                {activeProject.extendedDescription}
              </p>

              {/* Technology Stack */}
              <div className="mb-6">
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-2">Built With</span>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tech.map((t) => (
                    <span 
                      key={t}
                      className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-xs text-white/80 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Architecture Highlights */}
              <div className="mb-8">
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-2.5">Key Highlights</span>
                <div className="flex flex-col gap-2">
                  {activeProject.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-text-secondary font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 border-t border-white/5 pt-6 mt-4">
                <a 
                  href={activeProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#050505] bg-white hover:bg-white/90 shadow-md transition-all duration-300 interactive-hover"
                >
                  <GithubIcon className="w-4 h-4" /> Code Repository
                </a>
                
                {activeProject.demo && (
                  <a 
                    href={activeProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 interactive-hover"
                  >
                    Live Demo <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function TiltCard({ project }: { project: ProjectDetail }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Custom 3D tilt tracking using local element client coordinates
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Position of mouse inside the card
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;
    
    // Max rotation 12 degrees
    const rX = -(y / (height / 2)) * 12;
    const rY = (x / (width / 2)) * 12;
    
    card.style.transform = `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card rounded-2xl p-6 md:p-8 flex flex-col justify-between h-[300px] relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Subtle corner light sheen */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white-[0.015] pointer-events-none" />

      <div style={{ transform: "translateZ(30px)" }}>
        {/* Project Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-cyan-400 group-hover:text-white transition-colors duration-500">
            <FolderGit2 className="w-5 h-5" />
          </div>
          
          <div className="p-2 rounded-full border border-white/5 bg-white/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowUpRight className="w-3.5 h-3.5 text-white/70" />
          </div>
        </div>

        {/* Project Meta */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300 uppercase tracking-tight">
          {project.title}
        </h3>
        
        <p className="text-xs sm:text-sm text-text-secondary font-light leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>

      <div 
        className="flex flex-wrap gap-1.5 mt-4"
        style={{ transform: "translateZ(15px)" }}
      >
        {project.tech.slice(0, 3).map((t) => (
          <span 
            key={t}
            className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-white/50 font-mono"
          >
            {t}
          </span>
        ))}
        {project.tech.length > 3 && (
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-white/50 font-mono">
            +{project.tech.length - 3}
          </span>
        )}
      </div>
    </div>
  );
}
