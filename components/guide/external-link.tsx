import type React from "react"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function ExternalLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1 text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
        className,
      )}
    >
      {children}
      <ArrowUpRight className="size-3.5 shrink-0" aria-hidden="true" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}
