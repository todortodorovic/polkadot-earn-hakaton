"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { X, CheckCircle2 } from "lucide-react"
import type { Grant } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { apiClient } from "@/lib/api/client"

interface ApplicationDialogProps {
  grant: Grant
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface FormData {
  projectTitle: string
  oneLiner: string
  compensation: string
  telegram: string
  walletAddress: string
  projectDescription: string
  teamInfo: string
  timeline: string
  milestone1: string
  milestone2: string
  milestone3: string
}

export function ApplicationDialog({ grant, open, onOpenChange }: ApplicationDialogProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    projectTitle: "",
    oneLiner: "",
    compensation: "",
    telegram: "",
    walletAddress: "",
    projectDescription: "",
    teamInfo: "",
    timeline: "",
    milestone1: "",
    milestone2: "",
    milestone3: "",
  })

  const steps = [
    { number: 1, name: "Basics" },
    { number: 2, name: "Details" },
    { number: 3, name: "Milestones" },
  ]

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      const milestones = [
        formData.milestone1 && { title: "Milestone 1", description: formData.milestone1, duration: "", amount: 0 },
        formData.milestone2 && { title: "Milestone 2", description: formData.milestone2, duration: "", amount: 0 },
        formData.milestone3 && { title: "Milestone 3", description: formData.milestone3, duration: "", amount: 0 },
      ].filter(Boolean) as any[]

      // Map frontend mock grant ID to backend grant ID
      const grantIdMap: Record<string, string> = {
        "1": "infrastructure-grant",
        "2": "dapp-development-grant",
        "3": "research-grant",
        "4": "community-&-education-grant",
        "5": "security-&-auditing-grant",
        "6": "ux/ui-design-grant",
        "7": "cross-chain-integration-grant",
        "8": "developer-tools-grant",
      }

      const backendGrantId = grantIdMap[grant.id] || grant.id

      await apiClient.createApplication({
        grantId: backendGrantId,
        projectTitle: formData.projectTitle,
        projectDescription: formData.projectDescription,
        teamInfo: formData.teamInfo || undefined,
        milestones,
        requestedAmount: parseFloat(formData.compensation),
        walletAddress: formData.walletAddress,
      })

      setIsSubmitted(true)
    } catch (error: any) {
      alert('Failed to submit application: ' + (error.message || 'Unknown error'))
    }
  }

  const handleClose = () => {
    setCurrentStep(1)
    setIsSubmitted(false)
    setFormData({
      projectTitle: "",
      oneLiner: "",
      compensation: "",
      telegram: "",
      walletAddress: "",
      projectDescription: "",
      teamInfo: "",
      timeline: "",
      milestone1: "",
      milestone2: "",
      milestone3: "",
    })
    onOpenChange(false)
  }

  const isStep1Valid = formData.projectTitle && formData.oneLiner && formData.telegram && formData.walletAddress
  const isStep2Valid = formData.projectDescription && formData.teamInfo
  const isStep3Valid = formData.milestone1

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        {isSubmitted ? (
          <div className="p-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Application Submitted!</h2>
              <p className="text-muted-foreground">
                Your application for <span className="font-medium text-foreground">{grant.title}</span> has been
                submitted successfully. The team will review your application and get back to you within{" "}
                {grant.avgResponseTime.toLowerCase()}.
              </p>
            </div>
            <Button
              onClick={handleClose}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="p-6 pb-4 border-b">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <DialogTitle className="text-2xl">Grant Application</DialogTitle>
                  <p className="text-sm text-muted-foreground">
                    If you're working on a project that will help the sponsor's ecosystem grow, apply with your proposal
                    here and we'll respond soon!
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Step Indicators */}
              <div className="flex items-center gap-4 pt-6">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold transition-colors",
                          currentStep >= step.number
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-muted-foreground/30 text-muted-foreground",
                        )}
                      >
                        {step.number}
                      </div>
                      <span
                        className={cn(
                          "font-medium transition-colors",
                          currentStep >= step.number ? "text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {step.name}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={cn(
                          "h-0.5 flex-1 transition-colors",
                          currentStep > step.number ? "bg-primary" : "bg-muted-foreground/30",
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>
            </DialogHeader>

            <div className="p-6 space-y-6">
              {/* Step 1: Basics */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="projectTitle">
                      Project Title <span className="text-destructive">*</span>
                    </Label>
                    <p className="text-sm text-muted-foreground">What should we call your project?</p>
                    <Input
                      id="projectTitle"
                      placeholder="Project Title"
                      value={formData.projectTitle}
                      onChange={(e) => handleInputChange("projectTitle", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="oneLiner">
                      One-Liner Description <span className="text-destructive">*</span>
                    </Label>
                    <p className="text-sm text-muted-foreground">Describe your idea in one sentence.</p>
                    <Input
                      id="oneLiner"
                      placeholder="Sum up your project in one sentence"
                      value={formData.oneLiner}
                      onChange={(e) => handleInputChange("oneLiner", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="compensation">
                      What's the compensation you require to complete this fully?{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground">
                        <span className="text-sm font-medium">{grant.currency}</span>
                      </div>
                      <Input
                        id="compensation"
                        type="number"
                        placeholder="0"
                        className="pl-20"
                        value={formData.compensation}
                        onChange={(e) => handleInputChange("compensation", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telegram">
                      Your Telegram username <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex gap-2">
                      <div className="flex items-center px-3 bg-muted rounded-md border">
                        <span className="text-sm text-muted-foreground">t.me/</span>
                      </div>
                      <Input
                        id="telegram"
                        placeholder="username"
                        className="flex-1"
                        value={formData.telegram}
                        onChange={(e) => handleInputChange("telegram", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="walletAddress">
                      Your Polkadot Wallet Address <span className="text-destructive">*</span>
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      This is where you will receive your rewards if you win.{" "}
                      <span className="font-medium">Make sure this address can accept both USDT & USDC.</span>
                    </p>
                    <Input
                      id="walletAddress"
                      placeholder="Add your Polkadot wallet address"
                      value={formData.walletAddress}
                      onChange={(e) => handleInputChange("walletAddress", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="projectDescription">
                      Project Description <span className="text-destructive">*</span>
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Provide a detailed description of your project. What problem does it solve? What makes it unique?
                    </p>
                    <Textarea
                      id="projectDescription"
                      placeholder="Describe your project in detail..."
                      rows={6}
                      value={formData.projectDescription}
                      onChange={(e) => handleInputChange("projectDescription", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="teamInfo">
                      Team Information <span className="text-destructive">*</span>
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Tell us about your team. Who are the key members and what are their relevant experiences?
                    </p>
                    <Textarea
                      id="teamInfo"
                      placeholder="Describe your team and their experience..."
                      rows={6}
                      value={formData.teamInfo}
                      onChange={(e) => handleInputChange("teamInfo", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeline">Expected Timeline</Label>
                    <p className="text-sm text-muted-foreground">
                      How long do you estimate it will take to complete this project?
                    </p>
                    <Input
                      id="timeline"
                      placeholder="e.g., 3 months"
                      value={formData.timeline}
                      onChange={(e) => handleInputChange("timeline", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Milestones */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Project Milestones</h3>
                    <p className="text-sm text-muted-foreground">
                      Break down your project into key milestones. This helps us understand your development plan.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="milestone1">
                      Milestone 1 <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="milestone1"
                      placeholder="Describe the first major milestone..."
                      rows={3}
                      value={formData.milestone1}
                      onChange={(e) => handleInputChange("milestone1", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="milestone2">Milestone 2</Label>
                    <Textarea
                      id="milestone2"
                      placeholder="Describe the second major milestone..."
                      rows={3}
                      value={formData.milestone2}
                      onChange={(e) => handleInputChange("milestone2", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="milestone3">Milestone 3</Label>
                    <Textarea
                      id="milestone3"
                      placeholder="Describe the third major milestone..."
                      rows={3}
                      value={formData.milestone3}
                      onChange={(e) => handleInputChange("milestone3", e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer with navigation buttons */}
            <div className="p-6 pt-0 flex items-center justify-between border-t">
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                Back
              </Button>

              {currentStep < 3 ? (
                <Button
                  onClick={handleNext}
                  disabled={(currentStep === 1 && !isStep1Valid) || (currentStep === 2 && !isStep2Valid)}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!isStep3Valid}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                >
                  Submit Application
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
