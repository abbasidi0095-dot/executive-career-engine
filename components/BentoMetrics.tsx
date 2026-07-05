"use client";

import { motion } from "motion/react";
import { Metric } from "@/lib/dbMock";
import { ChartLineUp, UsersThree, ShieldCheck, ArrowsClockwise } from "@phosphor-icons/react";

interface BentoMetricsProps {
  metrics: Metric[];
}

export default function BentoMetrics({ metrics }: BentoMetricsProps) {
  // Ensure we have exactly 3 metrics to maintain bento symmetry; if more/fewer, we handle fallbacks
  const safeMetrics = metrics.slice(0, 3);
  if (safeMetrics.length < 3) {
    // Fill up empty slots if needed to prevent empty bento tiles
    while (safeMetrics.length < 3) {
      safeMetrics.push({ value: "N/A", label: "Operational Benchmark Pending" });
    }
  }

  return (
    <section className="px-6 md:px-16 lg:px-24 py-24 max-w-7xl mx-auto w-full">
      <div className="mb-16 text-left border-l-2 border-accent pl-6">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent font-bold">
          Strategic Focus Indices
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-medium italic mt-2 text-foreground">
          Leadership Performance & Yield
        </h2>
        <p className="text-sm text-foreground/50 mt-1 font-mono">
          Verifiable quantitative corporate benchmarks
        </p>
      </div>

      {/* Asymmetric Bento Grid: Col 1-2 spans 2 columns, others span 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Landscape Tile (Spans 2 columns on desktop) - Displays the primary quantitative value and an elegant animated SVG line chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-2 p-8 md:p-10 premium-card bg-card-bg border border-card-border flex flex-col justify-between min-h-[340px] hover:border-accent/30 group"
        >
          {/* Top header */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-accent-muted border border-accent/20 text-accent">
                <ChartLineUp size={22} weight="fill" />
              </div>
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-foreground">Scale & Yield Growth</h4>
                <p className="text-[10px] text-foreground/40 font-mono mt-0.5">Metrics index // 01</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-[9px] font-mono uppercase text-accent font-bold px-2 py-0.5 rounded bg-accent-muted border border-accent/10">
              <ArrowsClockwise size={11} className="animate-spin" style={{ animationDuration: "3s" }} />
              Live Ledger Sync
            </div>
          </div>

          {/* Value and visual SVG chart */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 mt-6 items-center">
            {/* Value block */}
            <div className="sm:col-span-4 space-y-1.5">
              <h3 className="text-5xl sm:text-6xl font-bold font-mono text-foreground leading-none tracking-tight">
                {safeMetrics[0].value}
              </h3>
              <p className="text-sm text-foreground/75 font-medium leading-tight">
                {safeMetrics[0].label}
              </p>
            </div>

            {/* Simulated live SVG line graph plotted dynamically */}
            <div className="sm:col-span-8 h-[130px] w-full flex items-end relative overflow-hidden">
              <svg className="w-full h-[90%] overflow-visible text-accent" viewBox="0 0 300 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Area path */}
                <path
                  d="M0,100 C40,90 60,60 100,55 C140,50 160,25 200,22 C240,18 260,8 300,5 L300,100 Z"
                  fill="url(#chartGradient)"
                  className="transition-all duration-1000"
                />
                {/* Stroke path */}
                <path
                  d="M0,100 C40,90 60,60 100,55 C140,50 160,25 200,22 C240,18 260,8 300,5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="transition-all duration-1000 stroke-dasharray-[1000] stroke-dashoffset-[0]"
                />
                {/* Glowing focus points */}
                <circle cx="200" cy="22" r="5" fill="var(--background)" stroke="currentColor" strokeWidth="2.5" className="animate-pulse" />
                <circle cx="300" cy="5" r="5" fill="var(--background)" stroke="currentColor" strokeWidth="2.5" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Column Tile 1 (Spans 1 column) - Displays the second metric with elegant circular visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 premium-card bg-card-bg border border-card-border flex flex-col justify-between min-h-[340px] hover:border-accent/30 group"
        >
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-accent-muted border border-accent/20 text-accent">
                <UsersThree size={22} weight="fill" />
              </div>
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-foreground">Leadership Reach</h4>
                <p className="text-[10px] text-foreground/40 font-mono mt-0.5">Metrics index // 02</p>
              </div>
            </div>
          </div>

          {/* Metric Circular Visualization and Value */}
          <div className="space-y-6 mt-8">
            <div className="flex justify-between items-end">
              <div className="space-y-1.5">
                <h3 className="text-4xl sm:text-5xl font-bold font-mono text-foreground leading-none tracking-tight">
                  {safeMetrics[1].value}
                </h3>
                <p className="text-xs text-foreground/75 font-medium leading-tight max-w-[20ch]">
                  {safeMetrics[1].label}
                </p>
              </div>

              {/* Minimalist circular graph */}
              <div className="relative w-16 h-16 flex items-center justify-center text-accent">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="32" cy="32" r="26" stroke="var(--card-border)" strokeWidth="4.5" fill="none" />
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    stroke="currentColor"
                    strokeWidth="4.5"
                    fill="none"
                    strokeDasharray="163.3"
                    strokeDashoffset="40"
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <span className="absolute text-[9px] font-mono font-extrabold uppercase text-foreground/60">OK</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Column Tile 2 (Spans 1 column) - Displays the third metric with gorgeous list block status indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 premium-card bg-foreground text-background flex flex-col justify-between min-h-[340px] relative overflow-hidden group"
          style={{
            borderColor: "var(--card-border)",
          }}
        >
          {/* Subtle gold gradient glow in dark tile */}
          <div className="absolute right-0 top-0 w-36 h-32 rounded-full bg-accent/15 blur-[60px] pointer-events-none" />

          {/* Header */}
          <div className="flex justify-between items-start z-10">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-background/10 text-accent border border-background/15">
                <ShieldCheck size={22} weight="fill" />
              </div>
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-background/80">Sovereign Assurance</h4>
                <p className="text-[10px] text-background/40 font-mono mt-0.5">Metrics index // 03</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 mt-8 z-10">
            <div className="space-y-1.5">
              <h3 className="text-4xl sm:text-5xl font-bold font-mono text-accent leading-none tracking-tight">
                {safeMetrics[2].value}
              </h3>
              <p className="text-xs text-background/80 font-medium leading-tight max-w-[20ch]">
                {safeMetrics[2].label}
              </p>
            </div>

            {/* Beautiful, micro status row items */}
            <div className="space-y-2 pt-2 border-t border-background/10">
              <div className="flex justify-between items-center text-[10px] font-mono text-background/50">
                <span>Security attestation:</span>
                <span className="text-accent font-extrabold flex items-center gap-1">
                  PASSED
                </span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-background/50">
                <span>Infrastructure SLA:</span>
                <span className="text-background font-bold">99.999%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
