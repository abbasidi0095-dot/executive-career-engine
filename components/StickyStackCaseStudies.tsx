"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { CaseStudy } from "@/lib/dbMock";
import { Target, Lightbulb, Trophy } from "@phosphor-icons/react";

// Register ScrollTrigger and useGSAP
gsap.registerPlugin(ScrollTrigger, useGSAP);

interface StickyStackCaseStudiesProps {
  caseStudies: CaseStudy[];
}

export default function StickyStackCaseStudies({ caseStudies }: StickyStackCaseStudiesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(() => {
    // If mobile or prefers reduced motion, disable the pinning scroll effect and let them scroll naturally
    const isMobile = window.innerWidth < 768;
    if (reduceMotion || isMobile || !containerRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>(".case-card");
    
    // We pin all cards except the last one as they stack
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;

      ScrollTrigger.create({
        trigger: card,
        start: "top 8%", // pin slightly below the navigation/header line
        endTrigger: cards[cards.length - 1] as HTMLElement,
        end: "top 8%",
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });

      // Shrink and fade the previous card as the next one comes into view
      gsap.to(card, {
        scale: 0.95 - (cards.length - i - 1) * 0.015,
        opacity: 0.6,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: cards[i + 1] as HTMLElement,
          start: "top 80%",
          end: "top 12%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="px-6 md:px-16 lg:px-24 py-16 max-w-7xl mx-auto w-full relative">
      <div className="mb-12">
        <h2 className="text-2xl font-serif italic text-accent">Signature Initiatives</h2>
        <p className="text-sm text-foreground/50 uppercase tracking-[0.15em] mt-1 font-mono">
          Interactive case breakdowns
        </p>
      </div>

      <div className="space-y-12 md:space-y-24">
        {caseStudies.map((study, i) => (
          <div
            key={study.id}
            className="case-card relative bg-card-bg border border-card-border p-8 md:p-12 lg:p-16 rounded-3xl shadow-sm md:min-h-[85vh] flex flex-col justify-between transition-all hover:shadow-xl duration-500 overflow-hidden"
            style={{
              zIndex: i + 1,
              // Staggered top layout so they align nicely during scroll pins on desktop
              top: `${i * 12}px`,
              background: i % 2 === 1 ? "rgba(10, 10, 11, 0.95)" : "var(--background)",
              borderColor: "var(--card-border)",
            }}
          >
            {/* Elegant visual line matching our accent color */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent to-accent/30" />

            {/* Header: Meta info, title, metrics */}
            <div className="space-y-6">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-accent">
                    Case Study #{`0${i + 1}`}
                  </span>
                  <span className="text-foreground/30">•</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-foreground/60">
                    {study.role}
                  </span>
                </div>
                <div className="px-4 py-1 rounded-full bg-accent-muted border border-accent/20 text-xs font-bold text-accent font-mono">
                  {study.metrics}
                </div>
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif leading-tight font-medium max-w-[32ch]">
                {study.title}
              </h3>

              {/* Dynamic tag badges */}
              <div className="flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md bg-card-bg border border-card-border font-mono text-foreground/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Main Body: Problem, Action, Result layout inside Bento compartments */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10 border-t border-card-border pt-10">
              {/* Problem Block */}
              <div className="space-y-3 bg-card-bg/20 p-5 rounded-xl border border-card-border/40">
                <div className="flex items-center gap-2 text-accent">
                  <Target size={18} />
                  <h4 className="font-sans font-bold text-xs uppercase tracking-widest">
                    The Problem
                  </h4>
                </div>
                <p className="text-sm text-foreground/75 leading-relaxed font-sans">
                  {study.fullCaseStudy.problem}
                </p>
              </div>

              {/* Action Block */}
              <div className="space-y-3 bg-card-bg/20 p-5 rounded-xl border border-card-border/40">
                <div className="flex items-center gap-2 text-accent">
                  <Lightbulb size={18} />
                  <h4 className="font-sans font-bold text-xs uppercase tracking-widest">
                    The Action
                  </h4>
                </div>
                <p className="text-sm text-foreground/75 leading-relaxed font-sans">
                  {study.fullCaseStudy.action}
                </p>
              </div>

              {/* Result Block */}
              <div className="space-y-3 bg-accent-muted/10 p-5 rounded-xl border border-accent/15">
                <div className="flex items-center gap-2 text-accent">
                  <Trophy size={18} weight="fill" />
                  <h4 className="font-sans font-bold text-xs uppercase tracking-widest">
                    The Outcome
                  </h4>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed font-sans font-medium">
                  {study.fullCaseStudy.result}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
