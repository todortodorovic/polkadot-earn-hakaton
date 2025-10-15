'use client'

import { useState, useEffect } from 'react'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { apiClient } from "@/lib/api/client"
import { useAuth } from "@/lib/context/auth-context"
import Link from "next/link"
import type { Grant, Application } from "@/lib/types/api"

export default function AdminDashboard() {
  const { isAdmin, isAuthenticated } = useAuth()
  const [grants, setGrants] = useState<Grant[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      // Fetch grants
      const grantsRes = await apiClient.getGrants()
      setGrants(grantsRes.grants)

      // Fetch applications if admin
      if (isAdmin) {
        const appsRes = await apiClient.getAdminApplications()
        setApplications(appsRes.applications)
      }
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getApplicationCount = (grantId: string) => {
    return applications.filter((app) => app.grantId === grantId).length
  }

  const getPendingCount = (grantId: string) => {
    return applications.filter((app) => app.grantId === grantId && app.status === "pending").length
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please login</h1>
          <Link href="/test-login" className="text-pink-400 hover:underline">
            Go to login page
          </Link>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-4">You need admin privileges to access this page</p>
          <Link href="/" className="text-pink-400 hover:underline">
            Go to homepage
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Review and manage grant applications</p>
          </div>

          <div className="grid gap-6">
            {grants.map((grant) => {
              const totalApps = getApplicationCount(grant.id)
              const pendingApps = getPendingCount(grant.id)

              return (
                <Link
                  key={grant.id}
                  href={`/admin/grants/${grant.id}`}
                  className="block p-6 rounded-xl border border-white/10 bg-gradient-to-br from-purple-900/20 to-pink-900/20 hover:border-pink-500/50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                        💰
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1">{grant.title}</h3>
                        <p className="text-gray-400 text-sm mb-3">{grant.category} • ${grant.amount.toLocaleString()}</p>
                        <p className="text-gray-300 line-clamp-2">{grant.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-pink-400">{totalApps}</div>
                      <div className="text-sm text-gray-400">Total Applications</div>
                      {pendingApps > 0 && (
                        <div className="mt-2 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm">
                          {pendingApps} Pending
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
