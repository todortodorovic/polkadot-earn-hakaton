import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Grant } from "@/lib/mock-data"

interface GrantCardProps {
  grant: Grant
}

export function GrantCard({ grant }: GrantCardProps) {
  return (
    <Card className="group relative overflow-hidden border transition-all hover:scale-[1.02] hover:shadow-xl hover:border-pink-300">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 opacity-60" />

      <div className="relative p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 text-3xl">
            {grant.logo}
          </div>
          {grant.status === "open" && <Badge className="bg-green-100 text-green-700 border-green-200">Open</Badge>}
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2 text-balance">{grant.title}</h3>
          <p className="text-sm text-gray-600 mb-1 font-medium">by {grant.organization}</p>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{grant.description}</p>
        </div>

        <div className="space-y-3 mt-auto">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">{grant.amount}</span>
            <span className="text-sm font-medium text-gray-600">{grant.currency}</span>
          </div>

          <Link href={`/grants/${grant.id}`} className="block">
            <Button className="w-full bg-[#E6007A] hover:bg-[#c4006a] text-white font-medium" size="lg">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}
