import type React from "react"
import { owaspCategories, vulnerabilities } from "@/lib/content/vulnerabilities"
import type { Vulnerability } from "@/lib/content/vulnerabilities"
import { CodeBlock } from "./code-block"
import { ExternalLink } from "./external-link"
import { Inline } from "./inline"
import { BulletList, Section, SectionHeader } from "./section"

function Block({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-2 md:grid-cols-[9rem_1fr] md:gap-8">
      <h4 className="eyebrow pt-1">{label}</h4>
      <div className="min-w-0">{children}</div>
    </div>
  )
}

function Body({ value }: { value: string | string[] }) {
  if (Array.isArray(value)) {
    return (
      <BulletList items={value.map((v) => <Inline key={v} text={v} />)} />
    )
  }
  return (
    <p className="leading-7 text-foreground/85">
      <Inline text={value} />
    </p>
  )
}

async function Entry({ v }: { v: Vulnerability }) {
  return (
    <article
      id={v.id}
      aria-labelledby={`${v.id}-title`}
      className="scroll-mt-20 border-t border-border py-12 first:border-t-0 first:pt-0 lg:scroll-mt-8"
    >
      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <span className="font-mono text-sm text-primary">{v.number}</span>
          {v.priority ? (
            <span className="rounded-sm border border-primary/40 px-2 py-0.5 font-mono text-xs text-primary">
              {v.priority}
            </span>
          ) : null}
        </div>
        <h3
          id={`${v.id}-title`}
          className="text-balance text-2xl font-semibold tracking-tight"
        >
          {v.title}
        </h3>
        <p className="mt-2 text-muted-foreground">{v.short}</p>
      </header>

      <div className="space-y-8">
        <Block label="What it is">
          <div className="prose-body">
            {v.what.map((p) => (
              <p key={p}>
                <Inline text={p} />
              </p>
            ))}
          </div>
        </Block>

        {v.why ? (
          <Block label="Why AI makes it easy">
            <Body value={v.why} />
          </Block>
        ) : null}

        {v.mistakes ? (
          <Block label="Common mistakes">
            <Body value={v.mistakes} />
          </Block>
        ) : null}

        {v.snippets ? (
          <div className="space-y-4 md:pl-[11rem]">
            {v.snippets.map((s) => (
              <div key={s.label}>
                <CodeBlock
                  code={s.code}
                  lang={s.lang}
                  title={s.label}
                  variant={s.variant}
                />
                {s.note ? (
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {s.note}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}

        <Block label="How to detect it">
          <Body value={v.detect} />
        </Block>

        <Block label="How to fix it">
          <Body value={v.fix} />
        </Block>

        <Block label="Further reading">
          <ul className="space-y-1.5">
            {v.reading.map((r) => (
              <li key={r.href}>
                <ExternalLink href={r.href}>{r.label}</ExternalLink>
              </li>
            ))}
          </ul>
        </Block>
      </div>
    </article>
  )
}

export function VulnerabilitiesSection() {
  return (
    <Section id="vulnerabilities" labelledBy="vulnerabilities-title">
      <SectionHeader
        id="vulnerabilities-title"
        index="01"
        eyebrow="Vulnerability handbook"
        title="Common vulnerabilities in AI-generated code"
      >
        <p>
          AI can write code that looks professional and still miss important
          security properties. Each entry below covers what the flaw is, how to
          detect it, how to fix it, and where to learn more.
        </p>
      </SectionHeader>

      <nav aria-label="Vulnerability index" className="mb-14">
        <ol className="grid gap-px border border-border bg-border sm:grid-cols-2">
          {vulnerabilities.map((v) => (
            <li key={v.id} className="bg-background">
              <a
                href={`#${v.id}`}
                className="flex items-baseline gap-3 px-4 py-3 text-sm transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
              >
                <span className="font-mono text-xs text-primary">{v.number}</span>
                <span>{v.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {vulnerabilities.map((v) => (
        <Entry key={v.id} v={v} />
      ))}

      <div className="mt-6 rounded-md border border-border bg-card p-6">
        <h3 className="text-lg font-semibold tracking-tight">
          OWASP Top 10:2025 categories
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          The handbook entries above map to the official 2025 list. Use the OWASP
          Top 10 as an awareness resource, not as a complete checklist.
        </p>
        <ol className="mt-5 grid gap-x-8 gap-y-1.5 text-sm sm:grid-cols-2">
          {owaspCategories.map((c, i) => (
            <li key={c} className="flex gap-3">
              <span className="w-6 shrink-0 font-mono text-xs leading-6 text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="leading-6">{c}</span>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-sm">
          <ExternalLink href="https://top10.owasp.org/2025/">
            Read the official OWASP Top 10
          </ExternalLink>
        </p>
      </div>
    </Section>
  )
}
