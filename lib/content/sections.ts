export type SectionLink = {
  id: string
  label: string
  index: string
}

export const sections: SectionLink[] = [
  { id: "home", label: "Home", index: "00" },
  { id: "vulnerabilities", label: "Vulnerabilities", index: "01" },
  { id: "lab", label: "Hands-on Lab", index: "02" },
  { id: "tools", label: "Tools", index: "03" },
  { id: "frameworks", label: "Frameworks", index: "04" },
  { id: "ai-rules", label: "AI Rules & Protocol", index: "05" },
  { id: "checklist", label: "Audit Checklist", index: "06" },
  { id: "reading", label: "Reading Room", index: "07" },
  { id: "loop", label: "Secure Loop", index: "08" },
]
