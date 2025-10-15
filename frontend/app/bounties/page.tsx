"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BountyCard } from "@/components/bounty-card"
import { Button } from "@/components/ui/button"
import { DollarSign, Briefcase } from "lucide-react"
import { mockBounties } from "@/lib/bounties-data"

export default function BountiesPage() {
  const [selectedTab, setSelectedTab] = useState<"all" | "bounties" | "projects">("bounties")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const categories = ["All", "Content", "Design", "Development", "Marketing", "Other"]

  const filteredBounties = mockBounties.filter((bounty) => {
    if (selectedCategory === "All") return true
    return bounty.category === selectedCategory
  })

  const totalValueEarned = mockBounties.reduce((sum, bounty) => sum + bounty.amount, 0)
  const totalOpportunities = mockBounties.length

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e] text-white overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          </div>

          <div className="container relative py-20 md:py-28 px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">Find your next Gig</h1>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl">
                  This is your gateway to start contributing to world-class crypto companies. Choose an opportunity that
                  fits your profile and build your proof of work.
                </p>
              </div>

              {/* Illustration placeholder */}
              <div className="hidden lg:block">
                <div className="relative h-64 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                  <span className="text-6xl">👥</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Browse Opportunities Section */}
        <section className="border-b bg-background">
          <div className="container py-8 px-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Browse Opportunities</h2>

                {/* Tabs */}
                <div className="flex items-center gap-2">
                  <Button
                    variant={selectedTab === "all" ? "secondary" : "ghost"}
                    onClick={() => setSelectedTab("all")}
                    className="rounded-full"
                  >
                    All
                  </Button>
                  <Button
                    variant={selectedTab === "bounties" ? "secondary" : "ghost"}
                    onClick={() => setSelectedTab("bounties")}
                    className="rounded-full"
                  >
                    Bounties
                  </Button>
                  <Button
                    variant={selectedTab === "projects" ? "secondary" : "ghost"}
                    onClick={() => setSelectedTab("projects")}
                    className="rounded-full"
                  >
                    Projects
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">${totalValueEarned.toLocaleString()} USD</div>
                    <div className="text-sm text-muted-foreground">Total Value Earned</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                    <Briefcase className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{totalOpportunities}</div>
                    <div className="text-sm text-muted-foreground">Opportunities Listed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Content */}
        <section className="container py-8 px-6">
          <div className="grid lg:grid-cols-[1fr_300px] gap-8">
            {/* Main Content */}
            <div className="space-y-6">
              {/* Category Filters */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    size="sm"
                    className={
                      selectedCategory === category
                        ? "bg-[#E6007A] hover:bg-[#c4006a] text-white"
                        : "hover:bg-purple-50"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Bounties List */}
              <div className="space-y-4">
                {filteredBounties.map((bounty) => (
                  <BountyCard key={bounty.id} bounty={bounty} />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="rounded-lg border bg-card p-6 space-y-6 sticky top-24">
                <h3 className="text-lg font-semibold">HOW IT WORKS</h3>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <span className="text-lg font-semibold text-blue-600">1</span>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-blue-600">Create your Profile</h4>
                      <p className="text-sm text-muted-foreground">by telling us about yourself</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100">
                      <span className="text-lg font-semibold text-purple-600">2</span>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-purple-600">Participate in Bounties & Projects</h4>
                      <p className="text-sm text-muted-foreground">to build proof of work</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-100">
                      <span className="text-lg font-semibold text-pink-600">3</span>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-pink-600">Get Paid for Your Work</h4>
                      <p className="text-sm text-muted-foreground">in global standards</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
