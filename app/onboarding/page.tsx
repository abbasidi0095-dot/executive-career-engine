"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveProfile, Profile } from "@/lib/dbMock";
import { ArrowLeft, ArrowRight, Rocket, Info, IdentificationCard, ChartBar, AppWindow, Cpu, Eye, DeviceMobile, Palette, Clock, MapPin } from "@phosphor-icons/react";
import Link from "next/link";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State initialized with realistic placeholder values for immediate preview richness
  const [formData, setFormData] = useState({
    slug: "alexander-vance",
    fullName: "Alexander Vance",
    currentTitle: "VP of Product Engineering",
    location: "London, UK",
    tagline: "Architecting hyper-scale analytical visual cockpits that slash SLA times by 60%.",
    shortBio: "Leading unified teams of developers, product managers, and designers across edge routing networks and distributed database architectures.",
    linkedin: "https://linkedin.com/in/alexandervance",
    github: "https://github.com/alexandervance",
    email: "alexander@vance.com",
    theme: "dark-editorial",

    // Metrics
    metric1Val: "$120M+", metric1Lab: "ARR Infrastructure Managed",
    metric2Val: "40+", metric2Lab: "Cross-Functional PMs Led",
    metric3Val: "99.999%", metric3Lab: "Core API Route Uptime",

    // Case Study 1
    study1Title: "Scaling Core API Payment Orchestration Layers",
    study1Role: "Lead Product Architect",
    study1Metrics: "$14M saved in annual compute",
    study1Desc: "Redesigned high throughput systems on Kubernetes.",
    study1Problem: "Legacy database structures were locking up under concurrent transaction loads, causing timeout spikes.",
    study1Action: "Decoupled the ingestion layers and implemented Redis transactional buffers with automated slicing routers.",
    study1Result: "Sustained 99.999% system availability and slashed server idle cost by $14M.",
    study1Tags: "Next.js, Python, Kubernetes",

    // AI Envoy Settings
    botName: "Alexander's Digital Envoy",
    systemPrompt: "Speak analytically and confidently. Focus on ARR achievements and technical engineering values.",
    prompt1: "Tell me about Alexander's metrics.",
    prompt2: "Explain their leadership philosophy.",
    prompt3: "Dissect the API routing project.",
    prompt4: "How can I schedule a call?",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      nextStep();
      return;
    }

    setIsSubmitting(true);

    const slug = formData.slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "");

    const newProfile: Profile = {
      meta: {
        slug,
        theme: formData.theme,
        primaryColor: "#D4AF37",
      },
      personal: {
        fullName: formData.fullName,
        currentTitle: formData.currentTitle,
        location: formData.location,
        tagline: formData.tagline,
        shortBio: formData.shortBio,
        socials: {
          linkedin: formData.linkedin,
          github: formData.github,
          email: formData.email,
        },
      },
      metrics: [
        { value: formData.metric1Val, label: formData.metric1Lab },
        { value: formData.metric2Val, label: formData.metric2Lab },
        { value: formData.metric3Val, label: formData.metric3Lab },
      ].filter((m) => m.value && m.label),
      caseStudies: [
        {
          id: "project-1",
          title: formData.study1Title,
          role: formData.study1Role,
          metrics: formData.study1Metrics,
          description: formData.study1Desc,
          tags: formData.study1Tags.split(",").map((t) => t.trim()),
          fullCaseStudy: {
            problem: formData.study1Problem,
            action: formData.study1Action,
            result: formData.study1Result,
          },
        },
      ],
      experience: [
        {
          company: "Enterprise Scaling Solutions",
          role: formData.currentTitle,
          period: "2023 - Present",
          bullets: [
            `Leading continuous execution of core initiatives within ${formData.location}.`,
            `Pioneered integration of scalable tech stacks, resulting in measurable business outcomes: ${formData.metric1Val || "substantial ARR growth"}.`,
          ],
        },
      ],
      aiEnvoy: {
        botName: formData.botName,
        systemPromptOverride: formData.systemPrompt,
        suggestedPrompts: [
          formData.prompt1,
          formData.prompt2,
          formData.prompt3,
          formData.prompt4,
        ].filter(Boolean),
      },
    };

    try {
      await saveProfile(newProfile);
      
      // Live redirect
      setTimeout(() => {
        router.push(`/portfolios/${slug}`);
      }, 800);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090A10] text-[#F8FAFC] flex flex-col justify-between font-sans relative overflow-hidden">
      <div className="grain-overlay" />

      {/* Header Navigation */}
      <header className="px-6 md:px-12 py-5 border-b border-card-border bg-[#090A10]/95 backdrop-blur-md flex items-center justify-between z-10 relative">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-foreground/50 hover:text-foreground transition-all"
        >
          <ArrowLeft size={16} />
          Exit Editor
        </Link>
        <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold">
          Career Engine IDE // Step {step} of 4
        </span>
      </header>

      {/* Main Split Layout Split */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 items-stretch w-full relative z-10">
        
        {/* Left Side: Scrollable Input Form Panels */}
        <div className="lg:col-span-6 px-6 md:px-12 py-8 overflow-y-auto max-h-[calc(100vh-130px)] no-scrollbar border-r border-card-border bg-[#090A10]/40">
          <form onSubmit={handleSubmit} className="space-y-8 max-w-xl">
            
            {/* STEP 1: IDENTITY */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-accent-muted border border-accent/20 text-accent w-fit">
                    <IdentificationCard size={24} />
                  </div>
                  <h2 className="text-2xl font-serif italic text-accent font-medium">Core Brand Identity</h2>
                  <p className="text-xs text-foreground/50 uppercase tracking-widest font-mono">
                    Configure your dynamic profile console parameters
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 col-span-1 sm:col-span-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-foreground/60 block">
                      Claim Your Subdomain Path
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-sm text-foreground/30 font-mono">
                        careerenvoy.co/
                      </span>
                      <input
                        required
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        placeholder="alexander-vance"
                        className="w-full pl-32 pr-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-foreground/60 block">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Elena Rostova"
                      className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-foreground/60 block">
                      Executive Title
                    </label>
                    <input
                      required
                      type="text"
                      name="currentTitle"
                      value={formData.currentTitle}
                      onChange={handleChange}
                      placeholder="VP of Product"
                      className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-foreground/60 block">
                      Location
                    </label>
                    <input
                      required
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Zurich, CH"
                      className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-foreground/60 block">
                      Theme Selection
                    </label>
                    <select
                      name="theme"
                      value={formData.theme}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all cursor-pointer"
                    >
                      <option value="dark-editorial">Midnight Dark (Gold Accent)</option>
                      <option value="light-editorial">Warm Light (Indigo Accent)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 col-span-1 sm:col-span-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-foreground/60 block">
                      Elevator Tagline
                    </label>
                    <input
                      required
                      type="text"
                      name="tagline"
                      value={formData.tagline}
                      onChange={handleChange}
                      placeholder="Architecting zero-latency AI ingestion layers driving ARR growth."
                      className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all font-serif italic"
                    />
                  </div>

                  <div className="space-y-1.5 col-span-1 sm:col-span-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-foreground/60 block">
                      Career Biography Summary
                    </label>
                    <textarea
                      required
                      rows={3}
                      name="shortBio"
                      value={formData.shortBio}
                      onChange={handleChange}
                      placeholder="Over a decade of core technical leadership at leading infrastructure cells..."
                      className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all resize-none leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-foreground/60 block">
                      Registered Email
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alexander@vance.com"
                      className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-foreground/60 block">
                      LinkedIn Link (Optional)
                    </label>
                    <input
                      type="text"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/alexander"
                      className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: METRICS */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-accent-muted border border-accent/20 text-accent w-fit">
                    <ChartBar size={24} />
                  </div>
                  <h2 className="text-2xl font-serif italic text-accent font-medium">Quantitative Leadership Metrics</h2>
                  <p className="text-xs text-foreground/50 uppercase tracking-widest font-mono">
                    Document 3 high-impact verified milestones
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Metric 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border border-card-border p-5 rounded-xl bg-card-bg/25">
                    <div className="col-span-1 space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-accent font-bold">
                        Metric Value #1
                      </label>
                      <input
                        required
                        type="text"
                        name="metric1Val"
                        value={formData.metric1Val}
                        onChange={handleChange}
                        placeholder="$120M+"
                        className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all font-mono"
                      />
                    </div>
                    <div className="col-span-1 sm:col-span-2 space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-foreground/60 block">
                        Impact Label
                      </label>
                      <input
                        required
                        type="text"
                        name="metric1Lab"
                        value={formData.metric1Lab}
                        onChange={handleChange}
                        placeholder="Inference Volume Guided"
                        className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all"
                      />
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border border-card-border p-5 rounded-xl bg-card-bg/25">
                    <div className="col-span-1 space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-accent font-bold">
                        Metric Value #2
                      </label>
                      <input
                        required
                        type="text"
                        name="metric2Val"
                        value={formData.metric2Val}
                        onChange={handleChange}
                        placeholder="45+"
                        className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all font-mono"
                      />
                    </div>
                    <div className="col-span-1 sm:col-span-2 space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-foreground/60 block">
                        Impact Label
                      </label>
                      <input
                        required
                        type="text"
                        name="metric2Lab"
                        value={formData.metric2Lab}
                        onChange={handleChange}
                        placeholder="Platform Engineers Managed"
                        className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all"
                      />
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border border-card-border p-5 rounded-xl bg-card-bg/25">
                    <div className="col-span-1 space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-accent font-bold">
                        Metric Value #3
                      </label>
                      <input
                        required
                        type="text"
                        name="metric3Val"
                        value={formData.metric3Val}
                        onChange={handleChange}
                        placeholder="99.99%"
                        className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all font-mono"
                      />
                    </div>
                    <div className="col-span-1 sm:col-span-2 space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-foreground/60 block">
                        Impact Label
                      </label>
                      <input
                        required
                        type="text"
                        name="metric3Lab"
                        value={formData.metric3Lab}
                        onChange={handleChange}
                        placeholder="API Ingestion Uptime Secured"
                        className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: PROJECTS */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-accent-muted border border-accent/20 text-accent w-fit">
                    <AppWindow size={24} />
                  </div>
                  <h2 className="text-2xl font-serif italic text-accent font-medium">Signature Project Outcomes</h2>
                  <p className="text-xs text-foreground/50 uppercase tracking-widest font-mono">
                    Lay out your primary system case study
                  </p>
                </div>

                <div className="space-y-6 border border-card-border p-6 rounded-xl bg-card-bg/15">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 col-span-1 sm:col-span-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-foreground/60 block">
                        Project/Initiative Title
                      </label>
                      <input
                        required
                        type="text"
                        name="study1Title"
                        value={formData.study1Title}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all font-semibold font-serif italic"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-foreground/60 block">
                        Your Executive Role
                      </label>
                      <input
                        required
                        type="text"
                        name="study1Role"
                        value={formData.study1Role}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-foreground/60 block">
                        Project Outcome Metric
                      </label>
                      <input
                        required
                        type="text"
                        name="study1Metrics"
                        value={formData.study1Metrics}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all font-mono"
                      />
                    </div>

                    <div className="space-y-1.5 col-span-1 sm:col-span-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-foreground/60 block">
                        One-Line Brief Summary
                      </label>
                      <input
                        required
                        type="text"
                        name="study1Desc"
                        value={formData.study1Desc}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all"
                      />
                    </div>

                    {/* Problem / Action / Result */}
                    <div className="space-y-1.5 col-span-1 sm:col-span-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-accent font-bold block">
                        The Challenge (Problem Context)
                      </label>
                      <textarea
                        required
                        rows={2}
                        name="study1Problem"
                        value={formData.study1Problem}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg text-xs bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all resize-none leading-relaxed"
                      />
                    </div>

                    <div className="space-y-1.5 col-span-1 sm:col-span-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-accent font-bold block">
                        The Execution (Your Direct Actions)
                      </label>
                      <textarea
                        required
                        rows={2}
                        name="study1Action"
                        value={formData.study1Action}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg text-xs bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all resize-none leading-relaxed"
                      />
                    </div>

                    <div className="space-y-1.5 col-span-1 sm:col-span-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-accent font-bold block">
                        The Verifiable Metric Outcome
                      </label>
                      <textarea
                        required
                        rows={2}
                        name="study1Result"
                        value={formData.study1Result}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg text-xs bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all resize-none leading-relaxed font-semibold"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: AI REPRESENTATIVE */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-accent-muted border border-accent/20 text-accent w-fit">
                    <Cpu size={24} />
                  </div>
                  <h2 className="text-2xl font-serif italic text-accent font-medium">AI Envoy Configuration</h2>
                  <p className="text-xs text-foreground/50 uppercase tracking-widest font-mono">
                    Define and instruct your consultative representative
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-foreground/60 block">
                      Custom Bot Title
                    </label>
                    <input
                      required
                      type="text"
                      name="botName"
                      value={formData.botName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all font-serif italic font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-foreground/60 block">
                      Consultant Persona & Guidelines
                    </label>
                    <textarea
                      required
                      rows={3}
                      name="systemPrompt"
                      value={formData.systemPrompt}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg text-xs bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all resize-none leading-relaxed font-mono"
                    />
                  </div>

                  {/* suggested chips */}
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-accent font-bold block">
                      Suggested Dialogue Chips
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        required
                        type="text"
                        name="prompt1"
                        value={formData.prompt1}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg text-xs bg-card-bg border border-card-border text-foreground focus:outline-none"
                      />
                      <input
                        required
                        type="text"
                        name="prompt2"
                        value={formData.prompt2}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg text-xs bg-card-bg border border-card-border text-foreground focus:outline-none"
                      />
                      <input
                        required
                        type="text"
                        name="prompt3"
                        value={formData.prompt3}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg text-xs bg-card-bg border border-card-border text-foreground focus:outline-none"
                      />
                      <input
                        required
                        type="text"
                        name="prompt4"
                        value={formData.prompt4}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg text-xs bg-card-bg border border-card-border text-foreground focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Button Footer panel */}
            <div className="flex justify-between items-center pt-8 border-t border-card-border">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-mono uppercase tracking-wider bg-card-bg border border-card-border text-foreground/80 hover:bg-card-border transition-colors cursor-pointer"
                >
                  Previous
                </button>
              ) : (
                <div />
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-mono uppercase tracking-widest font-bold bg-accent text-background hover:opacity-90 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>Building OS...</>
                ) : step === 4 ? (
                  <>
                    Launch Live OS
                    <Rocket size={15} weight="fill" className="animate-bounce" />
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Live Interactive Canvas Preview Panel (Sticks in viewport) */}
        <div className="lg:col-span-6 bg-[#0E101A] border-l border-card-border p-8 hidden lg:flex flex-col justify-center items-center relative">
          
          <div className="absolute right-6 top-6 flex items-center gap-2 text-[10px] font-mono text-foreground/40">
            <Eye size={14} /> Live Canvas Preview // WYSWYG ACTIVE
          </div>

          {/* Miniature live-updating web preview window */}
          <div className={`w-full max-w-[460px] h-[520px] rounded-[24px] premium-card border border-card-border overflow-hidden flex flex-col justify-between p-6 transition-colors duration-500 shadow-2xl relative ${formData.theme === "dark-editorial" ? "dark-theme bg-[#090A10] text-[#F8FAFC]" : "bg-white text-[#0f172a] border border-slate-100"}`}>
            
            {/* Header */}
            <div className="flex justify-between items-start border-b border-card-border/40 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-accent-muted border border-accent/20 flex items-center justify-center font-bold text-accent text-xs">
                  {formData.fullName ? formData.fullName[0] : "A"}
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-none">{formData.fullName || "Your Full Name"}</h4>
                  <p className="text-[9px] text-foreground/50 mt-1 font-mono">{formData.location || "Your Location"}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 text-[9px] font-mono text-foreground/40">
                <DeviceMobile size={11} /> Mobile Frame
              </div>
            </div>

            {/* Core Body preview */}
            <div className="py-5 space-y-4">
              <h3 className="text-lg font-serif italic text-accent leading-tight">
                "{formData.tagline || "Your dynamic career tagline goes here..."}"
              </h3>
              <p className="text-[11px] text-foreground/70 leading-relaxed max-w-[40ch] line-clamp-2">
                {formData.shortBio || "Your career bio summary will dynamically render in this panel as you type..."}
              </p>

              {/* Metrics preview row */}
              <div className="grid grid-cols-3 gap-2.5 pt-1">
                <div className="p-2.5 rounded-lg bg-card-bg border border-card-border flex flex-col justify-between">
                  <span className="text-[10px] font-bold font-mono text-foreground">{formData.metric1Val || "$0"}</span>
                  <span className="text-[8px] text-foreground/40 font-mono leading-none mt-0.5 truncate">{formData.metric1Lab || "Metric #1"}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-card-bg border border-card-border flex flex-col justify-between">
                  <span className="text-[10px] font-bold font-mono text-foreground">{formData.metric2Val || "0+"}</span>
                  <span className="text-[8px] text-foreground/40 font-mono leading-none mt-0.5 truncate">{formData.metric2Lab || "Metric #2"}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-card-bg border border-card-border flex flex-col justify-between">
                  <span className="text-[10px] font-bold font-mono text-foreground">{formData.metric3Val || "0%"}</span>
                  <span className="text-[8px] text-foreground/40 font-mono leading-none mt-0.5 truncate">{formData.metric3Lab || "Metric #3"}</span>
                </div>
              </div>
            </div>

            {/* AI representative preview container */}
            <div className="border-t border-card-border/40 pt-4 space-y-2 text-left">
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-accent uppercase tracking-wider font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-glow" />
                {formData.botName || "Digital Representative"}
              </div>
              <div className="p-3 rounded-lg bg-card-bg/50 border border-card-border/40 text-[10px] text-foreground/75 leading-relaxed font-sans italic">
                "Hello, I represent {formData.fullName || "the executive"}. Under custom parameters, my instruction is: {formData.systemPrompt || "ready to answer."}"
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
