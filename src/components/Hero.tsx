"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ChevronRight } from "lucide-react";

const titles = [
  { text: "AI Engineer", color: "#3B82F6" },
  { text: "Full Stack Developer", color: "#00D4FF" },
  { text: "ML Enthusiast", color: "#8B5CF6" },
  { text: "Data Analyst", color: "#22C55E" },
  { text: "Problem Solver", color: "#F59E0B" },
];

/* ── Magnetic button wrapper ─── */
function MagneticButton({ children, className, onClick, href }: {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = href ? "a" : "button";
  const extraProps = href ? { href, target: "_blank", rel: "noopener noreferrer" } : { onClick };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <Tag className={className} {...extraProps}>
        {children}
      </Tag>
    </motion.div>
  );
}

/* ── Particle field (canvas) ─── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; color: string }[] = [];
    const colors = ["#3B82F6", "#00D4FF", "#8B5CF6", "#22C55E"];
    const count = Math.min(80, Math.floor((w * h) / 18000));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouse);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Subtle mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.vx += (dx / dist) * force * 0.15;
          p.vy += (dy / dist) * force * 0.15;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - d / 120) * 0.12;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

/* ── Scramble text effect ─── */
function useTextScramble(finalText: string, speed = 30) {
  const [text, setText] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

  useEffect(() => {
    let frame = 0;
    const maxFrames = finalText.length;
    let raf: number;

    const scramble = () => {
      let output = "";
      for (let i = 0; i < finalText.length; i++) {
        if (i < frame) {
          output += finalText[i];
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setText(output);
      frame++;
      if (frame <= maxFrames) {
        raf = window.setTimeout(() => requestAnimationFrame(scramble), speed);
      }
    };

    const delay = setTimeout(() => scramble(), 600);
    return () => { clearTimeout(delay); clearTimeout(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalText]);

  return text;
}

/* ── Glitch line effect ─── */
function GlitchLine() {
  return (
    <motion.div
      className="absolute left-0 w-full h-[1px] bg-blue-500/30 pointer-events-none z-30"
      initial={{ top: "0%", opacity: 0 }}
      animate={{
        top: ["0%", "100%"],
        opacity: [0, 0.6, 0.6, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatDelay: 8,
        ease: "linear",
      }}
    />
  );
}

/* ── Orbiting ring ─── */
function OrbitRing({ size, duration, delay, color }: { size: number; duration: number; delay: number; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full border pointer-events-none"
      style={{
        width: size,
        height: size,
        borderColor: color,
        top: "50%",
        left: "50%",
        marginTop: -size / 2,
        marginLeft: -size / 2,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay }}
    >
      <motion.div
        className="absolute w-2 h-2 rounded-full"
        style={{ background: color, top: -4, left: "50%", marginLeft: -4 }}
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   HERO COMPONENT
   ══════════════════════════════════════════════════ */
export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  // Parallax based on mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const bgX = useTransform(smoothX, [0, 1], [-15, 15]);
  const bgY = useTransform(smoothY, [0, 1], [-15, 15]);
  const fgX = useTransform(smoothX, [0, 1], [-8, 8]);
  const fgY = useTransform(smoothY, [0, 1], [-8, 8]);

  const nameScrambled = useTextScramble("PRIYANSHU CHAND", 40);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  const handleScrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const workSection = document.getElementById("projects");
    if (workSection) {
      const lenis = (window as any).lenisInstance;
      if (lenis) {
        lenis.scrollTo(workSection, { offset: -80, duration: 1.5 });
      } else {
        workSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const lenis = (window as any).lenisInstance;
      if (lenis) {
        lenis.scrollTo(contactSection, { offset: -80, duration: 1.5 });
      } else {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  /* letter stagger for name */
  const nameLetters = "PRIYANSHU CHAND".split("");

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* ── Particle canvas ─── */}
      <ParticleField />

      {/* ── Scan line ─── */}
      <GlitchLine />

      {/* ── Orbital rings (parallax layer) ─── */}
      <motion.div
        className="absolute inset-0 pointer-events-none hidden lg:block"
        style={{ x: bgX, y: bgY }}
      >
        <OrbitRing size={500} duration={30} delay={0} color="rgba(59,130,246,0.08)" />
        <OrbitRing size={700} duration={45} delay={2} color="rgba(0,212,255,0.06)" />
        <OrbitRing size={350} duration={20} delay={1} color="rgba(139,92,246,0.07)" />
      </motion.div>

      {/* ── Deep background glow orbs ─── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: bgX, y: bgY }}
      >
        <div className="absolute top-[20%] left-[15%] w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-[160px]" />
        <div className="absolute bottom-[15%] right-[10%] w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-[140px]" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[180px]" />
      </motion.div>

      {/* ── Grid overlay ─── */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* ── Floating code snippets (parallax foreground) ─── */}
      <motion.div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{ x: fgX, y: fgY }}
      >
        {/* Top-left */}
        <motion.div
          className="absolute top-[18%] left-[8%] glass rounded-lg px-4 py-2.5 max-w-[180px]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/70" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
            <span className="w-2 h-2 rounded-full bg-green-500/70" />
          </div>
          <code className="text-[9px] font-mono text-blue-400 leading-relaxed block">
            <span className="text-purple-400">import</span> torch<br />
            <span className="text-purple-400">from</span> transformers <span className="text-purple-400">import</span><br />
            &nbsp;&nbsp;AutoModel<br />
            <br />
            model.<span className="text-cyan-400">train</span>()
          </code>
        </motion.div>

        {/* Top-right */}
        <motion.div
          className="absolute top-[22%] right-[8%] glass rounded-lg px-4 py-2.5 max-w-[190px]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <code className="text-[9px] font-mono text-emerald-400 leading-relaxed block">
            <span className="text-white/50">// Neural network</span><br />
            <span className="text-purple-400">const</span> predict = <span className="text-cyan-400">async</span> () =&gt; {"{"}<br />
            &nbsp;&nbsp;<span className="text-purple-400">const</span> res = <span className="text-cyan-400">await</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;model.<span className="text-yellow-400">inference</span>(data)<br />
            &nbsp;&nbsp;<span className="text-purple-400">return</span> res.logits<br />
            {"}"}
          </code>
        </motion.div>

        {/* Bottom-left */}
        <motion.div
          className="absolute bottom-[25%] left-[6%] glass rounded-lg px-4 py-2.5 max-w-[175px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <code className="text-[9px] font-mono text-cyan-400 leading-relaxed block">
            <span className="text-white/50">$ deployment</span><br />
            <span className="text-emerald-400">✓</span> Build successful<br />
            <span className="text-emerald-400">✓</span> Tests passed (47/47)<br />
            <span className="text-emerald-400">✓</span> Deployed to prod<br />
            <span className="text-blue-400">→</span> <span className="text-white/40">latency: 23ms</span>
          </code>
        </motion.div>

        {/* Bottom-right */}
        <motion.div
          className="absolute bottom-[20%] right-[6%] glass rounded-lg px-4 py-2.5 max-w-[185px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.8 }}
        >
          <code className="text-[9px] font-mono text-yellow-400 leading-relaxed block">
            <span className="text-white/50"># accuracy report</span><br />
            epoch: <span className="text-cyan-400">50</span><br />
            train_acc: <span className="text-emerald-400">0.9847</span><br />
            val_acc: <span className="text-emerald-400">0.9721</span><br />
            loss: <span className="text-red-400">0.0312</span>
          </code>
        </motion.div>

        {/* Floating tech badges */}
        {[
          { label: "PyTorch", top: "40%", left: "5%", delay: 2.2, color: "#EE4C2C" },
          { label: "Next.js", top: "55%", right: "4%", delay: 2.4, color: "#FFFFFF" },
          { label: "TensorFlow", bottom: "40%", right: "12%", delay: 2.6, color: "#FF6F00" },
          { label: "PostgreSQL", top: "12%", left: "40%", delay: 2.8, color: "#336791" },
        ].map((badge) => (
          <motion.div
            key={badge.label}
            className="absolute flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/5 bg-white/[0.02]"
            style={{
              top: badge.top,
              left: badge.left,
              right: badge.right,
              bottom: badge.bottom,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 0.7, 0.7],
              scale: 1,
              y: [0, -8, 0],
            }}
            transition={{
              delay: badge.delay,
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: badge.color }}
            />
            <span className="font-mono text-[8px] uppercase tracking-wider text-white/40">
              {badge.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* ═══════════ MAIN CONTENT ═══════════ */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 text-center flex flex-col items-center justify-center">
        {/* Availability chip */}
        <motion.div
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/60">
            Open to Opportunities
          </span>
        </motion.div>

        {/* Name — character-by-character stagger */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <span className="text-white/40 text-base md:text-lg font-light tracking-wide mb-3 block">
            Hello, I&apos;m
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-black tracking-[-0.04em] text-white uppercase leading-[0.9] select-none">
            {mounted
              ? nameLetters.map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ y: 80, opacity: 0, rotateX: -90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.4 + i * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{
                      y: -8,
                      color: "#3B82F6",
                      transition: { duration: 0.2 },
                    }}
                    style={{ cursor: "default" }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))
              : nameScrambled}
          </h1>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          className="w-20 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Rotating title carousel */}
        <div className="h-[42px] sm:h-[52px] md:h-[66px] flex items-center justify-center overflow-hidden mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={titles[titleIndex].text}
              className="flex items-center gap-3"
              initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -40, opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: titles[titleIndex].color }}
              />
              <span
                className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight uppercase"
                style={{
                  background: `linear-gradient(135deg, ${titles[titleIndex].color}, ${titles[titleIndex].color}88)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {titles[titleIndex].text}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Title dots indicator */}
        <motion.div
          className="flex items-center gap-2 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {titles.map((t, i) => (
            <button
              key={t.text}
              onClick={() => setTitleIndex(i)}
              className="group relative cursor-pointer p-1"
              aria-label={`Show ${t.text}`}
            >
              <motion.span
                className="block w-1.5 h-1.5 rounded-full transition-colors duration-300"
                style={{
                  backgroundColor: i === titleIndex ? t.color : "rgba(255,255,255,0.2)",
                }}
                animate={i === titleIndex ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </button>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="max-w-lg text-sm sm:text-base text-white/50 leading-relaxed font-light mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Crafting intelligent software at the intersection of{" "}
          <span className="text-blue-400 font-medium">artificial intelligence</span>,{" "}
          <span className="text-cyan-400 font-medium">modern web engineering</span>, and{" "}
          <span className="text-purple-400 font-medium">data-driven solutions</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticButton
            onClick={handleScrollToWork}
            className="group relative w-52 sm:w-auto px-8 py-4 rounded-full text-[11px] font-semibold uppercase tracking-[0.15em] text-[#050505] bg-white overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-500 cursor-pointer"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Explore My Work
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-[11px] font-semibold uppercase tracking-[0.15em]">
              Explore My Work
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </MagneticButton>

          <MagneticButton
            onClick={handleScrollToContact}
            className="w-52 sm:w-auto px-8 py-4 rounded-full text-[11px] font-semibold uppercase tracking-[0.15em] text-white/80 border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/25 hover:text-white transition-all duration-500 backdrop-blur-md cursor-pointer"
          >
            Let&apos;s Connect
          </MagneticButton>
        </motion.div>

        {/* Terminal-style status bar */}
        <motion.div
          className="mt-16 flex flex-wrap items-center justify-center gap-6 text-[10px] font-mono uppercase tracking-wider text-white/25"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          {[
            { label: "Status", value: "Active", dot: "#22C55E" },
            { label: "Focus", value: "AI + Web", dot: "#3B82F6" },
            { label: "Based In", value: "India", dot: "#F59E0B" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: item.dot }} />
              <span className="text-white/40">{item.label}:</span>
              <span className="text-white/60">{item.value}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator ─── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">
          Scroll to Explore
        </span>
        <motion.div
          className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1"
          animate={{ borderColor: ["rgba(255,255,255,0.15)", "rgba(59,130,246,0.3)", "rgba(255,255,255,0.15)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-1.5 rounded-full bg-white/50"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
