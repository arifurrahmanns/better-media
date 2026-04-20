'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Count up from 0 to `target` when the element scrolls into view.
 * Uses rAF with an easeOutCubic curve so it feels organic.
 */
export function StatCounter({
  target,
  suffix = '',
  duration = 1200,
}: {
  target: number
  suffix?: string
  duration?: number
}) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            const start = performance.now()
            const tick = (now: number) => {
              const progress = Math.min(1, (now - start) / duration)
              const eased = 1 - Math.pow(1 - progress, 3)
              setValue(Math.round(eased * target))
              if (progress < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
            io.unobserve(el)
          }
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  )
}
