"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { LinkedinLogo, GithubLogo, EnvelopeSimple, MapPin, Cpu, Clock, Terminal } from "@phosphor-icons/react";
import { Profile } from "@/lib/dbMock";
import AmbientCanvas from "./AmbientCanvas";

gsap.registerPlugin(useGSAP);

interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState("");

  // Real-time ticking system clock inside executive console
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // GSAP Cinematic Entrances & Mouse-Magnetic Physics for Status Card
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(".editorial-eyebrow", {
      x: -40,
      opacity: 0,
      duration: 1.2,
    })
    .from(".editorial-name", {
      y: 40,
      opacity: 0,
      duration: 1.2,
    }, "-=0.9")
    .from(".editorial-title", {
      y: 40,
      opacity: 0,
      duration: 1.2,
    }, "-=0.9")
    .from(".editorial-summary", {
      y: 20,
      opacity: 0,
      duration: 1.0,
    }, "-=0.8")
    .from(".editorial-ribbon-item", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
    }, "-=0.7")
    .from(".editorial-card", {
      scale: 0.95,
      opacity: 0,
      duration: 1.4,
    }, "-=1.0");

    // Magnetic Card Hover effect
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const cardX = rect.left + rect.width / 2;
      const cardY = rect.top + rect.height / 2;
      const angleX = (e.clientX - cardX) / 30; // Tilt range
      const angleY = (e.clientY - cardY) / 30;

      gsap.to(card, {
        rotateY: angleX,
        rotateX: -angleY,
        transformPerspective: 1000,
        ease: "power2.out",
        duration: 0.6,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        ease: "elastic.out(1, 0.3)",
        duration: 1.2,
      });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { scope: containerRef });

  const { personal } = profile;

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex flex-col justify-center items-center px-6 md:px-16 lg:px-24 py-28 max-w-7xl mx-auto w-full"
    >
      {/* 1. HTML5 Hardware-Accelerated Ambient Backdrop */}
      <AmbientCanvas />

      {/* 2. Editorial Layout Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full relative z-10">
        
        {/* Left Side: Margins, Ribbon, Biography */}
        <div className="lg:col-span-7 space-y-8 text-left relative">
          
          {/* Vertical social ribbon in left margins on large displays */}
          <div className="absolute -left-[64px] top-4 hidden xl:flex flex-col gap-5 items-center">
            <span className="w-px h-16 bg-card-border" />
            {personal.socials.linkedin && (
              <a
                href={personal.socials.linkedin}
                target="_blank"
                className="editorial-ribbon-item p-2 rounded-full border border-card-border text-foreground/50 hover:text-accent hover:border-accent/40 hover:scale-110 active:scale-95 transition-all"
                title="Connect on LinkedIn"
              >
                <LinkedinLogo size={16} weight="fill" />
              </a>
            )}
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                className="editorial-ribbon-item p-2 rounded-full border border-card-border text-foreground/50 hover:text-accent hover:border-accent/40 hover:scale-110 active:scale-95 transition-all"
                title="Inspect GitHub"
              >
                <GithubLogo size={16} />
              </a>
            )}
            {personal.socials.email && (
              <a
                href={`mailto:${personal.socials.email}`}
                className="editorial-ribbon-item p-2 rounded-full border border-card-border text-foreground/50 hover:text-accent hover:border-accent/40 hover:scale-110 active:scale-95 transition-all"
                title="Send Direct Email"
              >
                <EnvelopeSimple size={16} />
              </a>
            )}
            <span className="w-px h-12 bg-card-border" />
          </div>

          <div className="space-y-4">
            {/* Status indicators */}
            <div className="editorial-eyebrow flex items-center gap-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent font-bold">
                Dynamic Profile Console
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-glow" />
            </div>

            {/* Typography pairings */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-medium tracking-tighter leading-[0.9] flex flex-col">
              <span className="editorial-name italic text-accent">{personal.fullName}</span>
              <span className="editorial-title font-sans font-extrabold text-foreground tracking-tighter mt-1">
                {personal.currentTitle}
              </span>
            </h1>
          </div>

          <p className="editorial-summary text-base sm:text-lg text-foreground/75 leading-relaxed font-sans max-w-[50ch]">
            {personal.shortBio}
          </p>

          <div className="editorial-ribbon-item pt-4 flex flex-wrap gap-4 items-center">
            {personal.socials.linkedin && (
              <a
                href={personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-mono uppercase tracking-widest font-bold bg-accent text-background hover:opacity-90 active:scale-98 transition-all shadow-sm"
              >
                <LinkedinLogo size={16} weight="fill" />
                Establish Loop
              </a>
            )}
            
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-mono uppercase tracking-widest font-semibold bg-card-bg border border-card-border text-foreground/80 hover:bg-card-border hover:text-foreground active:scale-98 transition-all"
              >
                <GithubLogo size={16} />
                Verify Repos
              </a>
            )}
          </div>
        </div>

        {/* Right Side: Immersive, Interactive "Status Console" Card */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div
            ref={cardRef}
            className="editorial-card premium-card w-full max-w-[380px] p-8 border border-card-border bg-card-bg/60 backdrop-blur-xl rounded-[24px] space-y-6 flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            {/* Gloss highlight border */}
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-accent/40 via-accent to-accent/10" />

            {/* Card Header: System Uptime console */}
            <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-foreground/40">
              <span className="flex items-center gap-1.5">
                <Terminal size={12} className="text-accent" />
                SYSTEM_OK // v1.2
              </span>
              <span className="text-accent">LIVE_FEED</span>
            </div>

            {/* Main Details */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent-muted border border-accent/20 flex items-center justify-center text-accent font-serif font-bold text-xl">
                  {personal.fullName[0]}
                </div>
                <div>
                  <h3 className="font-bold text-base leading-none text-foreground">{personal.fullName}</h3>
                  <p className="text-xs text-foreground/50 mt-1 font-mono">{personal.location}</p>
                </div>
              </div>

              <div className="border-t border-card-border/60 pt-4 space-y-3">
                {/* Metric Clock */}
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-foreground/40 flex items-center gap-1">
                    <Clock size={13} /> Local Consular Time:
                  </span>
                  <span className="text-foreground font-bold numeric-mono">{time || "12:00:00 PM"}</span>
                </div>

                {/* API Status indicator */}
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-foreground/40 flex items-center gap-1">
                    <Cpu size={13} /> Active Core Node:
                  </span>
                  <span className="text-accent flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-glow" />
                    ONLINE
                  </span>
                </div>
              </div>
            </div>

            {/* Status Card Bottom narrative */}
            <div className="border-t border-card-border/60 pt-4 space-y-2">
              <span className="text-[9px] font-mono uppercase tracking-widest text-foreground/30 block">
                Session Active Overview
              </span>
              <p className="text-xs text-foreground/70 leading-relaxed font-sans italic">
                "{personal.tagline}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
