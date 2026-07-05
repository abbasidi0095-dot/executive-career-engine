export interface Socials {
  linkedin?: string;
  github?: string;
  email?: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface FullCaseStudy {
  problem: string;
  action: string;
  result: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  role: string;
  metrics: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  fullCaseStudy: FullCaseStudy;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface AIEnvoy {
  botName: string;
  systemPromptOverride?: string;
  suggestedPrompts: string[];
}

export interface ProfileMeta {
  slug: string;
  theme: string;
  primaryColor: string;
  customDomain?: string;
}

export interface Profile {
  meta: ProfileMeta;
  personal: {
    fullName: string;
    currentTitle: string;
    location: string;
    avatarUrl?: string;
    tagline: string;
    shortBio: string;
    socials: Socials;
  };
  metrics: Metric[];
  caseStudies: CaseStudy[];
  experience: Experience[];
  aiEnvoy: AIEnvoy;
}

// Memory-based store on server side + local storage sync on client side (safe for SSR)
let localProfiles: Record<string, Profile> = {};

// In-memory initial profile for Alex Smith
const defaultAlexSmith: Profile = {
  meta: {
    slug: "alex-smith",
    theme: "dark-editorial",
    primaryColor: "#D4AF37",
    customDomain: "alexsmith.com",
  },
  personal: {
    fullName: "Alex Smith",
    currentTitle: "VP of Product, AI Platforms",
    location: "San Francisco, CA",
    tagline: "Architecting hyper-scale AI infrastructure that drives $120M+ ARR.",
    shortBio: "Over 12 years of experience leading cross-functional engineering and product teams at top-tier startups and Fortune 500 tech companies.",
    socials: {
      linkedin: "https://linkedin.com/in/alexsmith",
      github: "https://github.com/alexsmith",
      email: "alex@smith.com",
    },
  },
  metrics: [
    { value: "$120M+", label: "ARR Growth Managed" },
    { value: "40+", label: "Engineers & PMs Led" },
    { value: "99.99%", label: "SLA Infrastructure Delivery" },
  ],
  caseStudies: [
    {
      id: "project-alpha",
      title: "Scaling enterprise LLM orchestration layers",
      role: "Lead Product Architect",
      metrics: "$14M saved in compute costs",
      description: "Led the redesign and migration of legacy monolithic data pipelines to a distributed, event-driven orchestration layer on Kubernetes.",
      tags: ["Next.js", "Python", "Kubernetes", "LLMs"],
      fullCaseStudy: {
        problem: "Legacy API bottlenecks were causing 22% model timeout failures during peak demand times, stalling customer retention and blowing through high inference budgets.",
        action: "Abstracted the inference layer and implemented an asymmetric redis caching queue. Deployed custom GPU dynamic slicing models to autoscale container replicas.",
        result: "Reduced model response timeouts to <0.01% and slashed GPU idle time, saving $14M in annual compute costs while scaling active throughput to 50k RPS.",
      },
    },
    {
      id: "project-beta",
      title: "Rebuilding payment routing mechanics",
      role: "Principal PM, Stripe Core",
      metrics: "1.2% checkout conversion lift",
      description: "Designed a multi-lane algorithmic payment routing protocol that automatically falls back to secondary payment rails in cases of acquirer down-times.",
      tags: ["TypeScript", "Distributed Systems", "SQL", "APIs"],
      fullCaseStudy: {
        problem: "Intermittent payment gateways and acquirer bank outages caused high transaction fail rates during heavy cart moments, translating to lost brand trust.",
        action: "Pioneered a smart dynamic routing system that analyzes real-time acquirer health signals and switches network pathways in milliseconds.",
        result: "Safeguarded $15B+ in payout volume, driving a 1.2% absolute conversion lift on checkout pages across 42 countries with zero platform degradation.",
      },
    },
    {
      id: "project-gamma",
      title: "Next-gen analytical visual cockpit",
      role: "VP of Product Engineering",
      metrics: "60% reduction in reporting overhead",
      description: "Crafted a real-time analytics visualizer for logistics dashboards, combining high-speed canvas rendering with lightweight state synchronization.",
      tags: ["React", "WebGL", "Rust", "WebAssembly"],
      fullCaseStudy: {
        problem: "Legacy dashboard charts choked when rendering more than 10,000 live logistics nodes, inducing heavy browser jank and frustrating ops managers.",
        action: "Rebuilt the front-end plotting engine from SVG to WebGL using Rust compiled to WebAssembly, optimizing memory layouts for raw canvas frames.",
        result: "Unlocked fluid 60fps rendering of 500,000+ real-time assets, removing dashboard crashes entirely and reducing standard report creation times by 60%.",
      },
    },
  ],
  experience: [
    {
      company: "Stripe",
      role: "Principal PM",
      period: "2022 - Present",
      bullets: [
        "Scaled global payout APIs to process $15B+ in annual transaction volume with zero downtime.",
        "Pioneered cross-functional launch of machine-learning fraud detection systems, reducing chargebacks by 18%.",
        "Managed a unified group of 45 engineers, designers, and marketers in expanding localized banking integrations across APAC.",
      ],
    },
    {
      company: "Vercel",
      role: "Director of Product, Edge Network",
      period: "2019 - 2022",
      bullets: [
        "Designed and scaled core features of serverless edge routing systems, improving LCP scores by 35% on millions of active sites.",
        "Launched Next.js Middleware and ISR capabilities, resulting in a 4x improvement in deployment velocity for corporate customers.",
      ],
    },
  ],
  aiEnvoy: {
    botName: "Alex's Digital Envoy",
    systemPromptOverride: "You are Alex's professional agent. You write in a highly analytical, precise, and confident tone. You never make up details about Alex's career.",
    suggestedPrompts: [
      "Tell me about Alex's impact at Stripe.",
      "How does Alex manage large technical teams?",
      "What is Alex's leadership style?",
      "Is Alex open to contract consulting?",
    ],
  },
};

// Initialize server-side memory
localProfiles["alex-smith"] = defaultAlexSmith;

// Safe wrapper to get database access
export async function getProfile(slug: string): Promise<Profile | null> {
  const normalizedSlug = slug.toLowerCase();

  // If in browser, sync from localStorage if present
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(`profile_${normalizedSlug}`);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Error reading localStorage:", e);
    }
  }

  // Fallback/Server-side lookup
  return localProfiles[normalizedSlug] || null;
}

export async function saveProfile(profile: Profile): Promise<void> {
  const slug = profile.meta.slug.toLowerCase();
  localProfiles[slug] = profile;

  // If in browser, write to localStorage
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(`profile_${slug}`, JSON.stringify(profile));
      
      // Also maintain a directory index of custom slugs
      const directoryStr = localStorage.getItem("profiles_directory") || "[]";
      const directory = JSON.parse(directoryStr) as string[];
      if (!directory.includes(slug)) {
        directory.push(slug);
        localStorage.setItem("profiles_directory", JSON.stringify(directory));
      }
    } catch (e) {
      console.error("Error saving to localStorage:", e);
    }
  }
}

export async function getAllProfiles(): Promise<Profile[]> {
  // Safe extraction for local directory listing
  const profiles = Object.values(localProfiles);

  if (typeof window !== "undefined") {
    try {
      const directoryStr = localStorage.getItem("profiles_directory") || "[]";
      const directory = JSON.parse(directoryStr) as string[];
      const storageProfiles: Profile[] = [];
      
      for (const slug of directory) {
        const stored = localStorage.getItem(`profile_${slug}`);
        if (stored) {
          storageProfiles.push(JSON.parse(stored));
        }
      }
      
      // Merge lists uniquely by slug
      const combined = [...profiles, ...storageProfiles];
      const seen = new Set<string>();
      return combined.filter((p) => {
        const slug = p.meta.slug.toLowerCase();
        if (seen.has(slug)) return false;
        seen.add(slug);
        return true;
      });
    } catch (e) {
      console.error("Error reading directory from localStorage:", e);
    }
  }

  return profiles;
}
