"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatINR } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"

export interface Product {
  id: string
  name: string
  sku?: string
  price: number
  description?: string
}

interface ProductTableProps {
  products: Product[]
  onDelete?: (id: string) => void
}

export function ProductTable({ products, onDelete }: ProductTableProps) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-6">Product</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-6">SKU</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-6">Price</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-6 hidden lg:table-cell">Description</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6">
                    <p className="text-sm font-medium text-foreground">{product.name}</p>
                  </td>
                  <td className="py-4 px-6 text-sm text-muted-foreground">{product.sku || "-"}</td>
                  <td className="py-4 px-6 text-sm text-foreground">{formatINR(product.price)}</td>
                  <td className="py-4 px-6 text-sm text-muted-foreground hidden lg:table-cell">{product.description || "-"}</td>
                  <td className="py-4 px-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover border-border">
                        <DropdownMenuItem asChild className="text-foreground cursor-pointer">
                          <Link href={`/dashboard/products/${product.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive cursor-pointer"
                          onClick={() => onDelete?.(product.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
