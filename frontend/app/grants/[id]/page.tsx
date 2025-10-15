import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GrantDetailSidebar } from "@/components/grant-detail-sidebar"
import { GrantDetailContent } from "@/components/grant-detail-content"
import { mockGrants } from "@/lib/mock-data"

interface GrantDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function GrantDetailPage({ params }: GrantDetailPageProps) {
  const { id } = await params
  const grant = mockGrants.find((g) => g.id === id)

  if (!grant) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="container py-8 flex-1">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <GrantDetailSidebar grant={grant} />
          <GrantDetailContent grant={grant} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
