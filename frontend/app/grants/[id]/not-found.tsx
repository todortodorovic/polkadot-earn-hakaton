import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="container py-16 flex-1 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
            <h2 className="text-2xl font-bold">Grant Not Found</h2>
            <p className="text-muted-foreground">The grant you're looking for doesn't exist or has been removed.</p>
          </div>

          <Link href="/">
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
              Browse All Grants
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
