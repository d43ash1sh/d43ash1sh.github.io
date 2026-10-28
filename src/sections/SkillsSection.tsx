"use client";

import personalEn from "@/data/personal.json";
import personalAs from "@/data/personal_as.json";
import { useLanguage } from "@/lib/LanguageContext";

export function SkillsSection() {
  const { language } = useLanguage();
  const personal = language === "EN" ? personalEn : personalAs;
  return (
    <section id="skills" className="w-full border-b border-border bg-background py-20">
      <div className="container mx-auto max-w-5xl px-4 md:px-8">
        <div className="mb-10">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">{language === "EN" ? "Skills & Tools" : "দক্ষতা আৰু সঁজুলি"}</h2>
          <p className="max-w-2xl text-muted-foreground">{language === "EN" ? "Technologies and practices I use to build, test, deploy, and secure software." : "ছফ্টৱেৰ নিৰ্মাণ, পৰীক্ষা, ডিপ্লয় আৰু সুৰক্ষিত কৰিবলৈ ব্যৱহাৰ কৰা প্ৰযুক্তি আৰু পদ্ধতি।"}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Object.entries(personal.skills).map(([category, items]) => (
            <article key={category} className="rounded-xl border border-border bg-muted/20 p-5">
              <h3 className="mb-3 font-semibold tracking-tight">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.split(",").map((item) => <span key={item.trim()} className="rounded-md border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground">{item.trim()}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
