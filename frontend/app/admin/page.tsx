import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { grants } from "@/lib/mock-data"
import { mockApplications } from "@/lib/applications-data"
import Link from "next/link"

export default function AdminDashboard() {
  const getApplicationCount = (grantId: string) => {
    return mockApplications.filter((app) => app.grantId === grantId).length
  }

  const getPendingCount = (grantId: string) => {
    return mockApplications.filter((app) => app.grantId === grantId && app.status === "pending").length
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
                        {grant.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1">{grant.title}</h3>
                        <p className="text-gray-400 text-sm mb-3">{grant.organization}</p>
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
