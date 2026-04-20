'use client'

import { useState } from 'react'

export function CopyInstall({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable — noop */
    }
  }

  return (
    <button
      onClick={copy}
      className="group inline-flex items-center gap-3 rounded-full border border-fd-border bg-fd-card/60 backdrop-blur px-5 py-2.5 font-mono text-sm shadow-sm hover:border-fd-primary/40 transition-colors"
    >
      <span className="text-fd-muted-foreground select-none">$</span>
      <span className="text-fd-foreground">{command}</span>
      <span className="inline-block h-4 w-px bg-fd-border" aria-hidden />
      <span className="flex items-center gap-1.5 text-xs text-fd-muted-foreground group-hover:text-fd-primary transition-colors">
        {copied ? (
          <>
            <CheckIcon className="h-3 w-3" />
            copied
          </>
        ) : (
          <>
            <CopyIcon className="h-3 w-3" />
            copy
          </>
        )}
      </span>
    </button>
  )
}

function CopyIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}
function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
