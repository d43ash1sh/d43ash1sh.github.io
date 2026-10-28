import { HeroSection } from "@/sections/HeroSection";
import { ContactSection } from "@/sections/ContactSection";
import { SocialsSection } from "@/sections/SocialsSection";
import { AboutSection } from "@/sections/AboutSection";
import { SkillsSection } from "@/sections/SkillsSection";
import { TechnicalWorkSection } from "@/sections/TechnicalWorkSection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { ResearchSection } from "@/sections/ResearchSection";
import { InstagramSection } from "@/sections/InstagramSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <ContactSection />
      <SocialsSection />
      <AboutSection />
      <SkillsSection />
      <TechnicalWorkSection />
      <ProjectsSection />
      <ResearchSection />
      <InstagramSection />
    </div>
  );
}
