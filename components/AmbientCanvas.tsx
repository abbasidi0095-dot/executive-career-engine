"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

export default function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduceMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse position with easing
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Beautiful luminous organic gradient blobs
    class LightBlob {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
      baseSpeed: number;

      constructor(x: number, y: number, radius: number, color: string) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.baseSpeed = Math.random() * 0.02 + 0.01;
      }

      update(tick: number) {
        // Slowly drift
        this.x += this.vx;
        this.y += this.vy;

        // Bounce back from boundaries
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Subtle mouse pull / gravity
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 600) {
          const force = (600 - dist) / 600;
          this.x += (dx / dist) * force * 0.35;
          this.y += (dy / dist) * force * 0.35;
        }

        // Breathe the radius slowly
        this.radius = this.radius + Math.sin(tick * this.baseSpeed) * 0.12;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalCompositeOperation = "screen";

        // Create elegant multi-stop radial gradient for refraction effect
        const grad = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          Math.max(10, this.radius)
        );
        grad.addColorStop(0, this.color);
        grad.addColorStop(0.3, this.color.replace("0.1", "0.05"));
        grad.addColorStop(0.7, this.color.replace("0.1", "0.01"));
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Colors aligned with our gold / royal indigo variables
    const blobs = [
      new LightBlob(width * 0.2, height * 0.3, 300, "rgba(37, 99, 235, 0.12)"), // Indigo
      new LightBlob(width * 0.8, height * 0.2, 350, "rgba(234, 179, 8, 0.08)"),  // Gold
      new LightBlob(width * 0.5, height * 0.7, 400, "rgba(37, 99, 235, 0.08)"), // Indigo secondary
    ];

    let tick = 0;

    const render = () => {
      tick++;

      // Smooth mouse easing (linear interpolation)
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Render drifting ambient blobs
      blobs.forEach((blob) => {
        blob.update(tick);
        blob.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-transparent transition-opacity duration-1000"
    />
  );
}
