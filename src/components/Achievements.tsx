"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Medal, Trophy, Code } from "lucide-react";
import { portfolioData, AchievementItem } from "@/data/portfolioData";

export default function Achievements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const getAchievementIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 1:
        return <Award className="w-5 h-5 text-cyan-400" />;
      case 2:
        return <Code className="w-5 h-5 text-blue-400" />;
      default:
        return <Medal className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section 
      id="achievements" 
      ref={containerRef}
      className="relative min-h-screen w-full py-24 bg-[#0A0A0C]/30 overflow-hidden border-b border-white/5"
    >
      <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-blue-500 block mb-3">08 // Credentials</span>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-white leading-none">Honors & Accolades</h2>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {portfolioData.achievements.map((ach: AchievementItem, idx: number) => (
            <motion.div
              key={ach.subtitle}
              className="glass-card rounded-2xl p-6 md:p-8 flex items-start gap-6 relative overflow-hidden group"
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Left: Icon container */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white shrink-0 group-hover:border-blue-500/30 group-hover:bg-blue-500/5 transition-all duration-300">
                {getAchievementIcon(idx)}
              </div>

              {/* Right: Text Details */}
              <div className="flex flex-col gap-1.5 flex-1 text-left">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-blue-500 font-semibold">
                    {ach.title}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-white/30">
                    {ach.date}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors duration-300">
                  {ach.subtitle}
                </h3>
                
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-light">
                  {ach.description}
                </p>
              </div>

              {/* Corner HUD Tag */}
              <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center border-l border-b border-white/5">
                <span className="font-mono text-[8px] text-white/10">C_0{idx + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
