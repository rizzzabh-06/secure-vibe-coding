import { codeToHtml } from "shiki"
import { cn } from "@/lib/utils"
import { CopyButton } from "./copy-button"

type Variant = "vulnerable" | "safer" | "neutral"

const variantStyles: Record<Variant, { label: string; dot: string; edge: string }> = {
  vulnerable: {
    label: "Vulnerable",
    dot: "bg-destructive",
    edge: "border-l-destructive/70",
  },
  safer: {
    label: "Safer",
    dot: "bg-primary",
    edge: "border-l-primary/70",
  },
  neutral: {
    label: "",
    dot: "",
    edge: "border-l-border",
  },
}

export async function CodeBlock({
  code,
  lang = "text",
  title,
  variant = "neutral",
  className,
  maxHeightClass,
}: {
  code: string
  lang?: string
  title?: string
  variant?: Variant
  className?: string
  maxHeightClass?: string
}) {
  const trimmed = code.replace(/\n$/, "")
  const html = await codeToHtml(trimmed, {
    lang,
    theme: "github-dark-dimmed",
  })
  const style = variantStyles[variant]

  return (
    <figure
      className={cn(
        "overflow-hidden rounded-md border border-l-2 border-border bg-card",
        style.edge,
        className,
      )}
    >
      <figcaption className="flex items-center justify-between gap-3 border-b border-border px-3 py-1.5">
        <span className="flex min-w-0 items-center gap-2 font-mono text-xs text-muted-foreground">
          {style.label ? (
            <span className="flex items-center gap-1.5 text-foreground">
              <span
                className={cn("size-1.5 rounded-full", style.dot)}
                aria-hidden="true"
              />
              {style.label}
            </span>
          ) : null}
          {style.label && title ? (
            <span aria-hidden="true" className="text-border">
              /
            </span>
          ) : null}
          {title ? <span className="truncate">{title}</span> : null}
        </span>
        <CopyButton text={trimmed} />
      </figcaption>
      <div
        className={cn(
          "overflow-auto p-4 font-mono text-[13px] leading-6",
          maxHeightClass,
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  )
}
