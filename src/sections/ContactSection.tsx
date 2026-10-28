"use client";

import { useEffect, useState } from "react";
import { Mail, MapPin, Clock, FileText, Copy, Check } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/BrandIcons";
import personalEn from "@/data/personal.json";
import personalAs from "@/data/personal_as.json";
import { useLanguage } from "@/lib/LanguageContext";

export function ContactSection() {
  const { language } = useLanguage();
  const personal = language === "EN" ? personalEn : personalAs;
  const [time, setTime] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="contact" className="w-full border-b border-border bg-background">
      <div className="mx-auto flex max-w-5xl flex-col border-x border-border md:flex-row font-mono text-sm">
        
        {/* Left Side */}
        <div className="flex w-full flex-col border-b border-border p-6 md:w-1/2 md:border-b-0 md:border-r gap-5">
          <div className="flex items-center gap-3 text-muted-foreground group">
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-muted/20">
              <Mail className="h-3.5 w-3.5" />
            </div>
            <a
              href={`mailto:${personal.email}`}
              className="text-foreground hover:underline transition-all"
            >
              {personal.email}
            </a>
            <button 
              onClick={() => copyToClipboard(personal.email, 'email')}
              className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto hover:bg-muted p-1 rounded"
              title="Copy Email"
              aria-label="Copy Email"
            >
              {copiedField === 'email' ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5 text-muted-foreground" />}
            </button>
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-muted/20">
              <MapPin className="h-3.5 w-3.5" />
            </div>
            <span className="text-foreground">{personal.location}</span>
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-muted/20">
              <Clock className="h-3.5 w-3.5" />
            </div>
            <span className="text-foreground">{time || (language === "EN" ? "Loading time (IST)..." : "সময় লোড হৈ আছে (IST)...")}</span>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex w-full flex-col p-6 md:w-1/2 gap-5 justify-center">
          <a
            href="/CV/DebashishBordoloi_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-muted/20">
              <FileText className="h-3.5 w-3.5" />
            </div>
            <span className="text-foreground">{language === "EN" ? "Curriculum Vitae (PDF)" : "জীৱনপঞ্জী (PDF)"}</span>
          </a>

          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/debashishbordoloi/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-muted/20">
                <LinkedinIcon className="h-3.5 w-3.5" />
              </div>
              <span className="text-foreground">LinkedIn</span>
            </a>

            <a
              href="https://github.com/d43ash1sh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-muted/20">
                <GithubIcon className="h-3.5 w-3.5" />
              </div>
              <span className="text-foreground">GitHub</span>
            </a>
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-muted/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="14" r="5"/><line x1="13.5" y1="10.5" x2="19" y2="5"/><line x1="15" y1="5" x2="19" y2="5"/><line x1="19" y1="9" x2="19" y2="5"/></svg>
            </div>
            <span className="text-foreground">{language === "EN" ? "Pronouns: He/him" : "সৰ্বনাম: তেওঁ"}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
