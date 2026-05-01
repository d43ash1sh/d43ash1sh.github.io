import { HeroSection } from "@/sections/HeroSection";
import { ContactSection } from "@/sections/ContactSection";
import { SocialsSection } from "@/sections/SocialsSection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { AboutSection } from "@/sections/AboutSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <ContactSection />
      <SocialsSection />
      <ProjectsSection />
      <AboutSection />
    </div>
  );
}
