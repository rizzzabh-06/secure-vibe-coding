import { ssdlc, standards } from "@/lib/content/guide"
import { ExternalLink } from "./external-link"
import { Section, SectionHeader, SubHeading } from "./section"

export function FrameworksSection() {
  return (
    <Section id="frameworks" labelledBy="frameworks-title">
      <SectionHeader
        id="frameworks-title"
        index="04"
        eyebrow="Frameworks"
        title="Security standards that give AI testable requirements"
      >
        <p>
          &quot;Make it secure&quot; is not a requirement. Standards turn a vague
          goal into specific items that can be checked.
        </p>
      </SectionHeader>

      <div className="divide-y divide-border border-y border-border">
        {standards.map((s) => (
          <article
            key={s.title}
            className="grid gap-4 py-8 md:grid-cols-[14rem_1fr] md:gap-10"
          >
            <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
            <div>
              <p className="leading-7 text-foreground/85">{s.body}</p>
              <p className="mt-3 text-sm">
                <ExternalLink href={s.link.href}>{s.link.label}</ExternalLink>
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16">
        <SubHeading>A secure development lifecycle, in short</SubHeading>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          AI assistance changes how code is written. It does not remove the need
          for any of these phases.
        </p>
        <ol className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {ssdlc.map((p, i) => (
            <li key={p.phase} className="bg-background p-5">
              <span className="font-mono text-xs text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 font-semibold tracking-tight">{p.phase}</p>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
