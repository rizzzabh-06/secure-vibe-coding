"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Menu } from "lucide-react"
import { sections } from "@/lib/content/sections"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

function useActiveSection() {
  const [active, setActive] = useState(sections[0].id)

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)

    const visible = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.boundingClientRect.top)
          } else {
            visible.delete(entry.target.id)
          }
        }
        if (visible.size > 0) {
          const [first] = [...visible.entries()].sort((a, b) => a[1] - b[1])
          setActive(first[0])
        }
      },
      { rootMargin: "-10% 0px -75% 0px", threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return active
}

function Brand() {
  return (
    <a
      href="#home"
      className="font-mono text-sm font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-ring"
    >
      SECURE<span className="mx-1 text-primary">/</span>VIBE
    </a>
  )
}

function NavList({
  active,
  onNavigate,
  wrapItem,
}: {
  active: string
  onNavigate?: () => void
  wrapItem?: (node: React.ReactNode) => React.ReactNode
}) {
  return (
    <ul className="space-y-0.5">
      {sections.map((s) => {
        const isActive = s.id === active
        const link = (
          <a
            href={`#${s.id}`}
            onClick={onNavigate}
            aria-current={isActive ? "location" : undefined}
            className={cn(
              "group flex items-baseline gap-3 rounded-sm border-l-2 px-3 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-ring",
              isActive
                ? "border-primary bg-accent text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            <span
              className={cn(
                "font-mono text-xs",
                isActive ? "text-primary" : "text-muted-foreground/70",
              )}
            >
              {s.index}
            </span>
            {s.label}
          </a>
        )
        return <li key={s.id}>{wrapItem ? wrapItem(link) : link}</li>
      })}
    </ul>
  )
}

export function SiteNav() {
  const active = useActiveSection()
  const [open, setOpen] = useState(false)

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <div className="flex h-14 items-center border-b border-sidebar-border px-6">
          <Brand />
        </div>
        <nav aria-label="Guide sections" className="flex-1 overflow-y-auto px-3 py-5">
          <NavList active={active} />
        </nav>
        <div className="border-t border-sidebar-border px-6 py-4">
          <p className="eyebrow leading-5">
            Field guide
            <br />
            Open reference
          </p>
        </div>
      </aside>

      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/90 px-5 backdrop-blur lg:hidden">
        <Brand />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-sm border border-border px-3 py-1.5 font-mono text-xs text-foreground focus-visible:outline-2 focus-visible:outline-ring"
            >
              <Menu className="size-4" aria-hidden="true" />
              Menu
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-sidebar p-0">
            <SheetTitle className="border-b border-sidebar-border px-5 py-4 font-mono text-sm">
              Sections
            </SheetTitle>
            <SheetDescription className="sr-only">
              Jump to a section of the guide
            </SheetDescription>
            <nav aria-label="Guide sections" className="px-3 py-4">
              <NavList
                active={active}
                wrapItem={(node) => <SheetClose asChild>{node}</SheetClose>}
              />
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </>
  )
}
