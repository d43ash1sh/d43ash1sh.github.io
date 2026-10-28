import socials from "@/data/socials.json";
import { Shield, Bug } from "lucide-react";
import {
  LinkedinIcon,
  GithubIcon,
  TwitterIcon,
  InstagramIcon
} from "@/components/BrandIcons";

const getIcon = (name: string) => {
  switch (name) {
    case "Linkedin":
      return <LinkedinIcon className="h-4 w-4" />;
    case "Github":
      return <GithubIcon className="h-4 w-4" />;
    case "Shield":
      return <Shield className="h-4 w-4" />;
    case "Bug":
      return <Bug className="h-4 w-4" />;
    case "Twitter":
      return <TwitterIcon className="h-4 w-4" />;
    case "Instagram":
      return <InstagramIcon className="h-4 w-4" />;
    default:
      return <span className="h-4 w-4" />;
  }
};

export function SocialsSection() {
  return (
    <section className="w-full border-b border-border bg-background">
      <div className="mx-auto grid grid-cols-2 sm:grid-cols-3 md:flex max-w-5xl border-x border-border">
        {socials.map((social, index) => (
          <a
            key={social.platform}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex flex-1 items-center justify-between p-4 transition-colors hover:bg-muted border-border ${
              index % 2 === 0 ? "border-r sm:border-r" : ""
            } md:border-r md:last:border-r-0 border-b md:border-b-0`}
          >
            <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-background border border-border shadow-xs transition-all duration-300 group-hover:border-foreground/30">
                {getIcon(social.icon)}
              </div>
              <span className="text-sm font-medium font-mono">{social.platform}</span>
            </div>
            <span className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground">
              ↗
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
