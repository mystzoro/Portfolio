"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";
import { portfolioData, ExperienceItem } from "@/data/portfolioData";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the entire section to animate the vertical timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Animate the vertical line height from 0% to 100% on scroll
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);

  return (
    <section 
      id="experience" 
      ref={containerRef}
      className="relative min-h-screen w-full py-24 bg-[#050505] overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 w-full">
        
        {/* Section Header */}
        <div className="mb-20 text-center md:text-left">
          <span className="font-mono text-xs uppercase tracking-widest text-blue-500 block mb-3">02 // Experience</span>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-white leading-none">Engineering Journey</h2>
        </div>

        {/* Timeline Container */}
        <div className="relative mt-12 pl-6 md:pl-0">
          
          {/* Vertical Base Line (Gray background) */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2" />
          
          {/* Glowing Animated Progress Line */}
          <motion.div 
            className="absolute left-6 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-blue-500 to-cyan-400 origin-top -translate-x-1/2"
            style={{ height: lineHeight }}
          />

          {/* Timeline Cards */}
          <div className="flex flex-col gap-16 md:gap-24">
            {portfolioData.experience.map((exp: ExperienceItem, index: number) => {
              const isEven = index % 2 === 0;
              return (
                <TimelineCard 
                  key={exp.company + exp.role}
                  item={exp} 
                  index={index} 
                  isEven={isEven} 
                />
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

interface TimelineCardProps {
  item: ExperienceItem;
  index: number;
  isEven: boolean;
}

function TimelineCard({ item, index, isEven }: TimelineCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <div 
      ref={cardRef}
      className={`relative flex flex-col md:flex-row items-start md:items-center justify-between w-full ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Center Timeline Node Dot */}
      <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-[#050505] border-[3px] border-white/20 -translate-x-1/2 z-10 flex items-center justify-center transition-colors duration-500">
        <motion.div 
          className="w-1.5 h-1.5 rounded-full bg-blue-500" 
          animate={isInView ? { scale: [1, 1.8, 1], backgroundColor: "#00D4FF" } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>

      {/* Grid wrapper for layout alignment */}
      <div className={`w-full md:w-[45%] ${isEven ? "md:text-right md:items-end" : "md:text-left md:items-start"} flex flex-col pl-8 md:pl-0`}>
        
        {/* Date chip */}
        <motion.div 
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/5 bg-white/2 text-[10px] uppercase font-mono tracking-wider text-white/50 mb-4"
          initial={{ opacity: 0, x: isEven ? 20 : -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Calendar className="w-3 h-3 text-cyan-400" />
          <span>{item.period}</span>
        </motion.div>

        {/* Card Component */}
        <motion.div
          className="w-full glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle accent border top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/20 to-cyan-400/20" />
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-blue-400">
              <Briefcase className="w-4 h-4" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold text-white leading-tight">{item.role}</h3>
              <p className="text-xs font-mono text-cyan-400">{item.company}</p>
            </div>
          </div>

          <ul className="flex flex-col gap-2.5 text-left text-xs sm:text-sm text-text-secondary leading-relaxed font-light">
            {item.bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-blue-400 mt-1 flex-shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Empty space filler for desktop spacing alignment */}
      <div className="hidden md:block w-[45%]" />

    </div>
  );
}
