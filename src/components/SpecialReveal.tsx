"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Cpu, Wifi, Cloud, BrainCircuit, Activity, Zap } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

export default function SpecialReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll details for intermediate animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const [activeStep, setActiveStep] = useState(0);

  // Update step status based on scroll percentages
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      if (latest < 0.2) {
        setActiveStep(0); // Intro
      } else if (latest < 0.45) {
        setActiveStep(1); // Sensors & Embedded
      } else if (latest < 0.7) {
        setActiveStep(2); // IoT & Transmission
      } else if (latest < 0.9) {
        setActiveStep(3); // Cloud Telemetry
      } else {
        setActiveStep(4); // AI Classification
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const steps = [
    {
      title: "LT Line Fault Detection System",
      tagline: "Overview",
      icon: <Zap className="w-5 h-5" />,
      description: "An Apple-level product showcase for a deep learning IoT telemetry architecture that monitors, identifies, and localizes electrical transmission line hazards in real time.",
      detail: "DY Patil Fyrst Challenge Winner. Combining hardware edge computing with AI diagnostic neural nets to protect power grids."
    },
    {
      title: "Sensors & Embedded Hardware",
      tagline: "Physical Layer",
      icon: <Cpu className="w-5 h-5" />,
      description: "Edge computation begins directly on physical lines using current and voltage transformer sensor arrays.",
      detail: portfolioData.specialProject.architecture.sensors
    },
    {
      title: "IoT Gateway & Transmission",
      tagline: "Network Layer",
      icon: <Wifi className="w-5 h-5" />,
      description: "Telemetry nodes push compressed, high-frequency wave records to local gateways using LoRaWAN protocols.",
      detail: portfolioData.specialProject.architecture.iot
    },
    {
      title: "High-Performance Cloud Core",
      tagline: "Storage Layer",
      icon: <Cloud className="w-5 h-5" />,
      description: "A centralized timeseries database logs anomaly vectors, making them accessible to live admin dashboards.",
      detail: portfolioData.specialProject.architecture.cloud
    },
    {
      title: "Deep Learning Prediction Model",
      tagline: "Intelligence Layer",
      icon: <BrainCircuit className="w-5 h-5" />,
      description: "Neural networks process wave shapes to pinpoint exact fault types (Line-to-Ground, Line-to-Line, open circuit) instantly.",
      detail: portfolioData.specialProject.architecture.prediction
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-[300vh] w-full bg-[#050505] border-b border-white/5"
    >
      {/* Sticky viewport frame */}
      <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden">
        
        {/* Abstract Cyber Grid Background */}
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        
        {/* Ambient Radial Lights */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] top-1/4 left-1/4 pointer-events-none" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] bottom-1/4 right-1/4 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left panel: Info Panel */}
          <div className="lg:col-span-5 z-10 flex flex-col gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 block mb-3">
                03 // Product Deep-dive
              </span>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-white leading-none">
                LT LINE GRID
              </h2>
              <span className="text-xs font-mono uppercase text-white/40 tracking-wider">Scroll-driven schematic reveal</span>
            </div>

            {/* Stepper indicators */}
            <div className="flex flex-col gap-2.5 my-4 border-l border-white/5 pl-4">
              {steps.map((step, idx) => (
                <div 
                  key={step.tagline}
                  className={`text-[10px] font-mono uppercase tracking-widest transition-all duration-300 ${
                    idx === activeStep 
                      ? "text-blue-400 translate-x-1.5 font-bold" 
                      : "text-white/45 hover:text-white/70"
                  }`}
                >
                  0{idx + 1}. {step.tagline}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="min-h-[180px] flex flex-col justify-start">
              <div className="flex items-center gap-3 mb-3.5 text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-xl w-fit">
                {steps[activeStep].icon}
                <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">
                  {steps[activeStep].tagline}
                </span>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                {steps[activeStep].title}
              </h3>
              
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-light mb-4">
                {steps[activeStep].description}
              </p>
              
              <p className="text-xs text-text-muted italic border-l border-cyan-400/30 pl-3 leading-relaxed">
                {steps[activeStep].detail}
              </p>
            </div>
          </div>

          {/* Right panel: Live Interactive SVG Architecture Diagram */}
          <div className="lg:col-span-7 h-[45vh] lg:h-[60vh] w-full glass-card rounded-3xl relative overflow-hidden flex items-center justify-center p-6 md:p-12">
            
            {/* Holographic scanner effect */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-pulse pointer-events-none" />

            {/* High Tech HUD Grid Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.03),transparent_60%)] pointer-events-none" />

            {/* SVG Visualizer */}
            <svg 
              viewBox="0 0 600 400" 
              className="w-full h-full text-white/20 select-none stroke-linecap-round"
            >
              {/* Reference Grid lines */}
              <line x1="50" y1="200" x2="550" y2="200" stroke="rgba(255,255,255,0.05)" strokeDasharray="5,5" />
              <line x1="300" y1="50" x2="300" y2="350" stroke="rgba(255,255,255,0.05)" strokeDasharray="5,5" />

              {/* Power Lines Grid */}
              <g className="transition-all duration-700">
                <line 
                  x1="80" y1="120" x2="520" y2="120" 
                  stroke={activeStep >= 1 ? "rgba(59, 130, 246, 0.4)" : "rgba(255,255,255,0.05)"} 
                  strokeWidth="2" 
                />
                <line 
                  x1="80" y1="150" x2="520" y2="150" 
                  stroke={activeStep >= 1 ? "rgba(59, 130, 246, 0.4)" : "rgba(255,255,255,0.05)"} 
                  strokeWidth="2" 
                />
                <line 
                  x1="80" y1="180" x2="520" y2="180" 
                  stroke={activeStep >= 1 ? "rgba(59, 130, 246, 0.4)" : "rgba(255,255,255,0.05)"} 
                  strokeWidth="2" 
                />
              </g>

              {/* Transmission Tower left */}
              <path d="M 120,240 L 150,100 L 180,240 M 110,120 L 190,120 M 130,160 L 170,160 M 150,100 L 150,240" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
              {/* Transmission Tower right */}
              <path d="M 420,240 L 450,100 L 480,240 M 410,120 L 490,120 M 430,160 L 470,160 M 450,100 L 450,240" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

              {/* Step 1: ESP32 Hardware Edge Module */}
              <g className={`transition-all duration-500 ${activeStep >= 1 ? "opacity-100 translate-y-0" : "opacity-20 translate-y-4"}`}>
                {/* Glowing target crosshair */}
                <circle cx="150" cy="120" r="14" fill="none" stroke="#3B82F6" strokeWidth="1.5" className={activeStep === 1 ? "animate-pulse" : ""} />
                <rect x="135" y="65" width="30" height="20" rx="3" fill="#0A0A0C" stroke="#3B82F6" strokeWidth="1.5" />
                <text x="150" y="77" fill="#3B82F6" fontSize="8" textAnchor="middle" fontFamily="monospace">ESP32</text>
              </g>

              {/* Step 2: IoT Wireless Hub Gateway */}
              <g className={`transition-all duration-500 ${activeStep >= 2 ? "opacity-100" : "opacity-15"}`}>
                <circle cx="300" cy="150" r="24" fill="#0A0A0C" stroke="#00D4FF" strokeWidth="1.5" />
                <path d="M 292,150 L 308,150 M 300,142 L 300,158" stroke="#00D4FF" strokeWidth="1.5" />
                <text x="300" y="190" fill="#00D4FF" fontSize="9" textAnchor="middle" fontFamily="monospace">GATEWAY</text>
                
                {/* Animated waves from ESP32 to Gateway */}
                {activeStep >= 2 && (
                  <path 
                    d="M 165,75 Q 230,110 280,140" 
                    fill="none" 
                    stroke="#00D4FF" 
                    strokeWidth="1" 
                    strokeDasharray="4,4" 
                    className="animate-[dash_2s_linear_infinite]"
                  />
                )}
              </g>

              {/* Step 3: MySQL & Vector Cloud Storage */}
              <g className={`transition-all duration-500 ${activeStep >= 3 ? "opacity-100 translate-x-0" : "opacity-15 translate-x-10"}`}>
                <rect x="420" y="270" width="60" height="50" rx="6" fill="#0A0A0C" stroke="#a855f7" strokeWidth="1.5" />
                <line x1="420" y1="286" x2="480" y2="286" stroke="#a855f7" strokeWidth="1" />
                <line x1="420" y1="302" x2="480" y2="302" stroke="#a855f7" strokeWidth="1" />
                <text x="450" y="281" fill="#a855f7" fontSize="8" textAnchor="middle" fontFamily="monospace">QDRANT</text>
                <text x="450" y="297" fill="#a855f7" fontSize="7" textAnchor="middle" fontFamily="monospace">VECTOR INDEX</text>
                <text x="450" y="313" fill="#a855f7" fontSize="7" textAnchor="middle" fontFamily="monospace">MYSQL TS</text>

                {/* Arrow from Gateway to Cloud */}
                {activeStep >= 3 && (
                  <path 
                    d="M 324,150 Q 380,180 430,270" 
                    fill="none" 
                    stroke="#a855f7" 
                    strokeWidth="1" 
                    strokeDasharray="4,4"
                  />
                )}
              </g>

              {/* Step 4: AI Prediction Diagnostic Inference */}
              <g className={`transition-all duration-500 ${activeStep >= 4 ? "opacity-100 scale-100" : "opacity-15 scale-90"}`}>
                <circle cx="150" cy="290" r="30" fill="#0A0A0C" stroke="#22C55E" strokeWidth="2" />
                
                {/* Neural net nodes icon */}
                <circle cx="138" cy="280" r="3" fill="#22C55E" />
                <circle cx="138" cy="300" r="3" fill="#22C55E" />
                <circle cx="162" cy="275" r="3" fill="#22C55E" />
                <circle cx="162" cy="290" r="3" fill="#22C55E" />
                <circle cx="162" cy="305" r="3" fill="#22C55E" />
                <line x1="138" y1="280" x2="162" y2="275" stroke="rgba(34,197,94,0.4)" strokeWidth="0.6" />
                <line x1="138" y1="280" x2="162" y2="290" stroke="rgba(34,197,94,0.4)" strokeWidth="0.6" />
                <line x1="138" y1="300" x2="162" y2="290" stroke="rgba(34,197,94,0.4)" strokeWidth="0.6" />
                <line x1="138" y1="300" x2="162" y2="305" stroke="rgba(34,197,94,0.4)" strokeWidth="0.6" />

                <text x="150" y="338" fill="#22C55E" fontSize="9" textAnchor="middle" fontFamily="monospace">DNN CLASSIFIER</text>
                <text x="150" y="348" fill="#22C55E" fontSize="7" textAnchor="middle" fontFamily="monospace">98.4% ACCURACY</text>

                {/* Arrow from Cloud to AI model */}
                {activeStep >= 4 && (
                  <path 
                    d="M 420,295 L 180,290" 
                    fill="none" 
                    stroke="#22C55E" 
                    strokeWidth="1.5" 
                    strokeDasharray="5,5" 
                    className="animate-[dash_1.5s_linear_infinite_reverse]"
                  />
                )}
              </g>
            </svg>

            {/* Glowing HUD footer inside visualizer */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[9px] font-mono text-white/30 uppercase">
              <span className="flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-blue-500 animate-pulse" /> Status: active diagnostics
              </span>
              <span>model_version: ML_LT_V2.1</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
