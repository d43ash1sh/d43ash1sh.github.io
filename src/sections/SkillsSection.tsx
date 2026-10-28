"use client";

import { motion } from "framer-motion";
import personalEn from "@/data/personal.json";
import personalAs from "@/data/personal_as.json";
import { useLanguage } from "@/lib/LanguageContext";
import { Code2, Layout, Server, Database, ShieldCheck, Wrench } from "lucide-react";

export function SkillsSection() {
  const { language } = useLanguage();
  const personal = language === "EN" ? personalEn : personalAs;

  const categoryIcons: Record<string, React.ReactNode> = {
    "Languages": <Code2 className="h-5 w-5 text-blue-500" />,
    "Frontend": <Layout className="h-5 w-5 text-emerald-500" />,
    "Backend & APIs": <Server className="h-5 w-5 text-indigo-500" />,
    "Databases & Storage": <Database className="h-5 w-5 text-amber-500" />,
    "Security & Analysis": <ShieldCheck className="h-5 w-5 text-red-500" />,
    "Developer Tools & AI": <Wrench className="h-5 w-5 text-purple-500" />
  };

  return (
    <section id="skills" className="w-full border-b border-border bg-background py-20">
      <div className="container mx-auto max-w-5xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-mono text-muted-foreground mb-3">
            <span>02</span>
            <span>{"//"}</span>
            <span>{language === "EN" ? "TECHNICAL ARSENAL" : "কাৰিকৰী দক্ষতা"}</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            {language === "EN" ? "Skills & Engineering Domains" : "দক্ষতা আৰু ইঞ্জিনিয়াৰিং ক্ষেত্ৰ"}
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl text-sm md:text-base">
            {language === "EN"
              ? "Practical expertise applied in full-stack production, application security assessments, and AI-assisted workflows."
              : "ফুল-ষ্টেক বিকাশ, এপ্লিকেচন ছিকিউৰিটি টেষ্টিং আৰু AI-সহায়তাপ্রাপ্ত কামত প্ৰয়োগ কৰা ব্যৱহাৰিক দক্ষতা।"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(personal.skills).map(([category, items], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="flex flex-col justify-between rounded-xl border border-border bg-muted/20 p-6 shadow-sm hover:border-foreground/20 hover:bg-muted/30 transition-all"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background shadow-xs">
                    {categoryIcons[category] || <Code2 className="h-5 w-5 text-foreground" />}
                  </div>
                  <h3 className="font-semibold text-base font-sans tracking-tight">
                    {category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(items as string[]).map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center rounded-md border border-border bg-background/80 px-2.5 py-1 text-xs font-mono text-foreground/90 transition-colors hover:border-foreground/40"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
