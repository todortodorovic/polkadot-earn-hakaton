"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: "login" | "signup"
  onSwitchMode: () => void
}

export function AuthDialog({ open, onOpenChange, mode, onSwitchMode }: AuthDialogProps) {
  const isLogin = mode === "login"
  const [selectedRole, setSelectedRole] = useState<"user" | "admin">("user")

  const handleAuth = () => {
    localStorage.setItem("userRole", selectedRole)
    onOpenChange(false)

    if (selectedRole === "admin") {
      window.location.href = "/admin"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#1a1f2e] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {isLogin ? "Welcome back" : "Create your account"}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-400">
            {isLogin ? "Sign in to access your Polkadot Earn account" : "Join Polkadot Earn to start contributing"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-3">
            <Label className="text-sm text-gray-300">I am a</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedRole("user")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedRole === "user"
                    ? "border-pink-500 bg-pink-500/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="font-medium">User</span>
                  <span className="text-xs text-gray-400 text-center">Apply for grants and bounties</span>
                </div>
              </button>
              <button
                onClick={() => setSelectedRole("admin")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedRole === "admin"
                    ? "border-pink-500 bg-pink-500/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span className="font-medium">Admin</span>
                  <span className="text-xs text-gray-400 text-center">Review and approve applications</span>
                </div>
              </button>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full h-12 border-white/20 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm"
            onClick={handleAuth}
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#1a1f2e] px-2 text-gray-400">Or continue with email</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-pink-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-pink-500"
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-sm text-gray-300">
                  Confirm Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-pink-500"
                />
              </div>
            )}

            {isLogin && (
              <div className="flex justify-end">
                <button className="text-sm text-pink-400 hover:text-pink-300">Forgot password?</button>
              </div>
            )}

            <Button
              onClick={handleAuth}
              className="w-full h-11 bg-[#E6007A] hover:bg-[#c4006a] text-white shadow-lg shadow-pink-500/20"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </div>

          <div className="text-center text-sm text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={onSwitchMode} className="text-pink-400 hover:text-pink-300 font-medium">
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
