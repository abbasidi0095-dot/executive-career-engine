"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkle, Robot, FilePdf, ShieldCheck, ArrowSquareOut, ChartLineUp, AppWindow, MapPin, Terminal, Clock, ChatTeardropText, PaperPlaneRight, User, Palette } from "@phosphor-icons/react";
import AmbientCanvas from "@/components/AmbientCanvas";

// Mock profiles for our Live Landing Page Sandbox Simulator
const sandboxProfiles = [
  {
    roleId: "product-architect",
    roleName: "Product Architect",
    fullName: "Elena Rostova",
    currentTitle: "VP of Product, AI Pipelines",
    location: "Zurich, Switzerland",
    tagline: "Architecting zero-latency AI ingestion layers driving $120M+ ARR.",
    shortBio: "Over 12 years of core technical PM leadership at top-tier distributed systems and machine-learning infrastructure firms.",
    metrics: [
      { value: "$120M+", label: "Inference Volume Guided" },
      { value: "45+", label: "Platform Engineers Managed" },
      { value: "99.999%", label: "API Pipeline Reliability" }
    ],
    aiEnvoy: {
      botName: "Elena's Digital Representative",
      suggestedPrompts: [
        "Explain Elena's model optimization projects.",
        "How does Elena coordinate technical engineers?",
        "What is Elena's stance on custom GPU clusters?"
      ],
      systemPrompt: "Elena operates with high-integrity precision. Her stack includes Python, Rust, and WebAssembly."
    }
  },
  {
    roleId: "growth-lead",
    roleName: "Growth Director",
    fullName: "Marcus Aurelius",
    currentTitle: "VP of Growth, FinTech Core",
    location: "New York, NY",
    tagline: "Unlocking structural expansion loops processing $45B+ globally.",
    shortBio: "Specialist in behavioral analytics loops, multi-lane checkout routing algorithms, and acquisition engineering at Stripe and Wise.",
    metrics: [
      { value: "1.45%", label: "Absolute Checkout Lift" },
      { value: "300M+", label: "Active Transactions Handled" },
      { value: "$45B+", label: "Annual Volume Safeguarded" }
    ],
    aiEnvoy: {
      botName: "Marcus's Business Representative",
      suggestedPrompts: [
        "Detail Marcus's routing lift strategies.",
        "How does Marcus define growth loops?",
        "What analytics tooling does Marcus build?"
      ],
      systemPrompt: "Marcus writes in a highly commercial, metric-driven, and impact-oriented tone."
    }
  },
  {
    roleId: "security-cto",
    roleName: "Security Architect",
    fullName: "Kaito Sato",
    currentTitle: "Chief Security Officer, Web3 Infra",
    location: "Tokyo, Japan",
    tagline: "Pioneering cryptographic zero-knowledge protocols guarding $4.2B in TVL.",
    shortBio: "Renowned computer security scientist with 15+ years of smart contract audit tenure, high-integrity compiler design, and cryptographic systems research.",
    metrics: [
      { value: "$4.2B", label: "Cryptographic TVL Secured" },
      { value: "0", label: "Protocol Exploits Suffered" },
      { value: "120+", fill: "Audits Directed", label: "Smart Contracts Inspected" }
    ],
    aiEnvoy: {
      botName: "Kaito's Cryptographic Agent",
      suggestedPrompts: [
        "What audit methodologies does Kaito use?",
        "Explain Kaito's compiler security studies.",
        "Is Kaito open to active audit reviews?"
      ],
      systemPrompt: "Kaito is direct, highly mathematical, and conservative with security assertions."
    }
  }
];

export default function Home() {
  const [selectedRole, setSelectedRole] = useState(sandboxProfiles[0]);
  const [sandboxTheme, setSandboxTheme] = useState("dark-editorial");
  const [chatInput, setInput] = useState("");
  const [chatHistory, setHistory] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    { sender: "bot", text: "Welcome to the sandbox. I am Elena's Digital Representative. Ask me any details about Elena's career." }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Switch role inside our Landing Page interactive sandbox
  const handleRoleSwitch = (roleId: string) => {
    const matched = sandboxProfiles.find(r => r.roleId === roleId) || sandboxProfiles[0];
    setSelectedRole(matched);
    setHistory([
      { sender: "bot", text: `Welcome to the sandbox. I am ${matched.aiEnvoy.botName}. Ask me anything about ${matched.fullName}'s quantitative metrics, projects, or background.` }
    ]);
  };

  // Live client-side heuristic chat simulator for the sandbox
  const handleSandboxChatSubmit = (e: React.FormEvent, customText?: string) => {
    e.preventDefault();
    const text = customText || chatInput;
    if (!text.trim() || isTyping) return;

    setInput("");
    setHistory(prev => [...prev, { sender: "user", text }]);
    setIsTyping(true);

    setTimeout(() => {
      const query = text.toLowerCase();
      const name = selectedRole.fullName;
      let reply = `Regarding ${name}'s expertise: They serve as ${selectedRole.currentTitle} with a verified record. Tagline: "${selectedRole.tagline}"`;

      if (query.includes("metric") || query.includes("arr") || query.includes("scale") || query.includes("growth")) {
        const metStr = selectedRole.metrics.map(m => `• ${m.value} — ${m.label}`).join("\n");
        reply = `Certainly. ${name}'s verified strategic impact includes:\n\n${metStr}`;
      } else if (query.includes("gpu") || query.includes("project") || query.includes("optim") || query.includes("routing") || query.includes("audit") || query.includes("compiler")) {
        reply = `On their core initiatives, ${name} took direct technical ownership. They mapped the operational blueprints and implemented fallback routines resulting in major ARR saves.`;
      } else if (query.includes("stack") || query.includes("tech") || query.includes("rust") || query.includes("python") || query.includes("code")) {
        reply = `${name}'s technical profile spans high-performance systems and architecture: \n\n${selectedRole.aiEnvoy.systemPrompt}`;
      } else if (query.includes("contact") || query.includes("hire") || query.includes("email")) {
        reply = `To connect with ${name} or review credentials, click 'Configure Your Engine' below to build your own executive system and initiate direct channels.`;
      }

      setHistory(prev => [...prev, { sender: "bot", text: reply }]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between relative overflow-hidden font-sans dark-theme">
      
      {/* 1. Drift background canvas */}
      <AmbientCanvas />
      <div className="grain-overlay" />

      {/* Header Navigation */}
      <header className="px-6 md:px-16 py-6 border-b border-card-border flex items-center justify-between z-10 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="font-serif italic text-xl text-accent font-semibold">CareerEnvoy</span>
          <span className="text-[9px] font-mono uppercase tracking-widest text-accent bg-accent-muted px-2.5 py-0.5 rounded-md border border-accent/20">
            Engine OS
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider text-foreground/50">
          <a href="#sandbox" className="hover:text-foreground transition-colors">
            Interactive Sandbox
          </a>
          <a href="#architecture" className="hover:text-foreground transition-colors">
            Architecture
          </a>
        </nav>

        <Link
          href="/onboarding"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider bg-card-bg border border-card-border text-foreground/80 hover:bg-card-border hover:text-foreground transition-all"
        >
          Claim Subdomain
          <ArrowRight size={13} />
        </Link>
      </header>

      {/* Main Container */}
      <main className="z-10 flex-1 flex flex-col justify-center">
        
        {/* Landing Hero */}
        <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 max-w-5xl mx-auto text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono tracking-widest bg-accent-muted border border-accent/20 text-accent mx-auto">
            <Sparkle size={14} />
            THE EXECUTIVE BRANDING OS
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif italic text-accent font-medium leading-none max-w-[20ch] mx-auto">
              Boring PDF Resumes Don't Win Executive Roles.
            </h1>
            <p className="text-3xl sm:text-5xl md:text-6xl font-sans font-extrabold text-foreground tracking-tight max-w-[18ch] mx-auto leading-none">
              This Engine Does.
            </p>
          </div>

          <p className="text-base sm:text-lg text-foreground/60 max-w-[55ch] mx-auto leading-relaxed">
            The world's first cinematic web portfolio integrated with an interactive AI-Career Envoy to pitch your high-stakes metrics, leadership values, and project outcomes 24/7.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              href="/onboarding"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium text-sm bg-accent text-background hover:bg-accent/90 active:scale-98 transition-all shadow-md font-mono uppercase tracking-wider"
            >
              Configure Your Engine
              <ArrowRight size={16} />
            </Link>
            
            <a
              href="#sandbox"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium text-sm bg-card-bg border border-card-border text-foreground/90 hover:bg-card-border active:scale-98 transition-all font-mono uppercase tracking-wider"
            >
              Explore Sandbox Sandbox
            </a>
          </div>
        </section>

        {/* 2. Brand Social Proof Logo Wall (Strict typography guidelines - grayscaled) */}
        <section className="px-6 py-8 max-w-5xl mx-auto w-full text-center border-t border-b border-card-border/60">
          <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-foreground/30 block mb-6">
            TRUSTED BY LEADERS FORMERLY AT TOP TECH CLUSTERS
          </span>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale contrast-200">
            {/* Vercel SVG */}
            <svg className="h-4 md:h-5 text-foreground" viewBox="0 0 116 100" fill="currentColor">
              <path d="M57.5 0L115 100H0L57.5 0Z" />
            </svg>
            {/* Supabase SVG */}
            <span className="font-mono text-sm md:text-base font-extrabold tracking-tight">⚡ SUPABASE</span>
            {/* Stripe SVG */}
            <span className="font-mono text-sm md:text-base font-bold italic tracking-tighter">stripe</span>
            {/* Linear SVG */}
            <span className="font-mono text-sm md:text-base font-light tracking-widest">L I N E A R</span>
          </div>
        </section>

        {/* 3. The Sandbox Simulator (The absolute gold-standard visual dashboard showcase) */}
        <section id="sandbox" className="px-6 md:px-16 lg:px-24 py-24 max-w-7xl mx-auto w-full relative">
          <div className="mb-12 text-center max-w-3xl mx-auto space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent font-bold">
              Simulator Sandbox
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif italic text-foreground">
              Experience the Live Career Engine OS
            </h2>
            <p className="text-sm text-foreground/50 leading-relaxed max-w-[50ch] mx-auto">
              Select an executive profile below, toggle layouts, and consult the AI Envoy in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Control Panel */}
            <div className="lg:col-span-4 p-8 rounded-[24px] bg-card-bg border border-card-border space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[9px] font-mono uppercase tracking-widest text-accent font-bold">
                  Dashboard Controls
                </span>
                
                {/* Role Switcher */}
                <div className="space-y-2.5">
                  <span className="text-xs text-foreground/60 font-medium block">Select Sandbox Role:</span>
                  <div className="flex flex-col gap-2">
                    {sandboxProfiles.map((p) => (
                      <button
                        key={p.roleId}
                        onClick={() => handleRoleSwitch(p.roleId)}
                        className={`text-left px-4 py-3 rounded-xl border text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                          selectedRole.roleId === p.roleId
                            ? "bg-accent text-background border-accent font-bold"
                            : "bg-card-bg border-card-border text-foreground/80 hover:bg-card-border"
                        }`}
                      >
                        {p.roleName}
                        {selectedRole.roleId === p.roleId && <Sparkle size={14} weight="fill" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Theme Switcher inside Simulator */}
                <div className="space-y-2.5 pt-2 border-t border-card-border/60">
                  <span className="text-xs text-foreground/60 font-medium block">Theme Engine Selector:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSandboxTheme("dark-editorial")}
                      className={`flex-1 py-2 rounded-lg border text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                        sandboxTheme === "dark-editorial"
                          ? "bg-foreground text-background border-foreground font-bold"
                          : "border-card-border text-foreground/60 hover:bg-card-border"
                      }`}
                    >
                      Midnight Dark
                    </button>
                    <button
                      onClick={() => setSandboxTheme("light-editorial")}
                      className={`flex-1 py-2 rounded-lg border text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                        sandboxTheme === "light-editorial"
                          ? "bg-foreground text-background border-foreground font-bold"
                          : "border-card-border text-foreground/60 hover:bg-card-border"
                      }`}
                    >
                      Warm Light
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-card-border/60 space-y-3">
                <p className="text-xs text-foreground/50 leading-relaxed">
                  Click below to claim your own subdomain, customize these exact visual cards, and go live instantly.
                </p>
                <Link
                  href="/onboarding"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-bold bg-accent text-background hover:opacity-90 transition-all"
                >
                  Configure Your Version
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right Live Interactive Preview frame */}
            <div className="lg:col-span-8 premium-card border border-card-border bg-background rounded-[28px] overflow-hidden min-h-[480px] flex flex-col justify-between shadow-2xl relative">
              <div className={`w-full h-full flex-1 flex flex-col justify-between p-6 md:p-8 transition-colors duration-500 ${sandboxTheme === "dark-editorial" ? "dark-theme bg-background text-foreground" : "bg-white text-slate-900 border border-slate-100"}`}>
                
                {/* 1. Header banner of profile */}
                <div className="flex justify-between items-start border-b border-card-border/40 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-accent-muted border border-accent/20 flex items-center justify-center font-bold text-accent text-sm">
                      {selectedRole.fullName[0]}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold leading-none">{selectedRole.fullName}</h4>
                      <p className="text-[10px] text-foreground/50 mt-1 font-mono">{selectedRole.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 text-[10px] font-mono text-foreground/40">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> Live Preview
                    </span>
                  </div>
                </div>

                {/* 2. Core Profile copy & Metrics section */}
                <div className="py-6 space-y-4">
                  <h3 className="text-xl sm:text-2xl font-serif italic text-accent font-medium leading-tight">
                    "{selectedRole.tagline}"
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed max-w-[55ch]">
                    {selectedRole.shortBio}
                  </p>

                  {/* Metrics preview */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {selectedRole.metrics.map((m, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-card-bg border border-card-border flex flex-col justify-between">
                        <span className="text-xs font-bold font-mono text-foreground">{m.value}</span>
                        <span className="text-[9px] text-foreground/50 font-mono leading-none mt-1">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Integrated Live Sandbox Chat */}
                <div className="border-t border-card-border/40 pt-4 space-y-4 flex-1 flex flex-col justify-end">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-accent font-bold block">
                    {selectedRole.aiEnvoy.botName}
                  </span>

                  {/* Dialogue logs */}
                  <div className="bg-card-bg/40 border border-card-border/60 p-4 rounded-xl space-y-3 max-h-[140px] overflow-y-auto no-scrollbar">
                    {chatHistory.slice(-2).map((msg, i) => (
                      <div key={i} className={`flex gap-2 items-start text-xs ${msg.sender === "bot" ? "" : "flex-row-reverse text-right"}`}>
                        <span className={`p-1 rounded bg-card-bg border border-card-border ${msg.sender === "bot" ? "text-accent" : "text-foreground"}`}>
                          {msg.sender === "bot" ? "Envoy" : "User"}
                        </span>
                        <span className="text-foreground/80 leading-relaxed max-w-[85%]">{msg.text}</span>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex gap-2 items-center text-xs text-foreground/40 font-mono">
                        <span>Typing</span>
                        <span className="animate-bounce font-extrabold text-accent">...</span>
                      </div>
                    )}
                  </div>

                  {/* Preloaded prompt chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {selectedRole.aiEnvoy.suggestedPrompts.slice(0, 2).map((chip) => (
                      <button
                        key={chip}
                        onClick={(e) => handleSandboxChatSubmit(e, chip)}
                        className="text-[10px] px-2.5 py-1 rounded-md bg-card-bg border border-card-border text-foreground/60 hover:border-accent/40 hover:text-foreground transition-all cursor-pointer"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>

                  {/* Submission form */}
                  <form onSubmit={handleSandboxChatSubmit} className="flex gap-2 relative items-center pt-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={`Test AI chatbot: type 'metrics', 'projects' or 'stack'...`}
                      className="w-full pl-3 pr-10 py-2.5 rounded-lg text-xs bg-card-bg border border-card-border text-foreground placeholder:text-foreground/30 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!chatInput.trim() || isTyping}
                      className="absolute right-1.5 p-1.5 rounded-md bg-accent text-background disabled:opacity-20 transition-all cursor-pointer"
                    >
                      <PaperPlaneRight size={13} weight="fill" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Modular value proposition architecture grid */}
        <section id="architecture" className="px-6 md:px-16 lg:px-24 py-24 max-w-7xl mx-auto w-full border-t border-card-border">
          <div className="mb-16 text-left border-l-2 border-accent pl-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent font-bold">System Specs</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium italic mt-2 text-foreground">
              Built on High-Performance Assets
            </h2>
            <p className="text-sm text-foreground/50 mt-1 font-mono">
              Pure execution without bloated web templates or loading delays
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-card-bg border border-card-border space-y-4 hover:border-accent/20 transition-all duration-300">
              <div className="p-3 rounded-lg bg-accent-muted border border-accent/20 text-accent w-fit">
                <ChartLineUp size={22} />
              </div>
              <h3 className="text-lg font-serif italic font-semibold">Cinematic GSAP Timelines</h3>
              <p className="text-xs text-foreground/60 leading-relaxed">
                Asynchronous scroll pinning and stacking case-study slides make your Problem-Action-Result breakdowns interactive. Recruiters stay 2.5 minutes longer on average.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-card-bg border border-card-border space-y-4 hover:border-accent/20 transition-all duration-300">
              <div className="p-3 rounded-lg bg-accent-muted border border-accent/20 text-accent w-fit">
                <Robot size={22} weight="fill" />
              </div>
              <h3 className="text-lg font-serif italic font-semibold">Consultative AI Envoy</h3>
              <p className="text-xs text-foreground/60 leading-relaxed">
                A custom-trained, system-guardrailed chat proxy loaded with your specific career metrics. Answers recruiter questions on leadership and salary requirements instantly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-card-bg border border-card-border space-y-4 hover:border-accent/20 transition-all duration-300">
              <div className="p-3 rounded-lg bg-accent-muted border border-accent/20 text-accent w-fit">
                <FilePdf size={22} />
              </div>
              <h3 className="text-lg font-serif italic font-semibold">100% ATS Vetted CV</h3>
              <p className="text-xs text-foreground/60 leading-relaxed">
                A perfectly matched, single-column export for applicant tracking systems. Compiles to clean vector PDF in one click, embedding custom QR pathways linking back to your digital engine.
              </p>
            </div>
          </div>
        </section>

        {/* Dynamic CTA */}
        <section className="px-6 md:px-16 py-20 max-w-5xl mx-auto w-full text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-serif italic text-accent font-medium leading-none">
            Ready to upgrade your personal brand?
          </h2>
          <p className="text-xs sm:text-sm text-foreground/50 max-w-[45ch] mx-auto leading-relaxed">
            Take command of your hiring conversations. Build your executive engine and distribute your custom subdomain link to recruiters today.
          </p>
          <div className="pt-4">
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-xs font-mono uppercase tracking-widest bg-accent text-background hover:bg-accent/90 transition-all duration-300"
            >
              Get Started Instantly
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-8 border-t border-card-border max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center text-xs text-foreground/40 font-mono gap-4 z-10 bg-background/50">
        <p>© {new Date().getFullYear()} CareerEnvoy Inc. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Developed under Elite Creative Design Guidelines
        </p>
      </footer>
    </div>
  );
}
