import {
  siExpress,
  siFastify,
  siHono,
  siNestjs,
  siNextdotjs,
} from 'simple-icons'

interface BrandIcon {
  path: string
  title: string
}

function makeIcon(icon: BrandIcon) {
  const Icon = ({ className }: { className?: string }) => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-label={icon.title}
    >
      <path d={icon.path} />
    </svg>
  )
  Icon.displayName = `${icon.title.replace(/[^a-zA-Z0-9]/g, '')}Icon`
  return Icon
}

export const ExpressIcon = makeIcon(siExpress)
export const HonoIcon = makeIcon(siHono)
export const FastifyIcon = makeIcon(siFastify)
export const NestJSIcon = makeIcon(siNestjs)
export const NextJSIcon = makeIcon(siNextdotjs)
