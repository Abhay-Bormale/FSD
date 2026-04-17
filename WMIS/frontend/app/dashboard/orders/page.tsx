"use client"

import { useEffect, useMemo, useState } from "react"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Pagination } from "@/components/dashboard/pagination"
import { 
  Search, 
  MoreHorizontal, 
  Eye, 
  Truck, 
  CheckCircle, 
  XCircle,
  Package,
  Clock,
  ShoppingCart,
  IndianRupee
} from "lucide-react"
import { formatINR } from "@/lib/utils"
import { getOrders, updateOrderStatus, type Order as ApiOrder, type OrderStatus } from "@/lib/api/orders"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const statusColors: Record<string, string> = {
  "Pending": "bg-muted text-muted-foreground border-muted",
  "Processing": "bg-chart-3/20 text-chart-3 border-chart-3/30",
  "Shipped": "bg-chart-2/20 text-chart-2 border-chart-2/30",
  "Delivered": "bg-primary/20 text-primary border-primary/30",
  "Cancelled": "bg-destructive/20 text-destructive border-destructive/30",
}

const statusIcons: Record<string, React.ElementType> = {
  "Pending": Clock,
  "Processing": Package,
  "Shipped": Truck,
  "Delivered": CheckCircle,
  "Cancelled": XCircle,
}

export default function OrdersPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [orders, setOrders] = useState<ApiOrder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<ApiOrder | null>(null)

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.warehouseName.toLowerCase().includes(search.toLowerCase())
      const matchesStatus =
        statusFilter === "All Status" || order.status === statusFilter.toUpperCase()
      return matchesSearch && matchesStatus
    })
  }, [orders, search, statusFilter])

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredOrders.slice(start, start + pageSize)
  }, [filteredOrders, currentPage, pageSize])

  const totalPages = Math.ceil(filteredOrders.length / pageSize)

  // Stats calculations
  const totalOrders = orders.length
  const pendingOrders = orders.filter(o => o.status === "PENDING" || o.status === "PROCESSING").length
  const totalRevenue = orders.filter(o => o.status !== "CANCELLED").reduce((sum, o) => sum + o.totalAmount, 0)
  const deliveredOrders = orders.filter(o => o.status === "COMPLETED").length

  const loadOrders = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getOrders()
      setOrders(data)
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to load orders"
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadOrders()
  }, [])

  const handleUpdateStatus = async (id: string, status: OrderStatus) => {
    await updateOrderStatus(id, status)
    await loadOrders()
  }

  return (
    <div className="flex flex-col h-full">
      <Header title="Orders" description="Track and manage customer orders" />
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary">
                  <ShoppingCart className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-semibold text-foreground">{totalOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-chart-3">
                  <Clock className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending/Processing</p>
                  <p className="text-2xl font-semibold text-foreground">{pendingOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-chart-2">
                  <CheckCircle className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Delivered</p>
                  <p className="text-2xl font-semibold text-foreground">{deliveredOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-chart-4">
                  <IndianRupee className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-semibold text-foreground">{formatINR(totalRevenue)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-9 bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <Select value={statusFilter} onValueChange={(value) => {
            setStatusFilter(value)
            setCurrentPage(1)
          }}>
            <SelectTrigger className="w-[160px] bg-input border-border text-foreground">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {["All Status", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((status) => (
                <SelectItem key={status} value={status} className="text-foreground">
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Orders Table */}
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading orders...</p>
        ) : error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : (
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-6">Order ID</th>
                      <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-6">Warehouse</th>
                      <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-6 hidden md:table-cell">Created At</th>
                      <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-6 hidden lg:table-cell">Items</th>
                      <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-6">Total</th>
                      <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-6">Status</th>
                      <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {paginatedOrders.map((order) => {
                      const uiStatus =
                        order.status === "PENDING" ? "Pending" :
                        order.status === "PROCESSING" ? "Processing" :
                        order.status === "SHIPPED" ? "Shipped" :
                        order.status === "COMPLETED" ? "Delivered" :
                        "Cancelled"
                      const StatusIcon = statusIcons[uiStatus]
                      return (
                        <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                          <td className="py-4 px-6 text-sm font-medium text-foreground">{order.id}</td>
                          <td className="py-4 px-6">
                            <p className="text-sm font-medium text-foreground">{order.warehouseName}</p>
                          </td>
                          <td className="py-4 px-6 text-sm text-muted-foreground hidden md:table-cell">
                            {new Date(order.createdAt).toLocaleString("en-IN")}
                          </td>
                          <td className="py-4 px-6 text-sm text-foreground hidden lg:table-cell">{order.itemsCount}</td>
                          <td className="py-4 px-6 text-sm font-medium text-foreground">{formatINR(order.totalAmount)}</td>
                          <td className="py-4 px-6">
                            <Badge
                              variant="outline"
                              className={`${statusColors[uiStatus]} flex items-center gap-1 w-fit`}
                            >
                              <StatusIcon className="h-3 w-3" />
                              {uiStatus}
                            </Badge>
                          </td>
                          <td className="py-4 px-6 text-right">
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
                              <DropdownMenuContent align="end" className="bg-popover border-border">
                                <DropdownMenuItem
                                  className="text-foreground cursor-pointer"
                                  onClick={() => setSelectedOrder(order)}
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-foreground cursor-pointer"
                                  onClick={() => handleUpdateStatus(order.id, "PROCESSING")}
                                >
                                  <Truck className="mr-2 h-4 w-4" />
                                  Mark Processing
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-foreground cursor-pointer"
                                  onClick={() => handleUpdateStatus(order.id, "COMPLETED")}
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Mark Delivered
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive cursor-pointer"
                                  onClick={() => handleUpdateStatus(order.id, "CANCELLED")}
                                >
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Cancel Order
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
          <DialogContent className="bg-popover border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Order Details</DialogTitle>
              <DialogDescription>
                {selectedOrder ? `Order ${selectedOrder.id}` : ""}
              </DialogDescription>
            </DialogHeader>

            {selectedOrder && (
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground">
                  <div><span className="font-medium text-foreground">Warehouse:</span> {selectedOrder.warehouseName}</div>
                  <div><span className="font-medium text-foreground">Created:</span> {new Date(selectedOrder.createdAt).toLocaleString("en-IN")}</div>
                  <div><span className="font-medium text-foreground">Status:</span> {selectedOrder.status}</div>
                  <div><span className="font-medium text-foreground">Total:</span> {formatINR(selectedOrder.totalAmount)}</div>
                </div>

                <div className="border-t border-border pt-3">
                  <p className="text-sm font-medium text-foreground mb-2">Items</p>
                  <div className="space-y-2">
                    {selectedOrder.items.map((it, idx) => (
                      <div key={`${it.productId}-${idx}`} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Product: {it.productId || "-"}</span>
                        <span className="text-foreground">Qty: {it.quantity}</span>
                        <span className="text-foreground">{formatINR(it.unitPrice)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredOrders.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size)
            setCurrentPage(1)
          }}
        />
      </div>
    </div>
  )
}
