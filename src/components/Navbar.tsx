"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const lenis = (window as any).lenisInstance;
      if (lenis) {
        lenis.scrollTo(targetElement, { offset: -80, duration: 1.5 });
      } else {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? "py-4 bg-[#050505]/40 backdrop-blur-md border-b border-white/5" 
            : "py-6 bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleScrollTo(e, "#home")}
            className="flex items-center gap-2 group font-mono text-sm tracking-widest text-white"
          >
            <div className="relative w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden group-hover:border-blue-500/30 transition-all duration-300">
              <span className="font-bold text-white group-hover:text-blue-400 transition-colors duration-300">PC</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <span className="hidden sm:inline-block font-semibold hover:text-blue-400 transition-colors duration-300">Priyanshu Chand</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-xs font-medium uppercase tracking-wider text-white/75 hover:text-blue-400 transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Call to Actions (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className="text-xs uppercase tracking-wider font-semibold text-white px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              Hire Me
            </a>
            <a
              href="/resume.pdf"
              className="text-xs uppercase tracking-wider font-semibold text-[#050505] bg-white px-5 py-2.5 rounded-full hover:bg-white/90 hover:shadow-lg hover:shadow-white/5 flex items-center gap-1 transition-all duration-300"
            >
              Resume <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white hover:text-blue-400 transition-colors duration-300 z-50 p-2"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-lg flex flex-col justify-center items-center lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background grid */}
            <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

            <div className="flex flex-col gap-6 text-center z-10">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.5, ease: "easeOut" }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="text-2xl font-semibold text-white/80 hover:text-blue-400 transition-colors duration-300 tracking-wide block py-2"
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}

              <motion.div
                className="flex flex-col gap-4 mt-8 px-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1, duration: 0.5 }}
              >
                <a
                  href="#contact"
                  onClick={(e) => handleScrollTo(e, "#contact")}
                  className="w-48 text-sm uppercase tracking-widest font-semibold text-white py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  Hire Me
                </a>
                <a
                  href="/resume.pdf"
                  className="w-48 text-sm uppercase tracking-widest font-semibold text-[#050505] bg-white py-3 rounded-full hover:bg-white/90 flex items-center justify-center gap-1 transition-all duration-300"
                >
                  Resume <ArrowUpRight className="w-4.5 h-4.5" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
