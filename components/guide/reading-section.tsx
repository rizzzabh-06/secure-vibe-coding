import { readingLevels } from "@/lib/content/guide"
import { ExternalLink } from "./external-link"
import { Section, SectionHeader } from "./section"

export function ReadingSection() {
  return (
    <Section id="reading" labelledBy="reading-title">
      <SectionHeader
        id="reading-title"
        index="07"
        eyebrow="Reading room"
        title="Where to go next"
      >
        <p>
          A short, staged reading list. Each item is a primary source from the
          team that maintains the material.
        </p>
      </SectionHeader>

      <div className="space-y-14">
        {readingLevels.map((lvl) => (
          <div key={lvl.level}>
            <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-mono text-sm text-primary">{lvl.level}</span>
              <h3 className="text-xl font-semibold tracking-tight">{lvl.title}</h3>
              {lvl.intro ? (
                <span className="text-sm text-muted-foreground">{lvl.intro}</span>
              ) : null}
            </div>
            <ul className="divide-y divide-border border-y border-border">
              {lvl.items.map((item) => (
                <li
                  key={item.title}
                  className="grid gap-2 py-5 md:grid-cols-[1fr_1.5fr_auto] md:items-baseline md:gap-8"
                >
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {item.publisher}
                    </p>
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {item.body}
                  </p>
                  <p className="text-sm md:text-right">
                    <ExternalLink href={item.link.href}>{item.link.label}</ExternalLink>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
