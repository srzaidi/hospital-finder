import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './components/Login';
import Map from './components/Map';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLoginSuccess = (credentialResponse) => {
    console.log('Login Success:', credentialResponse);
    setUser(credentialResponse);
  };

  const handleLoginError = () => {
    console.log('Login Failed');
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchHospitals(latitude, longitude);
        },
        (error) => {
          console.error('Error fetching location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const fetchHospitals = async (lat, lng) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://overpass-api.de/api/interpreter?data=[out:json];node["amenity"="hospital"](around:5000,${lat},${lng});out;`
      );
      const data = await response.json();
      setHospitals(data.elements);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchLocation();
    }
  }, [user]);

  return (
    <GoogleOAuthProvider clientId="570464373236-uofredqlnvt064re0jb153ia84lvcldt.apps.googleusercontent.com">
      <div className="App">
        <header>
          <h1>Hospital Finder</h1>
        </header>
        {!user ? (
          <Login onSuccess={handleLoginSuccess} onError={handleLoginError} />
        ) : (
          <>
            <p className="welcome-message">Welcome! Here are the hospitals near you:</p>
            <div className="map-container">
              <Map location={location} hospitals={hospitals} />
              <div className="hospital-panel">
                <h3>Nearby Hospitals</h3>
                {loading ? (
                  <div className="loading-spinner">Loading...</div>
                ) : (
                  hospitals.slice(0, 5).map((hospital) => (
                    <div key={hospital.id} className="hospital-item">
                      <h4>{hospital.tags.name || 'Hospital'}</h4>
                      <p>Latitude: {hospital.lat.toFixed(4)}, Longitude: {hospital.lon.toFixed(4)}</p>
                      {hospital.tags['addr:street'] && <p>Address: {hospital.tags['addr:street']}</p>}
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
        <footer>
          <p>Built with ❤️ using React and OpenStreetMap</p>
        </footer>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;