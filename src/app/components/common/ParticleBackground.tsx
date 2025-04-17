// src/app/components/ui/ParticleBackground.tsx
"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  shape: "leaf";
  rotation: number;
  rotationSpeed: number;
  sway: number;
  swaySpeed: number;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Colors close to #8BC34A (light green)
    const colors = [
      "#8BC34A", // base light green
      "#9CCC65", // slightly lighter
      "#7CB342", // slightly darker
      "#AED581", // even lighter
      "#A4D156", // brighter variant
    ];

    // Wind direction - positive X means wind blowing to the right
    const windDirection = { x: 1.2, y: 0.3 };

    // Slow down the animation
    const animationSpeed = 0.005;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles.current = [];
      // Reduced quantity for better performance but still visible
      const particleCount = Math.floor((canvas.width * canvas.height) / 40000);

      // Create a grid-like distribution to ensure even coverage
      const gridCols = Math.ceil(Math.sqrt(particleCount));
      const gridRows = Math.ceil(particleCount / gridCols);

      const cellWidth = canvas.width / gridCols;
      const cellHeight = canvas.height / gridRows;

      let count = 0;

      // Distribute particles in a grid with some randomness
      for (let row = 0; row < gridRows && count < particleCount; row++) {
        for (let col = 0; col < gridCols && count < particleCount; col++) {
          // Position within cell with some random offset
          const x = col * cellWidth + Math.random() * cellWidth;
          const y = row * cellHeight + Math.random() * cellHeight;

          // Base speed influenced by wind direction
          const baseSpeedX = Math.random() * 0.3 + windDirection.x * 0.5;
          const baseSpeedY = Math.random() * 0.2 + windDirection.y * 0.5;

          particles.current.push({
            x,
            y,
            size: Math.random() * 9 + 5,
            speedX: baseSpeedX * (0.8 + Math.random() * 0.4),
            speedY: baseSpeedY * (0.8 + Math.random() * 0.4),
            opacity: Math.random() * 0.5 + 0.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            shape: "leaf",
            rotation:
              Math.atan2(windDirection.y, windDirection.x) +
              ((Math.random() * Math.PI) / 2 - Math.PI / 4),
            rotationSpeed: (Math.random() * 0.02 - 0.01) * 2,
            sway: 0,
            swaySpeed: Math.random() * 0.01 + 0.005,
          });

          count++;
        }
      }
    };

    const drawLeaf = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Draw leaf
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size, -size / 2, size, size / 2, 0, size * 1.5);
      ctx.bezierCurveTo(-size, size / 2, -size, -size / 2, 0, -size);
      ctx.fillStyle = color;
      ctx.fill();

      // Draw leaf vein
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(0, size * 1.5);
      ctx.strokeStyle = `rgba(255, 255, 255, 0.5)`;
      ctx.lineWidth = size / 5;
      ctx.stroke();

      ctx.restore();
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      timeRef.current += animationSpeed;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create warm, sunny gradient for farm market feel
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(135, 206, 235, 0.2)"); // Light sky blue
      gradient.addColorStop(0.7, "rgba(253, 235, 208, 0.2)"); // Warm sunlight
      gradient.addColorStop(1, "rgba(76, 175, 80, 0.1)"); // Fresh grass green
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((particle) => {
        // Update sway motion for natural movement - reduced amplitude
        particle.sway = Math.sin(timeRef.current * particle.swaySpeed) * 0.6;

        drawLeaf(
          ctx,
          particle.x,
          particle.y,
          particle.size,
          particle.rotation,
          particle.color,
        );

        // Add swaying motion and natural updates
        particle.x += particle.speedX + particle.sway * 0.5;
        particle.y += particle.speedY + particle.sway * 0.2;
        particle.rotation += particle.rotationSpeed;

        // Wrap around bounds with wider margins
        if (particle.x < -particle.size * 5) {
          particle.x = canvas.width + particle.size * 5;
        } else if (particle.x > canvas.width + particle.size * 5) {
          particle.x = -particle.size * 5;
        }

        if (particle.y < -particle.size * 5) {
          particle.y = canvas.height + particle.size * 5;
        } else if (particle.y > canvas.height + particle.size * 5) {
          particle.y = -particle.size * 5;
        }
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.65 0.21 148) 0%, #5b8c56 100%)",
      }}
    />
  );
};

export default ParticleBackground;
