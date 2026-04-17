"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const data = [
  { name: "Jan", inbound: 4000, outbound: 2400 },
  { name: "Feb", inbound: 3000, outbound: 1398 },
  { name: "Mar", inbound: 2000, outbound: 9800 },
  { name: "Apr", inbound: 2780, outbound: 3908 },
  { name: "May", inbound: 1890, outbound: 4800 },
  { name: "Jun", inbound: 2390, outbound: 3800 },
  { name: "Jul", inbound: 3490, outbound: 4300 },
  { name: "Aug", inbound: 4200, outbound: 2100 },
  { name: "Sep", inbound: 3800, outbound: 3200 },
  { name: "Oct", inbound: 4500, outbound: 2900 },
  { name: "Nov", inbound: 5200, outbound: 3100 },
  { name: "Dec", inbound: 4800, outbound: 2800 },
]

export function InventoryChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-card-foreground">Inventory Flow</CardTitle>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Inbound</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-chart-2" />
            <span className="text-muted-foreground">Outbound</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorInbound" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.75 0.18 160)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.75 0.18 160)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOutbound" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.65 0.18 220)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.65 0.18 220)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.01 250)" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="oklch(0.65 0 0)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="oklch(0.65 0 0)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.16 0.01 250)",
                  border: "1px solid oklch(0.28 0.01 250)",
                  borderRadius: "8px",
                  color: "oklch(0.95 0 0)",
                }}
                labelStyle={{ color: "oklch(0.65 0 0)" }}
              />
              <Area
                type="monotone"
                dataKey="inbound"
                stroke="oklch(0.75 0.18 160)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorInbound)"
              />
              <Area
                type="monotone"
                dataKey="outbound"
                stroke="oklch(0.65 0.18 220)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorOutbound)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
