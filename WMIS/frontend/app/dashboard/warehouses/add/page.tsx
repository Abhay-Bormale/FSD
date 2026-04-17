"use client"

import { Header } from "@/components/dashboard/header"
import { WarehouseForm } from "@/components/dashboard/warehouse-form"

export default function AddWarehousePage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Add Warehouse" description="Create a new warehouse location" />
      <div className="flex-1 p-6 overflow-y-auto">
        <WarehouseForm mode="add" />
      </div>
    </div>
  )
}

