import { SiteNav } from "@/components/guide/site-nav"
import { Hero } from "@/components/guide/hero"
import { VulnerabilitiesSection } from "@/components/guide/vulnerabilities-section"
import { LabSection } from "@/components/guide/lab-section"
import { ToolsSection } from "@/components/guide/tools-section"
import { FrameworksSection } from "@/components/guide/frameworks-section"
import { AiRulesSection } from "@/components/guide/ai-rules-section"
import { ChecklistSection } from "@/components/guide/checklist-section"
import { ReadingSection } from "@/components/guide/reading-section"
import { LoopSection } from "@/components/guide/loop-section"
import { SiteFooter } from "@/components/guide/site-footer"
import { GsapAnimator } from "@/components/effects/gsap-animator"

export default function HomePage() {
  return (
    <div>
      <GsapAnimator />
      <SiteNav />
      <div className="min-w-0 lg:pl-64">
        <main id="main">
          <Hero />
          <VulnerabilitiesSection />
          <LabSection />
          <ToolsSection />
          <FrameworksSection />
          <AiRulesSection />
          <ChecklistSection />
          <ReadingSection />
          <LoopSection />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}
