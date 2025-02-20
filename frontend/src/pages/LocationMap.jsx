import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix leaflet default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMap = () => {
  const [position, setPosition] = useState([23.1815, 79.9864]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fix Leaflet icons for browser environment
    if (typeof window !== "undefined") {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    }
  }, []);

  const getLocation = () => {
    setIsLoading(true);
    setError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
          setIsLoading(false);
        },
        (err) => {
          let errorMessage = "Location detection failed: ";
          switch(err.code) {
            case err.PERMISSION_DENIED:
              errorMessage += "Please enable location permissions in your browser settings.";
              break;
            case err.POSITION_UNAVAILABLE:
              errorMessage += "Location information is unavailable.";
              break;
            case err.TIMEOUT:
              errorMessage += "The request timed out. Please try again.";
              break;
            default:
              errorMessage += "Unknown error occurred.";
          }
          setError(errorMessage);
          setIsLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={getLocation}
          className={`bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:bg-blue-700 hover:scale-105 ${
            isLoading ? "opacity-75 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Detecting Location...
            </span>
          ) : (
            position[0] === 23.1815 ? "📍 Get My Location" : "📍 Update Location"
          )}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
            {error} Using default Jabalpur location.
          </div>
        )}

        <div className="mt-6 h-[600px] w-full rounded-2xl overflow-hidden shadow-xl border border-white/20">
          {typeof window !== "undefined" && (
            <MapContainer 
              key={position.toString()} // Force re-render on position change
              center={position} 
              zoom={13} 
              style={{ height: "100%", width: "100%" }}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup className="text-sm font-semibold">
                  {position[0] === 23.1815 ? 
                    "Default Location: Jabalpur, MP" : 
                    "Your Current Location"}
                </Popup>
              </Marker>
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationMap;