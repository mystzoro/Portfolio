"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, GitFork, BookOpen, ExternalLink, Calendar } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface PinnedRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  langColor: string;
}

export default function GitHubSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [contributionData, setContributionData] = useState<number[]>([]);

  // Generate simulated contribution blocks representing commits
  useEffect(() => {
    const data: number[] = [];
    // Generate 12 months * 7 days = 84 blocks
    for (let i = 0; i < 91; i++) {
      const commitCount = Math.floor(Math.random() * 4); // 0, 1, 2, 3 level
      data.push(commitCount);
    }
    setContributionData(data);
  }, []);

  const pinnedRepos: PinnedRepo[] = [
    {
      name: "lt-line-fault-detector",
      description: "AI-based embedded IoT telemetry system designed to localize electrical transmission anomalies.",
      stars: 48,
      forks: 12,
      language: "Python",
      langColor: "#3572A5"
    },
    {
      name: "multi-agent-stock-analyst",
      description: "Collaborative LangGraph workspace conducting real-time sentiment analysis and pricing predictions.",
      stars: 32,
      forks: 7,
      language: "Python",
      langColor: "#3572A5"
    },
    {
      name: "langgraph-workflow-editor",
      description: "Abstract designer dashboard generating structured Python graphs and multi-agent systems.",
      stars: 26,
      forks: 5,
      language: "TypeScript",
      langColor: "#3178C6"
    }
  ];

  const languages = [
    { name: "Python", percentage: 54, color: "bg-blue-500" },
    { name: "JavaScript", percentage: 22, color: "bg-yellow-500" },
    { name: "TypeScript", percentage: 14, color: "bg-cyan-500" },
    { name: "SQL & C", percentage: 10, color: "bg-purple-500" }
  ];

  const getHeatmapColorClass = (level: number) => {
    switch (level) {
      case 1:
        return "bg-blue-950/40 border border-blue-900/20";
      case 2:
        return "bg-blue-800/40 border border-blue-700/30";
      case 3:
        return "bg-blue-500/50 border border-blue-400/40";
      case 4:
        return "bg-cyan-400/70 border border-cyan-300/40";
      default:
        return "bg-white/2 border border-white/5";
    }
  };

  return (
    <section 
      id="github" 
      ref={containerRef}
      className="relative min-h-screen w-full py-24 bg-[#050505] overflow-hidden"
    >
      <div className="absolute top-1/4 right-[15%] w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-blue-500 block mb-3">07 // Dev Ledger</span>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-white leading-none">GitHub Activity</h2>
          </div>
          
          <a
            href="https://github.com/priyanshu-chand"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 interactive-hover"
          >
            <GithubIcon className="w-4 h-4" /> Visit GitHub Profile <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Pinned Repositories */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block">// Pinned Repositories</span>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pinnedRepos.map((repo, idx) => (
                <motion.div
                  key={repo.name}
                  className="glass-card rounded-xl p-6 flex flex-col justify-between group h-[200px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-white/90">
                        <BookOpen className="w-4 h-4 text-blue-400" />
                        <span className="font-mono text-xs font-bold truncate max-w-[180px] group-hover:text-blue-400 transition-colors duration-300">
                          {repo.name}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono uppercase text-white/20">public</span>
                    </div>
                    
                    <p className="text-xs text-text-secondary leading-relaxed font-light line-clamp-3">
                      {repo.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-3 border-t border-white/5">
                    {/* Stars and Forks */}
                    <div className="flex items-center gap-4 text-[10px] font-mono text-white/55">
                      <span className="flex items-center gap-1.5 hover:text-white transition-colors duration-200">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500/20" /> {repo.stars}
                      </span>
                      <span className="flex items-center gap-1.5 hover:text-white transition-colors duration-200">
                        <GitFork className="w-3.5 h-3.5 text-cyan-400" /> {repo.forks}
                      </span>
                    </div>

                    {/* Language tag */}
                    <div className="flex items-center gap-1.5">
                      <span 
                        className="w-2.5 h-2.5 rounded-full" 
                        style={{ backgroundColor: repo.langColor }}
                      />
                      <span className="font-mono text-[10px] text-white/60">{repo.language}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right panel: Calendar Heatmap & Languages */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Heatmap Widget */}
            <motion.div 
              className="glass-card rounded-xl p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/80">Commit Heatmap</span>
              </div>

              {/* Grid block heatmap */}
              <div className="grid grid-cols-13 gap-1.5">
                {contributionData.map((level, idx) => (
                  <div 
                    key={idx}
                    className={`aspect-square w-full rounded-sm transition-all duration-300 hover:scale-110 cursor-crosshair ${getHeatmapColorClass(level)}`}
                    title={`Commits: ${level * 2}`}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-[8px] font-mono text-white/35 uppercase mt-4">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-sm bg-white/2 border border-white/5" />
                  <div className="w-2 h-2 rounded-sm bg-blue-950/40 border border-blue-900/20" />
                  <div className="w-2 h-2 rounded-sm bg-blue-800/40 border border-blue-700/30" />
                  <div className="w-2 h-2 rounded-sm bg-blue-500/50 border border-blue-400/40" />
                  <div className="w-2 h-2 rounded-sm bg-cyan-400/70 border border-cyan-300/40" />
                </div>
                <span>More</span>
              </div>
            </motion.div>

            {/* Languages Graph Widget */}
            <motion.div 
              className="glass-card rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/80 block mb-4">Languages Breakdown</span>
              
              {/* Stacked Segment Bar */}
              <div className="w-full h-3.5 rounded-full overflow-hidden flex mb-6 border border-white/10">
                {languages.map((lang) => (
                  <div 
                    key={lang.name}
                    className={`h-full ${lang.color}`} 
                    style={{ width: `${lang.percentage}%` }}
                    title={`${lang.name}: ${lang.percentage}%`}
                  />
                ))}
              </div>

              {/* Legend details */}
              <div className="flex flex-col gap-2.5">
                {languages.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between text-[11px] font-mono">
                    <div className="flex items-center gap-2 text-white/70">
                      <span className={`w-2 h-2 rounded-full ${lang.color}`} />
                      <span>{lang.name}</span>
                    </div>
                    <span className="font-bold text-white">{lang.percentage}%</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
