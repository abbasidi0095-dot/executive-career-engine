"use client";

import { useState, useRef, useEffect } from "react";
import { ChatTeardropText, X, PaperPlaneRight, Robot, User, Prohibit } from "@phosphor-icons/react";
import { AIEnvoy, Profile } from "@/lib/dbMock";
import { AnimatePresence, motion } from "motion/react";

// Client-side heuristic matching engine for 100% functional offline/static hosting
function clientSideHeuristicAgent(prompt: string, profile: Profile): string {
  const query = prompt.toLowerCase();
  const name = profile.personal.fullName;

  // Rule 1: Salary queries
  if (query.includes("salary") || query.includes("compensation") || query.includes("rate") || query.includes("earn")) {
    return `${name} prefers to discuss compensation details directly during introductory calls. Would you like to connect at ${profile.personal.socials.email || "their registered email"}?`;
  }

  // Rule 2: Contact, calendar, email
  if (query.includes("contact") || query.includes("email") || query.includes("hire") || query.includes("reach out") || query.includes("call") || query.includes("schedule")) {
    const emailStr = profile.personal.socials.email ? `email directly at ${profile.personal.socials.email}` : "";
    const linkedinStr = profile.personal.socials.linkedin ? `connect on LinkedIn at ${profile.personal.socials.linkedin}` : "";
    const options = [emailStr, linkedinStr].filter(Boolean).join(" or ");
    return `To schedule an introductory call or discuss opportunities with ${name}, you can ${options || "reach out via their social channels"}.`;
  }

  // Rule 3: Specific company queries
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
    const allTags = Array.from(new Set(profile.caseStudies.flatMap(s => s.tags)));
    return `${name} operates at the nexus of product strategy and distributed software systems. Their hands-on technical stack includes: ${allTags.join(", ")}.`;
  }

  // Default synthesis fallback
  return `Regarding ${name}'s career as ${profile.personal.currentTitle}: They manage high-throughput initiatives and are currently based in ${profile.personal.location}. Tagline overview: "${profile.personal.tagline}". Feel free to inquire about their specific roles at Vercel/Stripe or their core case studies.`;
}

interface AIEnvoyChatProps {
  aiEnvoy: AIEnvoy;
  profile: Profile;
}

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function AIEnvoyChat({ aiEnvoy, profile }: AIEnvoyChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with a friendly welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          sender: "bot",
          text: `Hello, I am ${profile.personal.fullName}'s Digital Envoy. I can brief you on their career metrics, leadership style, or core projects. Try clicking any of the quick-prompt chips above or write a custom question.`,
        },
      ]);
    }
  }, [profile, messages.length]);

  // Scroll to bottom of chat history on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userText = textToSend;
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setIsLoading(true);

    try {
      // Send the query to the serverless proxy endpoint
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userText,
          tenant: profile.meta.slug,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with Envoy API");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
    } catch (err) {
      console.warn("Serverless API not available. Processing locally with client-side heuristic engine:", err);
      const fallbackResponse = clientSideHeuristicAgent(userText, profile);
      setMessages((prev) => [...prev, { sender: "bot", text: fallbackResponse }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Pulsing Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-accent text-background shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 group flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold border border-accent/20"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-background opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-background"></span>
        </span>
        <ChatTeardropText size={20} weight="fill" className="group-hover:rotate-12 transition-transform" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-[150px] transition-all duration-500 ease-out whitespace-nowrap">
          Consult Envoy
        </span>
      </button>

      {/* Slid-over Glassmorphic Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-background/20 backdrop-blur-sm">
            {/* Backdrop click closer */}
            <div className="absolute inset-0 -z-10" onClick={() => setIsOpen(false)} />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="w-full max-w-md h-full glass-dark text-foreground flex flex-col justify-between shadow-2xl relative border-l border-card-border"
              style={{
                background: "rgba(10, 10, 11, 0.95)",
              }}
            >
              {/* Header */}
              <div className="p-6 border-b border-card-border flex justify-between items-center bg-card-bg/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 text-accent">
                    <Robot size={22} weight="fill" />
                  </div>
                  <div>
                    <h3 className="font-serif italic font-medium text-lg text-accent">
                      {aiEnvoy.botName}
                    </h3>
                    <p className="text-[10px] text-foreground/40 font-mono uppercase tracking-widest flex items-center gap-1">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Ready to Brief
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-card-border text-foreground/60 hover:text-foreground transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Chat Message Scrollport */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                {/* Visual Suggested Quick chips container */}
                <div className="space-y-2.5 pb-2">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-foreground/40 block">
                    Suggested Career Queries
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {aiEnvoy.suggestedPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handleSendMessage(prompt)}
                        className="text-left text-xs px-3.5 py-1.5 rounded-lg bg-card-bg border border-card-border text-foreground/80 hover:bg-card-border hover:border-accent/30 transition-all duration-300 font-sans"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-card-border/40 pt-4 space-y-4">
                  {messages.map((msg, i) => {
                    const isBot = msg.sender === "bot";
                    return (
                      <div
                        key={i}
                        className={`flex gap-3 max-w-[85%] ${isBot ? "mr-auto" : "ml-auto flex-row-reverse"}`}
                      >
                        <div
                          className={`p-2 h-fit rounded-lg border flex items-center justify-center ${
                            isBot
                              ? "bg-accent/10 border-accent/20 text-accent"
                              : "bg-card-bg border-card-border text-foreground"
                          }`}
                        >
                          {isBot ? <Robot size={15} weight="fill" /> : <User size={15} />}
                        </div>
                        <div
                          className={`p-3.5 rounded-xl text-sm leading-relaxed ${
                            isBot
                              ? "bg-card-bg border border-card-border/60 text-foreground/90"
                              : "bg-accent text-background border border-accent/20 font-medium"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })}

                  {/* Loading Typing indicator */}
                  {isLoading && (
                    <div className="flex gap-3 max-w-[85%] mr-auto items-center">
                      <div className="p-2 h-fit rounded-lg bg-accent/10 border border-accent/20 text-accent">
                        <Robot size={15} weight="fill" />
                      </div>
                      <div className="bg-card-bg border border-card-border/60 text-foreground/90 p-3.5 rounded-xl text-sm flex gap-1.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Message Entry Panel */}
              <div className="p-4 border-t border-card-border bg-card-bg/30">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(input);
                  }}
                  className="flex gap-2 relative items-center"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Inquire about leadership, metrics, ARR..."
                    className="w-full pl-4 pr-12 py-3 rounded-xl text-sm bg-card-bg border border-card-border text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent focus:ring-1 focus:focus:ring-accent transition-all font-sans"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 p-2 rounded-lg bg-accent text-background disabled:opacity-30 disabled:hover:scale-100 hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    <PaperPlaneRight size={16} weight="fill" />
                  </button>
                </form>
                <span className="text-[9px] font-mono uppercase tracking-widest text-foreground/30 block text-center mt-2.5 flex items-center justify-center gap-1">
                  <Prohibit size={11} />
                  Privacy Locked • Session logs expire instantly
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
