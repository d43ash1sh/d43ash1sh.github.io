"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import personalEn from "@/data/personal.json";
import personalAs from "@/data/personal_as.json";
import { useLanguage } from "@/lib/LanguageContext";

export function HeroSection() {
  const { language } = useLanguage();
  const personal = language === "EN" ? personalEn : personalAs;
  
  const [roleIndex, setRoleIndex] = useState(0);

  const rolesLength = personal.roles.length;
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % rolesLength);
    }, 3000);
    return () => clearInterval(interval);
  }, [rolesLength]);

  return (
    <section className="relative w-full border-b border-border bg-dot-pattern py-24">
      <div className="container mx-auto max-w-5xl px-4 md:px-8 flex flex-col items-center justify-center">
        
        {/* Open to work header */}
        <div className="mb-16 flex flex-col items-center text-center text-3xl font-bold tracking-tight text-muted-foreground/80 md:text-4xl">
          <span>{language === "EN" ? "Open for full-time" : "পূৰ্ণকালীন কামৰ বাবে"}</span>
          <span>{language === "EN" ? "& freelance work" : "আৰু স্বতন্ত্ৰ কামৰ বাবে উপলব্ধ"}</span>
        </div>

        {/* Profile container */}
        <div className="flex w-full max-w-2xl flex-col items-center gap-6 rounded-2xl border border-border bg-background p-8 shadow-sm md:flex-row md:items-start md:gap-8">
          <div className="relative shrink-0">
            <div className="group relative h-24 w-24 overflow-hidden rounded-full border-2 border-border bg-muted md:h-32 md:w-32">
              <Image 
                src="/img/profile2.jpg" 
                alt={personal.name} 
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110" 
              />
            </div>
            <div className="absolute -right-1 -top-1 md:-right-2 md:-top-2 rounded-full bg-background p-0.5">
              <BadgeCheck className="h-8 w-8 md:h-10 md:w-10 text-white" fill="#3b82f6" strokeWidth={1.5} />
            </div>
          </div>

          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h1 className="mb-2 text-2xl sm:text-3xl font-medium">
              {personal.name}
            </h1>
            
            <div className="relative h-8 w-full overflow-hidden">
              <motion.div
                key={roleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute w-full text-sm font-mono text-muted-foreground"
              >
                {personal.roles[roleIndex]}
              </motion.div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
