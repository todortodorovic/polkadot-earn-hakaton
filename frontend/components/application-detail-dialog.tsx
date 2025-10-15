"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Application } from "@/lib/applications-data"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface ApplicationDetailDialogProps {
  application: Application
  open: boolean
  onOpenChange: (open: boolean) => void
  currentStatus: "pending" | "approved" | "rejected"
  onApprove: () => void
  onReject: () => void
}

export function ApplicationDetailDialog({
  application,
  open,
  onOpenChange,
  currentStatus,
  onApprove,
  onReject,
}: ApplicationDetailDialogProps) {
  const handleApprove = () => {
    onApprove()
    onOpenChange(false)
  }

  const handleReject = () => {
    onReject()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#1a1f2e] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{application.projectTitle}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">One-Liner</h3>
            <p className="text-lg">{application.oneLiner}</p>
          </div>

          <Separator className="bg-white/10" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">Applicant</h3>
              <p>{application.applicantName}</p>
              <p className="text-sm text-gray-400">{application.applicantEmail}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">Compensation</h3>
              <p className="text-2xl font-bold text-pink-400">{application.compensation} USDC</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">Telegram</h3>
              <p>@{application.telegram}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">Timeline</h3>
              <p>{application.timeline}</p>
            </div>
          </div>

          <Separator className="bg-white/10" />

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Wallet Address</h3>
            <p className="font-mono text-sm bg-white/5 p-3 rounded border border-white/10 break-all">
              {application.walletAddress}
            </p>
          </div>

          <Separator className="bg-white/10" />

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Project Description</h3>
            <p className="text-gray-300 leading-relaxed">{application.projectDescription}</p>
          </div>

          <Separator className="bg-white/10" />

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-4">Milestones</h3>
            <div className="space-y-4">
              {application.milestones.map((milestone, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">
                      {index + 1}. {milestone.title}
                    </h4>
                    <span className="text-sm text-gray-400">{milestone.duration}</span>
                  </div>
                  <p className="text-sm text-gray-400">{milestone.description}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-white/10" />

          <div className="text-sm text-gray-400">Submitted on {new Date(application.submittedAt).toLocaleString()}</div>

          {currentStatus === "pending" && (
            <div className="flex gap-3 pt-4">
              <Button onClick={handleApprove} className="flex-1 bg-green-600 hover:bg-green-700 text-white h-12">
                Approve Application
              </Button>
              <Button
                onClick={handleReject}
                variant="outline"
                className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10 h-12 bg-transparent"
              >
                Reject Application
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
