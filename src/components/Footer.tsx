"use client";

import socials from "@/data/socials.json";
import { useLanguage } from "@/lib/LanguageContext";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const { language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-border py-14 text-center text-sm text-muted-foreground font-mono bg-background">
      <div className="container mx-auto max-w-5xl px-4 md:px-8 flex flex-col items-center gap-8">
        
        <div className="flex flex-col items-center gap-2">
          <p className="text-xl text-foreground font-sans font-semibold tracking-tight">
            {language === "EN" ? "Seeking the right engineering opportunity. Let's connect." : "উপযুক্ত ইঞ্জিনিয়াৰিং সুযোগৰ সন্ধানত। আহক সংযোগ কৰোঁ।"}
          </p>
          <p className="text-xs text-muted-foreground max-w-md">
            {language === "EN"
              ? "Open for Full-Stack, Web Security, and AI Developer Tooling roles."
              : "ফুল-ষ্টেক, ৱেব ছিকিউৰিটি আৰু AI ডেভেলপাৰ টুলিং ভূমিকাৰ বাবে উপলব্ধ।"}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-xs">
          {socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
            >
              {social.platform}
            </a>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3 pt-4 border-t border-border/40 w-full">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium">
              {language === "EN" ? "Built with" : "নিৰ্মিত"} <span className="text-red-500 mx-1">❤️</span> {language === "EN" ? "in Assam, India" : "অসম, ভাৰত"}
            </div>
            
            <button
              onClick={() => {
                const event = new KeyboardEvent("keydown", { key: "`" });
                window.dispatchEvent(event);
              }}
              className="inline-flex items-center justify-center rounded-full border border-border bg-muted/40 h-7 w-7 text-muted-foreground hover:text-green-500 hover:bg-muted transition-colors cursor-pointer"
              title='Terminal (Press `)'
              aria-label="Open Interactive Shell"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5"></polyline>
                <line x1="12" y1="19" x2="20" y2="19"></line>
              </svg>
            </button>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center justify-center rounded-full border border-border bg-muted/40 h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              title="Scroll to Top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>

          <span className="text-[11px] text-muted-foreground/70">
            {language === "EN" ? "Press ` (backtick) or Esc for interactive DebOS terminal" : "ইণ্টাৰেক্টিভ DebOS টাৰ্মিনেলৰ বাবে ` (backtick) বা Esc টিপক"}
          </span>
        </div>

      </div>
    </footer>
  );
}
