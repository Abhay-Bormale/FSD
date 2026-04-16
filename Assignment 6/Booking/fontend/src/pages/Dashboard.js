import React, { useState, useEffect } from 'react';
import ProvidersList from '../components/ProvidersList';
import BookingForm from '../components/BookingForm';
import MyAppointments from '../components/MyAppointments';
import '../styles/Dashboard.css';

function Dashboard({ user }) {
  const [activeTab, setActiveTab] = useState('book');
  const [refreshAppointments, setRefreshAppointments] = useState(0);

  const handleAppointmentBooked = () => {
    setRefreshAppointments((prev) => prev + 1);
    setActiveTab('appointments');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user.name}!</h1>
        <p>Appointment Booking System</p>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === 'book' ? 'active' : ''}`}
          onClick={() => setActiveTab('book')}
        >
          Book Appointment
        </button>
        <button
          className={`tab-button ${activeTab === 'providers' ? 'active' : ''}`}
          onClick={() => setActiveTab('providers')}
        >
          View Providers
        </button>
        <button
          className={`tab-button ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          My Appointments
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'book' && (
          <BookingForm user={user} onAppointmentBooked={handleAppointmentBooked} />
        )}
        {activeTab === 'providers' && <ProvidersList />}
        {activeTab === 'appointments' && (
          <MyAppointments user={user} refresh={refreshAppointments} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
