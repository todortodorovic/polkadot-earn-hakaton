"use client"

import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2 } from "lucide-react"
import type { Grant } from "@/lib/mock-data"

interface GrantDetailContentProps {
  grant: Grant
}

export function GrantDetailContent({ grant }: GrantDetailContentProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${grant.gradient} text-4xl`}
          >
            {grant.logo}
          </div>

          <div className="flex-1 space-y-2">
            <h1 className="text-3xl font-bold text-balance">{grant.title}</h1>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">
                by <span className="font-medium text-foreground">{grant.organization}</span>
              </span>
              <Badge variant="outline" className="gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Grant
              </Badge>
              {grant.status === "open" && <Badge className="bg-green-500 hover:bg-green-600">Open</Badge>}
              {grant.region && <Badge variant="secondary">{grant.region}</Badge>}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger
            value="prizes"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Prizes
          </TabsTrigger>
          <TabsTrigger
            value="details"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Details
          </TabsTrigger>
          <TabsTrigger
            value="references"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            References
          </TabsTrigger>
        </TabsList>

        <TabsContent value="prizes" className="mt-6 space-y-6">
          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold mb-4">Prize Structure</h2>
            <p className="text-muted-foreground leading-relaxed">{grant.fullDescription}</p>

            <div className="mt-6 p-6 bg-muted/50 rounded-lg border">
              <h3 className="text-lg font-semibold mb-2">Total Available</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{grant.amount}</span>
                <span className="text-lg text-muted-foreground">{grant.currency}</span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="details" className="mt-6 space-y-8">
          <div className="prose prose-gray max-w-none">
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                <span className="text-2xl">🎯</span>
                <div>
                  <h3 className="text-lg font-semibold mb-1">This is designed for</h3>
                  <p className="text-muted-foreground leading-relaxed">{grant.description}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-muted-foreground leading-relaxed mb-6">{grant.fullDescription}</p>
            </div>

            {/* Areas of Focus */}
            {grant.areasOfFocus.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span>🎯</span>
                  Areas of Focus
                </h2>
                <div className="space-y-6">
                  {grant.areasOfFocus.map((area, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="text-lg font-semibold">{area.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{area.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements */}
            {grant.requirements.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Application Requirements</h2>
                <ul className="space-y-3">
                  {grant.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="references" className="mt-6">
          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold mb-4">References & Resources</h2>
            <p className="text-muted-foreground">Additional resources and documentation will be provided here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
