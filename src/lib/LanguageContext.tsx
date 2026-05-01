"use client";

import React, { createContext, useContext, useState } from "react";

type Language = "EN" | "AS";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Lazily initialize from localStorage to avoid setState-in-effect pattern
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return "EN";
    const saved = localStorage.getItem("portfolio_lang") as Language;
    return saved === "EN" || saved === "AS" ? saved : "EN";
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("portfolio_lang", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
