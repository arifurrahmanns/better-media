/* Tiny static syntax-highlighting — HTML strings with tailwind classes.
 * Tailwind scans this file for the `text-*` classes so they stay in the build. */

export const KW = (s: string) =>
  `<span class="text-fuchsia-500 dark:text-fuchsia-400">${s}</span>`
export const STR = (s: string) =>
  `<span class="text-emerald-600 dark:text-emerald-400">${s}</span>`
export const FN = (s: string) =>
  `<span class="text-sky-600 dark:text-sky-400">${s}</span>`
export const PROP = (s: string) =>
  `<span class="text-amber-600 dark:text-amber-400">${s}</span>`
export const NUM = (s: string) =>
  `<span class="text-orange-600 dark:text-orange-400">${s}</span>`
export const CMT = (s: string) =>
  `<span class="text-fd-muted-foreground/70 italic">${s}</span>`

export const CONFIG_SAMPLE_HTML = [
  `${KW('import')} { mediable, LocalStorage } ${KW('from')} ${STR("'mediable'")}`,
  `${KW('import')} { sharpProcessor } ${KW('from')} ${STR("'mediable/sharp'")}`,
  `${KW('import')} { s3Storage } ${KW('from')} ${STR("'mediable/s3'")}`,
  ``,
  `${KW('export const')} ${FN('media')} = ${FN('mediable')}({`,
  `  secret: process.env.${PROP('MEDIA_SECRET')}!,`,
  ``,
  `  database: {`,
  `    provider: ${STR("'postgres'")},`,
  `    connection: { url: process.env.DATABASE_URL! },`,
  `    autoMigrate: ${KW('true')},`,
  `  },`,
  ``,
  `  storage: {`,
  `    default: ${STR("'s3'")},`,
  `    disks: {`,
  `      s3: ${FN('s3Storage')}({ bucket: ${STR("'uploads'")}, ... }),`,
  `    },`,
  `  },`,
  ``,
  `  image: ${FN('sharpProcessor')}(),`,
  ``,
  `  owners: {`,
  `    ${PROP('User')}: ({ collection }) => {`,
  `      ${FN('collection')}(${STR("'avatars'")})`,
  `        .${FN('singleFile')}()`,
  `        .${FN('accepts')}(${STR("'image/*'")})`,
  `        .${FN('maxSize')}(${STR("'5MB'")})`,
  `        .${FN('convert')}(${STR("'thumb'")}, (i) => i.${FN('width')}(${NUM('96')}).${FN('format')}(${STR("'webp'")})),`,
  `    },`,
  `  },`,
  `})`,
].join('\n')

/* ─── Per-framework upload route samples ─── */

export const FRAMEWORK_SAMPLES = [
  {
    label: 'Express',
    file: 'routes/avatar.ts',
    html: [
      `${KW('import')} multer ${KW('from')} ${STR("'multer'")}`,
      `${KW('import')} { media } ${KW('from')} ${STR("'./media'")}`,
      ``,
      `${KW('const')} upload = ${FN('multer')}({ storage: ${FN('multer')}.${FN('memoryStorage')}() })`,
      ``,
      `app.${FN('post')}(${STR("'/users/:id/avatar'")}, upload.${FN('single')}(${STR("'file'")}), ${KW('async')} (req, res) => {`,
      `  ${KW('const')} record = ${KW('await')} media.${FN('addMedia')}({`,
      `    model: { type: ${STR("'User'")}, id: req.params.id },`,
      `    file: req.file,`,
      `    collection: ${STR("'avatars'")},`,
      `  })`,
      `  res.${FN('json')}(record)`,
      `})`,
    ].join('\n'),
  },
  {
    label: 'Hono',
    file: 'app.ts',
    html: [
      `${KW('import')} { Hono } ${KW('from')} ${STR("'hono'")}`,
      `${KW('import')} { media } ${KW('from')} ${STR("'./media'")}`,
      ``,
      `${KW('const')} app = ${KW('new')} ${FN('Hono')}()`,
      ``,
      `app.${FN('post')}(${STR("'/users/:id/avatar'")}, ${KW('async')} (c) => {`,
      `  ${KW('const')} form = ${KW('await')} c.req.${FN('formData')}()`,
      `  ${KW('const')} file = form.${FN('get')}(${STR("'file'")}) ${KW('as')} File`,
      ``,
      `  ${KW('const')} record = ${KW('await')} media.${FN('addMedia')}({`,
      `    model: { type: ${STR("'User'")}, id: c.req.${FN('param')}(${STR("'id'")}) },`,
      `    file,`,
      `    collection: ${STR("'avatars'")},`,
      `  })`,
      `  ${KW('return')} c.${FN('json')}(record)`,
      `})`,
    ].join('\n'),
  },
  {
    label: 'Fastify',
    file: 'server.ts',
    html: [
      `${KW('import')} multipart ${KW('from')} ${STR("'@fastify/multipart'")}`,
      `${KW('import')} { media } ${KW('from')} ${STR("'./media'")}`,
      ``,
      `${KW('await')} app.${FN('register')}(multipart)`,
      ``,
      `app.${FN('post')}(${STR("'/users/:id/avatar'")}, ${KW('async')} (req, reply) => {`,
      `  ${KW('const')} data = ${KW('await')} req.${FN('file')}()`,
      `  ${KW('if')} (!data) ${KW('return')} reply.${FN('code')}(${NUM('400')}).${FN('send')}()`,
      ``,
      `  ${KW('return')} media.${FN('addMedia')}({`,
      `    model: { type: ${STR("'User'")}, id: (req.params ${KW('as')} any).id },`,
      `    file: { stream: data.file, filename: data.filename, mimetype: data.mimetype },`,
      `    collection: ${STR("'avatars'")},`,
      `  })`,
      `})`,
    ].join('\n'),
  },
  {
    label: 'NestJS',
    file: 'avatar.controller.ts',
    html: [
      `${KW('import')} { Controller, Post, Param, UploadedFile, UseInterceptors } ${KW('from')} ${STR("'@nestjs/common'")}`,
      `${KW('import')} { FileInterceptor } ${KW('from')} ${STR("'@nestjs/platform-express'")}`,
      `${KW('import')} { media } ${KW('from')} ${STR("'./media'")}`,
      ``,
      `@${FN('Controller')}(${STR("'users/:id/avatar'")})`,
      `${KW('export class')} ${FN('AvatarController')} {`,
      `  @${FN('Post')}()`,
      `  @${FN('UseInterceptors')}(${FN('FileInterceptor')}(${STR("'file'")}))`,
      `  ${FN('upload')}(@${FN('Param')}(${STR("'id'")}) id: ${KW('string')}, @${FN('UploadedFile')}() file: Express.Multer.File) {`,
      `    ${KW('return')} media.${FN('addMedia')}({ model: { type: ${STR("'User'")}, id }, file, collection: ${STR("'avatars'")} })`,
      `  }`,
      `}`,
    ].join('\n'),
  },
  {
    label: 'Next.js',
    file: 'app/api/.../route.ts',
    html: [
      `${KW('import')} { media } ${KW('from')} ${STR("'@/lib/media'")}`,
      ``,
      `${KW('export const')} runtime = ${STR("'nodejs'")}`,
      ``,
      `${KW('export async function')} ${FN('POST')}(req: Request, { params }: { params: ${FN('Promise')}<{ id: ${KW('string')} }> }) {`,
      `  ${KW('const')} { id } = ${KW('await')} params`,
      `  ${KW('const')} form = ${KW('await')} req.${FN('formData')}()`,
      `  ${KW('const')} file = form.${FN('get')}(${STR("'file'")}) ${KW('as')} File`,
      ``,
      `  ${KW('const')} record = ${KW('await')} media.${FN('addMedia')}({`,
      `    model: { type: ${STR("'User'")}, id },`,
      `    file,`,
      `    collection: ${STR("'avatars'")},`,
      `  })`,
      `  ${KW('return')} Response.${FN('json')}(record)`,
      `}`,
    ].join('\n'),
  },
]
