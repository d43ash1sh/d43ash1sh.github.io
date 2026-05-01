"use client";

import { motion } from "framer-motion";
import personalEn from "@/data/personal.json";
import personalAs from "@/data/personal_as.json";
import { useLanguage } from "@/lib/LanguageContext";
import { ExternalLink } from "lucide-react";

const GithubIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>;

export function ProjectsSection() {
  const { language } = useLanguage();
  const personal = language === "EN" ? personalEn : personalAs;

  if (!personal.projects || personal.projects.length === 0) return null;

  return (
    <section className="w-full border-b border-border bg-muted/30 py-24">
      <div className="container mx-auto max-w-5xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight">
            {language === "EN" ? "Featured Projects" : "প্ৰকল্পসমূহ"}
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            {language === "EN" 
              ? "Here are a few of my favorite recent projects I've built and contributed to." 
              : "ইয়াত মই নিৰ্মাণ কৰা আৰু অৱদান আগবঢ়োৱা কেইটামান শেহতীয়া প্ৰকল্প দিয়া হৈছে।"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personal.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col justify-between rounded-xl border border-border bg-background p-6 shadow-sm transition-all hover:shadow-md hover:border-foreground/20"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-semibold tracking-tight group-hover:text-blue-500 transition-colors">
                    {project.title}
                  </h3>
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {project.url.includes("github.com") ? (
                      <GithubIcon />
                    ) : (
                      <ExternalLink className="h-5 w-5" />
                    )}
                  </a>
                </div>
                <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex} 
                    className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
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
