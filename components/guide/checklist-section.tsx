"use client"

import { useState } from "react"
import { checklistGroups } from "@/lib/content/guide"
import { Checkbox } from "@/components/ui/checkbox"
import { Section, SectionHeader } from "./section"

const allItems = checklistGroups.flatMap((g) => g.items)

export function ChecklistSection() {
  const [checked, setChecked] = useState<Set<string>>(new Set())

  function toggle(id: string, value: boolean) {
    setChecked((prev) => {
      const next = new Set(prev)
      if (value) next.add(id)
      else next.delete(id)
      return next
    })
  }

  const done = checked.size
  const total = allItems.length

  return (
    <Section id="checklist" labelledBy="checklist-title">
      <SectionHeader
        id="checklist-title"
        index="06"
        eyebrow="Audit checklist"
        title="A pre-release security checklist"
      >
        <p>
          Work through this before you ship. Progress is kept on this page only
          and resets when you reload.
        </p>
      </SectionHeader>

      <div
        className="mb-10 flex items-center gap-4"
        role="status"
        aria-live="polite"
      >
        <div
          className="h-1.5 flex-1 overflow-hidden rounded-sm bg-border"
          aria-hidden="true"
        >
          <div
            className="h-full bg-primary transition-[width] duration-300"
            style={{ width: `${(done / total) * 100}%` }}
          />
        </div>
        <span className="font-mono text-sm text-muted-foreground">
          {done} / {total} complete
        </span>
      </div>

      <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
        {checklistGroups.map((group) => (
          <fieldset key={group.title}>
            <legend className="eyebrow mb-4 w-full border-b border-border pb-2 text-foreground">
              {group.title}
            </legend>
            <ul className="space-y-3">
              {group.items.map((item) => (
                <li key={item.id} className="flex items-start gap-3">
                  <Checkbox
                    id={item.id}
                    checked={checked.has(item.id)}
                    onCheckedChange={(v) => toggle(item.id, v === true)}
                    className="mt-1"
                  />
                  <label
                    htmlFor={item.id}
                    className="cursor-pointer text-[15px] leading-7 text-foreground/85"
                  >
                    {item.label}
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
        ))}
      </div>
    </Section>
  )
}
