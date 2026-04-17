import { api } from "./client"

export type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "COMPLETED" | "CANCELLED"

export type OrderItem = {
  productId: string
  quantity: number
  unitPrice: number
}

export type Order = {
  id: string
  customerId: string
  totalAmount: number
  status: OrderStatus
  createdAt: string
  warehouseName: string
  itemsCount: number
  items: OrderItem[]
}

type ApiOrder = {
  _id: string
  userId: string
  warehouseId: { _id: string; name: string }
  items: { productId: { _id: string; name: string }; quantity: number; unitPrice: number }[]
  totalAmount: number
  status: OrderStatus
  createdAt: string
}

function mapOrder(o: ApiOrder): Order {
  return {
    id: o._id,
    customerId: o.userId,
    totalAmount: o.totalAmount,
    status: o.status,
    createdAt: o.createdAt,
    warehouseName: o.warehouseId?.name ?? "Warehouse",
    itemsCount: o.items.reduce((sum, it) => sum + it.quantity, 0),
    items: o.items.map((it) => ({
      productId: it.productId?._id ?? "",
      quantity: it.quantity,
      unitPrice: it.unitPrice,
    })),
  }
}

export async function getOrders() {
  const res = await api.get<ApiOrder[]>("/orders")
  return res.data.map(mapOrder)
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  const res = await api.patch<ApiOrder>(`/orders/${id}/status`, { status })
  return mapOrder(res.data)
}

