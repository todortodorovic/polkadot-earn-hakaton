import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { grants } from "@/lib/mock-data"
import { mockApplications } from "@/lib/applications-data"
import { ApplicationCard } from "@/components/application-card"
import { notFound } from "next/navigation"

export default function AdminGrantApplications({ params }: { params: { id: string } }) {
  const grant = grants.find((g) => g.id === params.id)

  if (!grant) {
    notFound()
  }

  const applications = mockApplications.filter((app) => app.grantId === params.id)
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
                {grant.icon}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{grant.title}</h1>
                <p className="text-gray-400">{grant.organization}</p>
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
              applications.map((application) => <ApplicationCard key={application.id} application={application} />)
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
