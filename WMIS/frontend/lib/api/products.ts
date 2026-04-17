import { api } from "./client"

export type Product = {
  id: string
  name: string
  sku?: string
  price: number
  description?: string
}

type ApiProduct = {
  _id: string
  name: string
  sku?: string
  price?: number
  description?: string
}

export type ProductCreatePayload = {
  name: string
  sku?: string
  price?: number
  description?: string
}

function mapProduct(p: ApiProduct): Product {
  return {
    id: p._id,
    name: p.name,
    sku: p.sku,
    price: typeof p.price === "number" ? p.price : 0,
    description: p.description,
  }
}

export async function getProducts(params?: { limit?: number; skip?: number }) {
  const res = await api.get<ApiProduct[]>("/products", { params })
  return res.data.map(mapProduct)
}

export async function getProduct(id: string) {
  const res = await api.get<ApiProduct>(`/products/${id}`)
  return mapProduct(res.data)
}

export async function createProduct(payload: ProductCreatePayload) {
  const res = await api.post<ApiProduct>("/products", payload)
  return mapProduct(res.data)
}

export async function updateProduct(id: string, payload: ProductCreatePayload) {
  const res = await api.put<ApiProduct>(`/products/${id}`, payload)
  return mapProduct(res.data)
}

export async function deleteProduct(id: string) {
  await api.delete(`/products/${id}`)
}

