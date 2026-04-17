const dotenv = require("dotenv")
const mongoose = require("mongoose")

const { connectDB } = require("../src/db")
const User = require("../src/models/User")
const Warehouse = require("../src/models/Warehouse")
const Product = require("../src/models/Product")
const Order = require("../src/models/Order")
const StockMovement = require("../src/models/StockMovement")

dotenv.config()

async function seedDemoData() {
  await connectDB()

  // Pick an existing client user (or any user) as order owner
  const client =
    (await User.findOne({ email: "client@logistq.in" })) ||
    (await User.findOne())

  if (!client) {
    throw new Error("No users found. Seed test users first.")
  }

  // Warehouses
  const warehouses = await Warehouse.insertMany(
    [
      { name: "Mumbai Central Warehouse", location: "Mumbai, Maharashtra" },
      { name: "Delhi NCR Hub", location: "Gurugram, Haryana" },
      { name: "Bengaluru South DC", location: "Bengaluru, Karnataka" },
    ],
    { ordered: false }
  ).catch(async () => Warehouse.find({}))

  // Products
  const products = await Product.insertMany(
    [
      {
        name: "Bluetooth Headphones",
        sku: "IN-HDP-001",
        price: 2499,
        description: "Wireless Bluetooth headphones with noise isolation.",
      },
      {
        name: "USB-C Cable 1.5m",
        sku: "IN-CAB-002",
        price: 299,
        description: "Fast-charging USB-C cable, 1.5 metre.",
      },
      {
        name: "Power Bank 10000mAh",
        sku: "IN-PWB-003",
        price: 1799,
        description: "Compact 10000mAh power bank with dual USB output.",
      },
    ],
    { ordered: false }
  ).catch(async () => Product.find({}))

  if (!warehouses.length || !products.length) {
    throw new Error("Failed to ensure warehouses/products for demo data.")
  }

  // Simple demo orders
  const [wh1, wh2] = warehouses
  const [p1, p2, p3] = products

  const demoOrders = [
    {
      userId: client._id,
      warehouseId: wh1._id,
      items: [
        { productId: p1._id, quantity: 2, unitPrice: p1.price },
        { productId: p2._id, quantity: 5, unitPrice: p2.price },
      ],
      status: "COMPLETED",
    },
    {
      userId: client._id,
      warehouseId: wh2._id,
      items: [{ productId: p3._id, quantity: 1, unitPrice: p3.price }],
      status: "PENDING",
    },
  ]

  const ordersToInsert = demoOrders.map((o) => ({
    ...o,
    totalAmount: o.items.reduce(
      (sum, it) => sum + it.quantity * it.unitPrice,
      0
    ),
  }))

  const createdOrders = await Order.insertMany(ordersToInsert)

  // Stock movements for each order
  const movements = createdOrders.flatMap((order, idx) => {
    const spec = ordersToInsert[idx]
    return spec.items.map((it) => ({
      type: "OUT",
      productId: it.productId,
      warehouseId: order.warehouseId,
      quantity: it.quantity,
      unitPrice: it.unitPrice,
      amount: it.quantity * it.unitPrice,
      orderId: order._id,
      notes: "Demo seed movement",
    }))
  })

  await StockMovement.insertMany(movements)

  console.log("Seeded demo data:")
  console.log("- Warehouses:", warehouses.map((w) => w.name))
  console.log("- Products:", products.map((p) => `${p.name} (${p.sku})`))
  console.log("- Orders:", createdOrders.map((o) => o._id.toString()))
}

seedDemoData()
  .then(() => {
    mongoose.connection.close()
    process.exit(0)
  })
  .catch((err) => {
    console.error("Failed to seed demo data:", err)
    mongoose.connection.close()
    process.exit(1)
  })

