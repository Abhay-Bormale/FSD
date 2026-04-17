"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Warehouse, MapPin, Plus, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteWarehouse, getWarehouses, type Warehouse as ApiWarehouse } from "@/lib/api/warehouses"

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState<ApiWarehouse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadWarehouses = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getWarehouses()
      setWarehouses(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load warehouses"
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadWarehouses()
  }, [])

  const handleDelete = async (id: string) => {
    const ok = window.confirm("Delete this warehouse?")
    if (!ok) return
    await deleteWarehouse(id)
    await loadWarehouses()
  }

  return (
    <div className="flex flex-col h-full">
      <Header title="Warehouses" description="Manage your warehouse locations" />
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading warehouses...</p>
        ) : error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary">
                      <Warehouse className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Warehouses</p>
                      <p className="text-2xl font-semibold text-foreground">
                        {warehouses.length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/dashboard/warehouses/add">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Warehouse
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {warehouses.map((warehouse) => (
                <Card key={warehouse.id} className="bg-card border-border">
                  <CardHeader className="flex flex-row items-start justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-semibold text-foreground">
                        {warehouse.name}
                      </CardTitle>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {warehouse.location || "-"}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-popover border-border"
                      >
                        <DropdownMenuItem asChild className="text-foreground cursor-pointer">
                          <Link href={`/dashboard/warehouses/${warehouse.id}/edit`}>
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive cursor-pointer"
                          onClick={() => handleDelete(warehouse.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Location: {warehouse.location || "N/A"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
