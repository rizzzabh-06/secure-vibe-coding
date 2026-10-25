import { lab } from "@/lib/content/guide"
import { CodeBlock } from "./code-block"
import { Callout, Section, SectionHeader, SubHeading } from "./section"
import { MetaballThreatCore } from "@/components/effects/metaball-threat-core"

export function LabSection() {
  return (
    <Section id="lab" labelledBy="lab-title">
      <SectionHeader
        id="lab-title"
        index="02"
        eyebrow="Hands-on lab"
        title="Audit and fix a broken-access-control bug"
      >
        <p>
          Use a small local application you own, or a deliberately vulnerable
          practice app. Do not test systems you do not own or have explicit
          permission to assess.
        </p>
      </SectionHeader>

      <div className="space-y-14">
        <div>
          <SubHeading>Step 1: Review the vulnerable endpoint</SubHeading>
          <p className="prose-body mt-3 max-w-2xl">
            The endpoint authenticates the caller with{" "}
            <code className="rounded-sm border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.85em]">
              get_current_user
            </code>
            , but the query never uses the user. Any authenticated account can
            read any note by guessing its identifier.
          </p>
          <div className="mt-5">
            <CodeBlock
              code={lab.vulnerable}
              lang="python"
              title="notes.py"
              variant="vulnerable"
            />
          </div>
        </div>

        <div>
          <SubHeading>Step 2: Ask AI for a review, not just a patch</SubHeading>
          <p className="prose-body mt-3 max-w-2xl">
            A prompt that asks for analysis, a minimal fix, and tests produces a
            more reliable result than one that only says &quot;fix the
            security.&quot;
          </p>
          <div className="mt-5">
            <CodeBlock code={lab.prompt} lang="text" title="Prompt" />
          </div>
        </div>

        <div>
          <SubHeading>Step 3: Apply the fix</SubHeading>
          <p className="prose-body mt-3 max-w-2xl">
            The query is now scoped to the authenticated user. A note that the
            user does not own is indistinguishable from one that does not exist.
          </p>
          <div className="mt-5">
            <CodeBlock
              code={lab.safer}
              lang="python"
              title="notes.py"
              variant="safer"
            />
          </div>
        </div>

        <div>
          <SubHeading>Step 4: Prove it with tests</SubHeading>
          <p className="prose-body mt-3 max-w-2xl">
            Add a regression test for each row. The cross-user case is the one
            that protects you from this bug returning.
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[28rem] border-collapse text-left text-[15px]">
              <caption className="sr-only">Authorization regression tests</caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="eyebrow py-3 pr-4 font-normal">
                    Test
                  </th>
                  <th scope="col" className="eyebrow py-3 font-normal">
                    Expected result
                  </th>
                </tr>
              </thead>
              <tbody>
                {lab.tests.map((t) => (
                  <tr key={t.test} className="border-b border-border">
                    <td className="py-3 pr-4">{t.test}</td>
                    <td className="py-3 font-mono text-sm">
                      <span
                        className={
                          t.expected === "Denied" ? "text-destructive" : "text-primary"
                        }
                      >
                        {t.expected}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10">
          <MetaballThreatCore />
        </div>

        <Callout tone="caution" title="Do not trust a passing summary">
          Ask the assistant to report the tests it actually ran and their output.
          Run them yourself before treating the issue as resolved.
        </Callout>
      </div>
    </Section>
  )
}
