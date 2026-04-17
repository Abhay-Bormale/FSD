"use client"

import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { useState } from "react"
import { Download, TrendingUp, TrendingDown, IndianRupee, Package, ShoppingCart, Warehouse } from "lucide-react"
import { formatINR } from "@/lib/utils"

const revenueData = [
  { name: "Jan", revenue: 45000, orders: 320 },
  { name: "Feb", revenue: 52000, orders: 380 },
  { name: "Mar", revenue: 48000, orders: 350 },
  { name: "Apr", revenue: 61000, orders: 420 },
  { name: "May", revenue: 55000, orders: 390 },
  { name: "Jun", revenue: 67000, orders: 460 },
  { name: "Jul", revenue: 72000, orders: 510 },
  { name: "Aug", revenue: 69000, orders: 480 },
  { name: "Sep", revenue: 78000, orders: 540 },
  { name: "Oct", revenue: 85000, orders: 590 },
  { name: "Nov", revenue: 92000, orders: 640 },
  { name: "Dec", revenue: 98000, orders: 680 },
]

const categoryData = [
  { name: "Electronics", value: 35, color: "oklch(0.75 0.18 160)" },
  { name: "Audio", value: 25, color: "oklch(0.65 0.18 220)" },
  { name: "Accessories", value: 20, color: "oklch(0.70 0.15 50)" },
  { name: "Wearables", value: 12, color: "oklch(0.60 0.20 300)" },
  { name: "Cables", value: 8, color: "oklch(0.55 0.22 25)" },
]

const warehousePerformance = [
  { name: "Main Warehouse", inbound: 4200, outbound: 3800, efficiency: 92 },
  { name: "East Coast Hub", inbound: 2800, outbound: 2600, efficiency: 88 },
  { name: "West Coast Hub", inbound: 3500, outbound: 3200, efficiency: 90 },
  { name: "Central Dist.", inbound: 1800, outbound: 1700, efficiency: 85 },
]

const topProducts = [
  { name: "Wireless Headphones", sales: 2450, revenue: 195510 },
  { name: "Smart Watch Pro", sales: 1820, revenue: 545454 },
  { name: "USB-C Cable 2m", sales: 5200, revenue: 67548 },
  { name: "Power Bank 20K", sales: 1650, revenue: 82335 },
  { name: "Wireless Earbuds", sales: 3100, revenue: 464690 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("12months")

  return (
    <div className="flex flex-col h-full">
      <Header title="Analytics" description="Insights and performance metrics" />
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px] bg-input border-border text-foreground">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="7days" className="text-foreground">Last 7 Days</SelectItem>
                <SelectItem value="30days" className="text-foreground">Last 30 Days</SelectItem>
                <SelectItem value="3months" className="text-foreground">Last 3 Months</SelectItem>
                <SelectItem value="12months" className="text-foreground">Last 12 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" className="border-border text-foreground">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-semibold text-foreground">{formatINR(822000)}</p>
                  <div className="flex items-center gap-1 text-sm">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-primary">+18.2%</span>
                    <span className="text-muted-foreground">vs last year</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-primary">
                  <IndianRupee className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-semibold text-foreground">5,760</p>
                  <div className="flex items-center gap-1 text-sm">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-primary">+12.5%</span>
                    <span className="text-muted-foreground">vs last year</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-chart-2">
                  <ShoppingCart className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Products Sold</p>
                  <p className="text-2xl font-semibold text-foreground">48,250</p>
                  <div className="flex items-center gap-1 text-sm">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-primary">+8.7%</span>
                    <span className="text-muted-foreground">vs last year</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-chart-3">
                  <Package className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Avg. Order Value</p>
                  <p className="text-2xl font-semibold text-foreground">{formatINR(142.7)}</p>
                  <div className="flex items-center gap-1 text-sm">
                    <TrendingDown className="h-4 w-4 text-destructive" />
                    <span className="text-destructive">-2.3%</span>
                    <span className="text-muted-foreground">vs last year</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-chart-4">
                  <Warehouse className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-foreground">Revenue & Orders Trend</CardTitle>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-chart-2" />
                <span className="text-muted-foreground">Orders</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.75 0.18 160)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="oklch(0.75 0.18 160)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.01 250)" vertical={false} />
                  <XAxis dataKey="name" stroke="oklch(0.65 0 0)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="oklch(0.65 0 0)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `₹${value / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.16 0.01 250)",
                      border: "1px solid oklch(0.28 0.01 250)",
                      borderRadius: "8px",
                      color: "oklch(0.95 0 0)",
                    }}
                    formatter={(value: number, name: string) => [
                      name === "revenue" ? formatINR(value) : value,
                      name === "revenue" ? "Revenue" : "Orders"
                    ]}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="oklch(0.75 0.18 160)" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                  <Line type="monotone" dataKey="orders" stroke="oklch(0.65 0.18 220)" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Distribution */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-foreground">Sales by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(0.16 0.01 250)",
                        border: "1px solid oklch(0.28 0.01 250)",
                        borderRadius: "8px",
                        color: "oklch(0.95 0 0)",
                      }}
                      formatter={(value: number) => [`${value}%`, "Share"]}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      formatter={(value) => <span className="text-muted-foreground text-sm">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Warehouse Performance */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-foreground">Warehouse Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={warehousePerformance} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.01 250)" horizontal={true} vertical={false} />
                    <XAxis type="number" stroke="oklch(0.65 0 0)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis type="category" dataKey="name" stroke="oklch(0.65 0 0)" fontSize={11} tickLine={false} axisLine={false} width={90} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(0.16 0.01 250)",
                        border: "1px solid oklch(0.28 0.01 250)",
                        borderRadius: "8px",
                        color: "oklch(0.95 0 0)",
                      }}
                    />
                    <Bar dataKey="inbound" fill="oklch(0.75 0.18 160)" radius={[0, 4, 4, 0]} name="Inbound" />
                    <Bar dataKey="outbound" fill="oklch(0.65 0.18 220)" radius={[0, 4, 4, 0]} name="Outbound" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Products */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-foreground">Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-6">Product</th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-6">Units Sold</th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-6">Revenue</th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-6">Performance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {topProducts.map((product, index) => (
                    <tr key={product.name} className="hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary text-sm font-medium">
                            {index + 1}
                          </span>
                          <span className="text-sm font-medium text-foreground">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-foreground">{product.sales.toLocaleString()}</td>
                      <td className="py-4 px-6 text-sm font-medium text-foreground">{formatINR(product.revenue)}</td>
                      <td className="py-4 px-6">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${(product.sales / 5200) * 100}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
