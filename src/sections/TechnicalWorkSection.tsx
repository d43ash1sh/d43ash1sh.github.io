"use client";

import { motion } from "framer-motion";
import personalEn from "@/data/personal.json";
import personalAs from "@/data/personal_as.json";
import { useLanguage } from "@/lib/LanguageContext";
import { ShieldAlert, Search, Terminal, Cpu, CheckCircle2, ArrowUpRight } from "lucide-react";

export function TechnicalWorkSection() {
  const { language } = useLanguage();
  const personal = language === "EN" ? personalEn : personalAs;
  const { rea, agentSearch, mcp } = personal.technicalWork;

  return (
    <section id="systems" className="w-full border-b border-border bg-background py-20">
      <div className="container mx-auto max-w-5xl px-4 md:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-mono text-muted-foreground mb-3">
            <span>03</span>
            <span>{"//"}</span>
            <span>{language === "EN" ? "ENGINEERING SHOWCASE" : "কাৰিকৰী বিশ্লেষণ"}</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            {language === "EN" ? "Deep Systems, Security & Tooling" : "ছিষ্টেম, ছিকিউৰিটি আৰু টুলিং"}
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl text-sm md:text-base">
            {language === "EN"
              ? "Evidence-backed investigations in reverse engineering, autonomous search engines, and Model Context Protocol (MCP) integrations."
              : "ৰিভাৰ্ছ ইঞ্জিনিয়াৰিং, স্বায়ত্তশাসিত সন্ধান ইঞ্জিন আৰু মডেল কণ্টেক্সট প্ৰটোকল (MCP) একত্ৰীকৰণৰ প্ৰমাণভিত্তিক বিশ্লেষণ।"}
          </p>
        </motion.div>

        <div className="space-y-12">
          
          {/* Card 1: REA Reverse Engineering Audit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border bg-muted/15 p-6 md:p-8 shadow-sm hover:border-foreground/20 transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div className="flex items-start gap-3.5">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-red-500 shadow-xs">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-bold tracking-tight">{rea.title}</h3>
                    <span className="inline-flex items-center rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-medium text-red-500 border border-red-500/20">
                      {rea.status}
                    </span>
                  </div>
                  <p className="text-sm font-mono text-muted-foreground mt-0.5">{rea.subtitle}</p>
                </div>
              </div>
              <div className="text-xs font-mono text-muted-foreground/80 bg-background/80 px-3 py-1.5 rounded-lg border border-border shrink-0">
                {rea.tooling}
              </div>
            </div>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 font-sans">
              {rea.summary}
            </p>

            <div className="rounded-xl border border-border/80 bg-background/60 p-4 md:p-5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3 font-semibold">
                {language === "EN" ? "Key Audit Findings & Architecture" : "মুখ্য অডিট তথ্য আৰু আৰ্কিটেকচাৰ"}
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-foreground/90 font-mono">
                {rea.findings.map((finding, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                    <span className="text-xs leading-relaxed">{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Card 2: Agent Search Engine */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border bg-muted/15 p-6 md:p-8 shadow-sm hover:border-foreground/20 transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div className="flex items-start gap-3.5">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-indigo-500 shadow-xs">
                  <Search className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-bold tracking-tight">{agentSearch.title}</h3>
                    <span className="inline-flex items-center rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-medium text-indigo-500 border border-indigo-500/20">
                      {agentSearch.status}
                    </span>
                  </div>
                  <p className="text-sm font-mono text-muted-foreground mt-0.5">{agentSearch.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/d43ash1sh/agent-search"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium border border-border bg-background px-3 py-1.5 rounded-lg hover:border-foreground/30 transition-colors"
                >
                  <span>Repository</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 font-sans">
              {agentSearch.summary}
            </p>

            <div className="rounded-xl border border-border/80 bg-background/60 p-4 md:p-5 mb-5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3 font-semibold">
                {language === "EN" ? "Engine Architecture & Capabilities" : "ইঞ্জিন আৰ্কিটেকচাৰ আৰু কাৰ্যক্ষমতা"}
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-foreground/90 font-mono">
                {agentSearch.capabilities.map((cap, cIdx) => (
                  <li key={cIdx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-indigo-500 mt-0.5" />
                    <span className="text-xs leading-relaxed">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/50 text-xs font-mono text-muted-foreground">
              <span className="font-semibold text-foreground">{language === "EN" ? "Active Endpoints:" : "সক্ৰিয় এণ্ডপইণ্ট:"}</span>
              {agentSearch.endpoints.map((ep, eIdx) => (
                <code key={eIdx} className="rounded bg-muted px-2 py-0.5 text-foreground/80">
                  {ep}
                </code>
              ))}
            </div>
          </motion.div>

          {/* Card 3: Model Context Protocol (MCP) Workflows */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border bg-muted/15 p-6 md:p-8 shadow-sm hover:border-foreground/20 transition-all"
          >
            <div className="flex items-start gap-3.5 mb-6">
              <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-purple-500 shadow-xs">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight">{mcp.title}</h3>
                <p className="text-sm font-mono text-muted-foreground mt-0.5">{mcp.subtitle}</p>
              </div>
            </div>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 font-sans">
              {mcp.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mcp.servers.map((srv, sIdx) => (
                <div
                  key={sIdx}
                  className="rounded-xl border border-border/80 bg-background/60 p-4 hover:border-foreground/30 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal className="h-4 w-4 text-purple-500" />
                    <h5 className="font-mono text-sm font-bold text-foreground">{srv.name}</h5>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{srv.purpose}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
