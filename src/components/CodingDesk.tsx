"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Terminal as TerminalIcon, FileCode, GitBranch, Play, RefreshCw, Layers } from "lucide-react";

export default function CodingDesk() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [activeTab, setActiveTab] = useState<"code" | "git" | "terminal">("code");

  // Code Tab Simulator states
  const [isPlaying, setIsPlaying] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [lossData, setLossData] = useState<number[]>([]);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Terminal Tab states
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "PC Workspace v1.0.2 - Interactive Core Shell",
    "Type 'help' to inspect available instructions.",
    ""
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottoms of consoles on updates
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [consoleOutput]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  // Code simulation function
  useEffect(() => {
    if (!isPlaying) return;

    let epoch = 1;
    let currentLoss = 0.85;
    let currentAcc = 0.52;
    
    setConsoleOutput(["[INFO] Initializing grid telemetry dataset...", "[INFO] Constructing diagnostic DNN classifier..."]);

    const timer = setInterval(() => {
      if (epoch > 15) {
        setConsoleOutput((prev) => [
          ...prev, 
          `[SUCCESS] Training finished!`,
          `[RESULT] Final Model Accuracy: 98.41%`,
          `[RESULT] Final Cross-Entropy Loss: ${currentLoss.toFixed(4)}`
        ]);
        setIsPlaying(false);
        clearInterval(timer);
        return;
      }

      currentLoss -= currentLoss * (0.15 + Math.random() * 0.1);
      currentAcc += (1 - currentAcc) * (0.15 + Math.random() * 0.1);
      
      setLossData((prev) => [...prev, currentLoss]);
      setConsoleOutput((prev) => [
        ...prev, 
        `Epoch ${epoch}/15 - loss: ${currentLoss.toFixed(4)} - acc: ${currentAcc.toFixed(4)}`
      ]);

      epoch++;
    }, 800);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleRunCode = () => {
    if (isPlaying) return;
    setLossData([]);
    setIsPlaying(true);
  };

  // Terminal commands handling
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    if (!command) return;

    let response: string[] = [];

    switch (command) {
      case "help":
        response = [
          "Available terminal instructions:",
          "  about      - Profile bio overview",
          "  skills     - Programming languages & architectures",
          "  projects   - Show engineering catalog",
          "  contact    - Email & LinkedIn social endpoints",
          "  clear      - Wipe terminal stack logs"
        ];
        break;
      case "about":
        response = [
          "Name: Priyanshu Chand",
          "B.Tech Computer Science student at DY Patil International University.",
          "Specializes in building AI, Deep Learning diagnostics, full-stack",
          "REST modules, and real-time IoT gateways."
        ];
        break;
      case "skills":
        response = [
          "Languages: Python, Java, JavaScript, C, SQL",
          "AI/ML:     Machine Learning, LangGraph, Qdrant, RAG, TensorFlow",
          "Web Stack: React, Next.js 15, Node.js, Tailwind CSS"
        ];
        break;
      case "projects":
        response = [
          "1. LT Line Fault Detection System - IoT grid diagnostic AI",
          "2. AI Plant Disease Classifier   - CNN crop remediation model",
          "3. Multi-Agent Stock Analyst     - LangGraph cooperative charts assistant",
          "4. RAG Chatbot                   - Semantic document embeddings Q&A"
        ];
        break;
      case "contact":
        response = [
          "Connect directly at:",
          "  Email:    priyanshuchand101@gmail.com",
          "  GitHub:   https://github.com/priyanshu-chand",
          "  LinkedIn: https://linkedin.com/in/priyanshu-chand-283163271"
        ];
        break;
      case "clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;
      default:
        response = [
          `Command not found: '${command}'`,
          "Type 'help' to review list of active terminal instructions."
        ];
    }

    setTerminalHistory((prev) => [...prev, `pc-workspace $ ${terminalInput}`, ...response, ""]);
    setTerminalInput("");
  };

  const codeSnippet = `import tensorflow as tf
from model import DiagnosticDNN
from data import load_telemetry

# 1. Load IoT grid sensors dataset
X_train, y_train = load_telemetry(grid_frequency="100Hz")

# 2. Build deep neural classifier
model = DiagnosticDNN(layers=[64, 32, 16])
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy')

# 3. Fit network nodes
model.fit(X_train, y_train, epochs=15, batch_size=32)`;

  return (
    <section 
      id="workspace"
      ref={containerRef}
      className="relative min-h-screen w-full py-24 bg-[#0A0A0C]/40 overflow-hidden border-b border-white/5"
    >
      <div className="absolute top-[30%] left-[20%] w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-blue-500 block mb-3">06 // Environment</span>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-white leading-none">Workspace Console</h2>
        </div>

        {/* IDE Simulator Layout */}
        <motion.div 
          className="w-full rounded-2xl border border-white/10 bg-[#050505] shadow-2xl flex flex-col overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header OS Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#0A0A0C] border-b border-white/5">
            
            {/* Window control buttons */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/40" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/40" />
              <span className="w-3 h-3 rounded-full bg-green-500/40" />
            </div>

            {/* Folder Name tab */}
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">
              workspace_core_v1 // priyanshu
            </span>

            {/* Empty space */}
            <div className="w-[36px]" />
          </div>

          {/* Editor Workspace tab-bar */}
          <div className="flex flex-wrap items-center bg-[#070709] border-b border-white/5">
            <button
              onClick={() => setActiveTab("code")}
              className={`flex items-center gap-2 px-6 py-3 text-xs font-mono border-r border-white/5 transition-all cursor-pointer ${
                activeTab === "code" ? "bg-[#050505] text-blue-400 border-t-2 border-t-blue-500 font-bold" : "text-white/45 hover:bg-white/2"
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>main.py</span>
            </button>
            <button
              onClick={() => setActiveTab("git")}
              className={`flex items-center gap-2 px-6 py-3 text-xs font-mono border-r border-white/5 transition-all cursor-pointer ${
                activeTab === "git" ? "bg-[#050505] text-cyan-400 border-t-2 border-t-cyan-500 font-bold" : "text-white/45 hover:bg-white/2"
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>git_history</span>
            </button>
            <button
              onClick={() => setActiveTab("terminal")}
              className={`flex items-center gap-2 px-6 py-3 text-xs font-mono border-r border-white/5 transition-all cursor-pointer ${
                activeTab === "terminal" ? "bg-[#050505] text-purple-400 border-t-2 border-t-purple-500 font-bold" : "text-white/45 hover:bg-white/2"
              }`}
            >
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>terminal_shell</span>
            </button>
          </div>

          {/* Tab Content Areas */}
          <div className="h-[400px] flex flex-col md:flex-row relative">
            
            {/* Left: Tab Specific Views */}
            <div className="flex-1 p-6 font-mono text-xs overflow-y-auto border-r border-white/5 bg-[#050505]">
              
              {/* TAB 1: main.py code window */}
              {activeTab === "code" && (
                <div className="flex flex-col gap-6 h-full">
                  <div className="flex-1 select-none">
                    <pre className="text-white/70 leading-relaxed overflow-x-auto whitespace-pre">
                      {codeSnippet}
                    </pre>
                  </div>
                  
                  {/* Action panel */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-4 bg-[#050505]">
                    <span className="text-[10px] text-white/40 font-mono uppercase">Status: script loaded</span>
                    <button 
                      onClick={handleRunCode}
                      disabled={isPlaying}
                      className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-[#050505] bg-white hover:bg-white/95 disabled:bg-white/45 disabled:text-[#050505]/60 transition-all duration-300 interactive-hover cursor-pointer"
                    >
                      {isPlaying ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Training...
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" /> Compile & Run
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: git logs history window */}
              {activeTab === "git" && (
                <div className="flex flex-col gap-4 text-white/60">
                  <div>
                    <span className="text-emerald-400 font-semibold">[commit 2038ef]</span>
                    <span className="text-white/30 text-[10px] ml-2">2026-07-15 18:00</span>
                    <p className="text-white mt-1">feat: structure LangGraph cooperative state-machines nodes</p>
                  </div>
                  <div>
                    <span className="text-cyan-400 font-semibold">[commit 5e09f2]</span>
                    <span className="text-white/30 text-[10px] ml-2">2026-07-14 11:20</span>
                    <p className="text-white mt-1">optimize: embed custom hardware telemetry hooks to edge networks</p>
                  </div>
                  <div>
                    <span className="text-purple-400 font-semibold">[commit a8d93c]</span>
                    <span className="text-white/30 text-[10px] ml-2">2026-07-10 15:45</span>
                    <p className="text-white mt-1">docs: finalize plant-disease image prediction markdown structure</p>
                  </div>
                  <div>
                    <span className="text-blue-400 font-semibold">[commit fd910e]</span>
                    <span className="text-white/30 text-[10px] ml-2">2026-07-08 09:12</span>
                    <p className="text-white mt-1">refactor: integrate banking transaction modules inside Jodetx repository</p>
                  </div>
                  <span className="text-[10px] text-white/30 uppercase mt-4">--- End of Repository branch logs ---</span>
                </div>
              )}

              {/* TAB 3: Interactive terminal window */}
              {activeTab === "terminal" && (
                <div className="h-full flex flex-col justify-between">
                  <div className="flex-1 overflow-y-auto mb-4 flex flex-col gap-1 text-white/80">
                    {terminalHistory.map((line, idx) => (
                      <p key={idx} className={line.startsWith("pc-workspace") ? "text-cyan-400" : "text-white/70"}>
                        {line}
                      </p>
                    ))}
                    <div ref={terminalEndRef} />
                  </div>

                  {/* Input form */}
                  <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 border-t border-white/5 pt-3">
                    <span className="text-cyan-400 font-bold shrink-0">pc-workspace $</span>
                    <input 
                      type="text" 
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      placeholder="Type 'help'..."
                      className="flex-1 bg-transparent text-white border-none outline-none font-mono text-xs focus:ring-0"
                    />
                  </form>
                </div>
              )}

            </div>

            {/* Right: Console outputs / Simulation visual charts */}
            <div className="w-full md:w-[35%] h-[200px] md:h-full p-6 font-mono text-[10px] bg-[#070709] overflow-y-auto flex flex-col justify-between border-t md:border-t-0 border-white/5">
              {activeTab === "code" ? (
                <div className="flex flex-col h-full justify-between gap-4">
                  {/* Console logs */}
                  <div className="flex-1 overflow-y-auto text-white/55 flex flex-col gap-1.5 max-h-[220px]">
                    <span className="text-cyan-400 uppercase tracking-widest text-[9px] block mb-2 font-bold">// Console Telemetry</span>
                    {consoleOutput.length === 0 ? (
                      <span className="text-white/30 italic">Click compile & run to invoke diagnostics...</span>
                    ) : (
                      consoleOutput.map((out, idx) => (
                        <p key={idx} className={out.startsWith("[SUCCESS]") ? "text-emerald-400" : out.startsWith("[RESULT]") ? "text-cyan-300" : ""}>
                          {out}
                        </p>
                      ))
                    )}
                    <div ref={consoleEndRef} />
                  </div>

                  {/* Loss plotting chart (simulated vector bar visualizer) */}
                  {lossData.length > 0 && (
                    <div className="border-t border-white/5 pt-3">
                      <span className="text-purple-400 uppercase tracking-widest text-[9px] block mb-1 font-bold">// Training Loss Curve</span>
                      <div className="flex items-end gap-1.5 h-12 pt-2">
                        {lossData.map((loss, idx) => {
                          const height = Math.min(100, (loss / 0.85) * 100);
                          return (
                            <div 
                              key={idx} 
                              className="flex-1 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-sm" 
                              style={{ height: `${height}%` }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-4 text-white/45">
                  <div className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-white uppercase text-[9px] font-bold tracking-widest">Environment Variables</span>
                  </div>
                  <div className="flex flex-col gap-1 bg-[#050505] p-3 rounded-lg border border-white/5">
                    <p>NODE_ENV = production</p>
                    <p>PORT = 3000</p>
                    <p>HOST = 0.0.0.0</p>
                    <p>MODEL_URL = /api/v1/faults</p>
                    <p>QDRANT_HOST = localhost:6333</p>
                  </div>
                  <span className="text-[9px] italic">Active compiler environment loaded successfully with standard dynamic allocations.</span>
                </div>
              )}
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
