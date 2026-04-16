const API_BASE = "http://localhost:5000/api";
let token = localStorage.getItem("token");
let userId = localStorage.getItem("userId");
let userEmail = localStorage.getItem("userEmail");
let selectedProviderId = null;
let selectedProviderName = null;

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    if (token) {
        showApp();
    } else {
        showAuth();
    }
});

// Toggle between login and register forms
function toggleForm() {
    document.getElementById("loginForm").classList.toggle("active");
    document.getElementById("registerForm").classList.toggle("active");
}

// Register function
async function register() {
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registration successful! Please login.");
            toggleForm();
            document.getElementById("registerName").value = "";
            document.getElementById("registerEmail").value = "";
            document.getElementById("registerPassword").value = "";
        } else {
            alert(data.message || "Registration failed");
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
}

// Login function
async function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        alert("Please fill all fields");
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            token = data.token;
            userId = data.userId || email; // Store userId or email
            userEmail = email;
            
            // Save to localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            localStorage.setItem("userEmail", userEmail);

            showApp();
        } else {
            alert(data.message || "Login failed");
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
}

// Logout function
function logout() {
    token = null;
    userId = null;
    userEmail = null;
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    showAuth();
}

// Show Auth Section
function showAuth() {
    document.getElementById("authSection").classList.add("active");
    document.getElementById("appSection").classList.remove("active");
    document.getElementById("logoutBtn").style.display = "none";
    document.getElementById("userEmail").textContent = "";
}

// Show App Section
function showApp() {
    document.getElementById("authSection").classList.remove("active");
    document.getElementById("appSection").classList.add("active");
    document.getElementById("logoutBtn").style.display = "block";
    document.getElementById("userEmail").textContent = userEmail;
    document.getElementById("logoutBtn").addEventListener("click", logout);

    // Load data
    loadProviders();
    loadAppointments();
}

// Load Providers
async function loadProviders() {
    try {
        const response = await fetch(`${API_BASE}/providers`);
        const providers = await response.json();

        const providersList = document.getElementById("providersList");
        const providerSelect = document.getElementById("providerSelect");

        if (Array.isArray(providers) && providers.length > 0) {
            providersList.innerHTML = providers.map(provider => `
                <div class="provider-card" data-provider-id="${provider._id}" data-provider-name="${provider.name || 'Provider'}" onclick="selectProvider(this, '${provider._id}', '${(provider.name || 'Provider').replace(/'/g, "\\'")}')">
                    <h3>${provider.name || "Provider"}</h3>
                    <span class="provider-specialty">${provider.specialization || "General"}</span>
                    <p><strong>Email:</strong> ${provider.email || "N/A"}</p>
                    <div class="availability ${provider.isAvailable !== false ? 'available' : 'unavailable'}">
                        <span>${provider.isAvailable !== false ? "✓ Available" : "✗ Unavailable"}</span>
                    </div>
                </div>
            `).join("");

            providerSelect.innerHTML = '<option value="">Select a Provider</option>' +
                providers.map(provider => `
                    <option value="${provider._id}">${provider.name || "Provider"}</option>
                `).join("");
        } else {
            providersList.innerHTML = '<p class="loading">No providers available</p>';
        }
    } catch (error) {
        console.error("Error loading providers:", error);
        document.getElementById("providersList").innerHTML = '<p class="loading">Error loading providers</p>';
    }
}

// Select Provider
function selectProvider(cardElement, providerId, providerName) {
    // Remove selection from all cards
    document.querySelectorAll('.provider-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Add selection to clicked card
    cardElement.classList.add('selected');

    // Update global variables
    selectedProviderId = providerId;
    selectedProviderName = providerName;

    // Update the hidden select element
    document.getElementById("providerSelect").value = providerId;

    // Show the selected provider info
    const selectedInfo = document.getElementById("selectedProviderInfo");
    const selectedName = document.getElementById("selectedProviderName");
    selectedName.textContent = providerName;
    selectedInfo.style.display = "block";

    // Auto-scroll to booking section
    document.querySelector('.booking-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Book Appointment
async function bookAppointment() {
    const providerId = selectedProviderId || document.getElementById("providerSelect").value;
    const date = document.getElementById("appointmentDate").value;
    const time = document.getElementById("appointmentTime").value;

    if (!providerId || !date || !time) {
        showMessage("Please fill all fields", "error");
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/appointments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                userId,
                providerId,
                date,
                time
            })
        });

        const data = await response.json();

        if (response.ok) {
            showMessage(data.message || "Appointment booked successfully!", "success");
            // Reset form and selection
            selectedProviderId = null;
            selectedProviderName = null;
            document.getElementById("selectedProviderInfo").style.display = "none";
            document.querySelectorAll('.provider-card').forEach(card => {
                card.classList.remove('selected');
            });
            document.getElementById("providerSelect").value = "";
            document.getElementById("appointmentDate").value = "";
            document.getElementById("appointmentTime").value = "";
            loadAppointments();
        } else {
            showMessage(data.message || "Failed to book appointment", "error");
        }
    } catch (error) {
        showMessage("Error: " + error.message, "error");
    }
}

// Load Appointments
async function loadAppointments() {
    try {
        const response = await fetch(`${API_BASE}/appointments/${userId}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const appointments = await response.json();
        const appointmentsList = document.getElementById("appointmentsList");

        if (Array.isArray(appointments) && appointments.length > 0) {
            appointmentsList.innerHTML = appointments.map(apt => {
                // Format date nicely
                const appointmentDate = new Date(apt.date);
                const dateStr = appointmentDate.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                });

                return `
                    <div class="appointment-card ${apt.status === 'cancelled' ? 'cancelled' : ''}">
                        <div class="appointment-info">
                            <h4>${apt.providerId || "Provider"}</h4>
                            <div class="appointment-details">
                                <span>📅 ${dateStr}</span>
                                <span>⏰ ${apt.time}</span>
                            </div>
                            <span class="appointment-status ${apt.status === 'booked' ? 'status-booked' : 'status-cancelled'}">
                                ${apt.status || "Booked"}
                            </span>
                        </div>
                        ${apt.status !== 'cancelled' ? `
                            <button class="btn btn-cancel" onclick="cancelAppointment('${apt._id}')">Cancel</button>
                        ` : ''}
                    </div>
                `;
            }).join("");
        } else {
            appointmentsList.innerHTML = '<p class="loading">No appointments booked yet</p>';
        }
    } catch (error) {
        console.error("Error loading appointments:", error);
        document.getElementById("appointmentsList").innerHTML = '<p class="loading">Error loading appointments</p>';
    }
}

// Cancel Appointment
async function cancelAppointment(appointmentId) {
    if (!confirm("Are you sure you want to cancel this appointment?")) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/appointments/${appointmentId}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });

        const data = await response.json();

        if (response.ok) {
            showMessage(data.message || "Appointment cancelled successfully", "success");
            loadAppointments();
        } else {
            showMessage(data.message || "Failed to cancel appointment", "error");
        }
    } catch (error) {
        showMessage("Error: " + error.message, "error");
    }
}

// Show Message
function showMessage(message, type) {
    const messageBox = document.getElementById("bookingMessage");
    messageBox.textContent = message;
    messageBox.className = `message show ${type}`;
    setTimeout(() => {
        messageBox.classList.remove("show");
    }, 4000);
}
