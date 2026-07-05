"use client";

import { motion } from "motion/react";
import { Metric } from "@/lib/dbMock";
import { ChartLine, Users, HardDrives, GraduationCap } from "@phosphor-icons/react";

interface BentoMetricsProps {
  metrics: Metric[];
}

export default function BentoMetrics({ metrics }: BentoMetricsProps) {
  // Map index to elegant icons
  const getIcon = (index: number) => {
    switch (index % 4) {
      case 0: return <ChartLine size={24} className="text-accent" />;
      case 1: return <Users size={24} className="text-accent" />;
      case 2: return <HardDrives size={24} className="text-accent" />;
      default: return <GraduationCap size={24} className="text-accent" />;
    }
  };

  return (
    <section className="px-6 md:px-16 lg:px-24 py-16 max-w-7xl mx-auto w-full">
      <div className="mb-12">
        <h2 className="text-2xl font-serif italic text-accent">Strategic Impact Summary</h2>
        <p className="text-sm text-foreground/50 uppercase tracking-[0.15em] mt-1 font-mono">
          Quantifiable leadership benchmarks
        </p>
      </div>

      {/* Grid - 3 items get an asymmetric 3-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, i) => {
          // Add visual background diversity to cards
          // Card 0: Accent background tint
          // Card 1: Minimal with card borders
          // Card 2: Deep slate gradient card (even in light theme)
          const isSpecial = i % 3 === 2;
          const isAccent = i % 3 === 0;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative overflow-hidden p-8 rounded-2xl flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                isSpecial
                  ? "bg-foreground text-background"
                  : isAccent
                  ? "bg-accent-muted border border-accent/20"
                  : "bg-card-bg border border-card-border"
              }`}
            >
              {/* Decorative Subtle Background Graphics */}
              {isSpecial && (
                <div className="absolute right-0 bottom-0 w-32 h-32 rounded-full bg-accent/20 blur-[50px] pointer-events-none" />
              )}

              {/* Card Top: Icon & Category Indicator */}
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-lg ${isSpecial ? "bg-background/10 text-accent" : "bg-card-bg"}`}>
                  {getIcon(i)}
                </div>
                <span className={`text-[10px] uppercase font-mono tracking-widest ${isSpecial ? "text-background/50" : "text-foreground/40"}`}>
                  Metric // {`0${i + 1}`}
                </span>
              </div>

              {/* Card Bottom: Value & Explainer */}
              <div className="mt-8 space-y-2">
                <h3 className={`text-4xl sm:text-5xl font-bold tracking-tight font-mono leading-none ${isSpecial ? "text-accent" : "text-foreground"}`}>
                  {metric.value}
                </h3>
                <p className={`text-sm font-medium ${isSpecial ? "text-background/80" : "text-foreground/70"}`}>
                  {metric.label}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
