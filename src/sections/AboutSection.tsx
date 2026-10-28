"use client";

import personalEn from "@/data/personal.json";
import personalAs from "@/data/personal_as.json";
import { useLanguage } from "@/lib/LanguageContext";
import { GraduationCap, Sparkles, Heart } from "lucide-react";

export function AboutSection() {
  const { language } = useLanguage();
  const personal = language === "EN" ? personalEn : personalAs;

  return (
    <section id="about" className="w-full border-b border-border bg-background py-20">
      <div className="container mx-auto max-w-5xl px-4 md:px-8 border-x border-border border-transparent md:border-border">
        
        <div className="flex flex-col md:flex-row md:gap-16 gap-12">
          
          {/* About Column */}
          <div className="md:w-1/2">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-mono text-muted-foreground mb-3">
              <span>01</span>
              <span>{"//"}</span>
              <span>{language === "EN" ? "BACKGROUND" : "পৰিচয়"}</span>
            </div>
            <h2 className="mb-6 text-2xl font-bold tracking-tight">
              {language === "EN" ? "About & Professional Journey" : "মোৰ বিষয়ে আৰু যাত্ৰা"}
            </h2>
            
            <div className="flex flex-col gap-4 text-muted-foreground font-mono text-sm">
              <ul className="list-inside list-disc space-y-3">
                {personal.about.map((item, index) => (
                  <li key={index} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
              
              <div className="mt-4 pt-4 border-t border-border/60">
                <div className="flex items-center gap-2 text-foreground font-bold font-sans mb-3 text-sm">
                  <Heart className="h-4 w-4 text-red-500 fill-red-500/20" />
                  <span>{language === "EN" ? "Focus Areas & Passions" : "আগ্ৰহ আৰু লক্ষ্য"}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {personal.passions.map((p, pIdx) => (
                    <span
                      key={pIdx}
                      className="rounded-md border border-border bg-muted/30 px-2.5 py-1 text-xs font-mono text-foreground"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/60">
                <div className="flex items-center gap-2 text-foreground font-bold font-sans mb-3 text-sm">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span>{language === "EN" ? "Recognitions & Credentials" : "স্বীকৃতি আৰু প্ৰমাণপত্ৰ"}</span>
                </div>
                <ul className="space-y-2.5 font-mono text-xs">
                  {personal.highlights.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-muted-foreground/60">•</span>
                      {item.url ? (
                        <a 
                          href={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="hover:underline hover:text-foreground text-foreground/90 transition-colors underline-offset-4 decoration-border"
                        >
                          {item.text} ↗
                        </a>
                      ) : (
                        <span className="text-foreground/90">{item.text}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Education Column */}
          <div className="md:w-1/2">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-mono text-muted-foreground mb-3">
              <span>07</span>
              <span>{"//"}</span>
              <span>{language === "EN" ? "ACADEMIC MILESTONES" : "শিক্ষাগত অৰ্হতা"}</span>
            </div>
            <h2 className="mb-6 text-2xl font-bold tracking-tight">
              {language === "EN" ? "Education Timeline" : "শিক্ষাগত ইতিহাস"}
            </h2>
            
            <div className="flex flex-col gap-8 font-mono">
              {personal.education.map((edu, index) => (
                <div key={index} className="flex flex-col gap-2 relative">
                  <div className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-muted/50">
                      <GraduationCap className="h-3.5 w-3.5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground font-sans tracking-tight text-base">
                        {edu.degree}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{edu.institution}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        {edu.score && (
                          <span className="inline-flex items-center rounded bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
                            {edu.score}
                          </span>
                        )}
                        {edu.year && (
                          <span className="text-xs text-muted-foreground">
                            {edu.year}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
