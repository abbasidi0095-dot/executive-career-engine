"use client";

import { Profile } from "@/lib/dbMock";
import { ArrowLeft, Printer, EnvelopeSimple, LinkedinLogo, GithubLogo, MapPin } from "@phosphor-icons/react";
import Link from "next/link";

interface ResumeClientProps {
  profile: Profile;
  tenant: string;
}

export default function ResumeClient({ profile, tenant }: ResumeClientProps) {
  const { personal, metrics, caseStudies, experience } = profile;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans print:bg-white print:text-black">
      {/* 1. Print Control Header Bar (hidden in Print) */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between z-40 max-w-none print:hidden">
        <Link
          href={`/portfolios/${tenant}`}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </Link>

        <div className="flex gap-3">
          <button
            // Print dynamically via browser dialog
            onClick={() => typeof window !== "undefined" && window.print()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider bg-slate-900 text-white hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
          >
            <Printer size={15} />
            Print / Save to PDF
          </button>
        </div>
      </header>

      {/* 2. ATS-Proof Single-Column Resume Canvas */}
      <main className="max-w-[800px] mx-auto bg-white border border-slate-200 my-8 p-12 shadow-sm print:shadow-none print:border-none print:my-0 print:p-0">
        
        {/* Header Block */}
        <section className="border-b-2 border-slate-900 pb-6 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h1 className="text-3xl font-serif font-bold tracking-tight text-slate-900">
                {personal.fullName}
              </h1>
              <p className="text-sm font-mono uppercase tracking-wider text-slate-500 font-medium">
                {personal.currentTitle}
              </p>
            </div>
            
            <div className="text-right text-xs space-y-1.5 text-slate-600 font-mono">
              <p className="flex items-center justify-end gap-1.5">
                <MapPin size={13} />
                {personal.location}
              </p>
              {personal.socials.email && (
                <p className="flex items-center justify-end gap-1.5">
                  <EnvelopeSimple size={13} />
                  {personal.socials.email}
                </p>
              )}
              {personal.socials.linkedin && (
                <p className="flex items-center justify-end gap-1.5">
                  <LinkedinLogo size={13} />
                  {personal.socials.linkedin.replace("https://", "")}
                </p>
              )}
              {personal.socials.github && (
                <p className="flex items-center justify-end gap-1.5">
                  <GithubLogo size={13} />
                  {personal.socials.github.replace("https://", "")}
                </p>
              )}
            </div>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed font-serif italic">
            "{personal.tagline}"
          </p>
        </section>

        {/* Core Achievements (ATS Parsing Optimization Block) */}
        <section className="py-6 border-b border-slate-200 space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
            Key Strategic Achievements
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {metrics.map((m, i) => (
              <div key={i} className="border-l-2 border-slate-300 pl-3">
                <p className="text-lg font-bold font-mono text-slate-900">{m.value}</p>
                <p className="text-[10px] text-slate-500 font-mono leading-tight">{m.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-6 border-b border-slate-200 space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
            Professional Experience
          </h2>

          <div className="space-y-6">
            {experience.map((exp, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-start text-sm">
                  <div>
                    <h3 className="font-bold text-slate-900">{exp.role}</h3>
                    <p className="text-xs italic text-slate-600">{exp.company}</p>
                  </div>
                  <span className="text-xs font-mono text-slate-500">{exp.period}</span>
                </div>

                <ul className="list-disc pl-5 text-xs text-slate-700 space-y-1.5">
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Signature Case Studies Block */}
        <section className="py-6 space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
            Signature Project Outcomes
          </h2>

          <div className="space-y-6">
            {caseStudies.map((study, i) => (
              <div key={i} className="space-y-2 border-l border-slate-200 pl-4">
                <div className="flex justify-between items-start text-xs">
                  <div>
                    <h3 className="font-bold text-slate-900">{study.title}</h3>
                    <p className="text-[10px] font-mono text-slate-500">{study.role}</p>
                  </div>
                  <span className="font-mono font-bold text-slate-900 text-[10px] bg-slate-100 px-2 py-0.5 rounded">
                    {study.metrics}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-700">
                  <p>
                    <strong className="font-mono text-[9px] uppercase tracking-wider text-slate-500 mr-1.5">Problem:</strong>
                    {study.fullCaseStudy.problem}
                  </p>
                  <p>
                    <strong className="font-mono text-[9px] uppercase tracking-wider text-slate-500 mr-1.5">Action:</strong>
                    {study.fullCaseStudy.action}
                  </p>
                  <p>
                    <strong className="font-mono text-[9px] uppercase tracking-wider text-slate-500 mr-1.5">Result:</strong>
                    {study.fullCaseStudy.result}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
