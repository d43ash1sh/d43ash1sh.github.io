"use client";

import Image from "next/image";
import { Grid, Bookmark, Film, Tag, ExternalLink, Settings, Link as LinkIcon } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

interface InstagramPost {
  id: string;
  image: string;
  url: string;
  type: "carousel" | "reel" | "photo";
  alt: string;
}

const instagramPosts: InstagramPost[] = [
  {
    id: "DNmArTuyOAw_01",
    image: "/insta/carousels/DNmArTuyOAw/instabulkdownloader.com_DNmArTuyOAw_01.jpg",
    url: "https://www.instagram.com/debashishbordoloi007/p/DNmArTuyOAw/",
    type: "carousel",
    alt: "Debashish Bordoloi Instagram post"
  },
  {
    id: "Dah2jaMIGmk_01",
    image: "/insta/carousels/Dah2jaMIGmk/instabulkdownloader.com_Dah2jaMIGmk_01.jpg",
    url: "https://www.instagram.com/debashishbordoloi007/p/Dah2jaMIGmk/",
    type: "carousel",
    alt: "Debashish Bordoloi Instagram post"
  },
  {
    id: "DU2pvveAZB3_01",
    image: "/insta/carousels/DU2pvveAZB3/instabulkdownloader.com_DU2pvveAZB3_01.jpg",
    url: "https://www.instagram.com/debashishbordoloi007/p/DU2pvveAZB3/",
    type: "carousel",
    alt: "Debashish Bordoloi Instagram post"
  },
  {
    id: "Dah2jaMIGmk_02",
    image: "/insta/carousels/Dah2jaMIGmk/instabulkdownloader.com_Dah2jaMIGmk_02.jpg",
    url: "https://www.instagram.com/debashishbordoloi007/p/Dah2jaMIGmk/",
    type: "carousel",
    alt: "Debashish Bordoloi Instagram post"
  },
  {
    id: "DR4KeKsAUIn_01",
    image: "/insta/carousels/DR4KeKsAUIn/instabulkdownloader.com_DR4KeKsAUIn_01.jpg",
    url: "https://www.instagram.com/debashishbordoloi007/p/DR4KeKsAUIn/",
    type: "carousel",
    alt: "Debashish Bordoloi Instagram post"
  },
  {
    id: "DRrdeeUAdHd",
    image: "/insta/videos/DRrdeeUAdHd.jpg",
    url: "https://www.instagram.com/debashishbordoloi007/reel/DRrdeeUAdHd/",
    type: "reel",
    alt: "Debashish Bordoloi Instagram reel"
  },
  {
    id: "DQLTw8MAac4_02",
    image: "/insta/carousels/DQLTw8MAac4/instabulkdownloader.com_DQLTw8MAac4_02.jpg",
    url: "https://www.instagram.com/debashishbordoloi007/p/DQLTw8MAac4/",
    type: "carousel",
    alt: "Debashish Bordoloi Instagram post"
  },
  {
    id: "DQqUWEPAWC9_01",
    image: "/insta/carousels/DQqUWEPAWC9/instabulkdownloader.com_DQqUWEPAWC9_01.jpg",
    url: "https://www.instagram.com/debashishbordoloi007/p/DQqUWEPAWC9/",
    type: "carousel",
    alt: "Debashish Bordoloi Instagram post"
  },
  {
    id: "DQWl8GNAb_k",
    image: "/insta/photos/instabulkdownloader.com_DQWl8GNAb_k.jpg",
    url: "https://www.instagram.com/debashishbordoloi007/p/DQWl8GNAb_k/",
    type: "photo",
    alt: "Debashish Bordoloi Instagram photo"
  },
  {
    id: "DU2pvveAZB3_03",
    image: "/insta/carousels/DU2pvveAZB3/instabulkdownloader.com_DU2pvveAZB3_03.jpg",
    url: "https://www.instagram.com/debashishbordoloi007/p/DU2pvveAZB3/",
    type: "carousel",
    alt: "Debashish Bordoloi Instagram post"
  },
  {
    id: "DP7QUw8Ew07",
    image: "/insta/photos/instabulkdownloader.com_DP7QUw8Ew07.jpg",
    url: "https://www.instagram.com/debashishbordoloi007/p/DP7QUw8Ew07/",
    type: "photo",
    alt: "Debashish Bordoloi Instagram photo"
  },
  {
    id: "DP3KbxMgRnv",
    image: "/insta/photos/instabulkdownloader.com_DP3KbxMgRnv.jpg",
    url: "https://www.instagram.com/debashishbordoloi007/p/DP3KbxMgRnv/",
    type: "photo",
    alt: "Debashish Bordoloi Instagram photo"
  },
  {
    id: "DNmArTuyOAw_06",
    image: "/insta/carousels/DNmArTuyOAw/instabulkdownloader.com_DNmArTuyOAw_06.jpg",
    url: "https://www.instagram.com/debashishbordoloi007/p/DNmArTuyOAw/",
    type: "carousel",
    alt: "Debashish Bordoloi Instagram post"
  },
  {
    id: "DSUEWBFgdVE_01",
    image: "/insta/carousels/DSUEWBFgdVE/instabulkdownloader.com_DSUEWBFgdVE_01.jpg",
    url: "https://www.instagram.com/debashishbordoloi007/p/DSUEWBFgdVE/",
    type: "carousel",
    alt: "Debashish Bordoloi Instagram post"
  },
  {
    id: "DQ6Ir1VAdlM",
    image: "/insta/videos/DQ6Ir1VAdlM.jpg",
    url: "https://www.instagram.com/debashishbordoloi007/reel/DQ6Ir1VAdlM/",
    type: "reel",
    alt: "Debashish Bordoloi Instagram reel"
  }
];

export function InstagramFeedSection() {
  const { language } = useLanguage();

  return (
    <section id="instagram" className="w-full border-b border-border bg-background py-16">
      <div className="container mx-auto max-w-5xl px-4 md:px-8">
        {/* Profile Header */}
        <div className="mx-auto max-w-3xl flex flex-col sm:flex-row items-center sm:items-start gap-6 md:gap-10 pb-8">
          {/* Avatar with subtle ring */}
          <div className="relative shrink-0">
            <div className="h-20 w-20 md:h-28 md:w-28 rounded-full p-[2px] border-2 border-border bg-background">
              <div className="relative h-full w-full overflow-hidden rounded-full">
                <Image
                  src="/img/profile2.jpg"
                  alt="Debashish Bordoloi"
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="flex flex-col items-center sm:items-start gap-3 w-full font-mono text-sm">
            {/* Username + Actions Row */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 w-full">
              <span className="text-base md:text-lg font-semibold tracking-tight text-foreground font-sans">
                debashishbordoloi007
              </span>
              <a
                href="https://www.instagram.com/debashishbordoloi007/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                title="View on Instagram"
              >
                <span>{language === "EN" ? "View Profile" : "প্ৰফাইল চাওক"}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://www.instagram.com/debashishbordoloi007/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label="Settings & Profile Link"
              >
                <Settings className="h-4 w-4" />
              </a>
            </div>

            {/* Profile Statistics */}
            <div className="flex items-center gap-5 text-xs md:text-sm text-foreground">
              <span>
                <strong className="font-semibold">15</strong>{" "}
                <span className="text-muted-foreground">{language === "EN" ? "posts" : "পোষ্ট"}</span>
              </span>
              <span>
                <strong className="font-semibold">2,121</strong>{" "}
                <span className="text-muted-foreground">{language === "EN" ? "followers" : "ফ’ল’ৱাৰ"}</span>
              </span>
              <span>
                <strong className="font-semibold">755</strong>{" "}
                <span className="text-muted-foreground">{language === "EN" ? "following" : "ফ’ল’ কৰি থকা"}</span>
              </span>
            </div>

            {/* Name & Bio Details */}
            <div className="flex flex-col items-center sm:items-start text-xs gap-1">
              <span className="font-semibold tracking-wide text-foreground">
                DEBASHISH BORDOLOI
              </span>
              <a
                href="https://www.linkedin.com/in/debashishbordoloi/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors mt-0.5"
              >
                <LinkIcon className="h-3 w-3" />
                <span className="hover:underline">www.linkedin.com/in/debashishbordoloi</span>
              </a>
            </div>
          </div>
        </div>

        {/* Content Tabs (matching Instagram) */}
        <div className="border-t border-border flex justify-center items-center gap-10 md:gap-14 font-mono text-xs">
          {/* Active Tab: POSTS */}
          <button
            type="button"
            className="-mt-[1px] border-t-2 border-foreground pt-3 flex items-center gap-2 text-foreground font-semibold cursor-pointer"
            aria-label="Posts tab"
          >
            <Grid className="h-3.5 w-3.5" />
            <span className="tracking-wider">{language === "EN" ? "POSTS" : "পোষ্টসমূহ"}</span>
          </button>

          {/* Decorative Tabs */}
          <div className="pt-3 flex items-center gap-2 text-muted-foreground/60 cursor-default select-none">
            <Film className="h-3.5 w-3.5" />
            <span className="tracking-wider">{language === "EN" ? "REELS" : "ৰিলছ"}</span>
          </div>

          <div className="pt-3 flex items-center gap-2 text-muted-foreground/60 cursor-default select-none hidden sm:flex">
            <Bookmark className="h-3.5 w-3.5" />
            <span className="tracking-wider">{language === "EN" ? "SAVED" : "সংৰক্ষিত"}</span>
          </div>

          <div className="pt-3 flex items-center gap-2 text-muted-foreground/60 cursor-default select-none hidden sm:flex">
            <Tag className="h-3.5 w-3.5" />
            <span className="tracking-wider">{language === "EN" ? "TAGGED" : "টেগ কৰা"}</span>
          </div>
        </div>

        {/* Post Grid (5 columns on desktop, 3 on tablet/mobile) */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 md:gap-1.5 mt-6">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group aspect-square relative overflow-hidden bg-muted/20 border border-border/40 focus:outline-none focus:ring-1 focus:ring-foreground"
              aria-label={post.alt}
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Type Badge (Carousel / Reel) in top-right corner */}
              {post.type === "carousel" && (
                <div 
                  className="absolute top-2 right-2 p-1 rounded-sm bg-black/40 text-white backdrop-blur-[2px]"
                  title="Carousel"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                  </svg>
                </div>
              )}

              {post.type === "reel" && (
                <div 
                  className="absolute top-2 right-2 p-1 rounded-sm bg-black/40 text-white backdrop-blur-[2px]"
                  title="Reel"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="6 3 20 12 6 21 6 3"/>
                  </svg>
                </div>
              )}

              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs font-mono font-medium flex items-center gap-1 bg-black/50 px-2 py-1 rounded">
                  View ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
