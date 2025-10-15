"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, DollarSign, TrendingUp, Users } from "lucide-react"
import type { Grant } from "@/lib/mock-data"
import { useState } from "react"
import { ApplicationDialog } from "@/components/application-dialog"

interface GrantDetailSidebarProps {
  grant: Grant
}

export function GrantDetailSidebar({ grant }: GrantDetailSidebarProps) {
  const [isApplicationOpen, setIsApplicationOpen] = useState(false)

  return (
    <>
      <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        {/* Prize Card */}
        <Card className="p-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span>Cheque Size</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{grant.amount}</span>
              <span className="text-lg text-muted-foreground">{grant.currency}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">AVG. RESPONSE TIME</span>
              </div>
              <p className="text-lg font-semibold">{grant.avgResponseTime}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">APPROVED SO FAR</span>
              </div>
              <p className="text-lg font-semibold">{grant.approvedSoFar}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <DollarSign className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">AVG. GRANT SIZE</span>
              </div>
              <p className="text-lg font-semibold">{grant.avgGrantSize}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Users className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">RECIPIENTS</span>
              </div>
              <p className="text-lg font-semibold">{grant.recipients}</p>
            </div>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            size="lg"
            onClick={() => setIsApplicationOpen(true)}
          >
            Apply Now
          </Button>
        </Card>

        {/* Regional Grant */}
        {grant.region && (
          <Card className="p-4">
            <h3 className="font-semibold mb-2">REGIONAL GRANT</h3>
            <p className="text-sm text-muted-foreground">
              This grant is only open for people in <span className="font-medium text-foreground">{grant.region}</span>
            </p>
          </Card>
        )}

        {/* Skills Needed */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">SKILLS NEEDED</h3>
          <div className="flex flex-wrap gap-2">
            {grant.skillsNeeded.map((skill) => (
              <Badge key={skill} variant="secondary" className="font-normal">
                {skill}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Contact */}
        <Card className="p-4">
          <h3 className="font-semibold mb-2">CONTACT</h3>
          <p className="text-sm text-muted-foreground">Reach out if you have any questions about this listing</p>
        </Card>
      </aside>

      <ApplicationDialog grant={grant} open={isApplicationOpen} onOpenChange={setIsApplicationOpen} />
    </>
  )
}
