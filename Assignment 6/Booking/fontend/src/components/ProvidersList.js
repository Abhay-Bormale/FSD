import React, { useState, useEffect } from 'react';
import { providerAPI } from '../services/api';
import '../styles/ProvidersList.css';

function ProvidersList() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const response = await providerAPI.getAll();
      setProviders(response.data);
    } catch (err) {
      setError('Failed to load providers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="providers-loading">Loading providers...</div>;
  }

  if (error) {
    return <div className="providers-error">{error}</div>;
  }

  return (
    <div className="providers-list">
      <h2>Available Providers</h2>
      {providers.length === 0 ? (
        <p className="no-providers">No providers available</p>
      ) : (
        <div className="providers-grid">
          {providers.map((provider) => (
            <div key={provider._id} className="provider-card">
              <div className="provider-avatar">
                {provider.name.charAt(0).toUpperCase()}
              </div>
              <h3>{provider.name}</h3>
              <p className="specialization">{provider.specialization}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProvidersList;
