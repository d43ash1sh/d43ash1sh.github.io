"use client";


import socials from "@/data/socials.json";
import { useLanguage } from "@/lib/LanguageContext";

export function Footer() {
  const { language } = useLanguage();
  return (
    <footer className="w-full border-t border-border py-12 text-center text-sm text-muted-foreground font-mono">
      <div className="container mx-auto max-w-5xl px-4 md:px-8 flex flex-col items-center gap-8">
        <p className="text-lg text-foreground font-sans tracking-tight">
          {language === "EN" ? "Seeking the right opportunity. Let's connect." : "উপযুক্ত সুযোগৰ সন্ধানত আছোঁ। আহক সংযোগ কৰোঁ।"}
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              {social.platform}
            </a>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium">
              {language === "EN" ? "Built with" : "নিৰ্মিত"} <span className="text-red-500 mx-1">❤️</span> {language === "EN" ? "in Assam, India" : "অসম, ভাৰত"}
            </div>
            
            <button
              onClick={() => {
                const event = new KeyboardEvent("keydown", { key: "`" });
                window.dispatchEvent(event);
              }}
              className="inline-flex items-center justify-center rounded-full border border-border bg-muted/50 h-7 w-7 text-muted-foreground hover:text-green-500 hover:bg-muted transition-colors cursor-pointer"
              title='Terminal (Press `)'
              aria-label="Open Hacker Terminal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
            </button>
          </div>
          <span className="text-[10px] text-muted-foreground/60 mt-1">
            {language === "EN" ? "Press ` (backtick) or Escape to see the magic ✨" : "মেডিক চাবলৈ ` (backtick) বা Escape টিপক ✨"}
          </span>
        </div>
      </div>
    </footer>
  );
}
