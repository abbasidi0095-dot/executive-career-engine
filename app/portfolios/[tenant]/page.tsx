import { getProfile } from "@/lib/dbMock";
import Hero from "@/components/Hero";
import BentoMetrics from "@/components/BentoMetrics";
import StickyStackCaseStudies from "@/components/StickyStackCaseStudies";
import ExperienceList from "@/components/ExperienceList";
import AIEnvoyChat from "@/components/AIEnvoyChat";
import { EnvelopeSimple, ArrowRight, UserPlus, Warning } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Metadata } from "next";

interface PortfolioPageProps {
  params: Promise<{
    tenant: string;
  }>;
}

// Generate static parameters for Next.js static HTML export
export async function generateStaticParams() {
  return [
    { tenant: "alex-smith" },
  ];
}

// Generate dynamic metadata for search engines
export async function generateMetadata({ params }: PortfolioPageProps): Promise<Metadata> {
  const { tenant } = await params;
  const profile = await getProfile(tenant);

  if (!profile) {
    return {
      title: "Claim Subdomain | Executive Career Engine",
    };
  }

  return {
    title: `${profile.personal.fullName} | ${profile.personal.currentTitle}`,
    description: profile.personal.tagline,
  };
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  const { tenant } = await params;
  const profile = await getProfile(tenant);

  // If subdomain is not yet registered, serve an elite, high-converting invite page
  if (!profile) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-center items-center px-6 py-12 relative overflow-hidden font-sans dark-theme">
        {/* Abstract design layout matching our theme */}
        <div className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] rounded-full bg-accent-muted blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] rounded-full bg-accent-muted blur-[120px] pointer-events-none" />
        <div className="grain-overlay" />

        <div className="max-w-2xl text-center space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider bg-accent-muted border border-accent/20 text-accent">
            <Warning size={14} />
            Subdomain Available
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-serif italic text-accent font-medium leading-none">
              {tenant}.localhost
            </h1>
            <p className="text-xl sm:text-2xl font-light tracking-tight max-w-[20ch] mx-auto text-foreground/80">
              This cinematic executive subdomain hasn't been claimed yet.
            </p>
          </div>

          <p className="text-base text-foreground/50 max-w-[45ch] mx-auto leading-relaxed">
            Stand out to elite tech recruiters and hiring managers. Claim this custom domain, configure your dynamic GSAP bento portfolio, and train your AI Envoy in minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
            <Link
              href="/onboarding"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm bg-[#D4AF37] text-[#0A0A0B] hover:bg-[#C5A880] transition-colors duration-300"
            >
              <UserPlus size={18} weight="fill" />
              Claim Subdomain Now
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 transition-colors duration-300"
            >
              Explore Engine Marketing
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { personal, meta, metrics, caseStudies, experience, aiEnvoy } = profile;
  const isDark = meta.theme === "dark-editorial";

  return (
    <div className={`min-h-screen relative font-sans ${isDark ? "dark-theme" : ""}`}>
      {/* Dynamic backdrop base */}
      <div className="absolute inset-0 bg-background pointer-events-none -z-20" />
      
      {/* Premium SVG noise overlay */}
      <div className="grain-overlay" />

      {/* Modern Minimal Layout Container */}
      <main className="relative pb-24">
        <Hero profile={profile} />
        
        {metrics && metrics.length > 0 && (
          <BentoMetrics metrics={metrics} />
        )}

        {caseStudies && caseStudies.length > 0 && (
          <StickyStackCaseStudies caseStudies={caseStudies} />
        )}

        {experience && experience.length > 0 && (
          <ExperienceList experience={experience} />
        )}

        {/* Dynamic Executive Footer */}
        <footer className="mt-16 border-t border-card-border pt-16 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-8">
            <div className="space-y-2">
              <h4 className="font-serif italic text-xl text-accent font-medium">
                {personal.fullName}
              </h4>
              <p className="text-sm text-foreground/50 font-mono">
                {personal.currentTitle} • {personal.location}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/portfolios/${tenant}/resume`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider bg-card-bg border border-card-border text-foreground/80 hover:bg-card-border transition-all"
              >
                ATS-Proof PDF Resume
              </Link>
              {personal.socials.email && (
                <a
                  href={`mailto:${personal.socials.email}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider bg-accent text-background hover:opacity-90 transition-all"
                >
                  <EnvelopeSimple size={14} />
                  Initiate Secure Channel
                </a>
              )}
            </div>
          </div>
          <div className="border-t border-card-border/40 py-6 flex flex-col sm:flex-row justify-between text-xs text-foreground/40 font-mono gap-4">
            <p>© {new Date().getFullYear()} {personal.fullName}. Powered by Executive Career Envoy.</p>
            <p>End-to-End Cryptographically Attested</p>
          </div>
        </footer>
      </main>

      {/* Interactive AI Envoy Sidebar Widget */}
      <AIEnvoyChat aiEnvoy={aiEnvoy} profile={profile} />
    </div>
  );
}
