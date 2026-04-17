import { Header } from "@/components/dashboard/header"
import { StatsCard } from "@/components/dashboard/stats-card"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import { InventoryChart } from "@/components/dashboard/inventory-chart"
import { LowStockAlert } from "@/components/dashboard/low-stock-alert"
import { Package, Warehouse, ShoppingCart, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <Header 
        title="Dashboard" 
        description="Overview of your warehouse operations"
      />
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Products"
            value="12,486"
            change={12.5}
            icon={Package}
            iconColor="bg-primary"
          />
          <StatsCard
            title="Warehouses"
            value="8"
            change={0}
            icon={Warehouse}
            iconColor="bg-chart-2"
          />
          <StatsCard
            title="Pending Orders"
            value="342"
            change={-8.2}
            icon={ShoppingCart}
            iconColor="bg-chart-3"
          />
          <StatsCard
            title="Revenue (MTD)"
            value="₹2,84,520"
            change={23.1}
            icon={TrendingUp}
            iconColor="bg-chart-4"
          />
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <InventoryChart />
          </div>
          <div>
            <LowStockAlert />
          </div>
        </div>

        {/* Recent Orders */}
        <RecentOrders />
      </div>
    </div>
  )
}
