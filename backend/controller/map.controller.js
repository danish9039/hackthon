const axios = require("axios");

const getNearbyPlaces = async (req, res) => {
    const { lat, lng } = req.body;
    const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
    
    console.log("Received request with coordinates:", { lat, lng }); // Add this
    console.log("Using API Key:", GOOGLE_PLACES_API_KEY ? "***" : "MISSING"); // Add this
  
    try {
      const placesTypes = ["police", "hospital"];
      const results = {};
  
      for (let type of placesTypes) {
        console.log(`Fetching ${type} stations...`); // Add this
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
          {
            params: {
              location: `${lat},${lng}`,
              radius: 5000,
              type: type,
              key: GOOGLE_PLACES_API_KEY,
            },
          }
        );
        console.log(`Google API response for ${type}:`, response.data.status); // Add this
        results[type] = response.data.results;
      }
  
      res.json(results);
    } catch (error) {
      console.error("Full error details:", error.config); // Add this
      res.status(500).json({ error: "Failed to fetch places" });
    }
  };

module.exports = { getNearbyPlaces };
