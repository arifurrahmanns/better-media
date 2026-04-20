'use client'

import { useRef, type ReactNode } from 'react'

/**
 * Subtle 3D tilt on hover using mouse position within the card. GPU-friendly
 * (transform only). Respects prefers-reduced-motion via CSS.
 */
export function TiltCard({
  children,
  className = '',
  intensity = 8,
}: {
  children: ReactNode
  className?: string
  intensity?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    const rx = (-y * intensity).toFixed(2)
    const ry = (x * intensity).toFixed(2)
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`
    el.style.setProperty('--mx', `${(x + 0.5) * 100}%`)
    el.style.setProperty('--my', `${(y + 0.5) * 100}%`)
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = ''
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilt-3d ${className}`}
    >
      {children}
    </div>
  )
}
