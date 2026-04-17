"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/dashboard/header"
import { ProductForm } from "@/components/dashboard/product-form"
import { getProduct, type Product as ApiProduct } from "@/lib/api/products"

export default function EditProductPage({
  params,
}: {
  params: { id: string }
}) {
  const [product, setProduct] = useState<ApiProduct | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await getProduct(params.id)
        setProduct(data)
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load product"
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    void load()
  }, [params.id])

  return (
    <div className="flex flex-col h-full">
      <Header title="Edit Product" description="Update product information" />
      <div className="flex-1 p-6 overflow-y-auto">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading product...</p>
        ) : error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : product ? (
          <ProductForm mode="edit" initialData={product} />
        ) : (
          <p className="text-sm text-destructive">Product not found</p>
        )}
      </div>
    </div>
  )
}
