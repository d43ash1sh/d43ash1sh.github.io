"use client";

import { motion } from "framer-motion";
import personalEn from "@/data/personal.json";
import personalAs from "@/data/personal_as.json";
import { useLanguage } from "@/lib/LanguageContext";
import { BookOpen, Award, ArrowUpRight, Calendar, Users } from "lucide-react";

export function ResearchSection() {
  const { language } = useLanguage();
  const personal = language === "EN" ? personalEn : personalAs;

  if (!personal.research || personal.research.length === 0) return null;

  return (
    <section id="research" className="w-full border-b border-border bg-muted/20 py-20">
      <div className="container mx-auto max-w-5xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-mono text-muted-foreground mb-3">
            <span>05</span>
            <span>{"//"}</span>
            <span>{language === "EN" ? "ACADEMIC & RESEARCH" : "গৱেষণা আৰু প্ৰকাশন"}</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            {language === "EN" ? "Publications & Conference Research" : "প্ৰকাশন আৰু গৱেষণা"}
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl text-sm md:text-base">
            {language === "EN"
              ? "Peer-reviewed journal contributions and conference presentations in network security and computational systems."
              : "নেটৱৰ্ক সুৰক্ষা আৰু কম্পিউটেচনেল ছিষ্টেমত সমনীয়া-পৰ্যালোচিত জাৰ্নেল অৱদান আৰু সন্মিলন অংশগ্ৰহণ।"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personal.research.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col justify-between rounded-2xl border border-border bg-background p-6 md:p-8 shadow-sm hover:border-foreground/20 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-mono font-medium">
                    {item.type.includes("Journal") || item.type.includes("জাৰ্নেল") ? (
                      <BookOpen className="h-3.5 w-3.5 text-blue-500" />
                    ) : (
                      <Award className="h-3.5 w-3.5 text-amber-500" />
                    )}
                    {item.type}
                  </span>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="View DOI Paper"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>

                <h3 className="text-lg font-semibold tracking-tight leading-snug mb-3">
                  {item.title}
                </h3>

                {item.authors && (
                  <div className="flex items-start gap-2 text-xs font-mono text-muted-foreground mb-2">
                    <Users className="h-3.5 w-3.5 shrink-0 mt-0.5 text-muted-foreground/70" />
                    <span>{item.authors}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-4">
                  <Calendar className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
                  <span>{item.venue} ({item.date})</span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description || item.note}
                </p>
              </div>

              {item.doi && (
                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground">DOI:</span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-blue-500 hover:underline"
                  >
                    {item.doi}
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
