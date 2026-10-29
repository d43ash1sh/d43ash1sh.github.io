"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Loader2 } from "lucide-react";
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
      text: "Hi! I'm Debashish's AI assistant. Ask me anything about his skills, experience, research, or projects!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getFallbackAnswer = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes("skill") || q.includes("stack") || q.includes("tech")) {
      return `Debashish specializes in:\n• Frontend: React, Next.js (App Router), TypeScript, JavaScript, Tailwind CSS, Three.js\n• Backend & APIs: Node.js, REST APIs, Python, FastAPI, Trafilatura\n• Databases: PostgreSQL, Supabase, pgvector, SQL, Redis, SQLite\n• Security: OWASP Top 10, REA (Reverse Engineer Anything), Burp Suite, SSRF Defense\n• Tooling: Model Context Protocol (MCP), Context7, Stitch, Git, Playwright`;
    }
    if (q.includes("project") || q.includes("work") || q.includes("built")) {
      return `Key projects include:\n• OrganLink: Academic healthcare registry with deterministic matching and SHA-256 hash-chain audit trail.\n• Nya Search (ঞ): Assamese-first regional AI search engine.\n• Agent Search: Enterprise agent-native crawl & retrieval engine with Python, FastAPI, Playwright pool, pgvector HNSW, and MCP server.\n• CubeCube: Interactive 3D Rubik's cube solver with Three.js.\n• Adi Voice Project: Indigenous speech corpus collection platform.`;
    }
    if (q.includes("paper") || q.includes("research") || q.includes("publication") || q.includes("conference") || q.includes("jios")) {
      return `Debashish co-authored the peer-reviewed research paper:\n"Innovative host-based intrusion detection systems: Safeguarding networks in the digital Era" published in the Journal of Information and Optimization Sciences (JIOS, DOI: 10.47974/JIOS-1981).\nHe also presented "Browser-Based Data Leak Prevention System for Secure Web Interactions" at ICRTMC-2026 at Jamia Millia Islamia, New Delhi.`;
    }
    if (q.includes("rea") || q.includes("audit") || q.includes("reverse engineer")) {
      return `Debashish conducted a non-invasive architectural audit of administrative surfaces using REA v6.8.0 and Chrome DevTools Protocol (CDP), mapping route trees, crawler ingestion pipelines, and designing an enterprise RBAC remediation architecture.`;
    }
    if (q.includes("mcp") || q.includes("context7") || q.includes("stitch")) {
      return `Debashish develops tools with Model Context Protocol (MCP), including Context7 MCP for technical documentation retrieval, Stitch MCP for design workflows, and agent-native search servers.`;
    }
    if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("reach") || q.includes("social")) {
      return `You can reach Debashish directly at ${personalEn.email} or connect on LinkedIn (linkedin.com/in/debashishbordoloi/) and GitHub (github.com/d43ash1sh). He is open for full-time and freelance opportunities!`;
    }
    return `Debashish is a Full-Stack Developer and Application Security Researcher based in Guwahati, Assam, pursuing an M.Tech in Computer Science at Rajiv Gandhi University. Feel free to ask about his projects, security research, publications, or technical stack!`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");

    const history = messages.map((m) => ({
      role: m.role,
      text: m.text,
    }));

    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, history }),
      });

      if (!response.ok) {
        throw new Error("API route unavailable");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.text }]);
    } catch {
      // Fallback for static GitHub Pages export
      const fallbackText = getFallbackAnswer(userMsg);
      setMessages((prev) => [...prev, { role: "ai", text: fallbackText }]);
    } finally {
      setIsLoading(false);
    }
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
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-border bg-muted/10">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my experience..."
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
