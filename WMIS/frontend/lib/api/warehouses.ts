import { api } from "./client"

export type Warehouse = {
  id: string
  name: string
  location?: string
}

type ApiWarehouse = {
  _id: string
  name: string
  location?: string
}

export type WarehouseCreatePayload = {
  name: string
  location?: string
}

function mapWarehouse(w: ApiWarehouse): Warehouse {
  return {
    id: w._id,
    name: w.name,
    location: w.location,
  }
}

export async function getWarehouses() {
  const res = await api.get<ApiWarehouse[]>("/warehouses")
  return res.data.map(mapWarehouse)
}

export async function getWarehouse(id: string) {
  const res = await api.get<ApiWarehouse>(`/warehouses/${id}`)
  return mapWarehouse(res.data)
}

export async function createWarehouse(payload: WarehouseCreatePayload) {
  const res = await api.post<ApiWarehouse>("/warehouses", payload)
  return mapWarehouse(res.data)
}

export async function updateWarehouse(id: string, payload: WarehouseCreatePayload) {
  const res = await api.put<ApiWarehouse>(`/warehouses/${id}`, payload)
  return mapWarehouse(res.data)
}

export async function deleteWarehouse(id: string) {
  await api.delete(`/warehouses/${id}`)
}

