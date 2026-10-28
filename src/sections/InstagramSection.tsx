"use client";

import { motion } from "framer-motion";
import instagramPosts from "@/data/instagram.json";
import { useLanguage } from "@/lib/LanguageContext";
import { ArrowUpRight, Hash, Calendar } from "lucide-react";
import { InstagramIcon } from "@/components/BrandIcons";

export function InstagramSection() {
  const { language } = useLanguage();

  return (
    <section id="instagram" className="w-full border-b border-border bg-background py-20">
      <div className="container mx-auto max-w-5xl px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-mono text-muted-foreground mb-3">
              <span>06</span>
              <span>{"//"}</span>
              <span>{language === "EN" ? "COMMUNITY & UPDATES" : "সম্প্ৰদায় আৰু আপডেট"}</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              {language === "EN" ? "Instagram Showcase" : "ইনষ্টাগ্ৰাম আপডেটসমূহ"}
            </h2>
            <p className="mt-2 text-muted-foreground max-w-xl text-sm md:text-base">
              {language === "EN"
                ? "Curated highlights from building software, security research, and open source journeys."
                : "ছফ্টৱেৰ বিকাশ, ছিকিউৰিটি গৱেষণা আৰু মুক্ত উৎস যাত্ৰাৰ কিছু নিৰ্বাচিত অংশ।"}
            </p>
          </motion.div>

          <a
            href="https://www.instagram.com/debashishbordoloi007/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-sm font-mono hover:bg-muted transition-all hover:scale-105 shrink-0 self-start md:self-auto"
          >
            <InstagramIcon className="h-4 w-4 text-pink-500" />
            <span>@debashishbordoloi007</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
          </a>
        </div>

        {/* Curated Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {instagramPosts.map((post, idx) => (
            <motion.a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group flex flex-col justify-between rounded-xl border border-border bg-muted/20 p-5 hover:bg-muted/30 hover:border-foreground/20 transition-all shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-mono text-muted-foreground">
                  <span className="inline-flex items-center gap-1 rounded bg-background px-2 py-0.5 border border-border text-[11px]">
                    <Hash className="h-3 w-3 text-pink-500" />
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                </div>

                <h4 className="font-semibold text-sm tracking-tight mb-2 group-hover:text-pink-500 transition-colors">
                  {post.title}
                </h4>

                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  {post.caption}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono text-muted-foreground/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2.5 border-t border-border/60 text-xs font-mono text-muted-foreground group-hover:text-foreground">
                  <span>{language === "EN" ? "View Post" : "প'ষ্ট চাওক"}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Note on sync */}
        <p className="mt-8 text-center text-xs font-mono text-muted-foreground/70">
          {language === "EN"
            ? "Curated update feed synced to public engineering milestones. Follow on Instagram for real-time stories."
            : "ৰাজহুৱা ইঞ্জিনিয়াৰিং মাইলষ্ট'নৰ বাবে নিৰ্বাচিত আপডেট। শেহতীয়া কাহিনীৰ বাবে ইনষ্টাগ্ৰামত অনুসৰণ কৰক।"}
        </p>

      </div>
    </section>
  );
}
