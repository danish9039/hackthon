import React, { useState } from "react";
import axios from "axios";

const Maps = () => {
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState({ police: [], hospital: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get user's live location
  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        setError("Unable to retrieve location. Please allow location access.");
        console.error(err);
      }
    );
  };

  // Fetch nearby places from backend
  const fetchNearbyPlaces = async () => {
    if (!location) {
      setError("Please allow location access first.");
      return;
    }

    console.log("Attempting to fetch places with location:", location); // Add this
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/map/nearby-places",
        location,
        { withCredentials: true } // Add this
      );
      console.log("Received response:", response.data); // Add this
      setPlaces(response.data);
    } catch (err) {
      setError("Error fetching nearby places. Try again later.");
      console.error("API Error Details:", {
        message: err.message,
        response: err.response?.data,
        code: err.code
      });
    }
    setLoading(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
          Nearby Safety Services
        </h1>
  
        <div className="flex flex-wrap gap-4 mb-12">
          <button
            onClick={getLocation}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <span className="relative z-10 flex items-center gap-2">
              {location ? "📍 Location Found" : "📍 Get My Location"}
              {loading && (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500 opacity-0 transition-all duration-300 group-hover:opacity-100"/>
          </button>
  
          {location && (
            <button
              onClick={fetchNearbyPlaces}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              disabled={loading}
            >
              <span className="relative z-10">
                {loading ? "🔄 Searching..." : "🔍 Find Nearby Services"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 transition-all duration-300 group-hover:opacity-100"/>
            </button>
          )}
        </div>
  
        {error && (
          <div className="animate-pulse mb-8 rounded-lg bg-red-100 p-4 text-red-700 shadow-md">
            ⚠️ {error}
          </div>
        )}
  
        <div className="grid gap-8 md:grid-cols-2">
          {Object.entries(places).map(([type, results]) => (
            <div key={type} className="animate-fade-in-up rounded-2xl bg-white p-6 shadow-xl transition-all duration-300 hover:shadow-2xl">
              <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-800">
                {type === 'police' ? '👮♂️ Police Stations' : '🏥 Hospitals'}
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
                  {results.length} found
                </span>
              </h2>
  
              {results.length > 0 ? (
                <div className="grid gap-4">
                  {results.map((place, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-xl border p-4 transition-all duration-300 hover:border-blue-200 hover:bg-gray-50"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex gap-4">
                        {place.photos?.length > 0 && (
                          <div className="relative h-24 w-24 overflow-hidden rounded-lg">
                            <img
                              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=enter_api_key`}
                              alt={place.name}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-800 transition-colors duration-300 group-hover:text-blue-600">
                            {place.name}
                          </h3>
                          <p className="text-gray-600">{place.vicinity}</p>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${place.geometry?.location.lat},${place.geometry?.location.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center text-sm font-semibold text-blue-600 transition-colors duration-300 hover:text-blue-800"
                          >
                            View on Map
                            <svg
                              className="ml-1 h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg bg-gray-50 p-4 text-center text-gray-500">
                  No {type} stations found within 5km radius
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Maps;
