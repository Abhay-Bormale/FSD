"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const lowStockItems = [
  { name: "Wireless Headphones", sku: "WH-001", current: 15, minimum: 50 },
  { name: "USB-C Charging Cable", sku: "USB-003", current: 28, minimum: 100 },
  { name: "Smart Watch Band", sku: "SWB-012", current: 8, minimum: 30 },
  { name: "Bluetooth Speaker Mini", sku: "BTS-007", current: 22, minimum: 75 },
  { name: "Power Bank 10000mAh", sku: "PB-010", current: 12, minimum: 40 },
]

export function LowStockAlert() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center gap-2 pb-4">
        <AlertTriangle className="h-5 w-5 text-warning" />
        <CardTitle className="text-lg font-semibold text-card-foreground">Low Stock Alerts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {lowStockItems.map((item) => {
          const percentage = (item.current / item.minimum) * 100
          return (
            <div key={item.sku} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{item.current}</p>
                  <p className="text-xs text-muted-foreground">of {item.minimum} min</p>
                </div>
              </div>
              <Progress 
                value={percentage} 
                className="h-2 bg-muted"
              />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
