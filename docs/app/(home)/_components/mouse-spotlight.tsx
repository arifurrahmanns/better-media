'use client'

import { useEffect, useRef } from 'react'

/**
 * Radial glow that follows the cursor within its containing `relative` parent.
 * Uses rAF-throttled mousemove to keep jank away on slower machines.
 */
export function MouseSpotlight() {
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
        el.style.setProperty('--mx', `${x}%`)
        el.style.setProperty('--my', `${y}%`)
      })
    }
    const onLeave = () => {
      el.style.opacity = '0'
    }
    const onEnter = () => {
      el.style.opacity = '1'
    }

    parent.addEventListener('mousemove', onMove)
    parent.addEventListener('mouseleave', onLeave)
    parent.addEventListener('mouseenter', onEnter)
    return () => {
      parent.removeEventListener('mousemove', onMove)
      parent.removeEventListener('mouseleave', onLeave)
      parent.removeEventListener('mouseenter', onEnter)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} className="spotlight opacity-0" aria-hidden="true" />
}
