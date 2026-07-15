"use client";

import { ArrowUp } from "lucide-react";

export default function Footer() {
  const handleScrollToTop = () => {
    const lenis = (window as any).lenisInstance;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[#050505] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Author copyright */}
        <div className="flex flex-col gap-1.5 text-center md:text-left">
          <span className="text-xs font-semibold text-white/80">
            © {new Date().getFullYear()} Priyanshu Chand
          </span>
          <span className="text-[10px] font-mono text-white/35 uppercase">
            All engineering rights reserved.
          </span>
        </div>

        {/* Center: Tech stack references */}
        <div className="text-[10px] font-mono text-white/45 max-w-sm text-center leading-relaxed">
          Engineered using <span className="text-white/70">Next.js 15</span>,{" "}
          <span className="text-white/70">TypeScript</span>,{" "}
          <span className="text-white/70">Tailwind CSS</span>,{" "}
          <span className="text-white/70">Framer Motion</span>, and{" "}
          <span className="text-white/70">GSAP</span>.
        </div>

        {/* Right: Scroll to top */}
        <button
          onClick={handleScrollToTop}
          className="flex items-center gap-1.5 text-xs font-mono text-white/50 hover:text-blue-400 transition-colors duration-300 cursor-pointer interactive-hover p-2.5 rounded-lg border border-white/5 bg-white/2 hover:border-blue-500/20"
        >
          Back to Top <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  );
}
