import Link from "next/link";
import { ArrowRight, Sparkle, Robot, FilePdf, ShieldCheck, ArrowSquareOut, ChartLineUp } from "@phosphor-icons/react/dist/ssr";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between relative overflow-hidden font-sans dark-theme">
      
      {/* Background Graphic Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[45vw] rounded-full bg-accent-muted blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[45vw] rounded-full bg-accent-muted blur-[120px] pointer-events-none -z-10" />
      <div className="grain-overlay" />

      {/* Header Bar */}
      <header className="px-6 md:px-16 py-6 border-b border-card-border flex items-center justify-between z-10 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="font-serif italic text-xl text-accent font-semibold">CareerEnvoy</span>
          <span className="text-[9px] font-mono uppercase tracking-widest text-accent bg-accent-muted px-2 py-0.5 rounded-md border border-accent/20">
            Engine v1.0
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider text-foreground/60">
          <Link href="/portfolios/alex-smith" className="hover:text-foreground transition-colors">
            Sandbox Sandbox
          </Link>
          <a href="#features" className="hover:text-foreground transition-colors">
            Architecture
          </a>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">
            Methodology
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

      {/* Main Hero Container */}
      <main className="z-10 flex-1 flex flex-col justify-center">
        
        {/* Landing Hero */}
        <section className="px-6 md:px-16 lg:px-24 py-16 md:py-28 max-w-5xl mx-auto text-center space-y-8">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono tracking-widest bg-accent-muted border border-accent/20 text-accent mx-auto">
            <Sparkle size={14} />
            THE EXECUTIVE CAREER SYSTEM
          </div>

          {/* Headline (Banned generic centered patterns overridden with strong narrative) */}
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

          {/* Interactive CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Link
              href="/onboarding"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium text-sm bg-accent text-background hover:bg-[#C5A880] transition-all duration-300"
            >
              Configure Your Engine
              <ArrowRight size={16} />
            </Link>
            
            <Link
              href="/portfolios/alex-smith"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium text-sm bg-card-bg border border-card-border text-foreground/90 hover:bg-card-border transition-all duration-300"
            >
              Explore Sandbox Sandbox
              <ArrowSquareOut size={16} />
            </Link>
          </div>
        </section>

        {/* Visual Bento Mockup Grid (Features section) */}
        <section id="features" className="px-6 md:px-16 lg:px-24 py-16 max-w-7xl mx-auto w-full border-t border-card-border">
          <div className="mb-12 max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent">System Modules</span>
            <h2 className="text-2xl sm:text-3xl font-serif italic text-foreground mt-1">
              Deep Technical Design Integration
            </h2>
            <p className="text-sm text-foreground/50 mt-1 leading-relaxed">
              Every detail is optimized for recruiting flow and elite corporate conversion.
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

        {/* Methodology / Pipeline overview */}
        <section id="how-it-works" className="px-6 md:px-16 lg:px-24 py-16 max-w-7xl mx-auto w-full border-t border-card-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-accent">Deployment Pipeline</span>
              <h2 className="text-3xl sm:text-4xl font-serif italic text-foreground leading-tight">
                Zero Friction. Instant Launch.
              </h2>
              <p className="text-sm sm:text-base text-foreground/60 leading-relaxed">
                No local developer setup, no complicated GitHub hosting loops, and no monthly fees. Simply enter your credentials, document your metrics via our interactive onboarding portal, and go live on your custom subdomain in seconds.
              </p>
              
              <div className="pt-4 flex items-center gap-4 text-xs font-mono text-accent">
                <span className="flex items-center gap-1.5 bg-accent-muted border border-accent/20 px-3 py-1 rounded-full">
                  <ShieldCheck size={14} />
                  Safe & Encrypted
                </span>
                <span>•</span>
                <span>Deployable offline-first</span>
              </div>
            </div>

            <div className="border border-card-border rounded-2xl p-8 bg-card-bg/20 space-y-6 font-mono text-xs text-foreground/70 relative">
              <div className="absolute right-6 top-6 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <div className="space-y-1.5">
                <p className="text-accent">// CONFIGURATION CONTRACT</p>
                <p className="text-foreground/40">Loading serverless profile schema...</p>
              </div>
              <div className="space-y-1 pl-4 border-l border-card-border text-foreground/50">
                <p>subdomain: "alex.careerenvoy.co"</p>
                <p>currentTitle: "VP of Product, AI Platforms"</p>
                <p>metrics: ["$120M+ ARR", "40+ Engineers"]</p>
                <p>envoyStatus: "ONLINE"</p>
                <p>pdfExport: "ATS_COMPLIANT"</p>
              </div>
              <p className="text-foreground/30">// PIPELINE SECURED BY SSL AND MD5 CHECKSUMS</p>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="px-6 md:px-16 py-16 md:py-24 max-w-5xl mx-auto w-full text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-serif italic text-accent">Ready to upgrade your personal brand?</h2>
          <p className="text-xs sm:text-sm text-foreground/50 max-w-[45ch] mx-auto">
            Take command of your hiring conversations. Build your executive engine and distribute your custom subdomain link to recruiters today.
          </p>
          <div className="pt-4">
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm bg-accent text-background hover:bg-[#C5A880] transition-all duration-300"
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
