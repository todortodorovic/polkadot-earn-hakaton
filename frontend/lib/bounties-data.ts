export interface Bounty {
  id: string
  title: string
  organization: string
  logo: string
  amount: number
  currency: string
  type: "bounty"
  dueDate: string
  submissions: number
  category: "Content" | "Design" | "Development" | "Marketing" | "Other"
  description: string
  requirements: string[]
  status: "open" | "closed"
}

export const mockBounties: Bounty[] = [
  {
    id: "1",
    title: "Create Twitter Thread about Polkadot XCM",
    organization: "Polkadot Marketing",
    logo: "🐦",
    amount: 150,
    currency: "USDC",
    type: "bounty",
    dueDate: "7h",
    submissions: 12,
    category: "Content",
    status: "open",
    description:
      "Create an engaging Twitter thread explaining Polkadot's Cross-Consensus Message (XCM) format in simple terms. Should be 5-8 tweets with visuals.",
    requirements: [
      "Must have 1000+ Twitter followers",
      "Include at least 2 custom graphics",
      "Tag @Polkadot official account",
      "Use hashtags #Polkadot #XCM",
    ],
  },
  {
    id: "2",
    title: "Design Polkadot Ecosystem Infographic",
    organization: "Web3 Foundation",
    logo: "🎨",
    amount: 500,
    currency: "USDC",
    type: "bounty",
    dueDate: "3d",
    submissions: 8,
    category: "Design",
    status: "open",
    description:
      "Create a comprehensive infographic showing the Polkadot ecosystem, including parachains, relay chain, and key projects.",
    requirements: [
      "High resolution (at least 2000px width)",
      "Include all major parachains",
      "Use official Polkadot brand colors",
      "Provide source files (Figma/AI)",
    ],
  },
  {
    id: "3",
    title: "Write Tutorial: Building Your First Parachain",
    organization: "Polkadot Developers",
    logo: "📝",
    amount: 800,
    currency: "USDC",
    type: "bounty",
    dueDate: "5d",
    submissions: 4,
    category: "Content",
    status: "open",
    description:
      "Write a comprehensive tutorial for developers on how to build their first parachain using Substrate. Should include code examples and explanations.",
    requirements: [
      "Minimum 2000 words",
      "Include working code examples",
      "Cover setup, development, and testing",
      "Provide GitHub repository with code",
    ],
  },
  {
    id: "4",
    title: "Create 60-Second Explainer Video",
    organization: "Polkadot Community",
    logo: "🎬",
    amount: 1000,
    currency: "USDC",
    type: "bounty",
    dueDate: "7d",
    submissions: 6,
    category: "Content",
    status: "open",
    description:
      "Produce a 60-second animated explainer video about what Polkadot is and why it matters. Should be engaging and easy to understand for newcomers.",
    requirements: [
      "Professional animation quality",
      "Clear voiceover or subtitles",
      "1080p minimum resolution",
      "Provide source files",
    ],
  },
  {
    id: "5",
    title: "Develop Polkadot Price Tracker Widget",
    organization: "Polkadot Tools",
    logo: "💻",
    amount: 1500,
    currency: "USDC",
    type: "bounty",
    dueDate: "10d",
    submissions: 3,
    category: "Development",
    status: "open",
    description:
      "Build a React widget that displays real-time DOT price, market cap, and 24h change. Should be embeddable on any website.",
    requirements: [
      "Built with React/TypeScript",
      "Responsive design",
      "Real-time price updates",
      "Open source (MIT license)",
    ],
  },
  {
    id: "6",
    title: "Translate Documentation to Spanish",
    organization: "Polkadot Docs",
    logo: "🌐",
    amount: 600,
    currency: "USDC",
    type: "bounty",
    dueDate: "14d",
    submissions: 2,
    category: "Content",
    status: "open",
    description:
      "Translate the Polkadot getting started documentation from English to Spanish. Must be accurate and natural.",
    requirements: [
      "Native Spanish speaker",
      "Technical translation experience",
      "Maintain formatting and links",
      "Review by second translator",
    ],
  },
  {
    id: "7",
    title: "Design Polkadot Sticker Pack",
    organization: "Polkadot Swag",
    logo: "✨",
    amount: 400,
    currency: "USDC",
    type: "bounty",
    dueDate: "5d",
    submissions: 15,
    category: "Design",
    status: "open",
    description:
      "Create a set of 10 fun and creative stickers featuring Polkadot themes, memes, and community inside jokes.",
    requirements: [
      "10 unique sticker designs",
      "PNG with transparent background",
      "Optimized for Telegram/Discord",
      "Print-ready versions included",
    ],
  },
  {
    id: "8",
    title: "Write Comparison: Polkadot vs Ethereum 2.0",
    organization: "Polkadot Research",
    logo: "📊",
    amount: 700,
    currency: "USDC",
    type: "bounty",
    dueDate: "8d",
    submissions: 5,
    category: "Content",
    status: "open",
    description:
      "Write an objective, technical comparison between Polkadot and Ethereum 2.0, covering architecture, consensus, scalability, and developer experience.",
    requirements: [
      "Minimum 3000 words",
      "Cite technical sources",
      "Include comparison tables",
      "Fair and balanced analysis",
    ],
  },
  {
    id: "9",
    title: "Create Instagram Carousel Post",
    organization: "Polkadot Social",
    logo: "📱",
    amount: 200,
    currency: "USDC",
    type: "bounty",
    dueDate: "2d",
    submissions: 20,
    category: "Marketing",
    status: "open",
    description:
      "Design a 10-slide Instagram carousel explaining Polkadot's key features in a visually appealing way for social media.",
    requirements: [
      "10 slides (1080x1080px each)",
      "Consistent visual style",
      "Mobile-friendly text size",
      "Include call-to-action on last slide",
    ],
  },
  {
    id: "10",
    title: "Build Polkadot Events Calendar",
    organization: "Polkadot Community",
    logo: "📅",
    amount: 1200,
    currency: "USDC",
    type: "bounty",
    dueDate: "12d",
    submissions: 4,
    category: "Development",
    status: "open",
    description:
      "Create a web app that aggregates and displays all Polkadot-related events, hackathons, and meetups in a calendar view.",
    requirements: [
      "Calendar and list views",
      "Filter by event type and location",
      "Submit new events feature",
      "Mobile responsive",
    ],
  },
]
