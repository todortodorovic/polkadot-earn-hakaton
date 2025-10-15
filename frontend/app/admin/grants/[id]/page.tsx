'use client'

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { apiClient } from "@/lib/api/client"
import { useAuth } from "@/lib/context/auth-context"
import { useRouter } from "next/navigation"
import type { Grant, Application } from "@/lib/types/api"

export default function AdminGrantApplications({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { isAdmin, isAuthenticated } = useAuth()
  const [grant, setGrant] = useState<Grant | null>(null)
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [params.id])

  const loadData = async () => {
    try {
      setLoading(true)

      // Fetch grant
      const grantRes = await apiClient.getGrant(params.id)
      setGrant(grantRes.grant)

      // Fetch applications for this grant
      if (isAdmin) {
        const appsRes = await apiClient.getAdminApplications({ grantId: params.id })
        setApplications(appsRes.applications)
      }
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (appId: string) => {
    if (!confirm('Are you sure you want to approve this application?')) return

    try {
      const notes = prompt('Enter approval notes (optional):')
      await apiClient.approveApplication(appId, { adminNotes: notes || undefined })
      loadData() // Reload data
      alert('Application approved!')
    } catch (err: any) {
      alert('Failed to approve: ' + err.message)
    }
  }

  const handleReject = async (appId: string) => {
    const notes = prompt('Enter rejection reason:')
    if (!notes) return

    try {
      await apiClient.rejectApplication(appId, { adminNotes: notes })
      loadData() // Reload data
      alert('Application rejected')
    } catch (err: any) {
      alert('Failed to reject: ' + err.message)
    }
  }

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-4">You need admin privileges</p>
          <button
            onClick={() => router.push('/test-login')}
            className="px-4 py-2 bg-pink-500 rounded hover:bg-pink-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  if (!grant) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-gray-400 mb-4">Grant not found</p>
          <button
            onClick={() => router.push('/admin')}
            className="px-4 py-2 bg-pink-500 rounded hover:bg-pink-600"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const pendingApps = applications.filter((app) => app.status === "pending")
  const approvedApps = applications.filter((app) => app.status === "approved")
  const rejectedApps = applications.filter((app) => app.status === "rejected")

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl">
                💰
              </div>
              <div>
                <h1 className="text-3xl font-bold">{grant.title}</h1>
                <p className="text-gray-400">{grant.category} • ${grant.amount.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex gap-6 mt-6">
              <div className="px-4 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <div className="text-2xl font-bold text-yellow-400">{pendingApps.length}</div>
                <div className="text-sm text-gray-400">Pending</div>
              </div>
              <div className="px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="text-2xl font-bold text-green-400">{approvedApps.length}</div>
                <div className="text-sm text-gray-400">Approved</div>
              </div>
              <div className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="text-2xl font-bold text-red-400">{rejectedApps.length}</div>
                <div className="text-sm text-gray-400">Rejected</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {applications.length === 0 ? (
              <div className="text-center py-12 text-gray-400">No applications yet for this grant.</div>
            ) : (
              applications.map((application) => (
                <div key={application.id} className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{application.projectTitle}</h3>
                      <p className="text-gray-400 text-sm mb-2">
                        Applicant: {application.user?.name} ({application.user?.email})
                      </p>
                      <p className="text-gray-300 mb-3">{application.projectDescription}</p>

                      {application.teamInfo && (
                        <div className="mb-3 p-3 rounded bg-white/5">
                          <p className="text-sm font-semibold text-gray-300 mb-1">Team:</p>
                          <p className="text-sm text-gray-400">{application.teamInfo}</p>
                        </div>
                      )}

                      <div className="flex gap-4 text-sm mb-3">
                        <div>
                          <span className="text-gray-400">Requested:</span>
                          <span className="ml-2 text-green-400 font-semibold">
                            ${application.requestedAmount.toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Wallet:</span>
                          <span className="ml-2 text-pink-400 font-mono text-xs">
                            {application.walletAddress.slice(0, 10)}...
                          </span>
                        </div>
                      </div>

                      {application.adminNotes && (
                        <div className="p-3 rounded bg-blue-500/10 border border-blue-500/20">
                          <p className="text-sm font-semibold text-blue-300 mb-1">Admin Notes:</p>
                          <p className="text-sm text-gray-300">{application.adminNotes}</p>
                        </div>
                      )}
                    </div>

                    <div className="ml-4 flex flex-col items-end gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          application.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : application.status === 'approved'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {application.status.toUpperCase()}
                      </span>

                      {application.status === 'pending' && (
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleApprove(application.id)}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-semibold"
                          >
                            ✓ Approve
                          </button>
                          <button
                            onClick={() => handleReject(application.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-semibold"
                          >
                            ✗ Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 mt-3 pt-3 border-t border-white/5">
                    Submitted: {new Date(application.createdAt).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
