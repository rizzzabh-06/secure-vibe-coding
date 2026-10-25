import { loopSteps } from "@/lib/content/guide"
import { Section, SectionHeader } from "./section"

export function LoopSection() {
  return (
    <Section id="loop" labelledBy="loop-title">
      <SectionHeader
        id="loop-title"
        index="08"
        eyebrow="Secure loop"
        title="The secure vibe coding loop"
      >
        <p>
          Security is not a final gate. It is a loop you run on every feature,
          and the output of each pass feeds the next.
        </p>
      </SectionHeader>

      <ol className="relative space-y-0">
        {loopSteps.map((s, i) => (
          <li
            key={s.title}
            className="relative grid grid-cols-[2.5rem_1fr] gap-4 pb-8 last:pb-0"
          >
            {i < loopSteps.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute left-[1.1rem] top-9 h-[calc(100%-2.25rem)] w-px bg-border"
              />
            ) : null}
            <span className="relative z-10 flex size-9 items-center justify-center rounded-full border border-primary bg-background font-mono text-xs text-primary">
              {s.index}
            </span>
            <div className="pt-1">
              <p className="font-semibold tracking-tight">{s.title}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-10 max-w-xl border-l-2 border-primary pl-4 text-lg font-medium leading-snug">
        Then repeat for the next feature. Every fixed vulnerability should leave
        behind a test that keeps it fixed.
      </p>
    </Section>
  )
}
