import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Kreiranje admin korisnika
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@polkadot-grants.com' },
    update: {},
    create: {
      email: 'admin@polkadot-grants.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
    },
  })

  console.log('✅ Admin user created:', admin.email)

  // Kreiranje test korisnika
  const testUserPassword = await bcrypt.hash('user123', 10)
  const testUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password: testUserPassword,
      name: 'Test User',
      role: 'user',
      walletAddress: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    },
  })

  console.log('✅ Test user created:', testUser.email)

  // Hardcodovani grantovi
  const grants = [
    {
      title: 'Infrastructure Grant',
      description: 'Funding for critical infrastructure projects that enhance the Polkadot ecosystem. This includes node infrastructure, indexers, explorers, and other essential tools.',
      amount: 50000,
      category: 'Infrastructure',
      requirements: 'Technical expertise in blockchain infrastructure, clear roadmap, experienced team, open-source commitment',
      deadline: new Date('2025-12-31'),
    },
    {
      title: 'DApp Development Grant',
      description: 'Support for decentralized application development on Polkadot and parachains. Build innovative applications that leverage Polkadot\'s unique features.',
      amount: 30000,
      category: 'Development',
      requirements: 'Proof of concept, technical documentation, team experience, market analysis',
      deadline: new Date('2025-11-30'),
    },
    {
      title: 'Research Grant',
      description: 'Funding for academic and applied research related to Polkadot technology, consensus mechanisms, governance, and scalability solutions.',
      amount: 25000,
      category: 'Research',
      requirements: 'Academic background, research proposal, expected outcomes, publication plan',
      deadline: new Date('2025-10-31'),
    },
    {
      title: 'Community & Education Grant',
      description: 'Support for community building, educational content, workshops, hackathons, and local community initiatives to grow the Polkadot ecosystem.',
      amount: 15000,
      category: 'Community',
      requirements: 'Community engagement plan, content strategy, measurable KPIs, previous community work',
      deadline: new Date('2026-01-31'),
    },
    {
      title: 'Security & Auditing Grant',
      description: 'Funding for security audits, penetration testing, and development of security tools for the Polkadot ecosystem.',
      amount: 40000,
      category: 'Security',
      requirements: 'Security expertise, audit methodology, certifications, previous audit experience',
      deadline: new Date('2025-12-15'),
    },
    {
      title: 'UX/UI Design Grant',
      description: 'Support for improving user experience and interface design of Polkadot wallets, dApps, and ecosystem tools.',
      amount: 20000,
      category: 'Design',
      requirements: 'Design portfolio, UX research plan, accessibility considerations, design system approach',
      deadline: new Date('2025-11-15'),
    },
    {
      title: 'Cross-Chain Integration Grant',
      description: 'Funding for projects that enable cross-chain communication, bridges, and interoperability solutions within the Polkadot ecosystem.',
      amount: 60000,
      category: 'Integration',
      requirements: 'Technical architecture, security analysis, integration plan, experienced blockchain team',
      deadline: new Date('2026-02-28'),
    },
    {
      title: 'Developer Tools Grant',
      description: 'Support for creating developer tools, SDKs, libraries, and frameworks that make it easier to build on Polkadot.',
      amount: 35000,
      category: 'Tooling',
      requirements: 'Developer background, tool specification, documentation plan, community adoption strategy',
      deadline: new Date('2025-12-20'),
    },
  ]

  for (const grant of grants) {
    const created = await prisma.grant.upsert({
      where: { id: grant.title.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: {
        id: grant.title.toLowerCase().replace(/\s+/g, '-'),
        ...grant,
      },
    })
    console.log(`✅ Grant created: ${created.title}`)
  }

  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
