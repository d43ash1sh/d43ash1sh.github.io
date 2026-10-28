"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Loader2, Info } from "lucide-react";
import personalEn from "@/data/personal.json";

interface Message {
  role: "user" | "ai";
  text: string;
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "ai", 
      text: "Hi! I'm Debashish's portfolio assistant. Ask me about his projects, security research, skills, or research publications!" 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [backendMode, setBackendMode] = useState<"checking" | "live" | "offline">("checking");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Suggested prompt chips
  const promptSuggestions = [
    "What are his core technical skills?",
    "Tell me about the REA security audit",
    "What is the Agent Search engine?",
    "What research papers has he published?",
    "How can I contact Debashish?"
  ];

  // Client-side grounded responder for offline/static deployment
  const getClientSideAnswer = (query: string): string => {
    const q = query.toLowerCase();
    
    if (q.includes("skill") || q.includes("stack") || q.includes("tech")) {
      return `Debashish specializes in:\n• Languages: TypeScript, JavaScript, Python, Bash, SQL, C++\n• Frontend: Next.js (App Router), React, Tailwind CSS, Three.js\n• Backend & APIs: Node.js, FastAPI, RESTful APIs, Trafilatura\n• Databases: PostgreSQL, Supabase, pgvector (HNSW), Redis, SQLite\n• Security: OWASP Top 10, REA (Reverse Engineer Anything), Burp Suite, SSRF Defense`;
    }
    
    if (q.includes("rea") || q.includes("apssb") || q.includes("audit") || q.includes("reverse engineer")) {
      return `Debashish conducted an evidence-backed, non-invasive REA reverse engineering audit of apssb.online using REA v6.8.0 and Chrome DevTools Protocol (CDP). Key findings included a bifurcated admin surface (/admin/current-affairs and /admin/appscce), an automated PIB news crawler pipeline, contrasting authentication mechanisms (symmetric header key vs HTTP-only cookie), and an enterprise remediation architecture.`;
    }

    if (q.includes("agent search") || q.includes("crawler") || q.includes("search engine")) {
      return `Agent Search is an enterprise-grade, agent-native crawl and retrieval engine built with Python, FastAPI, an isolated 3-worker Playwright Chromium pool, PostgreSQL 16 + pgvector HNSW index, Redis URL frontier queues, and native Model Context Protocol (MCP) server support with zero commercial SERP dependencies.`;
    }

    if (q.includes("paper") || q.includes("research") || q.includes("publication") || q.includes("conference") || q.includes("doi")) {
      return `Debashish co-authored the peer-reviewed research paper titled "Innovative host-based intrusion detection systems : Safeguarding networks in the digital Era" published in the Journal of Information and Optimization Sciences (JIOS, Taru Publications, DOI: 10.47974/JIOS-1981, May 2026). He also participated in ICRTMC-2026 at Jamia Millia Islamia, New Delhi.`;
    }

    if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("reach")) {
      return `You can reach Debashish directly at ${personalEn.email} or connect on LinkedIn (linkedin.com/in/debashishbordoloi/) and GitHub (github.com/d43ash1sh). He is open for full-time software engineering and security roles!`;
    }

    if (q.includes("project") || q.includes("nya") || q.includes("organlink") || q.includes("cubecube")) {
      return `Featured projects include:\n1. ঞ (Nya): Assamese-first regional search engine (nya-search.vercel.app)\n2. OrganLink: Secure healthcare network for organ donation (organ-link-seven.vercel.app)\n3. CubeCube: 3D Rubik's cube solver with Three.js (cubecube.vercel.app)\n4. Agent Search: Autonomous search and scraping engine\n5. Adi Voice Project: Speech corpus collection platform for indigenous language preservation`;
    }

    if (q.includes("education") || q.includes("university") || q.includes("college") || q.includes("degree")) {
      return `Debashish is pursuing an M.Tech in Computer Science at Rajiv Gandhi University (2025–Present). He completed his Master of Computer Applications (MCA) at Rajiv Gandhi University (CGPA: 7.80, 2023–2025) and Bachelor of Computer Applications (BCA - CTIS) at Assam Down Town University (CGPA: 8.07, 2020–2023).`;
    }

    return `Thanks for your question! Debashish is a Full Stack Developer and Security Researcher based in Guwahati, Assam. You can explore his verified projects and research in the sections above, or email him directly at ${personalEn.email}.`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const userMsg = (textToSend || input).trim();
    if (!userMsg || isLoading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      if (!response.ok) {
        // If 405 (static host like GitHub Pages) or 503 (unconfigured API key)
        setBackendMode("offline");
        const clientAnswer = getClientSideAnswer(userMsg);
        setMessages((prev) => [
          ...prev,
          { role: "ai", text: clientAnswer }
        ]);
        return;
      }

      const data = await response.json();
      setBackendMode("live");
      setMessages((prev) => [...prev, { role: "ai", text: data.text }]);
    } catch {
      // Offline fallback
      setBackendMode("offline");
      const clientAnswer = getClientSideAnswer(userMsg);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: clientAnswer }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Trigger */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 h-13 w-13 rounded-full bg-foreground text-background shadow-2xl flex items-center justify-center hover:scale-105 transition-transform"
            aria-label="Open Portfolio Assistant"
            title="Chat with Portfolio Assistant"
          >
            <MessageSquare className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:bottom-8 md:right-8 z-50 md:w-[400px] h-[72vh] md:h-[530px] max-h-[85vh] bg-background border border-border shadow-2xl rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/40">
              <div className="flex items-center gap-2.5">
                <div className="bg-foreground text-background p-1.5 rounded-lg">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-tight">Portfolio Assistant</h3>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    {backendMode === "live" ? "Gemini Live" : "Grounded Assistant"}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-muted-foreground hover:bg-muted rounded-lg transition-colors"
                aria-label="Close Assistant"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Static Notice Indicator */}
            {backendMode === "offline" && (
              <div className="bg-muted/50 border-b border-border/70 px-3 py-1.5 text-[11px] font-mono text-muted-foreground flex items-center gap-1.5">
                <Info className="h-3 w-3 text-blue-500 shrink-0" />
                <span>Static host mode: instant answers grounded on portfolio data.</span>
              </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin custom-scrollbar text-sm font-sans">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-xs md:text-sm whitespace-pre-line leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-foreground text-background rounded-br-xs" 
                        : "bg-muted/60 border border-border rounded-bl-xs text-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted/60 border border-border rounded-2xl rounded-bl-xs px-4 py-2.5 flex items-center gap-2 text-muted-foreground text-xs">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-foreground" />
                    <span>Analyzing portfolio knowledge...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Prompt Chips */}
            <div className="px-3 py-2 border-t border-border/40 bg-muted/20 flex gap-1.5 overflow-x-auto scrollbar-none">
              {promptSuggestions.map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleSendMessage(prompt)}
                  className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-mono text-muted-foreground whitespace-nowrap hover:text-foreground hover:border-foreground/30 transition-all shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <div className="p-3 border-t border-border bg-muted/10">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }} 
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about skills, research, or projects..."
                  className="flex-1 bg-background border border-border rounded-full px-3.5 py-2 text-xs md:text-sm outline-none focus:ring-1 focus:ring-foreground/30 transition-all"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="h-8 w-8 bg-foreground text-background rounded-full flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity shrink-0"
                  aria-label="Send Message"
                >
                  <Send className="h-3.5 w-3.5 -ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
