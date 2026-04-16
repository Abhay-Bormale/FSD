# Booking System Frontend

A React-based frontend for the appointment booking system.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3000`

3. **Ensure backend is running:**
   - The backend should be running on `http://localhost:5001`
   - Navigate to your backend folder and run `npm run dev`

## Features

- **User Authentication**
  - Register new account
  - Login to existing account
  - Logout

- **Provider Management**
  - View all available providers
  - See provider specialization

- **Appointment Booking**
  - Select a provider
  - Choose date and time
  - Book appointments

- **Appointment Management**
  - View all your appointments
  - Cancel appointments
  - See appointment status

## Project Structure

```
src/
├── components/
│   ├── Navbar.js
│   ├── ProvidersList.js
│   ├── BookingForm.js
│   └── MyAppointments.js
├── pages/
│   ├── Login.js
│   ├── Register.js
│   └── Dashboard.js
├── services/
│   └── api.js
├── styles/
│   └── [CSS files]
└── App.js
```

## API Endpoints Used

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/providers` - Get all providers
- `POST /api/appointments` - Book appointment
- `GET /api/appointments/:userId` - Get user appointments
- `DELETE /api/appointments/:id` - Cancel appointment

## Technologies Used

- React 18
- React Router v6
- Axios for API calls
- CSS3 for styling
