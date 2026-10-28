"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const navLinks = [
    { name: language === "EN" ? "About" : "পৰিচয়", href: "#about" },
    { name: language === "EN" ? "Skills" : "দক্ষতা", href: "#skills" },
    { name: language === "EN" ? "Systems" : "ছিষ্টেম", href: "#systems" },
    { name: language === "EN" ? "Projects" : "প্ৰকল্প", href: "#projects" },
    { name: language === "EN" ? "Research" : "গৱেষণা", href: "#research" },
    { name: language === "EN" ? "Instagram" : "ইনষ্টাগ্ৰাম", href: "#instagram" },
    { name: language === "EN" ? "Contact" : "যোগাযোগ", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-4 md:px-8">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center justify-center transition-transform hover:scale-105"
            aria-label="Home"
          >
            <Image 
              src="/img/logo.png" 
              alt="Logo" 
              width={36}
              height={36}
              className="object-contain dark:invert" 
            />
          </Link>
          <span className="hidden sm:inline-block font-mono text-xs text-muted-foreground">
            ~/debashish
          </span>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-mono font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right: Controls (Language, Theme, Mobile toggle) */}
        <div className="flex items-center gap-2.5">
          {mounted && (
            <>
              {/* Language Switcher */}
              <button
                onClick={() => setLanguage(language === "EN" ? "AS" : "EN")}
                className="flex h-8 items-center justify-center rounded-full border border-border bg-muted/60 px-2.5 text-xs font-mono font-bold transition-colors hover:bg-muted focus:outline-none"
                aria-label="Toggle Language"
                title="Switch Language"
              >
                {language === "EN" ? "EN" : "অসমীয়া"}
              </button>

              {/* Theme Switcher */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex h-8 w-14 items-center rounded-full border border-border bg-muted/60 p-1 transition-colors hover:bg-muted focus:outline-none"
                aria-label="Toggle Dark Mode"
                title="Switch Theme"
              >
                <div 
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full bg-background shadow-xs transition-transform duration-300",
                    theme === "dark" ? "translate-x-6" : "translate-x-0"
                  )}
                >
                  {theme === "dark" ? (
                    <Moon className="h-3 w-3 text-foreground" />
                  ) : (
                    <Sun className="h-3 w-3 text-foreground" />
                  )}
                </div>
              </button>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted/60 text-muted-foreground hover:text-foreground"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-background/95 backdrop-blur-md px-4 py-4 space-y-3 font-mono text-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
