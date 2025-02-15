import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default marker icons in Leaflet
let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow });
L.Marker.prototype.options.icon = DefaultIcon;

const Map = ({ location, hospitals }) => {
  if (!location) return null;

  return (
    <MapContainer center={[location.latitude, location.longitude]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© OpenStreetMap contributors'
      />
      {/* Default Marker for User's Location */}
      <Marker position={[location.latitude, location.longitude]}>
        <Popup>Your Location</Popup>
      </Marker>
      {/* Circle Markers for Hospitals */}
      {hospitals.map((hospital) => (
        <CircleMarker
          key={hospital.id}
          center={[hospital.lat, hospital.lon]}
          radius={8} // Size of the circle
          color="red" // Border color
          fillColor="pink" // Fill color
          fillOpacity={0.5} // Transparency
          className="pulse" // Add the pulse animation
        >
          <Popup>{hospital.tags.name || 'Hospital'}</Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default Map;