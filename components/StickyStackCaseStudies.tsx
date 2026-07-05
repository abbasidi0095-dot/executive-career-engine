"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { CaseStudy } from "@/lib/dbMock";
import { Target, Lightbulb, Trophy, ShareNetwork, CloudArrowUp } from "@phosphor-icons/react";

// Register ScrollTrigger and useGSAP
gsap.registerPlugin(ScrollTrigger, useGSAP);

interface StickyStackCaseStudiesProps {
  caseStudies: CaseStudy[];
}

export default function StickyStackCaseStudies({ caseStudies }: StickyStackCaseStudiesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(() => {
    // Mobile and reduced motion checks
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    if (reduceMotion || isMobile || !containerRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>(".case-card");
    
    // Smooth sticky-stack pinning
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;

      ScrollTrigger.create({
        trigger: card,
        start: "top 12%", // slight header offset
        endTrigger: cards[cards.length - 1] as HTMLElement,
        end: "top 12%",
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });

      // Scale and opacity scroll animation
      gsap.to(card, {
        scale: 0.94 - (cards.length - i - 1) * 0.015,
        opacity: 0.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: cards[i + 1] as HTMLElement,
          start: "top 80%",
          end: "top 16%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    });
  }, { scope: containerRef });

  // Custom high-fidelity SVG Architecture Blueprints for our pre-loaded projects
  const renderArchitectureBlueprint = (id: string, index: number) => {
    const isDarkThemeCard = index % 2 === 1;
    const strokeColor = isDarkThemeCard ? "rgba(250, 248, 245, 0.2)" : "rgba(20, 20, 22, 0.15)";
    const textColor = isDarkThemeCard ? "rgba(250, 248, 245, 0.45)" : "rgba(20, 20, 22, 0.45)";

    if (id === "project-alpha") {
      // Enterprise LLM Layers Diagram
      return (
        <svg className="w-full h-full text-accent" viewBox="0 0 340 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="80" height="40" rx="6" stroke={strokeColor} strokeWidth="1.5" />
          <text x="50" y="34" textAnchor="middle" fill="currentColor" className="font-mono text-[9px] font-bold">API GATEWAY</text>
          
          <rect x="130" y="10" width="80" height="40" rx="6" stroke={strokeColor} strokeWidth="1.5" />
          <text x="170" y="34" textAnchor="middle" fill="currentColor" className="font-mono text-[9px] font-bold">REDIS QUEUE</text>

          <rect x="250" y="10" width="80" height="40" rx="6" stroke={strokeColor} strokeWidth="1.5" fill="var(--accent-muted)" />
          <text x="290" y="34" textAnchor="middle" fill="currentColor" className="font-mono text-[9px] font-bold">GPU INFERENCE</text>

          <path d="M90 30 H130" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="4" />
          <path d="M210 30 H250" stroke="currentColor" strokeWidth="1.5" className="animate-pulse" />
          
          <path d="M170 50 V110" stroke={strokeColor} strokeWidth="1.5" />
          
          <rect x="130" y="110" width="80" height="40" rx="6" stroke={strokeColor} strokeWidth="1.5" />
          <text x="170" y="134" textAnchor="middle" fill={textColor} className="font-mono text-[8px]">LOG METRICS</text>
        </svg>
      );
    }

    if (id === "project-beta") {
      // Payout routing diagram
      return (
        <svg className="w-full h-full text-accent" viewBox="0 0 340 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="60" width="80" height="40" rx="6" stroke={strokeColor} strokeWidth="1.5" />
          <text x="50" y="84" textAnchor="middle" fill="currentColor" className="font-mono text-[9px] font-bold">WEBHOOK API</text>

          <path d="M90 80 H140" stroke="currentColor" strokeWidth="1.5" />

          <circle cx="150" cy="80" r="10" stroke={strokeColor} strokeWidth="1.5" fill="var(--accent-muted)" />
          <text x="150" y="83" textAnchor="middle" fill="currentColor" className="font-mono text-[9px] font-bold">⚙️</text>

          <path d="M160 80 H210" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3" />

          <rect x="210" y="20" width="100" height="35" rx="6" stroke={strokeColor} strokeWidth="1.5" />
          <text x="260" y="41" textAnchor="middle" fill={textColor} className="font-mono text-[8px]">PRIMARY RAIL</text>

          <rect x="210" y="100" width="100" height="35" rx="6" stroke={strokeColor} strokeWidth="1.5" />
          <text x="260" y="121" textAnchor="middle" fill="currentColor" className="font-mono text-[8px] font-bold">FALLBACK ROUTE</text>

          <path d="M150 70 V37 H210" stroke={strokeColor} strokeWidth="1.5" />
          <path d="M150 90 V117 H210" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    }

    // Default general tech diagram
    return (
      <svg className="w-full h-full text-accent" viewBox="0 0 340 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="30" width="100" height="100" rx="12" stroke={strokeColor} strokeWidth="1.5" />
        <rect x="210" y="30" width="100" height="100" rx="12" stroke="currentColor" strokeWidth="1.5" />
        <path d="M130 80 H210" stroke="currentColor" strokeWidth="2" strokeDasharray="5" />
        <text x="80" y="84" textAnchor="middle" fill={textColor} className="font-mono text-[10px]">CLIENT STATE</text>
        <text x="260" y="84" textAnchor="middle" fill="currentColor" className="font-mono text-[10px] font-bold">WebGL CORE</text>
      </svg>
    );
  };

  return (
    <section ref={containerRef} className="px-6 md:px-16 lg:px-24 py-24 max-w-7xl mx-auto w-full relative">
      <div className="mb-16 text-left border-l-2 border-accent pl-6">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent font-bold">
          Signature Initiatives
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-medium italic mt-2 text-foreground">
          Architectural Case Breakdowns
        </h2>
        <p className="text-sm text-foreground/50 mt-1 font-mono">
          Interactive execution, actions & verified results
        </p>
      </div>

      <div className="space-y-12 md:space-y-28">
        {caseStudies.map((study, i) => {
          const isDarkCard = i % 2 === 1;

          return (
            <div
              key={study.id}
              className="case-card relative p-8 md:p-12 lg:p-14 rounded-[32px] border flex flex-col justify-between md:min-h-[80vh] transition-all hover:shadow-2xl duration-500 overflow-hidden shadow-lg"
              style={{
                zIndex: i + 1,
                top: `${i * 15}px`, // Slight alignment cascade
                background: isDarkCard ? "#111322" : "var(--card-elevated)",
                borderColor: "var(--card-border)",
              }}
            >
              {/* Glowing header banner accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent/60 to-transparent" />

              {/* Grid 1: Copy metadata vs. High-Fidelity SVG Diagram */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Meta details & Title */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold">
                      Case Study // 0{i + 1}
                    </span>
                    <span className="text-foreground/20">•</span>
                    <span className={`text-[10px] font-mono uppercase tracking-wider ${isDarkCard ? "text-background/50" : "text-foreground/50"}`}>
                      {study.role}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-serif font-medium tracking-tight text-foreground leading-tight max-w-[28ch]">
                    {study.title}
                  </h3>

                  <p className={`text-sm leading-relaxed ${isDarkCard ? "text-background/70" : "text-foreground/70"}`}>
                    {study.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[10px] px-2.5 py-1 rounded-md font-mono border ${
                          isDarkCard
                            ? "bg-background/5 border-background/10 text-background/60"
                            : "bg-foreground/5 border-card-border text-foreground/60"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Area: System Architecture SVG Diagram */}
                <div className="lg:col-span-5 h-[200px] rounded-2xl border border-card-border/60 bg-card-bg/40 backdrop-blur p-5 flex items-center justify-center overflow-hidden">
                  {renderArchitectureBlueprint(study.id, i)}
                </div>
              </div>

              {/* Grid 2: Structured Bento Outcomes Compartments */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 border-t border-card-border/40 pt-10">
                {/* Problem */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-accent">
                    <Target size={18} />
                    <h4 className="font-mono text-[10px] uppercase tracking-widest font-bold">The Challenge</h4>
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDarkCard ? "text-background/70" : "text-foreground/70"}`}>
                    {study.fullCaseStudy.problem}
                  </p>
                </div>

                {/* Action */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-accent">
                    <Lightbulb size={18} />
                    <h4 className="font-mono text-[10px] uppercase tracking-widest font-bold">The Execution</h4>
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDarkCard ? "text-background/70" : "text-foreground/70"}`}>
                    {study.fullCaseStudy.action}
                  </p>
                </div>

                {/* Result */}
                <div className="space-y-2 bg-accent-muted border border-accent/20 p-5 rounded-2xl">
                  <div className="flex items-center gap-2 text-accent">
                    <Trophy size={18} weight="fill" />
                    <h4 className="font-mono text-[10px] uppercase tracking-widest font-bold">The Metric Outcome</h4>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed font-sans font-semibold text-foreground">
                    {study.fullCaseStudy.result}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
