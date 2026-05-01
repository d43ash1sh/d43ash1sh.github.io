import socials from "@/data/socials.json";
import { Shield, Bug } from "lucide-react";

const LinkedinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
const GithubIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>;
const TwitterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;

const getIcon = (name: string) => {
  switch (name) {
    case "Linkedin":
      return <LinkedinIcon />;
    case "Github":
      return <GithubIcon />;
    case "Shield":
      return <Shield className="h-4 w-4" />;
    case "Bug":
      return <Bug className="h-4 w-4" />;
    case "Twitter":
      return <TwitterIcon />;
    default:
      return <span className="h-4 w-4" />;
  }
};

export function SocialsSection() {
  return (
    <section className="w-full border-b border-border bg-background">
      <div className="mx-auto grid grid-cols-2 sm:grid-cols-2 md:flex max-w-5xl border-x border-border">
        {socials.map((social, index) => (
          <a
            key={social.platform}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex flex-1 items-center justify-between p-4 transition-colors hover:bg-muted border-border ${
              index % 2 === 0 ? "border-r" : ""
            } md:border-r md:last:border-r-0 border-b md:border-b-0`}
          >
            <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-background border border-border shadow-sm transition-all duration-300 group-hover:border-foreground/30 group-hover:shadow-[0_0_8px_rgba(255,255,255,0.1)] dark:group-hover:shadow-[0_0_8px_rgba(255,255,255,0.15)]">
                {getIcon(social.icon)}
              </div>
              <span className="text-sm font-medium font-mono">{social.platform}</span>
            </div>
            <span className="text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground">
              ↗
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
