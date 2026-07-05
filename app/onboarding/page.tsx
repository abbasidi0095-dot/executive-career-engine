"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveProfile, Profile } from "@/lib/dbMock";
import { ArrowLeft, ArrowRight, Rocket, Info, IdentificationCard, ChartBar, AppWindow, Cpu } from "@phosphor-icons/react";
import Link from "next/link";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State initialized with empty default structures
  const [formData, setFormData] = useState({
    slug: "",
    fullName: "",
    currentTitle: "",
    location: "",
    tagline: "",
    shortBio: "",
    linkedin: "",
    github: "",
    email: "",
    theme: "dark-editorial",

    // Metrics (Fixed 3 items for aesthetic balance)
    metric1Val: "", metric1Lab: "",
    metric2Val: "", metric2Lab: "",
    metric3Val: "", metric3Lab: "",

    // Case Study 1
    study1Title: "", study1Role: "", study1Metrics: "", study1Desc: "",
    study1Problem: "", study1Action: "", study1Result: "", study1Tags: "Next.js, Python, Kubernetes",

    // Case Study 2
    study2Title: "", study2Role: "", study2Metrics: "", study2Desc: "",
    study2Problem: "", study2Action: "", study2Result: "", study2Tags: "TypeScript, SQL, APIs",

    // AI Envoy Settings
    botName: "Career Envoy AI",
    systemPrompt: "You are the professional representative of the executive. Speak analytically and confidently.",
    prompt1: "Tell me about their key metrics.",
    prompt2: "Explain their leadership philosophy.",
    prompt3: "How do they handle scaling challenges?",
    prompt4: "Is there a direct contact channel?",
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

    // Structure flat form fields into nested Profile schema
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
          title: formData.study1Title || "Scale and Migration Architecture",
          role: formData.study1Role || "Lead Architect",
          metrics: formData.study1Metrics || "Slashed downtime by 40%",
          description: formData.study1Desc || "Redesigned high throughput systems.",
          tags: formData.study1Tags.split(",").map((t) => t.trim()),
          fullCaseStudy: {
            problem: formData.study1Problem || "Legacy databases were locking up under concurrent transaction loads.",
            action: formData.study1Action || "Implemented asynchronous task worker queues and Redis isolation caches.",
            result: formData.study1Result || "Secured 99.99% system availability and handled 3x throughput traffic.",
          },
        },
        ...(formData.study2Title
          ? [
              {
                id: "project-2",
                title: formData.study2Title,
                role: formData.study2Role,
                metrics: formData.study2Metrics,
                description: formData.study2Desc,
                tags: formData.study2Tags.split(",").map((t) => t.trim()),
                fullCaseStudy: {
                  problem: formData.study2Problem,
                  action: formData.study2Action,
                  result: formData.study2Result,
                },
              },
            ]
          : []),
      ],
      experience: [
        {
          company: "Enterprise Scaling Solutions",
          role: formData.currentTitle,
          period: "2023 - Present",
          bullets: [
            `Leading continuous execution of core initiatives within ${formData.location}.`,
            `Pioneered integration of scalable tech stacks, resulting in measurable business outcomes: ${formData.metric1Val || "substantial arr lifts"}.`,
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
      // Save profile to database mock
      await saveProfile(newProfile);
      
      // Let states sync and redirect to the newly minted pathway
      setTimeout(() => {
        router.push(`/portfolios/${slug}`);
      }, 800);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between font-sans dark-theme">
      <div className="grain-overlay" />

      {/* Navigation Header */}
      <header className="px-6 md:px-16 py-6 border-b border-card-border flex items-center justify-between z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-foreground/50 hover:text-foreground transition-all"
        >
          <ArrowLeft size={16} />
          Back to Terminal
        </Link>
        <span className="text-xs font-mono uppercase tracking-widest text-accent">
          Step {step} of 4 // {step === 1 ? "Identity" : step === 2 ? "Metrics" : step === 3 ? "Projects" : "Envoy Core"}
        </span>
      </header>

      {/* Main Form container */}
      <main className="max-w-2xl mx-auto w-full px-6 py-12 z-10 flex-1 flex flex-col justify-center">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* STEP 1: Personal Brand Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-accent-muted border border-accent/20 text-accent w-fit">
                  <IdentificationCard size={24} />
                </div>
                <h2 className="text-2xl font-serif italic text-accent">Personal Branding & Identity</h2>
                <p className="text-xs text-foreground/50 uppercase tracking-widest font-mono">
                  Configure your digital core parameters
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 col-span-1 sm:col-span-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-foreground/60 block">
                    Claim Subdomain / Slug
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
                      placeholder="alex-smith"
                      className="w-full pl-32 pr-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all font-mono"
                    />
                  </div>
                  <span className="text-[10px] text-foreground/30 font-mono leading-none block">
                    Alphanumeric and hyphens only. This will establish your live custom pathway.
                  </span>
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
                    placeholder="Alex Smith"
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
                    placeholder="San Francisco, CA"
                    className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-foreground/60 block">
                    Theme Preference
                  </label>
                  <select
                    name="theme"
                    value={formData.theme}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all cursor-pointer"
                  >
                    <option value="dark-editorial">Minimalist Charcoal (Recommended)</option>
                    <option value="light-editorial">Warm Editorial Ivory</option>
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
                    placeholder="Architecting hyper-scale AI platforms that power ARR growth."
                    className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all italic font-serif"
                  />
                </div>

                <div className="space-y-1.5 col-span-1 sm:col-span-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-foreground/60 block">
                    Short Career Summary
                  </label>
                  <textarea
                    required
                    rows={3}
                    name="shortBio"
                    value={formData.shortBio}
                    onChange={handleChange}
                    placeholder="Over a decade of scaling core payout systems, driving technical infrastructure shifts, and managing multi-disciplinary groups across Vercel and Stripe..."
                    className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all resize-none leading-relaxed"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-foreground/60 block">
                    Contact Email
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@smith.com"
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
                    placeholder="https://linkedin.com/in/alex"
                    className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Metrics */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-accent-muted border border-accent/20 text-accent w-fit">
                  <ChartBar size={24} />
                </div>
                <h2 className="text-2xl font-serif italic text-accent">Career Growth Metrics</h2>
                <p className="text-xs text-foreground/50 uppercase tracking-widest font-mono">
                  Input 3 high-impact accomplishments
                </p>
              </div>

              <div className="space-y-6">
                {/* Metric 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border border-card-border p-5 rounded-xl bg-card-bg/25">
                  <div className="col-span-1 space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-accent block">
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
                      Accomplishment Label
                    </label>
                    <input
                      required
                      type="text"
                      name="metric1Lab"
                      value={formData.metric1Lab}
                      onChange={handleChange}
                      placeholder="ARR Growth Managed at Stripe"
                      className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all"
                    />
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border border-card-border p-5 rounded-xl bg-card-bg/25">
                  <div className="col-span-1 space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-accent block">
                      Metric Value #2
                    </label>
                    <input
                      required
                      type="text"
                      name="metric2Val"
                      value={formData.metric2Val}
                      onChange={handleChange}
                      placeholder="40+"
                      className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all font-mono"
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-2 space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-foreground/60 block">
                      Accomplishment Label
                    </label>
                    <input
                      required
                      type="text"
                      name="metric2Lab"
                      value={formData.metric2Lab}
                      onChange={handleChange}
                      placeholder="Engineers & PMs Directly Mentored"
                      className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all"
                    />
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border border-card-border p-5 rounded-xl bg-card-bg/25">
                  <div className="col-span-1 space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-accent block">
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
                      Accomplishment Label
                    </label>
                    <input
                      required
                      type="text"
                      name="metric3Lab"
                      value={formData.metric3Lab}
                      onChange={handleChange}
                      placeholder="API Orchestration Availability Guarded"
                      className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Case Studies */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-accent-muted border border-accent/20 text-accent w-fit">
                  <AppWindow size={24} />
                </div>
                <h2 className="text-2xl font-serif italic text-accent">Signature Project Breakdown</h2>
                <p className="text-xs text-foreground/50 uppercase tracking-widest font-mono">
                  Describe a core leadership case study
                </p>
              </div>

              <div className="space-y-6 border border-card-border p-6 rounded-xl bg-card-bg/15">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 col-span-1 sm:col-span-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-foreground/60 block">
                      Project Title
                    </label>
                    <input
                      required
                      type="text"
                      name="study1Title"
                      value={formData.study1Title}
                      onChange={handleChange}
                      placeholder="Scaling Core API Payment Orchestration Layers"
                      className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all font-semibold"
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
                      placeholder="Principal Architect"
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
                      placeholder="Slashed latency by 35%"
                      className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all font-mono"
                    />
                  </div>

                  <div className="space-y-1.5 col-span-1 sm:col-span-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-foreground/60 block">
                      Short Overview Description
                    </label>
                    <input
                      required
                      type="text"
                      name="study1Desc"
                      value={formData.study1Desc}
                      onChange={handleChange}
                      placeholder="Architected high performance distributed payment routing rails."
                      className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all"
                    />
                  </div>

                  {/* Problem / Action / Result bento compartments */}
                  <div className="space-y-1.5 col-span-1 sm:col-span-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-accent block">
                      The Problem Context
                    </label>
                    <textarea
                      required
                      rows={2}
                      name="study1Problem"
                      value={formData.study1Problem}
                      onChange={handleChange}
                      placeholder="Describe the bottleneck or risk: Legacy monolithic components choked during heavy seasonal traffic surges..."
                      className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all resize-none text-xs leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1.5 col-span-1 sm:col-span-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-accent block">
                      Your Execution Actions
                    </label>
                    <textarea
                      required
                      rows={2}
                      name="study1Action"
                      value={formData.study1Action}
                      onChange={handleChange}
                      placeholder="What exact technical operations you led: Decoupled microservices, implemented dynamic edge caches, and automated fallback pathways..."
                      className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all resize-none text-xs leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1.5 col-span-1 sm:col-span-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-accent block">
                      Verifiable Results
                    </label>
                    <textarea
                      required
                      rows={2}
                      name="study1Result"
                      value={formData.study1Result}
                      onChange={handleChange}
                      placeholder="Quantified outcome of the action: Sustained 99.999% platform SLA and drove $14M in hardware compute saves..."
                      className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all resize-none text-xs leading-relaxed font-semibold"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: AI Envoy Configuration */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-accent-muted border border-accent/20 text-accent w-fit">
                  <Cpu size={24} />
                </div>
                <h2 className="text-2xl font-serif italic text-accent">AI Envoy & Chat Customization</h2>
                <p className="text-xs text-foreground/50 uppercase tracking-widest font-mono">
                  Instruct and prompt your digital ambassador
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-foreground/60 block">
                    Envoy Custom Bot Name
                  </label>
                  <input
                    required
                    type="text"
                    name="botName"
                    value={formData.botName}
                    onChange={handleChange}
                    placeholder="Alex's Digital Envoy"
                    className="w-full px-4 py-3 rounded-lg text-sm bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all font-serif italic font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-foreground/60 block">
                    System Instruction / Persona Override
                  </label>
                  <textarea
                    required
                    rows={3}
                    name="systemPrompt"
                    value={formData.systemPrompt}
                    onChange={handleChange}
                    placeholder="You represent the executive in a highly formal, precise, and analytical tone. Speak confidently about ARR and direct performance..."
                    className="w-full px-4 py-3 rounded-lg text-xs bg-card-bg border border-card-border text-foreground focus:outline-none focus:border-accent transition-all resize-none leading-relaxed font-mono"
                  />
                </div>

                {/* suggested prompt chips */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-accent block">
                    Preset Query Chips (Recruiter Shortcuts)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      required
                      type="text"
                      name="prompt1"
                      value={formData.prompt1}
                      onChange={handleChange}
                      placeholder="Tell me about their key metrics."
                      className="w-full px-4 py-2.5 rounded-lg text-xs bg-card-bg border border-card-border text-foreground focus:outline-none"
                    />
                    <input
                      required
                      type="text"
                      name="prompt2"
                      value={formData.prompt2}
                      onChange={handleChange}
                      placeholder="Explain their leadership style."
                      className="w-full px-4 py-2.5 rounded-lg text-xs bg-card-bg border border-card-border text-foreground focus:outline-none"
                    />
                    <input
                      required
                      type="text"
                      name="prompt3"
                      value={formData.prompt3}
                      onChange={handleChange}
                      placeholder="Dissect the API routing project."
                      className="w-full px-4 py-2.5 rounded-lg text-xs bg-card-bg border border-card-border text-foreground focus:outline-none"
                    />
                    <input
                      required
                      type="text"
                      name="prompt4"
                      value={formData.prompt4}
                      onChange={handleChange}
                      placeholder="How can I schedule a call?"
                      className="w-full px-4 py-2.5 rounded-lg text-xs bg-card-bg border border-card-border text-foreground focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Footer Button Panel */}
          <div className="flex justify-between items-center pt-8 border-t border-card-border">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-mono uppercase tracking-wider bg-card-bg border border-card-border text-foreground/80 hover:bg-card-border transition-colors cursor-pointer"
              >
                Previous Step
              </button>
            ) : (
              <div />
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-mono uppercase tracking-widest font-bold bg-accent text-background hover:bg-accent/80 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>Launching Engine...</>
              ) : step === 4 ? (
                <>
                  Launch Career Engine
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
      </main>

      {/* Footer Info bar */}
      <footer className="px-6 py-6 border-t border-card-border text-center text-[10px] font-mono uppercase tracking-widest text-foreground/30 z-10 flex items-center justify-center gap-1.5">
        <Info size={13} className="text-accent" />
        Encrypted Database Write Tunnel Active
      </footer>
    </div>
  );
}
