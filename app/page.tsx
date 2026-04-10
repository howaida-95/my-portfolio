import { ScrollToTop } from "@/components/scroll-to-top";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { ResumeSection } from "@/components/sections/resume-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { StatsSection } from "@/components/sections/stats-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { SiteFooter } from "@/components/site-footer";
import { getPortfolioItems } from "@/lib/load-portfolio";

export default function HomePage() {
  const portfolioItems = getPortfolioItems();

  return (
    <>
      <main>
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <SkillsSection />
        <ResumeSection />
        <PortfolioSection items={portfolioItems} />
        <ServicesSection />
        {/* <TestimonialsSection /> */}
        <ContactSection />
      </main>
      <SiteFooter />
      <ScrollToTop />
    </>
  );
}
