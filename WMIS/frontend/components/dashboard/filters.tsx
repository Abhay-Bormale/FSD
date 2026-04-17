"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, SlidersHorizontal, X } from "lucide-react"

interface FiltersProps {
  searchValue: string
  onSearchChange: (value: string) => void
  categoryFilter: string
  onCategoryChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
  warehouseFilter: string
  onWarehouseChange: (value: string) => void
  onClearFilters: () => void
}

const categories = [
  "All Categories",
  "Electronics",
  "Accessories",
  "Audio",
  "Wearables",
  "Cables",
]

const statuses = ["All Status", "In Stock", "Low Stock", "Out of Stock"]

const warehouses = [
  "All Warehouses",
  "Main Warehouse",
  "East Coast Hub",
  "West Coast Hub",
  "Central Distribution",
]

export function Filters({
  searchValue,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  statusFilter,
  onStatusChange,
  warehouseFilter,
  onWarehouseChange,
  onClearFilters,
}: FiltersProps) {
  const hasActiveFilters =
    searchValue ||
    categoryFilter !== "All Categories" ||
    statusFilter !== "All Status" ||
    warehouseFilter !== "All Warehouses"

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search products..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 bg-input border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <Select value={categoryFilter} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[160px] bg-input border-border text-foreground">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {categories.map((category) => (
              <SelectItem key={category} value={category} className="text-foreground">
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="w-[140px] bg-input border-border text-foreground">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {statuses.map((status) => (
              <SelectItem key={status} value={status} className="text-foreground">
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={warehouseFilter} onValueChange={onWarehouseChange}>
          <SelectTrigger className="w-[180px] bg-input border-border text-foreground hidden lg:flex">
            <SelectValue placeholder="Warehouse" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {warehouses.map((warehouse) => (
              <SelectItem key={warehouse} value={warehouse} className="text-foreground">
                {warehouse}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
