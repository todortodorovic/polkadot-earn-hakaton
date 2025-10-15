import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Clock, Users } from "lucide-react"
import { mockBounties } from "@/lib/bounties-data"

export default function BountyDetailPage({ params }: { params: { id: string } }) {
  const bounty = mockBounties.find((b) => b.id === params.id)

  if (!bounty) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container py-8">
        <div className="grid lg:grid-cols-[1fr_350px] gap-8">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 text-4xl">
                {bounty.logo}
              </div>
              <div className="flex-1 space-y-2">
                <h1 className="text-3xl font-bold">{bounty.title}</h1>
                <p className="text-muted-foreground">by {bounty.organization}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="gap-1">
                    <span className="text-xs">⚡</span>
                    Bounty
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {bounty.status === "open" ? "Open" : "Closed"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Description */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed">{bounty.description}</p>
            </Card>

            {/* Requirements */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Requirements</h2>
              <ul className="space-y-2">
                {bounty.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-[#E6007A] mt-1">•</span>
                    <span className="text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6 space-y-6 sticky top-24">
              {/* Prize */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Prize</p>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 text-2xl">◎</span>
                  <span className="text-3xl font-bold">{bounty.amount}</span>
                  <span className="text-muted-foreground">{bounty.currency}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">Due in</span>
                  </div>
                  <span className="font-semibold">{bounty.dueDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">Submissions</span>
                  </div>
                  <span className="font-semibold">{bounty.submissions}</span>
                </div>
              </div>

              {/* Apply Button */}
              <Button className="w-full bg-[#E6007A] hover:bg-[#c4006a] text-white" size="lg">
                Apply Now
              </Button>

              {/* Category */}
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Category</p>
                <Badge variant="secondary">{bounty.category}</Badge>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
