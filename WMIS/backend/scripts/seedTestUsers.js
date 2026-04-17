const dotenv = require("dotenv")
const bcrypt = require("bcryptjs")

const { connectDB } = require("../src/db")
const User = require("../src/models/User")

dotenv.config()

const DEFAULT_PASSWORD = process.env.SEED_DEFAULT_PASSWORD || "LogistQ@123"

const users = [
  {
    username: "LogistQ Admin",
    email: "admin@logistq.in",
    role: "ADMIN",
    password: process.env.SEED_ADMIN_PASSWORD || DEFAULT_PASSWORD,
  },
  {
    username: "Test Supplier",
    email: "supplier@logistq.in",
    role: "SUPPLIER",
    password: process.env.SEED_SUPPLIER_PASSWORD || DEFAULT_PASSWORD,
  },
  {
    username: "Inventory Staff",
    email: "staff@logistq.in",
    role: "STAFF",
    password: process.env.SEED_STAFF_PASSWORD || DEFAULT_PASSWORD,
  },
  {
    username: "Test Client",
    email: "client@logistq.in",
    role: "CLIENT",
    password: process.env.SEED_CLIENT_PASSWORD || DEFAULT_PASSWORD,
  },
]

async function seed() {
  await connectDB()

  const results = []

  for (const u of users) {
    const passwordHash = await bcrypt.hash(u.password, 10)

    const updated = await User.findOneAndUpdate(
      { email: u.email },
      {
        $set: {
          username: u.username,
          role: u.role,
          passwordHash,
        },
      },
      { upsert: true, returnDocument: "after", runValidators: true }
    )

    results.push({ email: updated.email, role: updated.role })
  }

  // eslint-disable-next-line no-console
  console.log("Seeded test users:", results)
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Failed to seed users:", err)
    process.exit(1)
  })

