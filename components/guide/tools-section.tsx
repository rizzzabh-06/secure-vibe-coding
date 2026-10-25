import { scanLimits, scanOrder, tools } from "@/lib/content/guide"
import { CodeBlock } from "./code-block"
import { ExternalLink } from "./external-link"
import { Callout, Section, SectionHeader, SubHeading } from "./section"
import { PixelCyberArcade } from "@/components/effects/pixel-cyber-arcade"

export function ToolsSection() {
  return (
    <Section id="tools" labelledBy="tools-title">
      <SectionHeader
        id="tools-title"
        index="03"
        eyebrow="Tools"
        title="Free tools to audit your code"
      >
        <p>
          No single scanner covers every risk. Use several, understand what each
          one looks at, and treat findings as leads to investigate.
        </p>
      </SectionHeader>

      <div className="mb-8">
        <PixelCyberArcade />
      </div>

      <ul className="grid gap-px border border-border bg-border md:grid-cols-2">
        {tools.map((t) => (
          <li key={t.name} className="flex flex-col bg-background p-5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-lg font-semibold tracking-tight">{t.name}</h3>
              <span className="eyebrow shrink-0">{t.category}</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {t.description}
            </p>
            {t.commands ? (
              <div className="mt-4">
                <CodeBlock code={t.commands} lang="bash" />
              </div>
            ) : null}
            <p className="mt-auto pt-4 text-sm">
              <ExternalLink href={t.link.href}>{t.link.label}</ExternalLink>
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-16 grid gap-10 md:grid-cols-[1fr_1.4fr]">
        <div>
          <SubHeading>What scans can and cannot tell you</SubHeading>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            A clean report means the tool found nothing it knows how to look for.
            It does not mean the application is secure.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
            <caption className="sr-only">Scanner coverage and limits</caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="eyebrow py-3 pr-4 font-normal">
                  Tool
                </th>
                <th scope="col" className="eyebrow py-3 pr-4 font-normal">
                  Useful for
                </th>
                <th scope="col" className="eyebrow py-3 font-normal">
                  Does not prove
                </th>
              </tr>
            </thead>
            <tbody>
              {scanLimits.map((r) => (
                <tr key={r.tool} className="border-b border-border align-top">
                  <th scope="row" className="py-3 pr-4 font-medium">
                    {r.tool}
                  </th>
                  <td className="py-3 pr-4 text-muted-foreground">{r.useful}</td>
                  <td className="py-3 text-muted-foreground">{r.limit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-14">
        <SubHeading>A sensible order of operations</SubHeading>
        <ol className="mt-5 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {scanOrder.map((s, i) => (
            <li key={s} className="bg-background p-4">
              <span className="font-mono text-xs text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-sm leading-6">{s}</p>
            </li>
          ))}
        </ol>
      </div>

      <Callout tone="caution" title="Authorized testing only" className="mt-10">
        Only scan applications and systems that you own or are explicitly
        authorized to test.
      </Callout>
    </Section>
  )
}
