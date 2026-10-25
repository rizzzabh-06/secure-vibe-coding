"use client"

import * as React from "react"
import { useState } from "react"
import {
  ShieldAlert,
  Terminal,
  Workflow,
  FileCode2,
  CheckCircle2,
  AlertTriangle,
  Lock,
  ArrowRight,
  Sliders,
  Scale,
  Sparkles,
  Layers,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CopyButton } from "./copy-button"
import {
  evidenceLabels,
  operatingModes,
  stagedExecutionGates,
  firstResponseWorkflow,
} from "@/lib/content/protocol"
import { cn } from "@/lib/utils"

export function ProtocolTabs({
  fullProtocolCodeBlock,
  compactRulesCodeBlock,
  rawFullProtocol,
}: {
  fullProtocolCodeBlock: React.ReactNode
  compactRulesCodeBlock: React.ReactNode
  rawFullProtocol: string
}) {
  const [activeMode, setActiveMode] = useState<string>("planning")
  const [activeStage, setActiveStage] = useState<number>(0)

  const selectedMode =
    operatingModes.find((m) => m.id === activeMode) || operatingModes[0]
  const selectedStage =
    stagedExecutionGates.find((s) => s.stage === activeStage) ||
    stagedExecutionGates[0]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="workflow" className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-4">
          <TabsList className="bg-card border border-border h-auto p-1 grid grid-cols-2 sm:grid-cols-4 gap-1 w-full sm:w-auto">
            <TabsTrigger
              value="workflow"
              className="flex items-center gap-1.5 py-1.5 px-3 text-xs font-mono data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              <Workflow className="size-3.5" />
              <span>Workflow & Gates</span>
            </TabsTrigger>
            <TabsTrigger
              value="protocol-prompt"
              className="flex items-center gap-1.5 py-1.5 px-3 text-xs font-mono data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              <ShieldAlert className="size-3.5" />
              <span>Full Protocol Prompt</span>
            </TabsTrigger>
            <TabsTrigger
              value="kickoff"
              className="flex items-center gap-1.5 py-1.5 px-3 text-xs font-mono data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              <Terminal className="size-3.5" />
              <span>Task Kickoff</span>
            </TabsTrigger>
            <TabsTrigger
              value="compact-rules"
              className="flex items-center gap-1.5 py-1.5 px-3 text-xs font-mono data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              <FileCode2 className="size-3.5" />
              <span>.cursorrules</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <CopyButton
              text={rawFullProtocol}
              label="Copy Entire Protocol"
              className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30"
            />
          </div>
        </div>

        {/* TAB 1: WORKFLOW & GATES */}
        <TabsContent value="workflow" className="space-y-8 pt-4">
          {/* Header banner */}
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-mono text-primary font-medium">
                  <ShieldAlert className="size-3" /> SECURE FROM COMMIT ZERO
                </span>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                  No Yes-Man / Evidence-Integrity Framework
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Replaces superficial AI agreement with rigorous, evidence-based security engineering, explicit operating modes, and 8 staged approval gates.
                </p>
              </div>
              <div className="flex shrink-0">
                <span className="font-mono text-xs text-muted-foreground border border-border bg-card px-3 py-1.5 rounded">
                  Status: <span className="text-primary font-semibold">[VERIFIED]</span>
                </span>
              </div>
            </div>
          </div>

          {/* SECTION: 3 OPERATING MODES */}
          <div className="rounded-md border border-border bg-card p-5">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Sliders className="size-4 text-primary" />
                <h4 className="font-mono text-sm uppercase tracking-wider font-semibold text-foreground">
                  1. Operating Modes
                </h4>
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                Default: Mode A (Planning)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              {operatingModes.map((mode) => {
                const isActive = activeMode === mode.id
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setActiveMode(mode.id)}
                    className={cn(
                      "text-left p-3.5 rounded border transition-all",
                      isActive
                        ? "border-primary bg-primary/10 shadow-sm"
                        : "border-border bg-card/60 hover:border-border/80 hover:bg-muted/40"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-xs font-semibold text-foreground">
                        {mode.name}
                      </span>
                      {isActive && (
                        <span className="size-2 rounded-full bg-primary animate-pulse" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {mode.purpose}
                    </p>
                  </button>
                )
              })}
            </div>

            {/* Mode Details Panel */}
            <div className="rounded border border-border/80 bg-background/50 p-4 space-y-3 font-mono text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-2">
                <div>
                  <span className="text-muted-foreground">Active Posture: </span>
                  <span className="text-primary font-medium">
                    {selectedMode.defaultPosture}
                  </span>
                </div>
                <span className="text-[11px] text-destructive/90">
                  {selectedMode.restrictions}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div>
                  <span className="text-muted-foreground block mb-1 text-[11px] uppercase tracking-wider">
                    Permitted Activities:
                  </span>
                  <ul className="space-y-1 text-foreground/90 list-disc list-inside">
                    {selectedMode.allowed.map((item, idx) => (
                      <li key={idx} className="leading-5">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1 text-[11px] uppercase tracking-wider">
                    Mandatory Deliverables:
                  </span>
                  <ul className="space-y-1 text-foreground/90 list-disc list-inside">
                    {selectedMode.deliverables?.map((item, idx) => (
                      <li key={idx} className="leading-5">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION: 8 STAGED EXECUTION GATES */}
          <div className="rounded-md border border-border bg-card p-5">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Layers className="size-4 text-primary" />
                <h4 className="font-mono text-sm uppercase tracking-wider font-semibold text-foreground">
                  2. Staged Execution & Approval Gates
                </h4>
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                Follow stages sequentially
              </span>
            </div>

            {/* Stage Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {stagedExecutionGates.map((gate) => {
                const isSelected = activeStage === gate.stage
                return (
                  <button
                    key={gate.stage}
                    type="button"
                    onClick={() => setActiveStage(gate.stage)}
                    className={cn(
                      "shrink-0 px-3 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-1.5 border",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground font-semibold"
                        : "border-border bg-muted/40 text-muted-foreground hover:text-foreground hover:border-border/80"
                    )}
                  >
                    <span>Stage {gate.stage}</span>
                    {gate.requiresApproval && (
                      <Lock className="size-2.5 opacity-80" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Selected Stage Card */}
            <div className="mt-3 rounded border border-border bg-background/60 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-primary font-semibold">
                      STAGE {selectedStage.stage}:
                    </span>
                    <h5 className="font-semibold text-foreground text-sm">
                      {selectedStage.name}
                    </h5>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {selectedStage.tagline}
                  </p>
                </div>
                {selectedStage.requiresApproval && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono rounded bg-destructive/10 text-destructive border border-destructive/20 px-2 py-0.5">
                    <Lock className="size-3" /> Requires Explicit Approval
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm text-foreground/85 leading-relaxed">
                {selectedStage.description}
              </p>

              <div className="mt-3 pt-3 border-t border-border/40">
                <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider block mb-1.5">
                  Required Evidence / Deliverables:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedStage.deliverables.map((deliv, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-xs font-mono rounded border border-border bg-muted/30 px-2 py-1 text-foreground/90"
                    >
                      <CheckCircle2 className="size-3 text-primary" />
                      {deliv}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION: EVIDENCE INTEGRITY LABELS & RISK MATRIX */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Evidence Labels */}
            <div className="rounded-md border border-border bg-card p-5">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="size-4 text-primary" />
                  <h4 className="font-mono text-sm uppercase tracking-wider font-semibold text-foreground">
                    3. Evidence Integrity Labels
                  </h4>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Every material finding, assumption, and requirement must be tagged with verifiable evidence:
              </p>

              <div className="space-y-2">
                {evidenceLabels.map((lbl) => (
                  <div
                    key={lbl.tag}
                    className="p-2 rounded border border-border/70 bg-background/50 flex flex-col sm:flex-row sm:items-start gap-2"
                  >
                    <span className="font-mono text-xs font-bold shrink-0 text-primary px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20 w-fit">
                      {lbl.tag}
                    </span>
                    <span className="text-xs text-muted-foreground leading-snug">
                      {lbl.definition}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Scoring & Acceptance */}
            <div className="rounded-md border border-border bg-card p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Scale className="size-4 text-primary" />
                  <h4 className="font-mono text-sm uppercase tracking-wider font-semibold text-foreground">
                    4. Consistent Risk Formula
                  </h4>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Material security risks must use qualitative evidence rather than invented numbers:
                </p>

                <div className="rounded border border-primary/20 bg-primary/5 p-3 font-mono text-xs mb-4">
                  <div className="text-primary font-bold text-center text-sm">
                    Risk Score = Likelihood (1–5) × Impact (1–5)
                  </div>
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex items-center justify-between p-2 rounded border border-border/60 bg-background/40">
                    <span className="text-foreground">Score 1–4 (Low)</span>
                    <span className="text-muted-foreground">Routine controls</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded border border-border/60 bg-background/40">
                    <span className="text-foreground">Score 5–9 (Moderate)</span>
                    <span className="text-muted-foreground">Documented justification</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded border border-border/60 bg-background/40">
                    <span className="text-amber-400 font-semibold">Score 10–16 (High)</span>
                    <span className="text-muted-foreground">Escalate & verify</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded border border-destructive/40 bg-destructive/5">
                    <span className="text-destructive font-bold">Score 17–25 (Critical)</span>
                    <span className="text-destructive">Urgent containment</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border text-xs text-muted-foreground">
                <span className="text-foreground font-semibold">Confidence is independent: </span>
                High, Medium, or Low confidence must be reported separately from severity. Never downgrade an unverified critical risk to low!
              </div>
            </div>
          </div>
        </TabsContent>

        {/* TAB 2: FULL PROTOCOL PROMPT */}
        <TabsContent value="protocol-prompt" className="space-y-4 pt-4">
          <div className="flex items-center justify-between gap-3 rounded border border-border bg-muted/30 px-4 py-3">
            <div className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Production System Prompt: </span>
              Paste this entire specification into Claude Projects, ChatGPT Custom GPT instructions, Cursor Rules, or Antigravity agents.
            </div>
            <CopyButton
              text={rawFullProtocol}
              label="Copy Prompt"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium shrink-0"
            />
          </div>

          {fullProtocolCodeBlock}
        </TabsContent>

        {/* TAB 3: FIRST RESPONSE WORKFLOW KICKOFF */}
        <TabsContent value="kickoff" className="space-y-4 pt-4">
          <div className="rounded-md border border-border bg-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-semibold text-foreground">
                  First Response Protocol (Section 12)
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  When starting a security task or new feature session, an evidence-based assistant must begin with this 6-point declaration before generating code:
                </p>
              </div>
              <CopyButton
                text={firstResponseWorkflow}
                label="Copy Kickoff Snippet"
                className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30"
              />
            </div>

            <pre className="p-4 rounded border border-border bg-muted/40 font-mono text-xs leading-6 overflow-x-auto text-foreground/90 whitespace-pre-wrap">
              {firstResponseWorkflow}
            </pre>

            <div className="rounded bg-accent/40 border border-border p-3 text-xs text-muted-foreground flex items-start gap-2.5">
              <Sparkles className="size-4 text-primary shrink-0 mt-0.5" />
              <span>
                <strong>Pro-tip:</strong> Add this to your prompt snippet library or keybinding. It immediately prevents coding hallucinations, forced agreement, and unverified assumptions.
              </span>
            </div>
          </div>
        </TabsContent>

        {/* TAB 4: COMPACT RULES */}
        <TabsContent value="compact-rules" className="space-y-4 pt-4">
          <div className="flex items-center justify-between gap-3 rounded border border-border bg-muted/30 px-4 py-3">
            <div className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Lightweight Rules: </span>
              A concise version for projects with strict token context budgets or `.cursorrules` files.
            </div>
            <CopyButton
              text={`# Secure Vibe Coding Rules\n\nAct as a security-conscious senior software engineer...`}
              label="Copy .cursorrules"
              className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30 shrink-0"
            />
          </div>

          {compactRulesCodeBlock}
        </TabsContent>
      </Tabs>
    </div>
  )
}
