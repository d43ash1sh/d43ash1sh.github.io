"use client";

import { motion } from "framer-motion";
import personalEn from "@/data/personal.json";
import personalAs from "@/data/personal_as.json";
import { useLanguage } from "@/lib/LanguageContext";
import { ExternalLink, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { useState } from "react";

export function ProjectsSection() {
  const { language } = useLanguage();
  const personal = language === "EN" ? personalEn : personalAs;
  const [filter, setFilter] = useState<string>("All");

  if (!personal.projects || personal.projects.length === 0) return null;

  const allTags = ["All", "Full-Stack", "Python", "AppSec", "Algorithms", "Open Source"];

  const filteredProjects = personal.projects.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Full-Stack") return p.tags.some(t => t.includes("Full-Stack") || t.includes("Next.js") || t.includes("React"));
    if (filter === "Python") return p.tags.some(t => t.includes("Python") || t.includes("FastAPI"));
    if (filter === "AppSec") return p.tags.some(t => t.includes("Security") || t.includes("AppSec") || t.includes("OSINT"));
    if (filter === "Algorithms") return p.tags.some(t => t.includes("Algorithms") || t.includes("NLP"));
    if (filter === "Open Source") return p.status?.includes("Open Source") || p.status?.includes("মুক্ত উৎস");
    return true;
  });

  return (
    <section id="projects" className="w-full border-b border-border bg-muted/20 py-20">
      <div className="container mx-auto max-w-5xl px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-mono text-muted-foreground mb-3">
              <span>04</span>
              <span>{"//"}</span>
              <span>{language === "EN" ? "PORTFOLIO CODEBASES" : "প্ৰকল্প সংকলন"}</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              {language === "EN" ? "Featured Projects & Platforms" : "প্ৰকল্প আৰু প্লেটফৰ্মসমূহ"}
            </h2>
            <p className="mt-2 text-muted-foreground max-w-xl text-sm md:text-base">
              {language === "EN" 
                ? "Production web applications, regional AI engines, security tools, and interactive 3D simulations." 
                : "প্ৰডাকচন ৱেব এপ্লিকেচন, আঞ্চলিক AI ইঞ্জিন, ছিকিউৰিটি সঁজুলি আৰু ইন্টাৰেক্টিভ ৩D সমাধান।"}
            </p>
          </motion.div>

          {/* Tag filters */}
          <div className="flex flex-wrap gap-1.5 self-start md:self-auto">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`rounded-lg px-3 py-1.5 text-xs font-mono transition-all ${
                  filter === tag
                    ? "bg-foreground text-background font-semibold shadow-xs"
                    : "border border-border bg-background hover:bg-muted text-muted-foreground"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-background p-6 shadow-sm hover:shadow-md hover:border-foreground/25 transition-all"
            >
              <div>
                <div className="mb-4 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-lg font-bold tracking-tight group-hover:text-blue-500 transition-colors">
                      {project.title}
                    </h3>
                    {project.status && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-mono text-muted-foreground border border-border">
                        <Sparkles className="h-2.5 w-2.5 text-blue-500" />
                        {project.status}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
                        title="GitHub Repository"
                        aria-label={`${project.title} GitHub`}
                      >
                        <GithubIcon className="h-4 w-4" />
                      </a>
                    )}
                    {project.url && (
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
                        title="Live Site / Demo"
                        aria-label={`${project.title} Demo`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="mb-6 text-sm text-muted-foreground leading-relaxed font-sans">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/50">
                {project.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex} 
                    className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
