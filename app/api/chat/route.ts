import { NextResponse } from "next/server";
import { getProfile, Profile } from "@/lib/dbMock";

// Simple local heuristic matching engine to simulate a deep LLM agent offline
function fallbackHeuristicAgent(prompt: string, profile: Profile): string {
  const query = prompt.toLowerCase();
  const name = profile.personal.fullName;

  // Rule 1: Salary queries
  if (query.includes("salary") || query.includes("compensation") || query.includes("rate") || query.includes("earn")) {
    return `${name} prefers to handle compensation discussions directly during formal introductory loops. Would you like to schedule an introductory call or correspond via email at ${profile.personal.socials.email || "their registered email"}?`;
  }

  // Rule 2: Contact, calendar, email
  if (query.includes("contact") || query.includes("email") || query.includes("hire") || query.includes("reach out") || query.includes("call") || query.includes("schedule")) {
    const emailStr = profile.personal.socials.email ? `email directly at ${profile.personal.socials.email}` : "";
    const linkedinStr = profile.personal.socials.linkedin ? `connect on LinkedIn at ${profile.personal.socials.linkedin}` : "";
    const options = [emailStr, linkedinStr].filter(Boolean).join(" or ");
    return `To schedule an introductory call or discuss opportunities with ${name}, you can ${options || "reach out via their social channels shown on the footer"}.`;
  }

  // Rule 3: Stripe / Specific company queries
  for (const exp of profile.experience) {
    const compName = exp.company.toLowerCase();
    if (query.includes(compName)) {
      const bulletsStr = exp.bullets.slice(0, 2).map(b => `• ${b}`).join("\n");
      return `At ${exp.company}, ${name} served as ${exp.role}, driving massive execution: \n\n${bulletsStr}\n\nWould you like more details on their tenure there?`;
    }
  }

  // Rule 4: Case Studies / Projects
  for (const study of profile.caseStudies) {
    const studyTitle = study.title.toLowerCase();
    const studyId = study.id.toLowerCase();
    const tags = study.tags.map(t => t.toLowerCase());

    if (
      query.includes(studyId) ||
      query.includes("project") ||
      query.includes("initiative") ||
      query.includes("case study") ||
      query.includes(studyTitle.split(" ")[0]) ||
      tags.some(t => query.includes(t))
    ) {
      return `Concerning the core initiative "${study.title}", ${name} served as ${study.role}, delivering: "${study.metrics}". \n\nProblem context: ${study.fullCaseStudy.problem}\n\nSpecific Action: ${study.fullCaseStudy.action}\n\nOutcome: ${study.fullCaseStudy.result}`;
    }
  }

  // Rule 5: Metrics or quantitative achievements
  if (query.includes("metric") || query.includes("arr") || query.includes("growth") || query.includes("manage") || query.includes("scale") || query.includes("number") || query.includes("revenue")) {
    const metricsStr = profile.metrics.map(m => `• ${m.value} — ${m.label}`).join("\n");
    return `${name}'s career is anchored on verifiable metrics and systematic scale: \n\n${metricsStr}\n\nLet me know if you would like me to dissect the action plans behind any of these achievements.`;
  }

  // Rule 6: Leadership or team size
  if (query.includes("lead") || query.includes("team") || query.includes("management") || query.includes("culture") || query.includes("people")) {
    return `${name}'s leadership philosophy centers on cross-functional alignment, extreme engineering ownership, and building high-trust product cells. They have managed groups numbering up to 40+ people across engineering, product management, and design functions.`;
  }

  // Rule 7: Tech Stack or skills
  if (query.includes("stack") || query.includes("tech") || query.includes("language") || query.includes("skill") || query.includes("code")) {
    const allTags = Array.from(new Set(profile.caseStudies.flatMap(s => studyTags(s))));
    return `${name} operates at the nexus of product strategy and distributed software systems. Their hands-on technical stack includes: ${allTags.join(", ")}.`;
  }

  // Default synthesis fallback
  return `Regarding ${name}'s career as ${profile.personal.currentTitle}: They manage high-throughput initiatives and are currently based in ${profile.personal.location}. Tagline overview: "${profile.personal.tagline}". Feel free to inquire about their specific roles at Vercel/Stripe or their core case studies.`;
}

function studyTags(study: { tags: string[] }): string[] {
  return study.tags;
}

export async function POST(request: Request) {
  try {
    const { prompt, tenant } = await request.json();

    if (!prompt || !tenant) {
      return NextResponse.json({ error: "Missing required parameters: prompt, tenant" }, { status: 400 });
    }

    const profile = await getProfile(tenant);
    if (!profile) {
      return NextResponse.json({ error: "Profile not found for tenant: " + tenant }, { status: 404 });
    }

    const openaiKey = process.env.OPENAI_API_KEY;

    // Mode A: OpenAI Live Connection (if key is set)
    if (openaiKey) {
      try {
        const systemPrompt = `
          You are the AI Envoy (professional representative) for ${profile.personal.fullName}. 
          Your primary role is to answer questions from recruiters and hiring managers confidently, professionally, and precisely.

          CONTEXT DATA:
          ${JSON.stringify(profile, null, 2)}

          CONSTRAINTS:
          1. Base your answers ONLY on the provided context data. Do not invent or assume metrics, roles, or dates.
          2. If the user asks about salary or pricing, respond: "${profile.personal.fullName} prefers to discuss compensation directly. Would you like to schedule a call?" and display their registered email.
          3. Keep responses concise (under 4 sentences) and highly structured.
          4. Never break character. You represent ${profile.personal.fullName}.
        `;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: prompt },
            ],
            temperature: 0.3,
            max_tokens: 350,
          }),
        });

        if (response.ok) {
          const completion = await response.json();
          const botResponse = completion.choices?.[0]?.message?.content;
          if (botResponse) {
            return NextResponse.json({ response: botResponse });
          }
        }
      } catch (err) {
        console.error("OpenAI processing failed, falling back to local heuristic engine:", err);
      }
    }

    // Mode B: Local Heuristic Engine (Bulletproof, instant, offline-safe fallback)
    const fallbackResponse = fallbackHeuristicAgent(prompt, profile);
    return NextResponse.json({ response: fallbackResponse });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
