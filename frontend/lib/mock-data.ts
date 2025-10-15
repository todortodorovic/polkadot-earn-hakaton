export interface Grant {
  id: string
  title: string
  organization: string
  logo: string
  amount: string
  currency: string
  status: "open" | "closed"
  region?: string
  category: string
  description: string
  fullDescription: string
  avgResponseTime: string
  approvedSoFar: string
  avgGrantSize: string
  recipients: number
  skillsNeeded: string[]
  areasOfFocus: {
    title: string
    description: string
  }[]
  requirements: string[]
  gradient: string
}

export const mockGrants: Grant[] = [
  {
    id: "1",
    title: "Polkadot Infrastructure Grants",
    organization: "Web3 Foundation",
    logo: "🔴",
    amount: "Up to 30k",
    currency: "USDC",
    status: "open",
    category: "Infrastructure",
    gradient: "from-purple-400 via-pink-400 to-red-400",
    description: "Build core infrastructure and tooling for the Polkadot ecosystem",
    fullDescription:
      "The Web3 Foundation Infrastructure Grant Program supports developers building essential infrastructure, developer tools, and core protocol improvements for Polkadot and its parachains. We are looking for projects that enhance the developer experience, improve network performance, or create new capabilities for the ecosystem.",
    avgResponseTime: "2 Weeks",
    approvedSoFar: "$450k",
    avgGrantSize: "$15,000",
    recipients: 28,
    skillsNeeded: ["Rust", "Substrate", "Backend", "DevOps"],
    areasOfFocus: [
      {
        title: "Developer Tools",
        description:
          "IDEs, testing frameworks, deployment tools, and debugging utilities that make it easier to build on Polkadot.",
      },
      {
        title: "Infrastructure",
        description: "RPC nodes, indexers, oracles, bridges, and other critical infrastructure components.",
      },
      {
        title: "Protocol Improvements",
        description: "Core protocol enhancements, optimization, and new runtime modules.",
      },
    ],
    requirements: [
      "Technical specification document",
      "Team background and relevant experience",
      "Detailed timeline with milestones",
      "Budget breakdown",
    ],
  },
  {
    id: "2",
    title: "DeFi Innovation Grants",
    organization: "Polkadot Treasury",
    logo: "💎",
    amount: "10k-50k",
    currency: "DOT",
    status: "open",
    category: "DeFi",
    gradient: "from-cyan-400 via-blue-400 to-indigo-400",
    description: "Create innovative DeFi protocols and applications on Polkadot",
    fullDescription:
      "The DeFi Innovation Grant Program funds teams building novel decentralized finance applications on Polkadot. We are particularly interested in cross-chain DeFi solutions, liquid staking derivatives, and innovative lending/borrowing protocols that leverage Polkadot's unique architecture.",
    avgResponseTime: "1 Week",
    approvedSoFar: "$280k",
    avgGrantSize: "$22,000",
    recipients: 15,
    skillsNeeded: ["Solidity", "Rust", "Smart Contracts", "Frontend"],
    areasOfFocus: [
      {
        title: "Cross-Chain DeFi",
        description: "Protocols that enable seamless asset transfers and interactions across multiple parachains.",
      },
      {
        title: "Liquid Staking",
        description: "Solutions that allow users to stake DOT while maintaining liquidity through derivative tokens.",
      },
    ],
    requirements: [
      "Smart contract audit plan",
      "Security considerations document",
      "Go-to-market strategy",
      "Token economics (if applicable)",
    ],
  },
  {
    id: "3",
    title: "Community Education Grants",
    organization: "Polkadot Ambassadors",
    logo: "📚",
    amount: "Up to 5k",
    currency: "USDC",
    status: "open",
    region: "Global",
    category: "Education",
    gradient: "from-green-400 via-emerald-400 to-teal-400",
    description: "Educational content, tutorials, and community initiatives",
    fullDescription:
      "Support the creation of high-quality educational content, workshops, hackathons, and community initiatives that help onboard new developers and users to the Polkadot ecosystem. We fund content creators, educators, and community organizers.",
    avgResponseTime: "3 Days",
    approvedSoFar: "$95k",
    avgGrantSize: "$2,500",
    recipients: 42,
    skillsNeeded: ["Content Creation", "Teaching", "Community Management"],
    areasOfFocus: [
      {
        title: "Developer Tutorials",
        description: "Step-by-step guides, video courses, and interactive tutorials for building on Polkadot.",
      },
      {
        title: "Community Events",
        description: "Hackathons, workshops, meetups, and conferences that grow the Polkadot community.",
      },
    ],
    requirements: [
      "Content outline or event plan",
      "Target audience description",
      "Distribution strategy",
      "Success metrics",
    ],
  },
  {
    id: "4",
    title: "Gaming & NFT Grants",
    organization: "Polkadot Gaming Alliance",
    logo: "🎮",
    amount: "15k-40k",
    currency: "USDC",
    status: "open",
    category: "Gaming",
    gradient: "from-orange-400 via-amber-400 to-yellow-400",
    description: "Build the next generation of blockchain games and NFT platforms",
    fullDescription:
      "The Gaming & NFT Grant Program supports teams building innovative gaming experiences and NFT platforms on Polkadot. We are looking for projects that showcase the unique capabilities of Polkadot's architecture, including cross-chain gaming assets and scalable NFT marketplaces.",
    avgResponseTime: "10 Days",
    approvedSoFar: "$320k",
    avgGrantSize: "$25,000",
    recipients: 18,
    skillsNeeded: ["Game Development", "Unity", "Unreal", "Smart Contracts"],
    areasOfFocus: [
      {
        title: "On-Chain Gaming",
        description: "Fully on-chain games that leverage Polkadot's speed and low transaction costs.",
      },
      {
        title: "NFT Infrastructure",
        description: "Marketplaces, minting platforms, and tools for creators and collectors.",
      },
    ],
    requirements: [
      "Game design document or platform mockups",
      "Technical architecture",
      "Team experience in gaming",
      "User acquisition strategy",
    ],
  },
  {
    id: "5",
    title: "Privacy & Security Grants",
    organization: "Web3 Foundation",
    logo: "🔒",
    amount: "Up to 60k",
    currency: "USDC",
    status: "open",
    category: "Security",
    gradient: "from-slate-400 via-gray-400 to-zinc-400",
    description: "Privacy-preserving technologies and security tools for Polkadot",
    fullDescription:
      "This grant program funds research and development of privacy-preserving technologies, security auditing tools, and cryptographic innovations for the Polkadot ecosystem. We support both theoretical research and practical implementations.",
    avgResponseTime: "2 Weeks",
    approvedSoFar: "$180k",
    avgGrantSize: "$30,000",
    recipients: 8,
    skillsNeeded: ["Cryptography", "Security", "Rust", "Research"],
    areasOfFocus: [
      {
        title: "Zero-Knowledge Proofs",
        description: "ZK-SNARK/STARK implementations and privacy-preserving smart contracts.",
      },
      {
        title: "Security Tooling",
        description: "Automated auditing tools, fuzzing frameworks, and vulnerability scanners.",
      },
    ],
    requirements: [
      "Research proposal or technical specification",
      "Security expertise demonstration",
      "Peer review plan",
      "Open source commitment",
    ],
  },
  {
    id: "6",
    title: "Regional Ecosystem Grants",
    organization: "Polkadot Hub",
    logo: "🌍",
    amount: "5k-20k",
    currency: "DOT",
    status: "open",
    region: "Asia Pacific",
    category: "Regional",
    gradient: "from-rose-400 via-pink-400 to-fuchsia-400",
    description: "Support regional growth and adoption in Asia Pacific",
    fullDescription:
      "Regional grants support local communities, developers, and entrepreneurs building Polkadot projects tailored to their regional markets. This program focuses on Asia Pacific and provides funding for localized applications, regional partnerships, and market-specific solutions.",
    avgResponseTime: "1 Week",
    approvedSoFar: "$125k",
    avgGrantSize: "$12,000",
    recipients: 12,
    skillsNeeded: ["Business Development", "Marketing", "Development"],
    areasOfFocus: [
      {
        title: "Localized Applications",
        description: "Applications and services tailored to regional needs and preferences.",
      },
      {
        title: "Regional Partnerships",
        description: "Collaborations with local businesses, institutions, and communities.",
      },
    ],
    requirements: [
      "Market analysis for target region",
      "Local team or partnerships",
      "Localization strategy",
      "Regional go-to-market plan",
    ],
  },
]

export const grants = mockGrants
