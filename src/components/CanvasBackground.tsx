"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulseSpeed: number;
  pulseOffset: number;
  opacity: number;
}

interface FloatingText {
  text: string;
  x: number;
  y: number;
  vy: number;
  opacity: number;
  fontSize: number;
}

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Grid details
    const gridSpacing = 45;
    
    // Neural network nodes
    const nodes: Node[] = [];
    const nodeCount = Math.min(60, Math.floor((width * height) / 25000));
    
    // Floating AI snippets
    const floatingTexts: FloatingText[] = [];
    const codeTokens = [
      "neural_net.fit()", "epochs=100", "loss: 0.024", "import tensorflow",
      "import torch", "optimizer.step()", "qdrant.upsert()", "langgraph.compile()",
      "const user = new FullStackDeveloper()", "model.predict()", "REST_API_v1.0",
      "agent.invoke()", "pip install pandas", "RAG_Vector_Search", "B.Tech CS"
    ];

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseOffset: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.4 + 0.2,
      });
    }

    // Function to spawn floating code snippets
    const spawnText = () => {
      if (floatingTexts.length > 8) return;
      const text = codeTokens[Math.floor(Math.random() * codeTokens.length)];
      floatingTexts.push({
        text,
        x: Math.random() * width,
        y: height + 10,
        vy: -(0.3 + Math.random() * 0.5),
        opacity: 0,
        fontSize: Math.floor(Math.random() * 3) + 10, // 10px to 12px
      });
    };

    const textSpawnerInterval = setInterval(spawnText, 3500);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;

    // Drawing loop
    const render = () => {
      time += 0.005;
      
      // Clear canvas
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      // 1. Draw coordinate engineering grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
      ctx.lineWidth = 1;
      
      // Vertical grid lines
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      // Horizontal grid lines
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw active cursor glow
      if (mouseRef.current.active) {
        const gradient = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          150
        );
        gradient.addColorStop(0, "rgba(59, 130, 246, 0.05)");
        gradient.addColorStop(1, "rgba(59, 130, 246, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 150, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw floating code text snippets
      ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
      ctx.font = "normal 10px monospace";
      for (let i = floatingTexts.length - 1; i >= 0; i--) {
        const ft = floatingTexts[i];
        ft.y += ft.vy;
        
        // Fade in when bottom, fade out near top
        if (ft.y > height - 100 && ft.opacity < 0.25) {
          ft.opacity += 0.005;
        } else if (ft.y < 150) {
          ft.opacity -= 0.005;
        } else {
          ft.opacity = 0.25;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, ft.opacity)})`;
        ctx.font = `normal ${ft.fontSize}px monospace`;
        ctx.fillText(ft.text, ft.x, ft.y);

        // Delete text if out of screen or invisible
        if (ft.y < -20 || ft.opacity <= 0) {
          floatingTexts.splice(i, 1);
        }
      }

      // 3. Update & Draw neural connection network
      const maxDistance = 110;
      
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Particle physics & border wrapping
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;

        // Magnet attraction to mouse
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - node.x;
          const dy = mouseRef.current.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 180) {
            const force = (180 - dist) / 180;
            node.x += (dx / dist) * force * 0.6;
            node.y += (dy / dist) * force * 0.6;
          }
        }

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.08;
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        // Draw individual nodes
        const pulse = Math.sin(time * 30 + node.pulseOffset) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(255, 255, 255, ${node.opacity * pulse})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Small blue core on hover/proximity
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - node.x;
          const dy = mouseRef.current.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.fillStyle = "rgba(0, 212, 255, 0.4)";
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      clearInterval(textSpawnerInterval);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
}
