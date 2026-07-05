"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { LinkedinLogo, GithubLogo, EnvelopeSimple, MapPin } from "@phosphor-icons/react";
import { Profile } from "@/lib/dbMock";

// Register the useGSAP hook
gsap.registerPlugin(useGSAP);

interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(".hero-title-part", {
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
    })
    .from(".hero-sub", {
      y: 30,
      opacity: 0,
      duration: 1.0,
    }, "-=0.8")
    .from(".hero-tagline", {
      y: 30,
      opacity: 0,
      duration: 1.0,
    }, "-=0.7")
    .from(".hero-pill", {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
    }, "-=0.6");
  }, { scope: containerRef });

  const { personal } = profile;

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex flex-col justify-center px-6 md:px-16 lg:px-24 max-w-7xl mx-auto pt-24 pb-16 overflow-hidden"
    >
      {/* Visual background ambient blob */}
      <div className="absolute top-1/4 right-0 w-[45vw] h-[45vw] rounded-full bg-accent/5 blur-[120px] pointer-events-none -z-10 animate-pulse" />

      <div className="space-y-8 max-w-5xl">
        {/* Eyebrow Status Pill */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="hero-pill inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium tracking-wide bg-accent-muted border border-accent/20 text-accent">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Direct Envoy Active
          </div>
          <div className="hero-pill inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium tracking-wide bg-card-bg border border-card-border text-foreground/70">
            <MapPin size={13} className="text-accent" />
            {personal.location}
          </div>
        </div>

        {/* Cinematic Typography Header */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-light leading-none tracking-tight">
            <span className="hero-title-part block text-foreground/40 font-mono text-sm uppercase tracking-[0.25em] mb-4">
              Executive Career Portfolio
            </span>
            <span className="hero-title-part block font-serif italic text-accent pr-2">
              {personal.fullName}
            </span>
            <span className="hero-title-part block font-sans font-bold text-foreground">
              {personal.currentTitle}
            </span>
          </h1>
        </div>

        {/* Main short Bio / Narrative */}
        <p className="hero-sub text-lg sm:text-xl text-foreground/70 leading-relaxed font-sans max-w-[55ch]">
          {personal.shortBio}
        </p>

        {/* Dynamic Tagline */}
        <div className="hero-tagline pt-4 border-l-2 border-accent pl-6 max-w-[45ch]">
          <p className="text-base sm:text-lg font-serif italic text-foreground/90 leading-relaxed">
            "{personal.tagline}"
          </p>
        </div>

        {/* Social / Direct Action Channels */}
        <div className="hero-pill pt-6 flex flex-wrap gap-4 items-center">
          {personal.socials.linkedin && (
            <a
              href={personal.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-foreground text-background hover:bg-accent hover:text-foreground transition-colors duration-300"
            >
              <LinkedinLogo size={18} weight="fill" />
              View LinkedIn Profile
            </a>
          )}
          
          {personal.socials.github && (
            <a
              href={personal.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-card-bg border border-card-border text-foreground/80 hover:bg-card-border transition-colors duration-300"
            >
              <GithubLogo size={18} />
              Inspect GitHub Portfolio
            </a>
          )}

          {personal.socials.email && (
            <a
              href={`mailto:${personal.socials.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:text-accent transition-colors duration-300"
            >
              <EnvelopeSimple size={18} />
              Direct Channel
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
