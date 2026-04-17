import { Header } from "@/components/dashboard/header"
import { ProductForm } from "@/components/dashboard/product-form"

export default function AddProductPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Add Product" description="Add a new product to your inventory" />
      <div className="flex-1 p-6 overflow-y-auto">
        <ProductForm mode="add" />
      </div>
    </div>
  )
}
