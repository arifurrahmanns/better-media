'use client'

import { useMemo } from 'react'

/**
 * Tiny glowing dots that drift upward behind the hero. Deterministic positions
 * so the initial render matches SSR, but the random seed is client-local so
 * hydration mismatches don't happen.
 */
export function FloatingDots({ count = 20 }: { count?: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${(i * 37) % 100}%`,
        delay: `${(i * 0.7) % 14}s`,
        duration: `${10 + (i % 5) * 2}s`,
        drift: `${((i % 3) - 1) * 40}px`,
        scale: 0.6 + ((i * 13) % 10) / 10,
      })),
    [count],
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {dots.map((d, i) => (
        <span
          key={i}
          className="float-dot"
          style={{
            left: d.left,
            bottom: '-10px',
            animationDelay: d.delay,
            animationDuration: d.duration,
            transform: `scale(${d.scale})`,
            // @ts-ignore — custom CSS property
            '--drift': d.drift,
          }}
        />
      ))}
    </div>
  )
}
