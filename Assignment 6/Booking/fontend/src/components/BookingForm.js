import React, { useState, useEffect } from 'react';
import { providerAPI, appointmentAPI } from '../services/api';
import '../styles/BookingForm.css';

function BookingForm({ user, onAppointmentBooked }) {
  const [providers, setProviders] = useState([]);
  const [formData, setFormData] = useState({
    providerId: '',
    date: '',
    time: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const response = await providerAPI.getAll();
      setProviders(response.data);
    } catch (err) {
      setError('Failed to load providers');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!formData.providerId || !formData.date || !formData.time) {
        setError('Please fill all fields');
        setLoading(false);
        return;
      }

      await appointmentAPI.book({
        userId: user.userId,
        providerId: formData.providerId,
        date: formData.date,
        time: formData.time,
      });

      setSuccess('Appointment booked successfully!');
      setFormData({
        providerId: '',
        date: '',
        time: '',
      });

      setTimeout(() => {
        onAppointmentBooked();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="booking-form">
      <h2>Book an Appointment</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Provider</label>
          <select
            name="providerId"
            value={formData.providerId}
            onChange={handleChange}
            required
          >
            <option value="">Choose a provider...</option>
            {providers.map((provider) => (
              <option key={provider._id} value={provider._id}>
                {provider.name} - {provider.specialization}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Select Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={getTodayDate()}
            required
          />
        </div>

        <div className="form-group">
          <label>Select Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
