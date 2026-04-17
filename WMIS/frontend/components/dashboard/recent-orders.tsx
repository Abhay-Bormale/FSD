"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatINR } from "@/lib/utils"

const orders = [
  { id: "ORD-001", customer: "Acme Corp", product: "Wireless Headphones", qty: 150, status: "Processing", total: 4500 },
  { id: "ORD-002", customer: "TechStart Inc", product: "USB-C Cables", qty: 500, status: "Shipped", total: 2250 },
  { id: "ORD-003", customer: "Global Retail", product: "Smart Watch", qty: 75, status: "Delivered", total: 11250 },
  { id: "ORD-004", customer: "Metro Electronics", product: "Bluetooth Speaker", qty: 200, status: "Processing", total: 7800 },
  { id: "ORD-005", customer: "City Warehouse", product: "Power Bank", qty: 300, status: "Pending", total: 6000 },
]

const statusColors: Record<string, string> = {
  "Processing": "bg-chart-3/20 text-chart-3 border-chart-3/30",
  "Shipped": "bg-chart-2/20 text-chart-2 border-chart-2/30",
  "Delivered": "bg-primary/20 text-primary border-primary/30",
  "Pending": "bg-muted text-muted-foreground border-muted",
}

export function RecentOrders() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold text-card-foreground">Recent Orders</CardTitle>
        <a href="/dashboard/orders" className="text-sm text-primary hover:text-primary/80 transition-colors">
          View all
        </a>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-6">Order ID</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-6">Customer</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-6 hidden md:table-cell">Product</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-6 hidden sm:table-cell">Qty</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-6">Status</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-6">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium text-foreground">{order.id}</td>
                  <td className="py-4 px-6 text-sm text-muted-foreground">{order.customer}</td>
                  <td className="py-4 px-6 text-sm text-muted-foreground hidden md:table-cell">{order.product}</td>
                  <td className="py-4 px-6 text-sm text-muted-foreground hidden sm:table-cell">{order.qty}</td>
                  <td className="py-4 px-6">
                    <Badge variant="outline" className={statusColors[order.status]}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-foreground text-right">
                    {formatINR(order.total)}
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
