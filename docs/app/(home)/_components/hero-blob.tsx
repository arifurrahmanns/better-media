'use client'

import { useEffect, useRef } from 'react'

/**
 * A single large warm-gradient blob that tracks the cursor. The blob itself
 * stays in place; its gradient center (via CSS variables + `@property`)
 * interpolates toward the mouse, so the light looks like it's being aimed.
 *
 * Uses rAF throttling. On mouse-leave, the light returns to a neutral center.
 */
export function HeroBlob() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const parent = el.parentElement
    if (!parent) return

    let raf = 0
    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--blob-x', `${x}%`)
        el.style.setProperty('--blob-y', `${y}%`)
      })
    }
    const onLeave = () => {
      el.style.setProperty('--blob-x', '50%')
      el.style.setProperty('--blob-y', '35%')
    }

    parent.addEventListener('mousemove', onMove)
    parent.addEventListener('mouseleave', onLeave)
    return () => {
      parent.removeEventListener('mousemove', onMove)
      parent.removeEventListener('mouseleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} className="brand-blob" aria-hidden="true" />
}
