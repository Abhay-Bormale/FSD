const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
require('dotenv').config();

const Package = require('./models/Package');
const Destination = require('./models/Destination');
const Admin = require('./models/Admin');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await Package.deleteMany({});
    await Destination.deleteMany({});
    await Admin.deleteMany({});

    // Seed Packages
    const packages = [
      {
        title: 'Paradise Beach Getaway',
        location: 'Maldives',
        price: 1200,
        duration: '5 days',
        description: 'Enjoy crystal clear waters and white sandy beaches. Perfect for honeymoon couples and relaxation seekers.',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400'
      },
      {
        title: 'Mountain Adventure',
        location: 'Switzerland',
        price: 1500,
        duration: '7 days',
        description: 'Experience breathtaking alpine scenery with hiking, skiing, and charming mountain villages.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400'
      },
      {
        title: 'City Culture Tour',
        location: 'Paris, France',
        price: 1000,
        duration: '4 days',
        description: 'Explore iconic landmarks, world-class museums, and enjoy exquisite French cuisine in the City of Light.',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=400'
      },
      {
        title: 'Safari Expedition',
        location: 'Kenya',
        price: 1800,
        duration: '6 days',
        description: 'Witness the incredible wildlife of Africa with professional guides and comfortable accommodations.',
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=400'
      },
      {
        title: 'Tropical Island Escape',
        location: 'Bali, Indonesia',
        price: 950,
        duration: '5 days',
        description: 'Discover ancient temples, lush rice terraces, and beautiful beaches. Perfect for a classic island vacation.',
        image: 'https://images.unsplash.com/photo-1553531088-a91b5e8d5c1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400'
      },
      {
        title: 'Desert Wonder',
        location: 'Egypt',
        price: 1100,
        duration: '4 days',
        description: 'Marvel at the ancient pyramids and explore the mystical Nile River with expert Egyptologists.',
        image: 'https://images.unsplash.com/photo-1512453475868-3f4ee4586ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400'
      }
    ];

    const createdPackages = await Package.insertMany(packages);
    console.log(`✅ ${createdPackages.length} packages created`);

    // Seed Destinations
    const destinations = [
      {
        name: 'Phuket',
        country: 'Thailand',
        description: 'Tropical paradise with beautiful beaches, vibrant nightlife, and world-class diving spots.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400'
      },
      {
        name: 'Barcelona',
        country: 'Spain',
        description: 'Vibrant city known for Gaudí\'s architecture, Mediterranean beaches, and delicious tapas.',
        image: 'https://images.unsplash.com/photo-1562883676-8c6c5ef16a8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400'
      },
      {
        name: 'Tokyo',
        country: 'Japan',
        description: 'Modern metropolis blending ancient temples with cutting-edge technology and unique culture.',
        image: 'https://images.unsplash.com/photo-1540959375944-7049f642e9ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400'
      },
      {
        name: 'Amsterdam',
        country: 'Netherlands',
        description: 'Charming canals, historic architecture, and world-renowned museums in a compact, bike-friendly city.',
        image: 'https://images.unsplash.com/photo-1429179753574-1e0b6a3cd4b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400'
      },
      {
        name: 'Amalfi Coast',
        country: 'Italy',
        description: 'Stunning coastal scenery with colorful villages, fresh seafood, and Mediterranean charm.',
        image: 'https://images.unsplash.com/photo-1515542622106-78a156e6a5f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400'
      }
    ];

    const createdDestinations = await Destination.insertMany(destinations);
    console.log(`✅ ${createdDestinations.length} destinations created`);

    // Seed Admin User
    const admin = new Admin({
      username: 'admin',
      password: 'admin123'
    });

    await admin.save();
    console.log('✅ Admin user created (username: admin, password: admin123)');

    console.log('\n✨ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
