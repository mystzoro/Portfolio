"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Brain, BarChart2 } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center py-24 bg-[#0A0A0C]/50 border-y border-white/5 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-blue-500 block mb-3">01 // Profile</span>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-white leading-none">Who I Am</h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left: Biography (Editorial Typography) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold leading-relaxed text-white/90 mb-6">
                {portfolioData.profile.story[0]}
              </h3>
              
              <div className="flex flex-col gap-6 text-sm sm:text-base text-text-secondary leading-relaxed font-light">
                <p>{portfolioData.profile.story[1]}</p>
                <p>{portfolioData.profile.story[2]}</p>
                <p>{portfolioData.profile.story[3]}</p>
              </div>
            </motion.div>

            {/* Education Sub-card */}
            <motion.div 
              className="glass-card rounded-2xl p-6 md:p-8 flex items-start gap-5 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-blue-500 font-semibold">Education Background</span>
                <h4 className="text-lg font-bold text-white leading-tight">{portfolioData.profile.education.degree}</h4>
                <p className="text-sm text-text-secondary">{portfolioData.profile.education.institution}</p>
                <p className="text-xs text-text-muted mt-1">{portfolioData.profile.education.year}</p>
              </div>
            </motion.div>
          </div>

          {/* Right: Interactive Stats Dashboard */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {portfolioData.stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="glass-card rounded-2xl p-6 md:p-8 flex flex-col justify-between group overflow-hidden relative"
                >
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-6">
                    STAT_0{index + 1}
                  </span>
                  
                  <div>
                    <span className="text-3xl md:text-4xl font-bold text-white tracking-tight block mb-1 group-hover:text-blue-400 transition-colors duration-300">
                      {stat.value}
                    </span>
                    <span className="text-xs text-text-secondary tracking-wide uppercase font-medium">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Extra Focus Highlight Pane */}
            <motion.div 
              className="glass-card rounded-2xl p-6 md:p-8 flex items-center gap-5 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/10 to-transparent blur-md pointer-events-none" />
              
              <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Brain className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-1">AI & Machine Learning Centric</h4>
                <p className="text-xs text-text-muted leading-relaxed">
                  Specialized in deep-learning diagnostics, multi-agent frameworks (LangGraph), vector databases (Qdrant), and intelligent API microservices.
                </p>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
