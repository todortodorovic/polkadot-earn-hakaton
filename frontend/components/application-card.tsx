"use client"
import type { Application } from "@/lib/applications-data"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ApplicationDetailDialog } from "@/components/application-detail-dialog"

interface ApplicationCardProps {
  application: Application
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  const [status, setStatus] = useState(application.status)
  const [showDetail, setShowDetail] = useState(false)

  const handleApprove = () => {
    setStatus("approved")
  }

  const handleReject = () => {
    setStatus("rejected")
  }

  const getStatusColor = () => {
    switch (status) {
      case "approved":
        return "bg-green-500/10 border-green-500/20 text-green-400"
      case "rejected":
        return "bg-red-500/10 border-red-500/20 text-red-400"
      default:
        return "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "approved":
        return "Approved"
      case "rejected":
        return "Rejected"
      default:
        return "Pending Review"
    }
  }

  return (
    <>
      <div className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-purple-900/10 to-pink-900/10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold">{application.projectTitle}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor()}`}>
                {getStatusText()}
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-2">{application.oneLiner}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>By {application.applicantName}</span>
              <span>•</span>
              <span>{new Date(application.submittedAt).toLocaleDateString()}</span>
              <span>•</span>
              <span className="text-pink-400 font-medium">{application.compensation} USDC</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setShowDetail(true)}
            variant="outline"
            className="border-white/20 bg-white/5 hover:bg-white/10 text-white"
          >
            View Details
          </Button>
          {status === "pending" && (
            <>
              <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700 text-white">
                Approve
              </Button>
              <Button
                onClick={handleReject}
                variant="outline"
                className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"
              >
                Reject
              </Button>
            </>
          )}
        </div>
      </div>

      <ApplicationDetailDialog
        application={application}
        open={showDetail}
        onOpenChange={setShowDetail}
        currentStatus={status}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </>
  )
}
