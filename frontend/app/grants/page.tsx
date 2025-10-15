'use client'

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GrantCard } from "@/components/grant-card"
import { apiClient } from "@/lib/api/client"
import type { Grant as BackendGrant } from "@/lib/types/api"
import type { Grant } from "@/lib/mock-data"

export default function GrantsPage() {
  const [grants, setGrants] = useState<Grant[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadGrants()
  }, [])

  const loadGrants = async () => {
    try {
      setLoading(true)
      const response = await apiClient.getGrants({ active: true })

      // Convert backend grants to frontend format
      const frontendGrants: Grant[] = response.grants.map((backendGrant: BackendGrant) => ({
        id: backendGrant.id,
        title: backendGrant.title,
        description: backendGrant.description,
        fullDescription: backendGrant.description,
        logo: "💰",
        amount: backendGrant.amount.toString(),
        currency: "DOT",
        organization: "Polkadot",
        status: backendGrant.isActive ? "open" : "closed" as "open" | "closed",
        category: backendGrant.category,
        skillsNeeded: [],
        avgResponseTime: "2 weeks",
        approvedSoFar: "0",
        avgGrantSize: backendGrant.amount.toString(),
        recipients: 0,
        areasOfFocus: [],
        requirements: [backendGrant.requirements],
        gradient: "from-purple-400 via-pink-400 to-red-400",
      }))

      setGrants(frontendGrants)
    } catch (error) {
      console.error('Failed to load grants:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="container py-8 flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="container py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Grants</h1>
          <p className="text-muted-foreground">
            Explore available grants and apply for funding
          </p>
        </div>

        {grants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No grants available at the moment</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {grants.map((grant) => (
              <GrantCard key={grant.id} grant={grant} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
