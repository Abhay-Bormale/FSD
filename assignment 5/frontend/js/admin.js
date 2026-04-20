const API_URL = 'http://localhost:5000/api';

// Admin initialization
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('adminToken');
    const username = localStorage.getItem('adminUsername');
    
    if (token) {
        // User is logged in
        showDashboard(username);
    } else {
        // User needs to login
        showLoginForm();
    }
});

// Show login form
function showLoginForm() {
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('dashboard-section').style.display = 'none';
    document.getElementById('logout-btn').style.display = 'none';
}

// Show dashboard
function showDashboard(username) {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('dashboard-section').style.display = 'block';
    document.getElementById('logout-btn').style.display = 'block';
    
    loadPackages();
    loadDestinations();
    loadBookings();
    loadContacts();
}

// Handle login
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch(`${API_URL}/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('adminToken', data.token);
            localStorage.setItem('adminUsername', data.admin.username);
            document.getElementById('login-error').style.display = 'none';
            showDashboard(data.admin.username);
        } else {
            const error = await response.json();
            document.getElementById('login-error').textContent = error.message || 'Login failed';
            document.getElementById('login-error').style.display = 'block';
        }
    } catch (error) {
        document.getElementById('login-error').textContent = 'Error logging in';
        document.getElementById('login-error').style.display = 'block';
    }
});

// Logout
function logout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    showLoginForm();
    document.getElementById('login-form').reset();
}

// Tab switching
function showTab(tabName) {
    document.querySelectorAll('.content-tab').forEach(tab => {
        tab.style.display = 'none';
    });
    document.querySelectorAll('.list-group-item').forEach(item => {
        item.classList.remove('active');
    });
    
    document.getElementById(tabName + '-tab').style.display = 'block';
    event.target.classList.add('active');
}

// ==================== PACKAGES ====================

function showAddPackageForm() {
    document.getElementById('add-package-form').style.display = 'block';
}

function hideAddPackageForm() {
    document.getElementById('add-package-form').style.display = 'none';
    document.getElementById('package-form').reset();
}

async function loadPackages() {
    const token = localStorage.getItem('adminToken');
    
    try {
        const response = await fetch(`${API_URL}/packages`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const packages = await response.json();
        
        const container = document.getElementById('packages-list');
        container.innerHTML = packages.map(pkg => `
            <div class="col-md-6">
                <div class="card">
                    <img src="${pkg.image}" class="card-img-top" alt="${pkg.title}" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${pkg.title}</h5>
                        <p class="text-muted">${pkg.location}</p>
                        <p class="text-truncate">${pkg.description}</p>
                        <p><strong>Price:</strong> $${pkg.price} | <strong>Duration:</strong> ${pkg.duration}</p>
                        <button class="btn btn-danger btn-sm" onclick="deletePackage('${pkg._id}')">Delete</button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading packages:', error);
    }
}

document.getElementById('package-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('adminToken');
    
    const packageData = {
        title: document.getElementById('pkg-title').value,
        location: document.getElementById('pkg-location').value,
        price: parseFloat(document.getElementById('pkg-price').value),
        duration: document.getElementById('pkg-duration').value,
        description: document.getElementById('pkg-description').value,
        image: document.getElementById('pkg-image').value || 'https://via.placeholder.com/400x300?text=Travel+Package'
    };
    
    try {
        const response = await fetch(`${API_URL}/packages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(packageData)
        });

        if (response.ok) {
            hideAddPackageForm();
            loadPackages();
        } else {
            alert('Error creating package');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error creating package');
    }
});

async function deletePackage(id) {
    const token = localStorage.getItem('adminToken');
    
    if (confirm('Are you sure you want to delete this package?')) {
        try {
            const response = await fetch(`${API_URL}/packages/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                loadPackages();
            } else {
                alert('Error deleting package');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error deleting package');
        }
    }
}

// ==================== DESTINATIONS ====================

function showAddDestinationForm() {
    document.getElementById('add-destination-form').style.display = 'block';
}

function hideAddDestinationForm() {
    document.getElementById('add-destination-form').style.display = 'none';
    document.getElementById('destination-form').reset();
}

async function loadDestinations() {
    const token = localStorage.getItem('adminToken');
    
    try {
        const response = await fetch(`${API_URL}/destinations`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const destinations = await response.json();
        
        const container = document.getElementById('destinations-list');
        container.innerHTML = destinations.map(dest => `
            <div class="col-md-6">
                <div class="card">
                    <img src="${dest.image}" class="card-img-top" alt="${dest.name}" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${dest.name}</h5>
                        <p class="text-muted">${dest.country}</p>
                        <p class="text-truncate">${dest.description}</p>
                        <button class="btn btn-danger btn-sm" onclick="deleteDestination('${dest._id}')">Delete</button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading destinations:', error);
    }
}

document.getElementById('destination-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('adminToken');
    
    const destinationData = {
        name: document.getElementById('dest-name').value,
        country: document.getElementById('dest-country').value,
        description: document.getElementById('dest-description').value,
        image: document.getElementById('dest-image').value || 'https://via.placeholder.com/400x300?text=Destination'
    };
    
    try {
        const response = await fetch(`${API_URL}/destinations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(destinationData)
        });

        if (response.ok) {
            hideAddDestinationForm();
            loadDestinations();
        } else {
            alert('Error creating destination');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error creating destination');
    }
});

async function deleteDestination(id) {
    const token = localStorage.getItem('adminToken');
    
    if (confirm('Are you sure you want to delete this destination?')) {
        try {
            const response = await fetch(`${API_URL}/destinations/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                loadDestinations();
            } else {
                alert('Error deleting destination');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error deleting destination');
        }
    }
}

// ==================== BOOKINGS ====================

async function loadBookings() {
    const token = localStorage.getItem('adminToken');
    
    try {
        const response = await fetch(`${API_URL}/bookings`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const bookings = await response.json();
        
        const tbody = document.getElementById('bookings-tbody');
        tbody.innerHTML = bookings.map(booking => `
            <tr>
                <td>${booking.name}</td>
                <td>${booking.email}</td>
                <td>${booking.packageId?.title || 'N/A'}</td>
                <td>${new Date(booking.date).toLocaleDateString()}</td>
                <td>${booking.persons}</td>
                <td><span class="badge bg-info">${booking.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-secondary" onclick="updateBookingStatus('${booking._id}', 'confirmed')">Confirm</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteBooking('${booking._id}')">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading bookings:', error);
    }
}

async function deleteBooking(id) {
    const token = localStorage.getItem('adminToken');
    
    if (confirm('Are you sure you want to delete this booking?')) {
        try {
            const response = await fetch(`${API_URL}/bookings/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                loadBookings();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

async function updateBookingStatus(id, status) {
    const token = localStorage.getItem('adminToken');
    
    try {
        const response = await fetch(`${API_URL}/bookings/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        });

        if (response.ok) {
            loadBookings();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// ==================== CONTACTS ====================

async function loadContacts() {
    const token = localStorage.getItem('adminToken');
    
    try {
        const response = await fetch(`${API_URL}/contact`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const contacts = await response.json();
        
        const tbody = document.getElementById('contacts-tbody');
        tbody.innerHTML = contacts.map(contact => `
            <tr>
                <td>${contact.name}</td>
                <td>${contact.email}</td>
                <td>${contact.message.substring(0, 50)}...</td>
                <td><span class="badge bg-warning">${contact.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="viewContact('${contact._id}')">View</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteContact('${contact._id}')">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading contacts:', error);
    }
}

function viewContact(id) {
    alert('Contact details - View functionality can be extended');
}

async function deleteContact(id) {
    const token = localStorage.getItem('adminToken');
    
    if (confirm('Are you sure you want to delete this contact?')) {
        try {
            const response = await fetch(`${API_URL}/contact/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                loadContacts();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

console.log('✅ Admin.js loaded');
