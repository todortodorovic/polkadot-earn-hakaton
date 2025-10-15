"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { AuthDialog } from "./auth-dialog"

export function Header() {
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")

  const openLogin = () => {
    setAuthMode("login")
    setAuthOpen(true)
  }

  const openSignup = () => {
    setAuthMode("signup")
    setAuthOpen(true)
  }

  const switchMode = () => {
    setAuthMode(authMode === "login" ? "signup" : "login")
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0d1117]/80 backdrop-blur-xl text-white">
        <div className="container flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center">
                <svg viewBox="0 0 32 32" className="h-8 w-8">
                  <circle cx="16" cy="8" r="3" fill="#E6007A" />
                  <circle cx="24" cy="16" r="3" fill="#E6007A" />
                  <circle cx="16" cy="24" r="3" fill="#E6007A" />
                  <circle cx="8" cy="16" r="3" fill="#E6007A" />
                </svg>
              </div>
              <span className="text-xl font-semibold">Polkadot Earn</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium hover:text-pink-400 transition-colors">
                Grants
              </Link>
              <Link href="/bounties" className="text-sm font-medium hover:text-pink-400 transition-colors">
                Bounties
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-pink-400 transition-colors">
                Projects
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-white hover:text-pink-400 hover:bg-white/10">
              <Search className="h-5 w-5" />
            </Button>
            <Button
              onClick={openLogin}
              variant="outline"
              size="sm"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
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
              Login
            </Button>
            <Button
              onClick={openSignup}
              size="sm"
              className="bg-[#E6007A] hover:bg-[#c4006a] text-white shadow-lg shadow-pink-500/20"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} mode={authMode} onSwitchMode={switchMode} />
    </>
  )
}
