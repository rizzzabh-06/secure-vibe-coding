import { aiRules } from "@/lib/content/guide"
import { evidenceIntegrityProtocolMarkdown } from "@/lib/content/protocol"
import { CodeBlock } from "./code-block"
import { Callout, Section, SectionHeader } from "./section"
import { ProtocolTabs } from "./protocol-tabs"

export async function AiRulesSection() {
  const fullProtocolBlock = (
    <CodeBlock
      code={evidenceIntegrityProtocolMarkdown}
      lang="markdown"
      title="no-yes-man-protocol.md"
      maxHeightClass="max-h-[38rem]"
    />
  )

  const compactRulesBlock = (
    <CodeBlock
      code={aiRules}
      lang="markdown"
      title="secure-vibe-coding-rules.md"
      maxHeightClass="max-h-[34rem]"
    />
  )

  return (
    <Section id="ai-rules" labelledBy="ai-rules-title">
      <SectionHeader
        id="ai-rules-title"
        index="05"
        eyebrow="AI Rules & Protocols"
        title="Evidence-Integrity Protocol & AI Rules"
      >
        <p>
          Prevent superficial agreement, fabricated verification, and silent risk acceptance. Use the interactive workflow to audit permissions, or copy the complete protocol directly into your AI assistant&apos;s system prompt.
        </p>
      </SectionHeader>

      <ProtocolTabs
        fullProtocolCodeBlock={fullProtocolBlock}
        compactRulesCodeBlock={compactRulesBlock}
        rawFullProtocol={evidenceIntegrityProtocolMarkdown}
      />

      <Callout title="Evidence over agreement." className="mt-8">
        Never confuse a plausible explanation, a passing unit test, or an AI-generated assertion with verified security. Every material claim must be accompanied by explicit evidence: <span className="font-mono text-primary">[VERIFIED]</span>, <span className="font-mono text-muted-foreground">[OBSERVED]</span>, or <span className="font-mono text-destructive">[CONTRADICTED]</span>.
      </Callout>
    </Section>
  )
}

