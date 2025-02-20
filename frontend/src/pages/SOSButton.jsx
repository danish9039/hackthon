// import React, { useState } from "react";
// import axios from "axios";

// const SOSButton = () => {
//   const [loading, setLoading] = useState(false);

//   const handleSOSClick = () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported by your browser.");
//       return;
//     }

//     setLoading(true);

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;

//         try {
//           // 1️⃣ Send location to backend (which will send SMS to emergency service)
//           await axios.post("http://localhost:4000/api/v1/map/sos", {
//             lat: latitude,
//             lng: longitude,
//           });

//           // 2️⃣ Trigger Phone Call (opens dialer)
//           window.location.href = "tel:112"; // Change to your emergency number

//           alert("SOS Alert Sent! Emergency call is being placed.");
//         } catch (error) {
//           console.error("Error sending SOS alert:", error);
//           alert("Failed to send SOS alert.");
//         } finally {
//           setLoading(false);
//         }
//       },
//       (error) => {
//         console.error("Error getting location:", error);
//         alert("Could not get location.");
//         setLoading(false);
//       }
//     );
//   };

//   return (
//     <div className="p-6 text-center">
//       <button
//         onClick={handleSOSClick}
//         className="bg-red-600 text-white text-xl px-6 py-3 rounded-full shadow-md hover:bg-red-700 transition"
//         disabled={loading}
//       >
//         {loading ? "Sending SOS..." : "🚨 SOS - Call Now"}
//       </button>
//     </div>
//   );
// };

// export default SOSButton;
import React, { useState } from "react";
import axios from "axios";

const SOSButton = () => {
  const [loading, setLoading] = useState(false);
  const [pulse, setPulse] = useState(false);

  const handleSOSClick = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setPulse(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          await axios.post("http://localhost:4000/api/v1/map/sos", {
            lat: latitude,
            lng: longitude,
          });

          window.location.href =  "tel:+919039146148";
          alert("SOS Alert Sent! Emergency call is being placed.");
        } catch (error) {
          console.error("Error sending SOS alert:", error);
          alert("Failed to send SOS alert.");
        } finally {
          setLoading(false);
          setPulse(false);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Could not get location.");
        setLoading(false);
        setPulse(false);
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="relative">
        {/* Pulsing ring animation */}
        <div className={`absolute inset-0 rounded-full animate-ping ${pulse ? 'bg-red-600' : 'hidden'}`}></div>
        
        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-red-600/30 to-transparent blur-xl ${pulse ? 'animate-pulse' : 'hidden'}`}></div>

        <button
          onClick={handleSOSClick}
          disabled={loading}
          className="relative z-10 bg-gradient-to-br from-red-600 to-orange-500 text-white text-2xl px-12 py-6 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-red-900/50 active:scale-95 group"
        >
          <div className="flex items-center gap-4">
            {loading ? (
              <svg className="w-8 h-8 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
            ) : (
              <div className="relative">
                <span className="text-4xl">🚨</span>
                <div className="absolute inset-0 bg-red-500 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
            )}
            <span className="font-bold tracking-wider">
              {loading ? "SENDING EMERGENCY SIGNAL..." : "EMERGENCY SOS"}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SOSButton;