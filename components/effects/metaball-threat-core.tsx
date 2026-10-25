"use client"

import React, { useEffect, useRef, useState } from "react"
import { ShieldCheck, Zap, RefreshCw, AlertOctagon, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface Ball {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  label: string
  color: string
}

export function MetaballThreatCore() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeChain, setActiveChain] = useState<string>("Hover or drag orbs to fuse exploit paths")
  const [threatState, setThreatState] = useState<"isolated" | "fusing" | "critical">("isolated")
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    const width = (canvas.width = canvas.parentElement?.clientWidth || 600)
    const height = (canvas.height = 320)

    const balls: Ball[] = [
      { x: width * 0.25, y: height * 0.35, vx: 0.9, vy: 0.7, radius: 38, label: "IDOR", color: "#10b981" },
      { x: width * 0.45, y: height * 0.6, vx: -0.7, vy: 0.8, radius: 44, label: "Auth Bypass", color: "#ef4444" },
      { x: width * 0.7, y: height * 0.4, vx: 0.8, vy: -0.6, radius: 42, label: "Prompt Injection", color: "#8b5cf6" },
      { x: width * 0.6, y: height * 0.75, vx: -0.6, vy: -0.8, radius: 36, label: "SSRF", color: "#f59e0b" },
      { x: width * 0.35, y: height * 0.8, vx: 0.6, vy: -0.5, radius: 35, label: "Secrets Leak", color: "#06b6d4" },
    ]

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Move balls
      for (const b of balls) {
        b.x += b.vx
        b.y += b.vy

        // Boundaries
        if (b.x - b.radius < 0) {
          b.x = b.radius
          b.vx *= -1
        } else if (b.x + b.radius > width) {
          b.x = width - b.radius
          b.vx *= -1
        }

        if (b.y - b.radius < 0) {
          b.y = b.radius
          b.vy *= -1
        } else if (b.y + b.radius > height) {
          b.y = height - b.radius
          b.vy *= -1
        }

        // Mouse attraction
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - b.x
          const dy = mouseRef.current.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 140 && dist > 1) {
            b.vx += (dx / dist) * 0.15
            b.vy += (dy / dist) * 0.15
            // Velocity dampening
            b.vx *= 0.96
            b.vy *= 0.96
          }
        }
      }

      // Check distance for fusion & gooey rendering
      let fusionCount = 0

      // Draw gooey connections
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const b1 = balls[i]
          const b2 = balls[j]
          const dx = b2.x - b1.x
          const dy = b2.y - b1.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxFuseDist = b1.radius + b2.radius + 40

          if (dist < maxFuseDist) {
            fusionCount++
            const factor = 1 - dist / maxFuseDist

            // Draw fluid bridge
            ctx.save()
            ctx.beginPath()
            ctx.strokeStyle = `rgba(16, 185, 129, ${factor * 0.5})`
            ctx.lineWidth = factor * 28
            ctx.lineCap = "round"
            ctx.moveTo(b1.x, b1.y)
            ctx.lineTo(b2.x, b2.y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }

      // Draw metaball bodies
      for (const b of balls) {
        ctx.save()
        // Outer glow
        const glow = ctx.createRadialGradient(b.x, b.y, b.radius * 0.2, b.x, b.y, b.radius * 1.5)
        glow.addColorStop(0, `${b.color}99`)
        glow.addColorStop(0.7, `${b.color}22`)
        glow.addColorStop(1, "transparent")

        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.radius * 1.4, 0, Math.PI * 2)
        ctx.fill()

        // Core orb
        const core = ctx.createRadialGradient(b.x - b.radius * 0.3, b.y - b.radius * 0.3, 2, b.x, b.y, b.radius)
        core.addColorStop(0, "#ffffff")
        core.addColorStop(0.3, b.color)
        core.addColorStop(1, "#0a0a0a")

        ctx.fillStyle = core
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2)
        ctx.fill()

        // Border
        ctx.strokeStyle = `${b.color}cc`
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Label
        ctx.font = "11px var(--font-geist-mono), monospace"
        ctx.fillStyle = "#f3f4f6"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(b.label, b.x, b.y)

        ctx.restore()
      }

      // Update state indicators
      if (fusionCount >= 3) {
        setThreatState("critical")
        setActiveChain("CRITICAL CHAIN: IDOR + Auth Bypass coalesced! Full tenant data breach possible.")
      } else if (fusionCount >= 1) {
        setThreatState("fusing")
        setActiveChain("FUSION DETECTED: Chained weakness detected. Trust boundaries weakening.")
      } else {
        setThreatState("isolated")
        setActiveChain("ISOLATED: Strong boundary enforcement prevents threat coalescence.")
      }

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationId)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/20 px-4 py-3">
        <div className="flex items-center gap-2">
          <Zap className="size-4 text-primary" />
          <span className="font-mono text-xs font-semibold text-foreground uppercase tracking-wider">
            Interactive Threat Fusion Core (Metaballs Physics)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "font-mono text-xs px-2.5 py-0.5 rounded border inline-flex items-center gap-1.5",
              threatState === "critical"
                ? "bg-destructive/10 text-destructive border-destructive/30"
                : threatState === "fusing"
                ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                : "bg-primary/10 text-primary border-primary/30"
            )}
          >
            {threatState === "critical" ? (
              <AlertOctagon className="size-3" />
            ) : (
              <ShieldCheck className="size-3" />
            )}
            {threatState.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full h-[280px] sm:h-[320px] cursor-crosshair bg-background/70 block"
        />
        <div className="pointer-events-none absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-muted-foreground bg-background/80 backdrop-blur-sm border border-border/80 px-3 py-1.5 rounded">
          <span className="truncate">{activeChain}</span>
          <span className="hidden sm:inline text-[11px] text-primary shrink-0 ml-2">
            Interactive: Move cursor to attract orbs
          </span>
        </div>
      </div>

      <div className="p-3 border-t border-border bg-card/60 text-xs text-muted-foreground flex items-center justify-between">
        <p>
          <strong>Security Principle:</strong> In AI-generated code, isolated vulnerabilities (e.g. missing owner check) become catastrophic when fluidly chained with user-controlled input.
        </p>
      </div>
    </div>
  )
}
