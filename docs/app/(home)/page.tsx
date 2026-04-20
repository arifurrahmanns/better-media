import Link from 'next/link'
import type { ReactNode } from 'react'
import {
  ExpressIcon,
  FastifyIcon,
  HonoIcon,
  NestJSIcon,
  NextJSIcon,
} from './icons'
import { HeroBlob } from './_components/hero-blob'
import { TiltCard } from './_components/tilt-card'
import { Reveal } from './_components/reveal'
import { CodeTabs } from './_components/code-tabs'
import { StatCounter } from './_components/stat-counter'
import { CopyInstall } from './_components/copy-install'
import { CONFIG_SAMPLE_HTML, FRAMEWORK_SAMPLES } from './_lib/syntax'

export default function HomePage() {
  return (
    <main className="flex-1 relative">
      <Hero />
      <FrameworkMarquee />
      <FeatureBento />
      <StatsStrip />
      <ConfigShowcase />
      <UploadShowcase />
      <FrameworkShowcase />
      <FooterCTA />
    </main>
  )
}

/* ─────────────── Hero ─────────────── */

function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-fd-border">
      {/* One large warm blob — the light tracks the cursor. */}
      <HeroBlob />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-animated radial-fade text-fd-foreground" />

      <div className="corner-bracket tl" aria-hidden />
      <div className="corner-bracket tr" aria-hidden />
      <div className="corner-bracket bl" aria-hidden />
      <div className="corner-bracket br" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-20 md:pt-28 md:pb-24 text-center w-full">
        <Link
          href="/docs/direct-upload"
          className="fade-up inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card/50 backdrop-blur px-4 py-1.5 text-xs font-medium hover:border-fd-primary/40 transition-colors"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-fd-primary opacity-75 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-fd-primary" />
          </span>
          <span>v0.2 — Direct-to-storage uploads</span>
          <ArrowRight className="h-3 w-3 opacity-60" />
        </Link>

        <h1
          className="fade-up mt-8 text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.045em] leading-[0.95]"
          style={{ animationDelay: '80ms' }}
        >
          <span className="block">The media library</span>
          <span className="block mt-1 text-brand-gradient">built for Node.js.</span>
        </h1>

        <p
          className="fade-up mt-6 mx-auto max-w-2xl text-base md:text-lg text-fd-muted-foreground leading-relaxed"
          style={{ animationDelay: '180ms' }}
        >
          Attach files to any model with named collections, image conversions, and
          pluggable storage. Framework-agnostic. One install. No middleware.
        </p>

        <div
          className="fade-up mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          style={{ animationDelay: '280ms' }}
        >
          <Link
            href="/docs"
            className="group relative inline-flex items-center gap-2 rounded-full bg-fd-foreground px-6 py-3 text-sm font-medium text-fd-background hover:opacity-90 transition-all hover:gap-3 overflow-hidden"
          >
            <span className="relative z-10">Read the docs</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="https://github.com/arifurrahmanns/mediable"
            className="group inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card/50 backdrop-blur px-6 py-3 text-sm font-medium hover:border-fd-primary/40 hover:bg-fd-accent transition-colors"
          >
            <GitHubIcon className="h-4 w-4" />
            <span>Star on GitHub</span>
          </Link>
        </div>

        <div className="fade-up mt-10" style={{ animationDelay: '360ms' }}>
          <CopyInstall command="pnpm add mediable" />
        </div>
      </div>
    </section>
  )
}

/* ─────────────── Framework marquee ─────────────── */

function FrameworkMarquee() {
  const items = [
    { name: 'Express', Icon: ExpressIcon },
    { name: 'Hono', Icon: HonoIcon },
    { name: 'Fastify', Icon: FastifyIcon },
    { name: 'NestJS', Icon: NestJSIcon },
    { name: 'Next.js', Icon: NextJSIcon },
  ]
  const loop = [...items, ...items, ...items]

  return (
    <section className="relative border-b border-fd-border overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 py-10 md:py-12">
        <div className="flex items-center gap-8">
          <span className="shrink-0 text-[11px] uppercase tracking-[0.2em] text-fd-muted-foreground/80">
            Works with
          </span>
          <div className="flex-1 relative marquee-mask overflow-hidden">
            <div className="marquee flex items-center gap-14 whitespace-nowrap">
              {loop.map(({ name, Icon }, i) => (
                <div
                  key={`${name}-${i}`}
                  className="flex items-center gap-2.5 text-fd-muted-foreground"
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium tracking-tight">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────── Feature bento ─────────────── */

function FeatureBento() {
  return (
    <section className="relative border-b border-fd-border">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-36">
        <Reveal>
          <div className="max-w-2xl">
            <span className="inline-block rounded-full border border-fd-border bg-fd-card px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-fd-muted-foreground">
              Features
            </span>
            <h2 className="mt-6 text-3xl md:text-5xl font-semibold tracking-[-0.035em] leading-[1.05]">
              Everything you need.
              <br />
              <span className="text-fd-muted-foreground">Nothing you don't.</span>
            </h2>
            <p className="mt-5 text-fd-muted-foreground text-lg">
              One config file. One API. Drop it into any framework, swap storage at
              deploy time, scale conversions through BullMQ when you're ready.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3 md:grid-rows-[auto_auto]">
          <Reveal delay={60} className="md:col-span-2">
            <TiltCard className="h-full">
              <BentoCard
                icon={<LayersIcon />}
                title="Polymorphic attachments"
                body="Attach any file to any model — users, products, posts — via (modelType, modelId) tuples. One table, infinite owners. No Eloquent trait. No ORM lock-in."
              />
            </TiltCard>
          </Reveal>
          <Reveal delay={120}>
            <TiltCard className="h-full">
              <BentoCard
                icon={<DatabaseIcon />}
                title="4 databases built-in"
                body="SQLite, Postgres, MySQL, MongoDB. Bring Prisma or Drizzle if you prefer."
              />
            </TiltCard>
          </Reveal>
          <Reveal delay={180}>
            <TiltCard className="h-full">
              <BentoCard
                icon={<CloudIcon />}
                title="S3 / R2 / MinIO / B2"
                body="One driver, every S3-compatible backend. Swap dev to prod with a config line."
              />
            </TiltCard>
          </Reveal>
          <Reveal delay={240} className="md:col-span-2">
            <TiltCard className="h-full">
              <BentoCard
                icon={<UploadIcon />}
                title="Direct-to-storage uploads"
                body="Three-phase flow: presign, client PUTs direct to bucket, confirm. Your Node process never touches the bytes. Real mime sniff on confirm."
                highlight
              />
            </TiltCard>
          </Reveal>
          <Reveal delay={300} className="md:col-span-3">
            <TiltCard className="h-full" intensity={4}>
              <BentoCard
                icon={<WandIcon />}
                title="Image conversions as code"
                body="Declare thumb, preview, card variants with a Sharp-backed DSL. Inline for fast paths, BullMQ-queued for heavy work, prioritized so interactive jobs beat background optimizations."
                wide
              />
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function BentoCard({
  icon,
  title,
  body,
  highlight = false,
  wide = false,
}: {
  icon: ReactNode
  title: string
  body: string
  highlight?: boolean
  wide?: boolean
}) {
  return (
    <div
      className={`glow-border group relative overflow-hidden rounded-2xl border border-fd-border bg-fd-card h-full transition-colors hover:border-fd-foreground/15 ${
        wide ? 'p-8 md:p-10' : 'p-7'
      }`}
    >
      {highlight ? (
        <div className="absolute inset-0 -z-10 dot-pattern text-fd-primary opacity-30" />
      ) : null}
      <div className="tilt-3d-inner relative z-10">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-fd-border bg-fd-background/60 backdrop-blur-sm text-fd-foreground/80 transition-all group-hover:text-fd-primary group-hover:border-fd-primary/40 group-hover:shadow-[0_0_20px_-4px_var(--color-fd-primary)]">
          {icon}
        </div>
        <h3
          className={`mt-5 font-semibold tracking-tight ${
            wide ? 'text-xl' : 'text-lg'
          }`}
        >
          {title}
        </h3>
        <p
          className={`mt-2 leading-relaxed text-fd-muted-foreground ${
            wide ? 'text-base max-w-2xl' : 'text-sm'
          }`}
        >
          {body}
        </p>
      </div>
    </div>
  )
}

/* ─────────────── Stats strip ─────────────── */

function StatsStrip() {
  const stats = [
    { value: 5, suffix: '', label: 'Frameworks' },
    { value: 4, suffix: '', label: 'Databases' },
    { value: 5, suffix: '', label: 'Storage backends' },
    { value: 0, suffix: '', label: 'Middleware required' },
  ]
  return (
    <section className="relative border-b border-fd-border overflow-hidden">
      <div className="absolute inset-0 grid-pattern text-fd-foreground opacity-30" />
      <div className="relative mx-auto max-w-6xl px-6 py-14 md:py-16">
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-fd-border">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`text-center ${i > 1 ? 'pt-8 md:pt-0' : ''} md:px-4`}
              >
                <div className="text-5xl md:text-6xl font-semibold tracking-tight text-brand-gradient">
                  <StatCounter target={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-fd-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─────────────── Config showcase ─────────────── */

function ConfigShowcase() {
  return (
    <section className="relative border-b border-fd-border overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-2 items-start">
          <Reveal>
            <span className="inline-block rounded-full border border-fd-border bg-fd-card px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-fd-muted-foreground">
              Step 01
            </span>
            <h2 className="mt-6 text-3xl md:text-5xl font-semibold tracking-[-0.035em] leading-[1.05]">
              Configure once.
            </h2>
            <p className="mt-5 text-fd-muted-foreground leading-relaxed text-lg">
              Owners, collections, conversions, storage, database — every decision
              lives in one{' '}
              <code className="rounded bg-fd-muted px-1.5 py-0.5 font-mono text-sm text-fd-primary">
                media.ts
              </code>{' '}
              file. Changes propagate automatically to every route that imports{' '}
              <code className="rounded bg-fd-muted px-1.5 py-0.5 font-mono text-sm">
                media
              </code>
              .
            </p>
            <Link
              href="/docs/quick-start"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-fd-foreground hover:gap-3 transition-all"
            >
              Walk through the quick start
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <div className="terminal-card rounded-xl border border-fd-border shadow-lg shadow-black/10 overflow-hidden">
              <div className="flex items-center gap-2 border-b border-fd-border px-4 py-2.5">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                </div>
                <span className="ml-2 font-mono text-xs text-fd-muted-foreground">
                  src/media.ts
                </span>
                <span className="ml-auto inline-block h-2 w-2 rounded-full bg-fd-primary shadow-[0_0_10px_var(--color-fd-primary)]" />
              </div>
              <pre className="p-5 text-[13px] leading-relaxed overflow-x-auto">
                <code
                  className="block"
                  dangerouslySetInnerHTML={{ __html: CONFIG_SAMPLE_HTML }}
                />
              </pre>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ─────────────── Upload showcase — framework-switchable tabs ─────────────── */

function UploadShowcase() {
  return (
    <section className="relative border-b border-fd-border">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-2 items-start">
          <Reveal>
            <div className="md:sticky md:top-24">
              <span className="inline-block rounded-full border border-fd-border bg-fd-card px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-fd-muted-foreground">
                Step 02
              </span>
              <h2 className="mt-6 text-3xl md:text-5xl font-semibold tracking-[-0.035em] leading-[1.05]">
                Use anywhere.
              </h2>
              <p className="mt-5 text-fd-muted-foreground leading-relaxed text-lg">
                Drop{' '}
                <code className="rounded bg-fd-muted px-1.5 py-0.5 font-mono text-sm text-fd-primary">
                  media.addMedia()
                </code>{' '}
                into any route handler. No middleware registration, no wrapper class.
                Validation, storage, DB write, and conversions happen in one call.
              </p>
              <Link
                href="/docs/api"
                className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-fd-foreground hover:gap-3 transition-all"
              >
                See the full API
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <CodeTabs samples={FRAMEWORK_SAMPLES} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ─────────────── Framework showcase ─────────────── */

function FrameworkShowcase() {
  const frameworks = [
    { name: 'Express', href: '/docs/frameworks#express', Icon: ExpressIcon, blurb: 'multer → addMedia' },
    { name: 'Hono', href: '/docs/frameworks#hono', Icon: HonoIcon, blurb: 'Web File API' },
    { name: 'Fastify', href: '/docs/frameworks#fastify', Icon: FastifyIcon, blurb: 'req.file() ergonomics' },
    { name: 'NestJS', href: '/docs/frameworks#nestjs', Icon: NestJSIcon, blurb: '@UploadedFile decorator' },
    { name: 'Next.js', href: '/docs/frameworks#nextjs', Icon: NextJSIcon, blurb: 'App Router, RSC-ready' },
  ]

  return (
    <section className="relative border-b border-fd-border overflow-hidden">
      <div className="absolute inset-0 grid-pattern text-fd-foreground opacity-30 radial-fade" />
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block rounded-full border border-fd-border bg-fd-card px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-fd-muted-foreground">
              Frameworks
            </span>
            <h2 className="mt-6 text-3xl md:text-5xl font-semibold tracking-[-0.035em] leading-[1.05]">
              Works with your stack.
            </h2>
            <p className="mt-5 text-fd-muted-foreground text-lg">
              Five working examples in the repo. Same{' '}
              <code className="rounded bg-fd-muted px-1.5 py-0.5 font-mono text-sm">
                media.ts
              </code>
              , framework-specific route wrapper.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-5 gap-3">
          {frameworks.map((f, i) => {
            const { Icon } = f
            return (
              <Reveal key={f.name} delay={i * 60}>
                <Link
                  href={f.href}
                  className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl border border-fd-border bg-fd-card/60 backdrop-blur px-6 py-8 h-full transition-all hover:border-fd-primary/40 hover:-translate-y-1 hover:shadow-[0_10px_40px_-12px_var(--color-fd-primary)]"
                >
                  <Icon className="h-10 w-10 text-fd-muted-foreground transition-colors group-hover:text-fd-primary" />
                  <span className="text-sm font-semibold tracking-tight">
                    {f.name}
                  </span>
                  <span className="text-[11px] text-fd-muted-foreground text-center">
                    {f.blurb}
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─────────────── Footer CTA ─────────────── */

function FooterCTA() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Same single-blob language as the hero, just static (not mouse-reactive). */}
      <div className="brand-blob opacity-60" aria-hidden />
      <div className="absolute inset-0 grid-animated radial-fade text-fd-foreground" />
      <div className="scan-line" aria-hidden />

      <div className="corner-bracket tl" aria-hidden />
      <div className="corner-bracket tr" aria-hidden />
      <div className="corner-bracket bl" aria-hidden />
      <div className="corner-bracket br" aria-hidden />

      <div className="relative mx-auto max-w-4xl px-6 py-28 md:py-40 text-center">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.02]">
            Ship uploads.
            <br />
            <span className="text-brand-gradient">Skip the plumbing.</span>
          </h2>
          <p className="mt-7 mx-auto max-w-xl text-fd-muted-foreground text-lg">
            Every concept, every framework, every storage backend — documented in
            depth. Start with the quick start or jump straight to direct-to-storage
            uploads.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/docs/quick-start"
              className="group inline-flex items-center gap-2 rounded-full bg-fd-foreground px-6 py-3 text-sm font-medium text-fd-background hover:opacity-90 transition-all hover:gap-3"
            >
              Quick start
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/docs/direct-upload"
              className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card/50 backdrop-blur px-6 py-3 text-sm font-medium hover:border-fd-primary/40 hover:bg-fd-accent transition-colors"
            >
              Direct-to-storage uploads
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─────────────── Icons ─────────────── */

function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}
function GitHubIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.6-4.04-1.6-.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.73.08-.73 1.22.08 1.86 1.25 1.86 1.25 1.08 1.85 2.84 1.31 3.54 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.67 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.62-2.8 5.63-5.47 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  )
}
function LayersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.91a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  )
}
function WandIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8 19 13M15 9h.01M17.8 6.2 19 5M3 21l9-9M12.2 6.2 11 5" />
    </svg>
  )
}
function DatabaseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  )
}
function CloudIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19a4.5 4.5 0 1 0 0-9h-1.8A7 7 0 1 0 4 17.5" />
    </svg>
  )
}
function UploadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
    </svg>
  )
}
