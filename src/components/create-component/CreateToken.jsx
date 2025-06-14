import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export default function LocationPicker() {
  const [mapCenter, setMapCenter] = useState({ lat: 41.311081, lng: 69.240562 }); // Default: Tashkent
  const [address, setAddress] = useState('');
  const [apiLoaded, setApiLoaded] = useState(false);

  // IP orqali taxminiy location olish
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        setMapCenter({ lat: data.latitude, lng: data.longitude });
        reverseGeocode(data.latitude, data.longitude);
      })
      .catch(err => console.error(err));
  }, []);

  // Reverse geocoding orqali manzil chiqarish
  const reverseGeocode = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
      );
      const data = await res.json();
      const { road, suburb, city, town, country } = data.address || {};
      const result = [road, suburb, city || town, country].filter(Boolean).join(', ');
      setAddress(result || data.display_name || 'Address not found');
    } catch (e) {
      console.log('Reverse geocoding failed:', e);
    }
  };

  // "Use my current location" tugmasi
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMapCenter(coords);
          reverseGeocode(coords.lat, coords.lng);
        },
        error => {
          alert("Geolocation permission denied.");
        }
      );
    } else {
      alert("Geolocation not supported by this browser.");
    }
  };

  return (
    <div className="location-content">
      <h2>Where's your place located?</h2>
      <p>Your address is only shared with guests after they’ve made a reservation.</p>
      <button onClick={getCurrentLocation}>📍 Use my current location</button>

      <input type="text" value={address} readOnly placeholder="Your address will appear here" />

      <div className="map-container">
        <LoadScript
          googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
          onLoad={() => setApiLoaded(true)}
        >
          {apiLoaded && (
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '400px' }}
              center={mapCenter}
              zoom={15}
            >
              <Marker position={mapCenter} />
            </GoogleMap>
          )}
        </LoadScript>
      </div>
    </div>
  );
}
