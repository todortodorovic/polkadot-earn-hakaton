export interface Application {
  id: string
  grantId: string
  applicantName: string
  applicantEmail: string
  projectTitle: string
  oneLiner: string
  compensation: string
  telegram: string
  walletAddress: string
  projectDescription: string
  timeline: string
  milestones: Array<{
    title: string
    description: string
    duration: string
  }>
  status: "pending" | "approved" | "rejected"
  submittedAt: string
}

export const mockApplications: Application[] = [
  {
    id: "app-1",
    grantId: "1",
    applicantName: "Alex Johnson",
    applicantEmail: "alex@example.com",
    projectTitle: "Polkadot Validator Monitoring Tool",
    oneLiner: "Real-time monitoring dashboard for Polkadot validators",
    compensation: "25000",
    telegram: "alexjohnson",
    walletAddress: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
    projectDescription:
      "A comprehensive monitoring tool that provides real-time insights into validator performance, including uptime, rewards, and network participation metrics.",
    timeline: "3 months",
    milestones: [
      {
        title: "Research & Design",
        description: "Complete technical research and UI/UX design",
        duration: "4 weeks",
      },
      {
        title: "Core Development",
        description: "Build monitoring backend and dashboard frontend",
        duration: "6 weeks",
      },
      {
        title: "Testing & Launch",
        description: "Beta testing with validators and public launch",
        duration: "2 weeks",
      },
    ],
    status: "pending",
    submittedAt: "2025-01-10T14:30:00Z",
  },
  {
    id: "app-2",
    grantId: "1",
    applicantName: "Sarah Chen",
    applicantEmail: "sarah@example.com",
    projectTitle: "Substrate Node Performance Optimizer",
    oneLiner: "Automated optimization tool for Substrate nodes",
    compensation: "18000",
    telegram: "sarahchen",
    walletAddress: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
    projectDescription:
      "An intelligent tool that analyzes Substrate node configurations and provides automated optimization recommendations to improve performance and reduce resource usage.",
    timeline: "2 months",
    milestones: [
      {
        title: "Analysis Engine",
        description: "Build node analysis and profiling system",
        duration: "3 weeks",
      },
      {
        title: "Optimization Module",
        description: "Develop automated optimization algorithms",
        duration: "3 weeks",
      },
      {
        title: "Documentation & Release",
        description: "Create documentation and release v1.0",
        duration: "2 weeks",
      },
    ],
    status: "pending",
    submittedAt: "2025-01-12T09:15:00Z",
  },
  {
    id: "app-3",
    grantId: "2",
    applicantName: "Marcus Williams",
    applicantEmail: "marcus@example.com",
    projectTitle: "Cross-Chain Liquidity Aggregator",
    oneLiner: "Aggregate liquidity across Polkadot parachains",
    compensation: "45000",
    telegram: "marcusw",
    walletAddress: "5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy",
    projectDescription:
      "A DeFi protocol that aggregates liquidity from multiple Polkadot parachains to provide users with the best swap rates and minimal slippage.",
    timeline: "4 months",
    milestones: [
      {
        title: "Protocol Design",
        description: "Design cross-chain messaging and liquidity routing",
        duration: "4 weeks",
      },
      {
        title: "Smart Contract Development",
        description: "Build and audit smart contracts",
        duration: "8 weeks",
      },
      {
        title: "Integration & Launch",
        description: "Integrate with parachains and launch on mainnet",
        duration: "4 weeks",
      },
    ],
    status: "approved",
    submittedAt: "2025-01-08T11:20:00Z",
  },
  {
    id: "app-4",
    grantId: "3",
    applicantName: "Emily Rodriguez",
    applicantEmail: "emily@example.com",
    projectTitle: "Polkadot Education Platform",
    oneLiner: "Interactive learning platform for Polkadot developers",
    compensation: "8000",
    telegram: "emilyrod",
    walletAddress: "5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw",
    projectDescription:
      "A comprehensive educational platform with interactive tutorials, coding challenges, and certification programs for developers learning Polkadot and Substrate.",
    timeline: "3 months",
    milestones: [
      {
        title: "Content Creation",
        description: "Develop curriculum and learning materials",
        duration: "5 weeks",
      },
      {
        title: "Platform Development",
        description: "Build interactive learning environment",
        duration: "5 weeks",
      },
      {
        title: "Beta Testing",
        description: "Run beta program with students",
        duration: "2 weeks",
      },
    ],
    status: "pending",
    submittedAt: "2025-01-14T16:45:00Z",
  },
]
