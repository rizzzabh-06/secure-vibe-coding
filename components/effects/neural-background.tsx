"use client"

import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"

export function NeuralBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLowPower, setIsLowPower] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x161817, 0.0018)

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    )
    camera.position.z = 320

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Neural Network Particles & Connecting Lines (Vanta NET algorithm)
    const particleCount = window.innerWidth < 768 ? 65 : 130
    const maxDistance = 95

    const positions = new Float32Array(particleCount * 3)
    const velocities: { x: number; y: number; z: number }[] = []

    const bounds = { x: 380, y: 240, z: 200 }

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * bounds.x
      positions[i * 3 + 1] = (Math.random() - 0.5) * bounds.y
      positions[i * 3 + 2] = (Math.random() - 0.5) * bounds.z

      velocities.push({
        x: (Math.random() - 0.5) * 0.35,
        y: (Math.random() - 0.5) * 0.35,
        z: (Math.random() - 0.5) * 0.2,
      })
    }

    // Particle Cloud Geometry
    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    )

    // Glowing Dot Texture
    const canvas = document.createElement("canvas")
    canvas.width = 16
    canvas.height = 16
    const ctx = canvas.getContext("2d")
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8)
      gradient.addColorStop(0, "rgba(52, 211, 153, 1)")
      gradient.addColorStop(0.5, "rgba(16, 185, 129, 0.4)")
      gradient.addColorStop(1, "rgba(16, 185, 129, 0)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 16, 16)
    }
    const dotTexture = new THREE.CanvasTexture(canvas)

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x34d399,
      size: 4,
      map: dotTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const pointCloud = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(pointCloud)

    // Dynamic Lines Geometry
    const maxLines = (particleCount * (particleCount - 1)) / 2
    const linePositions = new Float32Array(maxLines * 6)
    const lineColors = new Float32Array(maxLines * 6)

    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    )
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3))

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.7,
    })

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(linesMesh)

    // Mouse Tracking for Interactive 3D Orbit
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.25
      mouseY = (e.clientY - window.innerHeight / 2) * 0.25
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation Loop
    let animationFrameId: number
    let clock = new THREE.Clock()

    const animate = () => {
      const delta = clock.getDelta()
      const time = clock.getElapsedTime()

      // Smooth camera parallax
      targetX += (mouseX - targetX) * 0.04
      targetY += (mouseY - targetY) * 0.04
      camera.position.x = targetX
      camera.position.y = -targetY
      camera.lookAt(scene.position)

      // Slowly rotate the entire network
      scene.rotation.y = time * 0.03
      scene.rotation.x = Math.sin(time * 0.02) * 0.08

      const pos = particleGeometry.attributes.position.array as Float32Array
      let lineIndex = 0

      // Update particle positions
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3] += velocities[i].x
        pos[i * 3 + 1] += velocities[i].y
        pos[i * 3 + 2] += velocities[i].z

        // Bounce back into bounding box
        if (Math.abs(pos[i * 3]) > bounds.x / 2) velocities[i].x *= -1
        if (Math.abs(pos[i * 3 + 1]) > bounds.y / 2) velocities[i].y *= -1
        if (Math.abs(pos[i * 3 + 2]) > bounds.z / 2) velocities[i].z *= -1

        // Connect nearby points with glowing lines
        for (let j = i + 1; j < particleCount; j++) {
          const dx = pos[i * 3] - pos[j * 3]
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2]
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.45

            linePositions[lineIndex * 6] = pos[i * 3]
            linePositions[lineIndex * 6 + 1] = pos[i * 3 + 1]
            linePositions[lineIndex * 6 + 2] = pos[i * 3 + 2]
            linePositions[lineIndex * 6 + 3] = pos[j * 3]
            linePositions[lineIndex * 6 + 4] = pos[j * 3 + 1]
            linePositions[lineIndex * 6 + 5] = pos[j * 3 + 2]

            // Emerald green color: RGB (0.06, 0.72, 0.5)
            lineColors[lineIndex * 6] = 0.06 * alpha
            lineColors[lineIndex * 6 + 1] = 0.72 * alpha
            lineColors[lineIndex * 6 + 2] = 0.5 * alpha
            lineColors[lineIndex * 6 + 3] = 0.06 * alpha
            lineColors[lineIndex * 6 + 4] = 0.72 * alpha
            lineColors[lineIndex * 6 + 5] = 0.5 * alpha

            lineIndex++
          }
        }
      }

      particleGeometry.attributes.position.needsUpdate = true
      lineGeometry.setDrawRange(0, lineIndex * 2)
      lineGeometry.attributes.position.needsUpdate = true
      lineGeometry.attributes.color.needsUpdate = true

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }

      particleGeometry.dispose()
      particleMaterial.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
      dotTexture.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-35 transition-opacity duration-1000"
    />
  )
}
