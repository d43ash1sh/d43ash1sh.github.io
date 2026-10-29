import { HeroSection } from "@/sections/HeroSection";
import { ContactSection } from "@/sections/ContactSection";
import { SocialsSection } from "@/sections/SocialsSection";
import { SkillsSection } from "@/sections/SkillsSection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { AboutSection } from "@/sections/AboutSection";
import { InstagramFeedSection } from "@/sections/InstagramFeedSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <ContactSection />
      <SocialsSection />
      <SkillsSection />
      <ProjectsSection />
      <AboutSection />
      <InstagramFeedSection />
    </div>
  );
}
