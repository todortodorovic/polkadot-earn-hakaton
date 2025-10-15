import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-8">Grant not found</p>
        <Button asChild className="bg-[#E6007A] hover:bg-[#c4006a]">
          <Link href="/admin">Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}
