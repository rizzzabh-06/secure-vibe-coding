"use client"

import React, { useEffect, useRef, useState } from "react"
import { Gamepad2, Sparkles, Terminal, VolumeX, Shield, Bug, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

export function PixelCyberArcade() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [retroMode, setRetroMode] = useState(false)
  const [scanStatus, setScanStatus] = useState<string>("8-BIT GUARDIAN READY")
  const [activeSpriteFrame, setActiveSpriteFrame] = useState(0)

  // Draw 8-bit Pixel Art Guardian Sprite
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // 16x16 Pixel Sprite Matrix (0: empty, 1: primary green, 2: dark emerald, 3: white eye, 4: red alert)
    const spriteFrameA = [
      [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
      [0,0,0,1,1,2,2,2,2,2,2,1,1,0,0,0],
      [0,0,1,2,1,1,1,1,1,1,1,1,2,1,0,0],
      [0,1,2,1,3,3,1,1,1,1,3,3,1,2,1,0],
      [0,1,2,1,3,1,1,1,1,1,3,1,1,2,1,0],
      [1,2,2,1,1,1,1,1,1,1,1,1,1,2,2,1],
      [1,2,2,1,1,1,1,4,4,1,1,1,1,2,2,1],
      [1,2,2,1,1,4,4,4,4,4,4,1,1,2,2,1],
      [0,1,2,1,1,1,1,4,4,1,1,1,1,2,1,0],
      [0,1,2,2,1,1,1,1,1,1,1,1,2,2,1,0],
      [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
      [0,0,0,1,1,2,2,1,1,2,2,1,1,0,0,0],
      [0,0,1,1,0,1,1,0,0,1,1,0,1,1,0,0],
      [0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ]

    const spriteFrameB = [
      [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
      [0,0,0,1,1,2,2,2,2,2,2,1,1,0,0,0],
      [0,0,1,2,1,1,1,1,1,1,1,1,2,1,0,0],
      [0,1,2,1,1,3,3,1,1,3,3,1,1,2,1,0],
      [0,1,2,1,1,3,1,1,1,3,1,1,1,2,1,0],
      [1,2,2,1,1,1,1,1,1,1,1,1,1,2,2,1],
      [1,2,2,1,1,1,4,4,4,4,1,1,1,2,2,1],
      [1,2,2,1,1,4,4,1,1,4,4,1,1,2,2,1],
      [0,1,2,1,1,1,1,4,4,1,1,1,1,2,1,0],
      [0,1,2,2,1,1,1,1,1,1,1,1,2,2,1,0],
      [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
      [0,0,0,1,1,2,2,1,1,2,2,1,1,0,0,0],
      [0,0,0,1,1,0,1,1,1,1,0,1,1,0,0,0],
      [0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0],
      [0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ]

    const palette: Record<number, string> = {
      0: "transparent",
      1: "#10b981", // Emerald
      2: "#065f46", // Dark Emerald
      3: "#ffffff", // Eye White
      4: "#34d399", // Neon Mint
    }

    let frame = 0
    let timer: NodeJS.Timeout

    const renderPixelSprite = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const currentGrid = frame % 2 === 0 ? spriteFrameA : spriteFrameB
      const pixelSize = Math.floor(canvas.width / 16)

      for (let r = 0; r < 16; r++) {
        for (let c = 0; c < 16; c++) {
          const colorCode = currentGrid[r][c]
          if (colorCode !== 0) {
            ctx.fillStyle = palette[colorCode]
            ctx.fillRect(c * pixelSize, r * pixelSize, pixelSize, pixelSize)
          }
        }
      }
      frame++
      setActiveSpriteFrame(frame)
    }

    renderPixelSprite()
    timer = setInterval(renderPixelSprite, 400)

    return () => clearInterval(timer)
  }, [])

  const triggerRetroScan = () => {
    setScanStatus("SCANNING MEMORY & ROUTES...")
    setTimeout(() => {
      setScanStatus("IDOR CHECK: [PASS] · 0 TAMPERING DETECTED")
    }, 900)
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Gamepad2 className="size-4 text-primary" />
          <span className="font-mono text-xs uppercase tracking-wider font-semibold text-foreground">
            8-Bit Security Arcade & Retro Terminal
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setRetroMode(!retroMode)}
            className={cn(
              "font-mono text-[11px] px-2.5 py-1 rounded border transition-colors flex items-center gap-1.5",
              retroMode
                ? "bg-primary text-primary-foreground border-primary font-bold shadow-sm"
                : "border-border bg-muted/30 text-muted-foreground hover:text-foreground"
            )}
          >
            <Sparkles className="size-3" />
            {retroMode ? "CRT SCANLINES: ON" : "TOGGLE RETRO CRT"}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "rounded border border-border bg-background/90 p-3.5 transition-all relative overflow-hidden",
          retroMode && "shadow-[inset_0_0_15px_rgba(16,185,129,0.2)]"
        )}
      >
        {retroMode && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] opacity-75 z-10"
          />
        )}

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Animated Pixel Sprite Canvas */}
          <div className="shrink-0 p-2 rounded bg-black/40 border border-border/80 flex flex-col items-center">
            <canvas
              ref={canvasRef}
              width={64}
              height={64}
              className="image-rendering-pixelated w-16 h-16"
            />
            <span className="font-mono text-[9px] text-primary mt-1 uppercase">
              Sprite v1.0
            </span>
          </div>

          {/* Retro Arcade Dialog */}
          <div className="flex-1 min-w-0 font-mono text-xs space-y-1.5">
            <div className="flex items-center gap-2 text-primary font-semibold">
              <Terminal className="size-3.5" />
              <span>DAEMON://NEURAL_SHIELD_VIBE</span>
            </div>
            <p className="text-foreground/90 font-mono text-xs">
              &gt; {scanStatus}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={triggerRetroScan}
                className="inline-flex items-center gap-1 px-2 py-1 rounded bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 text-[11px] transition-colors"
              >
                <Bug className="size-3" /> Run 8-Bit Scan
              </button>
              <span className="text-[11px] text-muted-foreground self-center">
                Retro pixel-art shader test for cybersecurity telemetry.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
