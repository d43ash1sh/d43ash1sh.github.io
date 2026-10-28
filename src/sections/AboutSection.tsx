"use client";

import personalEn from "@/data/personal.json";
import personalAs from "@/data/personal_as.json";
import { useLanguage } from "@/lib/LanguageContext";

export function AboutSection() {
  const { language } = useLanguage();
  const personal = language === "EN" ? personalEn : personalAs;
  return (
    <section id="about" className="w-full border-b border-border bg-background py-16">
      <div className="container mx-auto max-w-5xl px-4 md:px-8 border-x border-border border-transparent md:border-border">
        
        <div className="flex flex-col md:flex-row md:gap-16 gap-10">
          
          {/* About Column */}
          <div className="md:w-1/2">
            <h2 className="mb-6 text-xl font-bold tracking-tight">
              {language === "EN" ? "About" : "বিষয়ে"}
            </h2>
            <div className="flex flex-col gap-4 text-muted-foreground font-mono">
              <ul className="list-inside list-disc space-y-2">
                {personal.about.map((item, index) => (
                  <li key={index} className="text-sm leading-relaxed md:text-base">
                    {item}
                  </li>
                ))}
                <li className="text-sm leading-relaxed md:text-base">
                  {language === "EN" ? "Passionate about: " : "আকৰ্ষণ: "} {personal.passion.join(", ")}.
                </li>
              </ul>
              
              <div className="mt-4">
                <h2 className="mb-4 text-xl font-bold text-foreground font-sans tracking-tight">
                  {language === "EN" ? "Highlights" : "মুখ্য আকৰ্ষণ"}
                </h2>
                <ul className="list-inside list-disc space-y-2 pl-4">
                  {personal.highlights.map((item, index) => (
                    <li key={index} className="text-sm leading-relaxed md:text-base">
                      {item.url ? (
                        <a 
                          href={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="hover:underline hover:text-foreground transition-colors decoration-muted-foreground/50 underline-offset-4"
                        >
                          {item.text}
                        </a>
                      ) : (
                        item.text
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Education Column */}
          <div className="md:w-1/2">
            <h2 className="mb-6 text-xl font-bold tracking-tight">
              {language === "EN" ? "Education" : "শিক্ষা"}
            </h2>
            <div className="flex flex-col gap-8 font-mono">
              {personal.education.map((edu, index) => (
                <div key={index} className="flex flex-col gap-2 relative">
                  <div className="flex gap-4">
                    <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-border bg-muted">
                      <div className="h-1.5 w-1.5 rounded-full bg-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground font-sans tracking-tight">{edu.degree}</h3>
                      <p className="text-sm text-muted-foreground">{edu.institution}</p>
                      {edu.score && <p className="mt-1 text-xs text-muted-foreground">{edu.score}</p>}
                      {edu.year && <p className="mt-1 text-xs text-muted-foreground">{edu.year}</p>}
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
