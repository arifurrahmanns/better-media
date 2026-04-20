import { mediable, LocalStorage } from 'mediable'
import { sharpProcessor } from 'mediable/sharp'

export const media = mediable({
  secret: process.env.MEDIA_SECRET!,

  database: {
    provider: 'sqlite',
    connection: { filename: './storage/media.db' },
    autoMigrate: true,
  },

  storage: {
    default: 'local',
    disks: {
      local: LocalStorage({
        root: './storage/media',
        publicUrlBase: '/media',
      }),
    },
  },

  image: sharpProcessor(),


  owners: {
    User: ({ collection }) => {
      collection('avatars')
        .singleFile()
        .accepts('image/*')
        .maxSize('5MB')
        .convert('thumb', (i) => i.width(96).height(96).fit('cover').format('webp'))
    },
  },
})
