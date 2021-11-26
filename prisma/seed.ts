import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: { email: 'pavel@workverse.xyz' },
    update: {},
    create: {
      email: 'pavel@workverse.xyz',
      name: 'Pavel',
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
      jobs: {
        create: [
          {
            position: 'Frontend Engineer',
            applyUrl: 'https://workverse.xyz/careers',
            remote: false,
            role: 'Engineering',
            description: '{}',
            paysCrypto: false,
            status: 'Live',
            type: 'FullTime',
            tags: {
              create: [{ name: 'Frontend' }, { name: 'NFT' }],
            },
          },
          {
            position: 'Backend Engineer',
            applyUrl: 'https://workverse.xyz/careers',
            remote: false,
            role: 'Engineering',
            description: '{}',
            paysCrypto: true,
            status: 'Live',
            type: 'FullTime',
            tags: {
              create: [{ name: 'Backend' }, { name: 'DeFi' }],
            },
          },
          {
            position: 'Product Designer',
            applyUrl: 'https://workverse.xyz/careers',
            remote: false,
            role: 'Design',
            description: '{}',
            paysCrypto: true,
            status: 'Live',
            type: 'Contract',
            tags: {
              create: [{ name: 'Design' }, { name: 'Gaming' }],
            },
          },
        ],
      },
    },
  })

  await prisma.user.upsert({
    where: { email: 'prichodko.p@gmail.com' },
    update: {},
    create: {
      email: 'prichodko.p@gmail.com',
      name: 'Pavel',
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
