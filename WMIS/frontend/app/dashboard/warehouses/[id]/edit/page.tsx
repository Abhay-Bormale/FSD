"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/dashboard/header"
import { WarehouseForm } from "@/components/dashboard/warehouse-form"
import { getWarehouse, type Warehouse as ApiWarehouse } from "@/lib/api/warehouses"

export default function EditWarehousePage({
  params,
}: {
  params: { id: string }
}) {
  const [warehouse, setWarehouse] = useState<ApiWarehouse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await getWarehouse(params.id)
        setWarehouse(data)
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load warehouse"
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    void load()
  }, [params.id])

  return (
    <div className="flex flex-col h-full">
      <Header title="Edit Warehouse" description="Update warehouse information" />
      <div className="flex-1 p-6 overflow-y-auto">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading warehouse...</p>
        ) : error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : warehouse ? (
          <WarehouseForm mode="edit" initialData={warehouse} />
        ) : (
          <p className="text-sm text-destructive">Warehouse not found</p>
        )}
      </div>
    </div>
  )
}

