import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/lib/LanguageContext";
import { TerminalOverlay } from "@/components/TerminalOverlay";
import { BugSquasher } from "@/components/BugSquasher";
import { AIChatbot } from "@/components/AIChatbot";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Debashish Bordoloi — Full Stack Developer & Security Researcher",
  description: "Portfolio of Debashish Bordoloi — Full Stack Developer, Security Researcher, and AI Systems Engineer based in Guwahati, Assam.",
  keywords: [
    "Debashish Bordoloi",
    "Security Researcher",
    "Full Stack Developer",
    "Next.js",
    "Model Context Protocol",
    "REA",
    "Agent Search",
    "Guwahati",
    "Assam"
  ],
  authors: [{ name: "Debashish Bordoloi", url: "https://d43ash1sh.github.io" }],
  creator: "Debashish Bordoloi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://d43ash1sh.github.io",
    title: "Debashish Bordoloi — Full Stack Developer & Security Researcher",
    description: "Full Stack Developer, Security Researcher, and AI Systems Engineer based in Guwahati, Assam.",
    siteName: "Debashish Bordoloi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Debashish Bordoloi — Full Stack Developer & Security Researcher",
    description: "Full Stack Developer, Security Researcher, and AI Systems Engineer based in Guwahati, Assam.",
    creator: "@d43a_io",
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <TerminalOverlay />
            <BugSquasher />
            <AIChatbot />
          </ThemeProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
