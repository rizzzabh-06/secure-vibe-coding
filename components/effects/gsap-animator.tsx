"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function GsapAnimator() {
  useEffect(() => {
    // Only run on client after DOM is ready
    const ctx = gsap.context(() => {
      // 1. Hero Entrance Animation
      const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } })

      heroTimeline
        .fromTo(
          "#hero-title",
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 1, delay: 0.1 }
        )
        .fromTo(
          ".eyebrow",
          { opacity: 0, x: -15 },
          { opacity: 1, x: 0, duration: 0.8 },
          "-=0.7"
        )
        .fromTo(
          "#home figure",
          { opacity: 0, scale: 0.96, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9 },
          "-=0.6"
        )

      // 2. Diff Card subtle floating effect
      gsap.to("#home figure", {
        y: "-=6",
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      // 3. ScrollTrigger Section Header Reveals
      const sectionHeaders = document.querySelectorAll("header h2")
      sectionHeaders.forEach((header) => {
        gsap.fromTo(
          header,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: header,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        )
      })
    })

    return () => ctx.revert()
  }, [])

  return null
}
