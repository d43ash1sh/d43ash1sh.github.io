"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Loader2, RotateCcw } from "lucide-react";
import personalEn from "@/data/personal.json";

interface Message {
  role: "user" | "ai";
  text: string;
  isError?: boolean;
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Hi! I'm AI Debashish, Debashish's portfolio assistant. Ask me anything about his projects, security research, publications, education, or technical skills!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  /**
   * Grounded Portfolio Knowledge Engine
   * Serves as an accurate, context-aware assistant grounded in personal.json
   * when running in static environments (like GitHub Pages where /api/chat does not execute)
   * or when the server API key is unconfigured.
   */
  const getGroundedAnswer = useCallback((query: string, history: Message[]): string => {
    const q = query.toLowerCase().trim();

    // 1. Greetings & Conversational Openers
    if (/^(hi|hello|hey|greetings|hola|namaste|morning|evening|afternoon)(\s|[!?,.]|$)/i.test(q)) {
      return "Hello! Great to meet you. I can tell you all about Debashish's projects (like OrganLink or Agent Search), his security research at OWASP, his peer-reviewed JIOS publication, his M.Tech studies, or his technical stack. What would you like to explore?";
    }

    if (q.includes("who are you") || q.includes("your name") || q.includes("who made you")) {
      return "I'm AI Debashish, an AI assistant representing Debashish Bordoloi—a Full-Stack Developer and Application Security Researcher based in Guwahati, Assam, currently pursuing an M.Tech in Computer Science at Rajiv Gandhi University.";
    }

    // 2. Education & Academic Background
    if (
      q.includes("education") ||
      q.includes("degree") ||
      q.includes("university") ||
      q.includes("college") ||
      q.includes("academic") ||
      q.includes("cgpa") ||
      q.includes("sgpa") ||
      q.includes("m.tech") ||
      q.includes("mca") ||
      q.includes("bca") ||
      q.includes("study")
    ) {
      return `Debashish's educational background:\n• M.Tech in Computer Science: Rajiv Gandhi University, Arunachal Pradesh (2025 - Present)\n• Master of Computer Applications (MCA): Rajiv Gandhi University (2023 - 2025, CGPA: 7.80)\n• Bachelor of Computer Applications (CTIS): Assam Down Town University (2020 - 2023, CGPA: 8.07)\n\nHis research focuses on application security, intrusion detection systems, and agent-native retrieval architectures.`;
    }

    // 3. Specific Projects
    if (q.includes("organlink") || q.includes("organ link") || q.includes("organ-link")) {
      return `OrganLink is an academic healthcare registry and transparent recipient matching research prototype developed by Debashish:\n• Architecture: Built with Next.js, TypeScript, PostgreSQL, and Supabase.\n• Core Features: Deterministic matching algorithm and a tamper-evident SHA-256 hash-chain audit trail.\n• Purpose: Researches transparency and accountability in organ recipient prioritization (strictly an academic research model, not for clinical allocation).\n• Live demo: https://organ-link-seven.vercel.app/login`;
    }

    if (q.includes("agent search") || q.includes("agent-search")) {
      return `Agent Search Engine is an enterprise-grade, agent-native crawl, extraction, and hybrid retrieval engine built by Debashish:\n• Backend: Python & FastAPI with an isolated Playwright Chromium pool for resilient web scraping.\n• Storage & Search: PostgreSQL with pgvector and HNSW indexing for hybrid BM25 + semantic similarity search.\n• Model Context Protocol: Features a native MCP server for seamless agentic LLM tool use.`;
    }

    if (q.includes("nya search") || q.includes("nya") || q.includes("ঞ")) {
      return `Nya Search (ঞ) is an Assamese-first regional AI search engine developed by Debashish:\n• Designed for Assamese, English, Romanized Assamese, and code-mixed queries.\n• Features bilingual query normalization, hybrid BM25/vector retrieval, and source-grounded answers with citations.\n• Live demo: https://nya-search.vercel.app/`;
    }

    if (q.includes("cubecube") || q.includes("cube cube") || q.includes("rubik")) {
      return `CubeCube is an interactive 3D Rubik's Cube tutor and solver:\n• Built with React, Three.js, and TypeScript.\n• Features step-by-step solving logic, 3D interactive controls, and real-time algorithm visualization.\n• Live demo: https://cubecube.vercel.app/`;
    }

    if (q.includes("adi voice") || q.includes("adi-voice")) {
      return `The Adi Voice Project is a specialized full-stack platform designed to collect, aggregate, and review localized speech datasets for the indigenous Adi language in Northeast India to support low-resource NLP research.\nRepository: https://github.com/d43ash1sh/Adi-Voice-Project`;
    }

    if (q.includes("authhub") || q.includes("clipninja") || q.includes("speedpulse") || q.includes("subz")) {
      return `Additional open-source tools built by Debashish include:\n• AuthHub: GitHub-integrated portfolio dashboard with OAuth and repo analytics (debashishhub.vercel.app)\n• ClipNinja: Web tool for trimming and previewing video segments (github.com/d43ash1sh/ClipNinja)\n• SpeedPulse: Network speed test and analytics visualization (speed-pulse-iota.vercel.app)\n• Subz: Bash-based reconnaissance CLI for subdomain enumeration (github.com/d43ash1sh/subdomain_enumeration)`;
    }

    // 4. Reverse Engineering & REA Audit
    if (
      q.includes("rea") ||
      q.includes("reverse engineer") ||
      q.includes("audit") ||
      q.includes("cdp") ||
      q.includes("administrative surface")
    ) {
      return `Debashish conducted a non-invasive architectural audit of administrative surfaces using REA (Reverse Engineer Anything) v6.8.0 and Chrome DevTools Protocol (CDP):\n• Analysis: Mapped route trees, client-side permission structures, and crawler ingestion pipelines.\n• Findings: Identified state synchronization flaws and designed an enterprise RBAC remediation architecture with strict least-privilege principles.`;
    }

    // 5. Model Context Protocol (MCP)
    if (q.includes("mcp") || q.includes("model context protocol") || q.includes("context7") || q.includes("stitch")) {
      return `Debashish builds and integrates with Model Context Protocol (MCP) ecosystems:\n• Context7 MCP: Real-time retrieval of up-to-date documentation for modern developer frameworks.\n• Stitch MCP: Seamless UI design system integration workflows.\n• Agent Search MCP: Native MCP server exposing agent-ready semantic search and crawling capabilities to LLMs.`;
    }

    // 6. Publications & Conference Presentations
    if (
      q.includes("paper") ||
      q.includes("publication") ||
      q.includes("journal") ||
      q.includes("jios") ||
      q.includes("intrusion detection") ||
      q.includes("doi") ||
      q.includes("conference") ||
      q.includes("jamia") ||
      q.includes("icrtmc")
    ) {
      return `Debashish's peer-reviewed research and presentations:\n• Peer-Reviewed Paper: "Innovative host-based intrusion detection systems: Safeguarding networks in the digital Era" published in Journal of Information and Optimization Sciences (JIOS, DOI: 10.47974/JIOS-1981).\n• Conference Presentation: "Browser-Based Data Leak Prevention System for Secure Web Interactions" presented at ICRTMC-2026, Jamia Millia Islamia, New Delhi.`;
    }

    // 7. Security Research & Bug Hunting
    if (
      q.includes("security") ||
      q.includes("owasp") ||
      q.includes("bugcrowd") ||
      q.includes("hackerone") ||
      q.includes("vulnerability") ||
      q.includes("pentest") ||
      q.includes("cert")
    ) {
      return `Debashish's application security credentials and research:\n• Community Leadership: OWASP Chapter Leader for the OWASP Foundation.\n• Bug Bounty: Active researcher on Bugcrowd (bugcrowd.com/d43ash1sh) and HackerOne (hackerone.com/d4shh4x0r).\n• Certifications: API Penetration Testing (APIsec University), Ethical Hacking Essentials (EC-Council), Network Defense Essentials (EC-Council).\n• Focus Areas: OWASP Top 10, SSRF defense, access control enforcement, and host-based intrusion detection.`;
    }

    // 8. General Projects Query
    if (q.includes("project") || q.includes("built") || q.includes("work") || q.includes("portfolio")) {
      return `Key projects created by Debashish:\n1. OrganLink: Academic healthcare registry with deterministic matching and SHA-256 hash-chain audit trail.\n2. Agent Search: Enterprise agent-native crawl & retrieval engine with FastAPI, Playwright pool, and pgvector MCP server.\n3. Nya Search (ঞ): Assamese-first regional AI search engine.\n4. CubeCube: Interactive 3D Rubik's cube solver with Three.js.\n5. Adi Voice Project: Indigenous speech corpus collection platform.\n\nAsk about any specific project for architectural details!`;
    }

    // 9. Tech Stack & Skills
    if (q.includes("skill") || q.includes("stack") || q.includes("technolog") || q.includes("tools")) {
      return `Debashish's technical stack:\n• Frontend: React, Next.js (App Router), TypeScript, JavaScript, Tailwind CSS, Three.js\n• Backend & APIs: Node.js, Python, FastAPI, REST APIs, Trafilatura\n• Databases: PostgreSQL, Supabase, pgvector, Redis, SQL, SQLite\n• Security: OWASP Top 10, REA v6.8.0, Burp Suite, API Pentesting, SSRF Defense\n• Tooling & Cloud: Model Context Protocol (MCP), Context7, Stitch, Playwright, Git, Vercel, GCP`;
    }

    // 10. Contact, Socials & Hiring
    if (
      q.includes("contact") ||
      q.includes("email") ||
      q.includes("hire") ||
      q.includes("reach") ||
      q.includes("social") ||
      q.includes("linkedin") ||
      q.includes("github") ||
      q.includes("x") ||
      q.includes("twitter")
    ) {
      return `You can connect with Debashish directly:\n• Email: ${personalEn.email}\n• LinkedIn: https://www.linkedin.com/in/debashishbordoloi/\n• GitHub: https://github.com/d43ash1sh\n• Instagram: https://www.instagram.com/debashishbordoloi007/\n• X (Twitter): https://x.com/d43a_io\n\nHe is open for full-time engineering and security research roles!`;
    }

    // 11. Multi-turn Follow-up handling (inspect previous assistant message)
    const recentAiMessages = history.filter((m) => m.role === "ai");
    const lastAiText = recentAiMessages.length > 0 ? recentAiMessages[recentAiMessages.length - 1].text.toLowerCase() : "";

    if (
      q.includes("more") ||
      q.includes("tell me more") ||
      q.includes("how does it work") ||
      q.includes("details") ||
      q.includes("explain that") ||
      q.includes("what else") ||
      q.includes("how so")
    ) {
      if (lastAiText.includes("organlink")) {
        return "In OrganLink, the deterministic algorithm eliminates human discretionary bias in recipient scoring. The audit trail creates a SHA-256 hash chaining system across database updates: any modification to recipient records alters downstream hashes, immediately flagging data tampering in administrative reviews.";
      }
      if (lastAiText.includes("agent search")) {
        return "Agent Search isolates dynamic rendering into headless Chromium instances managed by Playwright. Scraped textual content is transformed into vector embeddings stored in pgvector using HNSW indexes, allowing sub-50ms hybrid lexical and semantic similarity queries via its MCP server interface.";
      }
      if (lastAiText.includes("jios") || lastAiText.includes("intrusion detection") || lastAiText.includes("publication")) {
        return "The JIOS paper (DOI: 10.47974/JIOS-1981) examines real-time anomaly detection in host system calls. It evaluates behavioral heuristics to detect zero-day evasion techniques, contrasting signature-based engines with lightweight host-level telemetry.";
      }
      if (lastAiText.includes("rea") || lastAiText.includes("audit")) {
        return "The REA audit mapped 42 administrative route endpoints and observed authorization checks across microservice boundaries. The resulting architecture replaces static token assertions with short-lived cryptographically signed capability grants.";
      }
      if (lastAiText.includes("stack") || lastAiText.includes("frontend") || lastAiText.includes("technologies")) {
        return "On the frontend, Debashish builds with Next.js App Router, TypeScript, and Tailwind CSS with Framer Motion for micro-interactions. On the backend, he leverages Node.js and FastAPI with PostgreSQL/pgvector for low-latency AI and data workflows.";
      }
      if (lastAiText.includes("security") || lastAiText.includes("owasp") || lastAiText.includes("bugcrowd")) {
        return "Debashish's security methodology combines automated dynamic scanning with in-depth manual code and authorization review, focusing on IDOR vulnerabilities, SSRF in microservices, and API authentication logic flaws.";
      }
      if (lastAiText.includes("education") || lastAiText.includes("m.tech")) {
        return "At Rajiv Gandhi University, his M.Tech research specializes in secure host-level architectures, intrusion detection heuristics, and distributed AI agent retrieval systems.";
      }
    }

    // 12. Out-of-Scope / Unrelated Questions
    if (
      q.includes("weather") ||
      q.includes("recipe") ||
      q.includes("movie") ||
      q.includes("capital of") ||
      q.includes("president") ||
      q.includes("poem") ||
      q.includes("song") ||
      q.includes("joke")
    ) {
      return "I'm specialized as Debashish's portfolio assistant, so I'm focused on questions regarding his software engineering projects, application security research, publications, and background. Feel free to ask about any of his work!";
    }

    // 13. Default contextual prompt guidance
    return `Debashish is a Full-Stack Developer and Security Researcher (M.Tech CSE, Rajiv Gandhi University). You can ask me specific questions about:\n• Projects: OrganLink, Agent Search, Nya Search, CubeCube, Adi Voice\n• Security: OWASP chapter work, Bugcrowd/HackerOne findings, REA audit\n• Research: JIOS journal publication on intrusion detection, Jamia Millia presentation\n• Tech Stack: Next.js, Python, FastAPI, Three.js, PostgreSQL, MCP\n\nWhat would you like to know more about?`;
  }, []);

  const handleSend = async (messageToSend?: string) => {
    const userMsg = (messageToSend ?? input).trim();
    if (!userMsg || isLoading) return;

    if (!messageToSend) {
      setInput("");
    }
    setLastFailedMessage(null);

    const updatedMessages = [...messages, { role: "user" as const, text: userMsg }];
    setMessages(updatedMessages);
    setIsLoading(true);

    const historyPayload = messages.map((m) => ({
      role: m.role,
      text: m.text,
    }));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, history: historyPayload }),
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();
      if (data && typeof data.text === "string" && data.text.trim()) {
        setMessages((prev) => [...prev, { role: "ai", text: data.text.trim() }]);
        return;
      }
      throw new Error("Invalid response format");
    } catch {
      // In static deployment (GitHub Pages) or unconfigured API key mode,
      // provide grounded, non-repetitive intelligence based on personal.json
      const answer = getGroundedAnswer(userMsg, updatedMessages);
      setMessages((prev) => [...prev, { role: "ai", text: answer }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 h-14 w-14 rounded-full bg-foreground text-background shadow-2xl flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
            aria-label="Open AI Chat"
          >
            <MessageSquare className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:bottom-8 md:right-8 z-50 md:w-[380px] h-[70vh] md:h-[500px] max-h-[80vh] bg-background border border-border shadow-2xl rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
              <div className="flex items-center gap-2">
                <div className="bg-foreground text-background p-1.5 rounded-full">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">AI Debashish</h3>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Online
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin custom-scrollbar text-sm font-sans">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line leading-relaxed ${
                      msg.role === "user"
                        ? "bg-foreground text-background rounded-br-xs"
                        : "bg-muted border border-border rounded-bl-xs"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] bg-muted border border-border rounded-2xl rounded-bl-xs px-4 py-3 flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-xs">Thinking...</span>
                  </div>
                </div>
              )}

              {lastFailedMessage && (
                <div className="flex justify-center">
                  <button
                    onClick={() => handleSend(lastFailedMessage)}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground bg-muted/60 px-3 py-1.5 rounded-full border border-border transition-colors cursor-pointer"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Retry sending last message
                  </button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-border bg-muted/10">
              <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my projects, research..."
                  className="flex-1 bg-background border border-border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="h-9 w-9 bg-foreground text-background rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity shrink-0 cursor-pointer"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4 -ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
