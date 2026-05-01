"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { language, setLanguage } = useLanguage();

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  const navLinks: { name: string; href: string }[] = [];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center justify-center transition-transform hover:scale-105"
          >
            <Image 
              src="/img/logo.png" 
              alt="Logo" 
              width={40}
              height={40}
              className="object-contain dark:invert" 
            />
          </Link>
        </div>

        <nav className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground font-mono",
                pathname === link.href ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}

          {mounted && (
            <div className="flex items-center gap-4 ml-2">
              <button
                onClick={() => setLanguage(language === "EN" ? "AS" : "EN")}
                className="flex h-8 items-center justify-center rounded-full border border-border bg-muted px-3 text-xs font-bold transition-colors hover:bg-muted/80 focus:outline-none"
                aria-label="Toggle Language"
              >
                {language === "EN" ? "EN" : "অসমীয়া"}
              </button>

              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex h-8 w-14 items-center rounded-full border border-border bg-muted p-1 transition-colors hover:bg-muted/80 focus:outline-none"
                aria-label="Toggle Dark Mode"
              >
                <div 
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full bg-background shadow-sm transition-transform duration-300",
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
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
