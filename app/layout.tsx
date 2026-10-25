import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Secure Vibe Coding: A Practical Security Field Guide",
  description:
    "Learn to recognize common vulnerabilities in AI-generated code, audit a codebase with free tools, and verify that your fixes work. Handbook, hands-on lab, toolkit, AI rules, and an audit checklist.",
  keywords: [
    "secure vibe coding",
    "AI-generated code security",
    "OWASP Top 10",
    "IDOR",
    "application security",
    "Semgrep",
    "Trivy",
  ],
}

export const viewport: Viewport = {
  themeColor: "#161817",
  colorScheme: "dark",
}

import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider"
import { NeuralBackground } from "@/components/effects/neural-background"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} dark`}
    >
      <body className="relative">
        <SmoothScrollProvider>
          <NeuralBackground />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
