"use client";
import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Clock, FileText, Copy, Check } from "lucide-react";
import personalEn from "@/data/personal.json";
import personalAs from "@/data/personal_as.json";
import { useLanguage } from "@/lib/LanguageContext";

export function ContactSection() {
  const { language } = useLanguage();
  const personal = language === "EN" ? personalEn : personalAs;
  const [time, setTime] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => setTime(new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    }).format(new Date()));
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
        <div className="flex w-full flex-col border-b border-border p-6 md:w-1/2 md:border-b-0 md:border-r gap-5">
          <div className="flex items-center gap-3 text-muted-foreground group">
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-muted/20">
              <Mail className="h-3.5 w-3.5" />
            </div>
            <a href={`mailto:${personal.email}`} className="text-foreground hover:underline">
              {personal.email}
            </a>
            <button
              onClick={() => copyToClipboard(personal.email, "email")}
              aria-label="Copy email"
              className="ml-auto hover:bg-muted p-1 rounded"
            >
              {copiedField === "email" ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5 text-muted-foreground" />}
            </button>
          </div>
          {personal.phone ? (
            <div className="flex items-center gap-3 text-muted-foreground group">
              <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-muted/20">
                <Phone className="h-3.5 w-3.5" />
              </div>
              <span className="text-foreground">{personal.phone}</span>
              <button
                onClick={() => copyToClipboard(personal.phone, "phone")}
                aria-label="Copy phone"
                className="ml-auto hover:bg-muted p-1 rounded"
              >
                {copiedField === "phone" ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5 text-muted-foreground" />}
              </button>
            </div>
          ) : null}
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
            <span className="text-foreground">{time || "Loading time..."}</span>
          </div>
        </div>
        <div className="flex w-full flex-col p-6 md:w-1/2 gap-5 justify-center">
          <a
            href="/CV/DebashishBordoloi_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-muted-foreground hover:text-foreground"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-muted/20">
              <FileText className="h-3.5 w-3.5" />
            </div>
            <span className="text-foreground">{language === "EN" ? "Resume (PDF)" : "জীৱনপঞ্জী (PDF)"}</span>
          </a>
          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="text-foreground">{language === "EN" ? "Pronouns: He/him" : "সৰ্বনাম: তেওঁ"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
