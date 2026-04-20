'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Fade-and-rise when the element scrolls into view. Uses IntersectionObserver
 * once, then unobserves — no layout thrashing after the first reveal.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'article'
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add('in-view'), delay)
            io.unobserve(el)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])

  const Component = Tag as any
  return (
    <Component ref={ref} className={`reveal ${className}`}>
      {children}
    </Component>
  )
}
