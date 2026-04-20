'use client'

import { useState } from 'react'

export interface CodeSample {
  label: string
  file: string
  html: string
}

export function CodeTabs({ samples }: { samples: CodeSample[] }) {
  const [active, setActive] = useState(0)
  const current = samples[active]!

  return (
    <div className="terminal-card rounded-xl border border-fd-border overflow-hidden shadow-lg shadow-black/10">
      {/* Tabs */}
      <div className="flex items-center border-b border-fd-border">
        <div className="flex gap-1.5 pl-4 pr-3 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        </div>
        <div className="flex-1 flex overflow-x-auto scrollbar-none">
          {samples.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setActive(i)}
              className={`relative px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-colors ${
                i === active
                  ? 'text-fd-foreground'
                  : 'text-fd-muted-foreground hover:text-fd-foreground'
              }`}
            >
              {s.label}
              {i === active ? (
                <span className="absolute inset-x-3 bottom-0 h-px bg-fd-primary" />
              ) : null}
            </button>
          ))}
        </div>
        <span className="pr-4 font-mono text-[11px] text-fd-muted-foreground/70 whitespace-nowrap">
          {current.file}
        </span>
      </div>
      {/* Body */}
      <pre className="p-5 text-[13px] leading-relaxed overflow-x-auto">
        <code
          key={active}
          className="block animate-[fade-up_.25s_ease-out]"
          dangerouslySetInnerHTML={{ __html: current.html }}
        />
      </pre>
    </div>
  )
}
