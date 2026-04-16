import React, { useState, useEffect } from 'react';
import { appointmentAPI, providerAPI } from '../services/api';
import '../styles/MyAppointments.css';

function MyAppointments({ user, refresh }) {
  const [appointments, setAppointments] = useState([]);
  const [providers, setProviders] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAppointments();
    fetchProviders();
  }, [refresh]);

  const fetchAppointments = async () => {
    try {
      const response = await appointmentAPI.getByUser(user.userId);
      setAppointments(response.data || []);
    } catch (err) {
      setError('Failed to load appointments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProviders = async () => {
    try {
      const response = await providerAPI.getAll();
      const providersMap = {};
      response.data.forEach((provider) => {
        providersMap[provider._id] = provider;
      });
      setProviders(providersMap);
    } catch (err) {
      console.error('Failed to load providers:', err);
    }
  };

  const handleCancel = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await appointmentAPI.cancel(appointmentId);
        setAppointments(
          appointments.map((apt) =>
            apt._id === appointmentId ? { ...apt, status: 'cancelled' } : apt
          )
        );
      } catch (err) {
        setError('Failed to cancel appointment');
      }
    }
  };

  if (loading) {
    return <div className="appointments-loading">Loading appointments...</div>;
  }

  if (error) {
    return <div className="appointments-error">{error}</div>;
  }

  return (
    <div className="my-appointments">
      <h2>My Appointments</h2>
      {appointments.length === 0 ? (
        <p className="no-appointments">No appointments yet</p>
      ) : (
        <div className="appointments-list">
          {appointments.map((appointment) => {
            const provider = providers[appointment.providerId];
            const isBookedStatus = appointment.status === 'booked';
            return (
              <div
                key={appointment._id}
                className={`appointment-card ${appointment.status}`}
              >
                <div className="appointment-header">
                  <h3>
                    {provider ? provider.name : 'Unknown Provider'}
                  </h3>
                  <span className={`status-badge ${appointment.status}`}>
                    {appointment.status.toUpperCase()}
                  </span>
                </div>
                <div className="appointment-details">
                  <p>
                    <strong>Specialization:</strong>{' '}
                    {provider ? provider.specialization : 'N/A'}
                  </p>
                  <p>
                    <strong>Date:</strong> {appointment.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {appointment.time}
                  </p>
                </div>
                {isBookedStatus && (
                  <button
                    className="cancel-btn"
                    onClick={() => handleCancel(appointment._id)}
                  >
                    Cancel Appointment
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyAppointments;
