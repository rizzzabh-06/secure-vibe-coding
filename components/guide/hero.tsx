import { ArrowDown } from "lucide-react"
import { principles } from "@/lib/content/guide"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const diffLines: { kind: "context" | "remove" | "add"; text: string }[] = [
  { kind: "context", text: "note = db.query(Note).filter(" },
  { kind: "remove", text: "    Note.id == note_id" },
  { kind: "add", text: "    Note.id == note_id," },
  { kind: "add", text: "    Note.owner_id == user.id" },
  { kind: "context", text: ").first()" },
]

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="scroll-mt-14 lg:scroll-mt-0">
      <div className="mx-auto w-full max-w-4xl px-5 pb-16 pt-14 md:px-10 md:pb-24 md:pt-24">
        <p className="eyebrow mb-8">
          Field guide <span aria-hidden="true">·</span> 2026{" "}
          <span aria-hidden="true">·</span> Open reference
        </p>

        <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:items-end">
          <div>
            <p className="mb-4 font-mono text-sm text-primary">
              A practical field guide to AI-assisted development
            </p>
            <h1
              id="hero-title"
              className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl"
            >
              Secure Vibe Coding
            </h1>
            <p className="mt-5 text-balance text-2xl font-medium leading-snug tracking-tight text-foreground/90 md:text-3xl">
              From AI-generated code to secure software.
            </p>
            <div className="prose-body mt-8 max-w-xl text-lg text-muted-foreground">
              <p>
                AI makes it easier than ever to build applications. But code that
                runs is not necessarily code that is safe.
              </p>
              <p>
                Learn how to recognize common security flaws, guide AI toward
                secure implementations, audit your codebase with free tools, and
                verify that your fixes actually work.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#vulnerabilities"
                className={cn(buttonVariants({ size: "lg" }), "font-medium")}
              >
                Read the vulnerability handbook
                <ArrowDown className="size-4" aria-hidden="true" />
              </a>
              <a
                href="#checklist"
                className="px-2 py-2 text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-ring"
              >
                Jump to the audit checklist
              </a>
            </div>

            <p className="mt-10 text-sm text-muted-foreground">
              Built for developers, cybersecurity learners, and AI-assisted
              builders.
            </p>
          </div>

          <figure className="overflow-hidden rounded-md border border-border bg-card">
            <figcaption className="border-b border-border px-3 py-1.5 font-mono text-xs text-muted-foreground">
              One missing condition
            </figcaption>
            <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-6">
              <code>
                {diffLines.map((line, i) => (
                  <span
                    key={i}
                    className={cn(
                      "-mx-4 block px-4",
                      line.kind === "add" && "bg-primary/10 text-primary",
                      line.kind === "remove" && "bg-destructive/10 text-destructive",
                      line.kind === "context" && "text-muted-foreground",
                    )}
                  >
                    <span aria-hidden="true" className="mr-3 inline-block w-3 select-none">
                      {line.kind === "add" ? "+" : line.kind === "remove" ? "-" : " "}
                    </span>
                    {line.text}
                  </span>
                ))}
              </code>
            </pre>
            <p className="border-t border-border px-4 py-3 text-sm leading-6 text-muted-foreground">
              The feature works either way. Only one version stops Account B from
              reading Account A&apos;s notes.
            </p>
          </figure>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto w-full max-w-4xl px-5 py-16 md:px-10 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
            <div>
              <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                Why secure vibe coding matters
              </h2>
            </div>
            <div className="prose-body">
              <p>
                Vibe coding makes software development faster by allowing
                developers to describe what they want and let an AI coding
                assistant generate much of the implementation.
              </p>
              <p>
                That speed is useful. It also creates a new challenge: developers
                can end up shipping code they have not fully understood,
                reviewed, or tested.
              </p>
              <p>
                An AI-generated application might have a polished interface, a
                working login page, a connected database, and all the expected
                features, while still allowing users to access other
                people&apos;s records or exposing privileged credentials.
              </p>
              <p>
                The problem is not simply that AI generates bad code. The problem
                is that functional correctness and security correctness are
                different things.
              </p>
              <p className="font-medium text-foreground">
                A feature can work exactly as requested and still violate a
                security requirement that was never specified.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="eyebrow mb-5">The four principles of secure vibe coding</h3>
            <ol className="grid gap-px border-y border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {principles.map((p) => (
                <li key={p.title} className="bg-background p-5 first:pl-0 sm:first:pl-5">
                  <span className="font-mono text-xs text-primary">{p.index}</span>
                  <p className="mt-2 text-lg font-semibold tracking-tight">{p.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{p.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 max-w-xl text-lg font-medium leading-snug text-foreground">
              The objective isn&apos;t to stop using AI. It&apos;s to make security a
              normal part of using AI.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
