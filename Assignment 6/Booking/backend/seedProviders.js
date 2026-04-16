const mongoose = require("mongoose");
const Provider = require("./models/Provider");
require("dotenv").config();

const sampleProviders = [
    {
        name: "Dr. Sarah Johnson",
        email: "sarah.johnson@clinic.com",
        specialization: "General Medicine",
        isAvailable: true
    },
    {
        name: "Dr. Michael Chen",
        email: "michael.chen@clinic.com",
        specialization: "Dentistry",
        isAvailable: true
    },
    {
        name: "Dr. Emily Rodriguez",
        email: "emily.rodriguez@clinic.com",
        specialization: "Cardiology",
        isAvailable: true
    },
    {
        name: "Dr. James Wilson",
        email: "james.wilson@clinic.com",
        specialization: "Orthopedics",
        isAvailable: true
    },
    {
        name: "Dr. Lisa Anderson",
        email: "lisa.anderson@clinic.com",
        specialization: "Dermatology",
        isAvailable: true
    },
    {
        name: "Dr. Robert Martin",
        email: "robert.martin@clinic.com",
        specialization: "Neurology",
        isAvailable: false
    }
];

async function seedProviders() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        // Clear existing providers
        await Provider.deleteMany({});
        console.log("Cleared existing providers");

        // Insert sample providers
        const insertedProviders = await Provider.insertMany(sampleProviders);
        console.log(`Added ${insertedProviders.length} providers successfully!`);
        console.log("Providers added:");
        insertedProviders.forEach(p => {
            console.log(`  - ${p.name} (${p.specialization})`);
        });

        mongoose.connection.close();
        console.log("Database connection closed");
    } catch (error) {
        console.error("Error seeding providers:", error.message);
        process.exit(1);
    }
}

seedProviders();
