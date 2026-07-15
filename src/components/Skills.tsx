"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Brain, Database, Layers, GitBranch, Cpu, Award } from "lucide-react";
import { portfolioData, SkillCategory, SkillDetail } from "@/data/portfolioData";

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const getCategoryIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case "programming":
        return <Code2 className="w-5 h-5 text-blue-400" />;
      case "ai & machine learning":
        return <Brain className="w-5 h-5 text-cyan-400" />;
      case "data analytics":
        return <Cpu className="w-5 h-5 text-emerald-400" />;
      case "databases & apis":
        return <Database className="w-5 h-5 text-purple-400" />;
      case "web technologies":
        return <Layers className="w-5 h-5 text-pink-400" />;
      default:
        return <GitBranch className="w-5 h-5 text-white/50" />;
    }
  };

  return (
    <section 
      id="skills" 
      ref={containerRef}
      className="relative min-h-screen w-full py-24 bg-[#0A0A0C]/30 overflow-hidden border-b border-white/5"
    >
      {/* Background design elements */}
      <div className="absolute top-1/4 right-[10%] w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-blue-500 block mb-3">04 // Technology</span>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-white leading-none">Skills Matrix</h2>
        </div>

        {/* Skills Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.skills.map((category: SkillCategory, catIdx: number) => (
            <motion.div
              key={category.title}
              className="glass-card rounded-2xl p-6 md:p-8 flex flex-col justify-between"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: catIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3.5 mb-6 border-b border-white/5 pb-4">
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                    {getCategoryIcon(category.title)}
                  </div>
                  <h3 className="text-base font-semibold text-white uppercase tracking-wider">
                    {category.title}
                  </h3>
                </div>

                {/* Skill Nodes List */}
                <div className="flex flex-wrap gap-2.5">
                  {category.items.map((skill: SkillDetail) => (
                    <SkillBadge key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>

              {/* HUD-like corner decoration */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-white/30 uppercase">
                <span>sys_class: {category.title.substring(0, 4)}</span>
                <span>ready_state: OK</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

function SkillBadge({ skill }: { skill: SkillDetail }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative">
      <motion.button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 cursor-pointer interactive-hover"
        whileHover={{ y: -2 }}
      >
        {skill.name}
      </motion.button>

      {/* Floating detail hover card */}
      {hovered && (
        <motion.div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3.5 w-60 p-4 rounded-xl glass border border-blue-500/30 shadow-2xl z-50 pointer-events-none"
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {/* Subtle pointer tip */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-[#0A0A0C] border-r border-b border-blue-500/30 -mt-[6px]" />
          
          <div className="flex flex-col gap-2 relative z-10 text-left">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-1.5">
              <span className="font-bold text-white text-sm">{skill.name}</span>
              <span className="font-mono text-[10px] text-cyan-400">{skill.years} {skill.years === 1 ? 'Year' : 'Years'} Exp</span>
            </div>

            {/* Confidence Radial Gauge */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-[10px] text-text-muted uppercase tracking-wider">Confidence</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400" 
                    style={{ width: `${skill.confidence}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] text-white font-bold">{skill.confidence}%</span>
              </div>
            </div>

            {/* Project List */}
            {skill.projects.length > 0 && (
              <div className="mt-1">
                <span className="text-[9px] text-text-muted uppercase tracking-wider block mb-1">Applied In:</span>
                <div className="flex flex-col gap-1">
                  {skill.projects.map((proj) => (
                    <span 
                      key={proj} 
                      className="text-[10px] text-white/70 bg-white/5 px-2 py-0.5 rounded border border-white/5 truncate font-light"
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
