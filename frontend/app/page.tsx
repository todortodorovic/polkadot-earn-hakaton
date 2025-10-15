"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GrantCard } from "@/components/grant-card"
import { GrantsFilter } from "@/components/grants-filter"
import { mockGrants } from "@/lib/mock-data"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredGrants = mockGrants.filter((grant) => {
    const matchesSearch =
      grant.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grant.organization.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = !selectedCategory || grant.category === selectedCategory

    return matchesSearch && matchesCategory
  })

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
            <div className="mx-auto max-w-3xl text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
                Need funds to build out your idea?
              </h1>
              <p className="text-xl text-white/80 text-balance leading-relaxed">
                Discover the complete list of crypto grants available to support your project. Fast, equity-free funding
                without the hassle.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/70 pt-2">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  Equity-Free
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  No Bullshit
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
                  Fast AF
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Grants Section */}
        <section className="container py-12 md:py-16 px-6">
          <div className="space-y-8">
            <GrantsFilter
              onSearchChange={setSearchQuery}
              onCategoryChange={setSelectedCategory}
              selectedCategory={selectedCategory}
            />

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredGrants.length} {filteredGrants.length === 1 ? "grant" : "grants"}
              </p>
            </div>

            {filteredGrants.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No grants found matching your criteria.</p>
                <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredGrants.map((grant) => (
                  <GrantCard key={grant.id} grant={grant} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
