"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, FileText, Send, ArrowRight, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Web3Forms — free email delivery API
      // The access key below is tied to priyanshuchand101@gmail.com
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY", // TODO: Replace with your Web3Forms access key from https://web3forms.com
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact: ${formData.name}`,
          from_name: "Portfolio Website",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });

        // Trigger visual confetti explosion
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#3B82F6", "#00D4FF", "#22C55E", "#FFFFFF"],
        });
      } else {
        // Fallback: open mailto if API fails
        const mailtoLink = `mailto:priyanshuchand101@gmail.com?subject=${encodeURIComponent(`Portfolio Contact: ${formData.name}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
        window.open(mailtoLink, "_blank");
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      }
    } catch {
      // Network error fallback: open mailto
      const mailtoLink = `mailto:priyanshuchand2004@gmail.com?subject=${encodeURIComponent(`Portfolio Contact: ${formData.name}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
      window.open(mailtoLink, "_blank");
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { name: "Email", val: "priyanshuchand101@gmail.com", href: "mailto:priyanshuchand101@gmail.com", icon: <Mail className="w-4 h-4" /> },
    { name: "LinkedIn", val: "linkedin.com/in/priyanshu-chand-283163271", href: "https://linkedin.com/in/priyanshu-chand-283163271", icon: <LinkedinIcon className="w-4 h-4" /> },
    { name: "GitHub", val: "github.com/priyanshu-chand", href: "https://github.com/priyanshu-chand", icon: <GithubIcon className="w-4 h-4" /> },
    { name: "Resume", val: "View Resume", href: "/resume.pdf", icon: <FileText className="w-4 h-4" /> }
  ];

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="relative min-h-screen w-full py-24 bg-[#050505] overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute bottom-0 right-[20%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-blue-500 block mb-3">09 // Inquiry</span>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-white leading-none">Get In Touch</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left panel: Info Links */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full gap-8 text-left">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-6 uppercase leading-tight">
                Let's Build <span className="text-gradient-accent">Something Great</span> Together
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed font-light mb-8">
                Whether you have an interesting AI framework to engineer, a full-stack platform to construct, or just want to chat analytics and algorithms, feel free to reach out.
              </p>
            </div>

            {/* Structured Social List */}
            <div className="flex flex-col gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl glass-card group transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-blue-400 group-hover:text-white transition-colors duration-300">
                      {link.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-white/40 block leading-none mb-1">
                        {link.name}
                      </span>
                      <span className="text-xs font-semibold text-white/80 group-hover:text-blue-400 transition-colors duration-300">
                        {link.val}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Right panel: Glass Contact Form */}
          <div className="lg:col-span-7 w-full">
            <motion.div
              className="glass-card rounded-2xl p-6 md:p-10 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {isSubmitted ? (
                // Success screen
                <motion.div 
                  className="py-12 flex flex-col items-center justify-center text-center gap-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-2">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight">Message Dispatched!</h3>
                  <p className="text-xs sm:text-sm text-text-secondary max-w-sm font-light leading-relaxed">
                    Thank you for reaching out, Priyanshu. Your connection packet has been logged. I will respond to your endpoint shortly!
                  </p>
                  
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 text-xs uppercase tracking-wider font-semibold text-white/70 hover:text-white border border-white/10 bg-white/5 px-6 py-2.5 rounded-full transition-all duration-300 cursor-pointer interactive-hover"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                // Form layout
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
                  
                  {/* Name field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="font-mono text-[10px] uppercase tracking-wider text-white/50">
                      Name
                    </label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-blue-500/60 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors duration-300"
                    />
                    {errors.name && (
                      <span className="text-[10px] font-mono text-red-400 mt-1">{errors.name}</span>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-wider text-white/50">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-blue-500/60 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors duration-300"
                    />
                    {errors.email && (
                      <span className="text-[10px] font-mono text-red-400 mt-1">{errors.email}</span>
                    )}
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="font-mono text-[10px] uppercase tracking-wider text-white/50">
                      Message
                    </label>
                    <textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      placeholder="Draft your inquiry here..."
                      className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-blue-500/60 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none resize-none transition-colors duration-300"
                    />
                    {errors.message && (
                      <span className="text-[10px] font-mono text-red-400 mt-1">{errors.message}</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 flex items-center justify-center gap-2 py-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#050505] bg-white hover:bg-white/95 disabled:bg-white/45 transition-all duration-300 interactive-hover cursor-pointer font-sans"
                  >
                    {isSubmitting ? "Dispatching..." : (
                      <>
                        Dispatch Message <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                </form>
              )}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
