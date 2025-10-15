import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users } from "lucide-react"
import type { Bounty } from "@/lib/bounties-data"

interface BountyCardProps {
  bounty: Bounty
}

export function BountyCard({ bounty }: BountyCardProps) {
  return (
    <Link href={`/bounties/${bounty.id}`}>
      <Card className="p-6 hover:shadow-lg transition-all duration-200 hover:border-pink-200">
        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 text-3xl">
            {bounty.logo}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1 flex-1">
                <h3 className="font-semibold text-lg leading-tight hover:text-[#E6007A] transition-colors">
                  {bounty.title}
                </h3>
                <p className="text-sm text-muted-foreground">{bounty.organization}</p>
              </div>

              {/* Amount */}
              <div className="text-right shrink-0">
                <div className="flex items-center gap-1 text-lg font-bold">
                  <span className="text-blue-600">◎</span>
                  <span>{bounty.amount}</span>
                  <span className="text-muted-foreground text-sm font-normal">{bounty.currency}</span>
                </div>
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Badge variant="secondary" className="gap-1">
                <span className="text-xs">⚡</span>
                Bounty
              </Badge>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>Due in {bounty.dueDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                <span>{bounty.submissions}</span>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {bounty.status === "open" ? "Open" : "Closed"}
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
