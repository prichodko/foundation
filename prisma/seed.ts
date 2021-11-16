import { prisma } from '~/api/lib/prisma'

async function main() {
  await prisma.user.upsert({
    where: { email: 'pvl@workverse.xyz' },
    update: {},
    create: {
      email: 'pvl@workverse.xyz',
      name: 'Alice',
      company: {
        create: {
          email: 'gm@workverse.xyz',
          name: 'Workverse',
          slug: 'workverse',
          website: 'https://workverse.xyz',
          twitter: '@workverse_xyz',
          description:
            'Connecting people with next-generation organizations and DAOs.',
        },
      },
    },
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
