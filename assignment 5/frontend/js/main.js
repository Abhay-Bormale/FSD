const API_URL = 'http://localhost:5000/api';

// Sample Packages Data
const packages = [
    {
        id: 1,
        name: "Paris Romance",
        destination: "Paris, France",
        duration: "5 Days",
        price: "$1,299",
        priceNumber: 1299,
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=500",
        description: "Experience the magic of Paris with visits to iconic landmarks like the Eiffel Tower, Louvre Museum, and Seine River cruise.",
        highlights: ["Eiffel Tower", "Louvre Museum", "Seine Cruise", "Champs-Élysées"]
    },
    {
        id: 2,
        name: "Tokyo Adventure",
        destination: "Tokyo, Japan",
        duration: "7 Days",
        price: "$1,599",
        priceNumber: 1599,
        image: "https://images.unsplash.com/photo-1540959375944-7049f642e9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500",
        description: "Discover the vibrant culture of Tokyo with temples, street food, technology hubs, and beautiful gardens.",
        highlights: ["Senso-ji Temple", "Mount Fuji", "Shibuya Crossing", "Cherry Blossoms"]
    },
    {
        id: 3,
        name: "Dubai Luxury",
        destination: "Dubai, UAE",
        duration: "4 Days",
        price: "$999",
        priceNumber: 999,
        image: "https://images.unsplash.com/photo-1512453575985-cbd600bbad98?ixlib=rb-4.0.3&auto=format&fit=crop&w=500",
        description: "Indulge in luxury at the world's most glamorous destination with shopping, stunning architecture, and desert safaris.",
        highlights: ["Burj Khalifa", "Palm Jumeirah", "Desert Safari", "Shopping Mall"]
    },
    {
        id: 4,
        name: "New York City",
        destination: "NYC, USA",
        duration: "6 Days",
        price: "$1,199",
        priceNumber: 1199,
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500",
        description: "The city that never sleeps! Experience Broadway shows, world-class museums, Times Square, and iconic landmarks.",
        highlights: ["Statue of Liberty", "Central Park", "Times Square", "Broadway Shows"]
    },
    {
        id: 5,
        name: "Bali Paradise",
        destination: "Bali, Indonesia",
        duration: "5 Days",
        price: "$799",
        priceNumber: 799,
        image: "https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=500",
        description: "Relax in tropical paradise with beautiful beaches, ancient temples, rice terraces, and world-class resorts.",
        highlights: ["Tanah Lot Temple", "Ubud Rice Terraces", "Beach Resorts", "Spa & Wellness"]
    },
    {
        id: 6,
        name: "Swiss Alps",
        destination: "Swiss Alps, Switzerland",
        duration: "6 Days",
        price: "$1,399",
        priceNumber: 1399,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500",
        description: "Experience stunning mountain scenery with hiking, skiing, and charming alpine villages.",
        highlights: ["Matterhorn", "Interlaken", "Jungfrau Railway", "Mountain Hiking"]
    }
];

// Sample Destinations Data
const destinations = [
    {
        id: 1,
        name: "Paris",
        country: "France",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=500",
        description: "The City of Light is famous for its iconic monuments, world-class museums, fine dining, and romantic atmosphere.",
        bestTime: "April-June, September-October",
        attractions: "Eiffel Tower, Louvre, Notre-Dame"
    },
    {
        id: 2,
        name: "Tokyo",
        country: "Japan",
        image: "https://images.unsplash.com/photo-1540959375944-7049f642e9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500",
        description: "A blend of ancient tradition and cutting-edge technology, Tokyo offers temples, gardens, tech hubs, and incredible food.",
        bestTime: "March-May, October-November",
        attractions: "Senso-ji Temple, Mount Fuji, Shibuya"
    },
    {
        id: 3,
        name: "Dubai",
        country: "United Arab Emirates",
        image: "https://images.unsplash.com/photo-1512453575985-cbd600bbad98?ixlib=rb-4.0.3&auto=format&fit=crop&w=500",
        description: "Modern luxury and Arabian culture meet in this desert oasis featuring futuristic architecture and world-class shopping.",
        bestTime: "November-March",
        attractions: "Burj Khalifa, Palm Jumeirah, Gold Souk"
    },
    {
        id: 4,
        name: "New York City",
        country: "United States",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500",
        description: "The city that never sleeps offers Broadway shows, museums, diverse food scenes, and iconic attractions.",
        bestTime: "May-October",
        attractions: "Central Park, Times Square, Statue of Liberty"
    },
    {
        id: 5,
        name: "Bali",
        country: "Indonesia",
        image: "https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=500",
        description: "A tropical paradise with stunning beaches, ancient temples, rice paddies, and a thriving wellness scene.",
        bestTime: "April-October",
        attractions: "Tanah Lot, Ubud, Beautiful Beaches"
    },
    {
        id: 6,
        name: "Swiss Alps",
        country: "Switzerland",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500",
        description: "Breathtaking mountains, charming villages, world-class skiing, and stunning hiking trails await.",
        bestTime: "June-September",
        attractions: "Matterhorn, Interlaken, Fairy-tale Villages"
    },
    {
        id: 7,
        name: "Barcelona",
        country: "Spain",
        image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500",
        description: "A vibrant city with Gaudí architecture, beautiful beaches, passionate culture, and delicious Mediterranean cuisine.",
        bestTime: "May-June, September-October",
        attractions: "Sagrada Familia, Park Güell, Beach"
    },
    {
        id: 8,
        name: "Rome",
        country: "Italy",
        image: "https://images.unsplash.com/photo-1552832860-cfcdaa77dcf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500",
        description: "The Eternal City is a living museum with ancient ruins, Renaissance art, delicious food, and timeless charm.",
        bestTime: "April-May, September-October",
        attractions: "Colosseum, Vatican, Roman Forum"
    }
];

// Load Featured Packages on Home Page
function loadFeaturedPackages() {
    const container = document.getElementById('featured-packages');
    if (!container) return;
    
    const featured = packages.slice(0, 3);
    container.innerHTML = featured.map(pkg => `
        <div class="col-md-4">
            <div class="card hover-card h-100 shadow-sm">
                <img src="${pkg.image}" class="card-img-top" alt="${pkg.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${pkg.name}</h5>
                    <p class="text-muted small">${pkg.destination}</p>
                    <p class="card-text">${pkg.description}</p>
                    <div class="mt-auto">
                        <p class="text-success fw-bold fs-5">${pkg.price}</p>
                        <p class="small text-secondary">Duration: ${pkg.duration}</p>
                        <button class="btn btn-primary w-100" onclick="bookPackage(${pkg.id})">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Load All Packages
function loadAllPackages() {
    const container = document.getElementById('packages-container');
    if (!container) return;
    
    container.innerHTML = packages.map(pkg => `
        <div class="col-lg-4 col-md-6">
            <div class="card hover-card h-100 shadow">
                <img src="${pkg.image}" class="card-img-top" alt="${pkg.name}" style="height: 250px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <div class="badge bg-primary mb-2" style="width: fit-content;">${pkg.duration}</div>
                    <h5 class="card-title">${pkg.name}</h5>
                    <p class="text-muted">${pkg.destination}</p>
                    <p class="card-text small">${pkg.description}</p>
                    <div class="mb-3">
                        <strong>Highlights:</strong>
                        <ul class="small mb-0 mt-2">
                            ${pkg.highlights.map(h => `<li>${h}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="mt-auto">
                        <p class="text-success fw-bold fs-4">${pkg.price}</p>
                        <button class="btn btn-primary w-100" onclick="bookPackage(${pkg.id})">
                            Book Package
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Load All Destinations
function loadAllDestinations() {
    const container = document.getElementById('destinations-container');
    if (!container) return;
    
    container.innerHTML = destinations.map(dest => `
        <div class="col-lg-4 col-md-6">
            <div class="card hover-card h-100 shadow destination-card">
                <img src="${dest.image}" class="card-img-top" alt="${dest.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${dest.name}</h5>
                    <p class="text-muted fw-bold">${dest.country}</p>
                    <p class="card-text">${dest.description}</p>
                    <div class="mb-3">
                        <small class="d-block"><strong>Best Time:</strong> ${dest.bestTime}</small>
                        <small class="d-block mt-2"><strong>Top Attractions:</strong> ${dest.attractions}</small>
                    </div>
                    <div class="mt-auto">
                        <button class="btn btn-info w-100" onclick="exploreDestination('${dest.name}')">
                            Explore & Book
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Book Package Function
function bookPackage(packageId) {
    const pkg = packages.find(p => p.id === packageId);
    if (pkg) {
        localStorage.setItem('selectedPackage', JSON.stringify(pkg));
        window.location.href = 'booking.html';
    }
}

// Explore Destination Function
function exploreDestination(destinationName) {
    const matchingPackages = packages.filter(p => p.destination.includes(destinationName));
    if (matchingPackages.length > 0) {
        localStorage.setItem('selectedDestination', destinationName);
        localStorage.setItem('destinationPackages', JSON.stringify(matchingPackages));
        window.location.href = 'booking.html';
    } else {
        alert(`No packages available for ${destinationName}. Please check our packages page.`);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedPackages();
    loadAllPackages();
    loadAllDestinations();
    console.log('✅ Main.js loaded with sample data');
});
