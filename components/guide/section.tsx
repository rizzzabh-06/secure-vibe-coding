import type React from "react"
import { cn } from "@/lib/utils"

export function Section({
  id,
  className,
  children,
  labelledBy,
}: {
  id: string
  className?: string
  children: React.ReactNode
  labelledBy?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("scroll-mt-14 border-t border-border lg:scroll-mt-0", className)}
    >
      <div className="mx-auto w-full max-w-4xl px-5 py-16 md:px-10 md:py-24">
        {children}
      </div>
    </section>
  )
}

export function SectionHeader({
  id,
  index,
  eyebrow,
  title,
  children,
}: {
  id: string
  index: string
  eyebrow: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <header className="mb-12 max-w-2xl">
      <p className="eyebrow mb-4">
        <span className="text-primary">{index}</span>
        <span aria-hidden="true"> / </span>
        {eyebrow}
      </p>
      <h2
        id={id}
        className="text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl"
      >
        {title}
      </h2>
      {children ? (
        <div className="prose-body mt-5 text-lg text-muted-foreground">
          {children}
        </div>
      ) : null}
    </header>
  )
}

export function SubHeading({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h3 className={cn("text-xl font-semibold tracking-tight", className)}>
      {children}
    </h3>
  )
}

export function Callout({
  tone = "note",
  title,
  children,
  className,
}: {
  tone?: "note" | "caution"
  title?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <aside
      className={cn(
        "rounded-md border border-l-2 bg-card px-4 py-3.5 text-[15px] leading-7",
        tone === "caution"
          ? "border-destructive/30 border-l-destructive"
          : "border-border border-l-primary",
        className,
      )}
    >
      {title ? (
        <p className="eyebrow mb-1 text-foreground">{title}</p>
      ) : null}
      <div className="text-foreground/85">{children}</div>
    </aside>
  )
}

export function BulletList({
  items,
  className,
}: {
  items: React.ReactNode[]
  className?: string
}) {
  return (
    <ul className={cn("space-y-2", className)}>
      {items.map((item, i) => (
        <li
          key={i}
          className="relative pl-5 leading-7 text-foreground/85 before:absolute before:left-0 before:top-[0.8em] before:h-px before:w-2.5 before:bg-primary"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}
