"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/dashboard/header"
import { ProductTable } from "@/components/dashboard/product-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { deleteProduct, getProducts, type Product as ApiProduct } from "@/lib/api/products"

export default function InventoryPage() {
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [products, setProducts] = useState<ApiProduct[]>([])

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return products
    return products.filter((product) => {
      const sku = product.sku ?? ""
      return (
        product.name.toLowerCase().includes(q) ||
        sku.toLowerCase().includes(q)
      )
    })
  }, [products, search])

  const loadProducts = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getProducts({ limit: 100, skip: 0 })
      setProducts(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load products"
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = async (id: string) => {
    const ok = window.confirm("Delete this product?")
    if (!ok) return
    await deleteProduct(id)
    await loadProducts()
  }

  return (
    <div className="flex flex-col h-full">
      <Header title="Inventory" description="Manage your product inventory" />
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative flex-1">
            <Input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-3 bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex gap-2 shrink-0">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/dashboard/products/add">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Link>
            </Button>
          </div>
        </div>

        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading products...</p>
        ) : error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : (
          <ProductTable products={filteredProducts} onDelete={handleDelete} />
        )}
      </div>
    </div>
  )
}
