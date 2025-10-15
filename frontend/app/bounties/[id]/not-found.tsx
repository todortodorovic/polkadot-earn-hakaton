import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <h1 className="text-6xl font-bold text-[#E6007A]">404</h1>
          <h2 className="text-2xl font-semibold">Bounty Not Found</h2>
          <p className="text-muted-foreground">The bounty you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="bg-[#E6007A] hover:bg-[#c4006a]">
            <Link href="/bounties">Back to Bounties</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
