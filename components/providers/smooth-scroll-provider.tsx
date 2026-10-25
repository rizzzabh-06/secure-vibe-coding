"use client"

import React, { createContext, useContext, useEffect, useRef } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface SmoothScrollContextValue {
  lenis: Lenis | null
  scrollTo: (target: string | HTMLElement, options?: { offset?: number; duration?: number }) => void
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  scrollTo: () => {},
})

export function useSmoothScroll() {
  return useContext(SmoothScrollContext)
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.8,
    })
    lenisRef.current = lenis

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update)

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    // Intercept internal hash anchor clicks for smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a")
      if (!target) return

      const href = target.getAttribute("href")
      if (href && href.startsWith("#") && href.length > 1) {
        const element = document.querySelector(href) as HTMLElement | null
        if (element) {
          e.preventDefault()
          lenis.scrollTo(element, {
            offset: -30,
            duration: 1.1,
          })
          // Update browser URL hash without jump
          window.history.pushState(null, "", href)
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)

    return () => {
      document.removeEventListener("click", handleAnchorClick)
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollTo = (
    target: string | HTMLElement,
    options?: { offset?: number; duration?: number }
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options)
    }
  }

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  )
}
