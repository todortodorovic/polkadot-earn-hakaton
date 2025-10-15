"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"

interface GrantsFilterProps {
  onSearchChange: (search: string) => void
  onCategoryChange: (category: string | null) => void
  selectedCategory: string | null
}

const categories = ["All", "Infrastructure", "DeFi", "Education", "Gaming", "Security", "Regional"]

export function GrantsFilter({ onSearchChange, onCategoryChange, selectedCategory }: GrantsFilterProps) {
  const [search, setSearch] = useState("")

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onSearchChange(value)
  }

  const handleCategoryClick = (category: string) => {
    const newCategory = category === "All" ? null : category
    onCategoryChange(newCategory)
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search grants..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 pr-10"
        />
        {search && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={() => handleSearchChange("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category || (category === "All" && !selectedCategory) ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/90 transition-colors"
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
    </div>
  )
}
