const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3001; // Use environment variable for port or default to 3001

// Enable JSON parsing for POST requests
app.use(express.json());

// Allow CORS - For development purposes only, adjust for production
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/api/searchNearby", async (req, res) => {
  try {
    const response = await axios.post(
      "https://places.googleapis.com/v1/places:searchNearby",
      {
        includedTypes: ["museum"],
        maxResultCount: 10,
        locationRestriction: {
          circle: {
            center: { latitude: 37.7937, longitude: -122.3965 },
            radius: 500.0,
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": "AIzaSyALs4j7Aw0B1OVAnxV2r9PQ-0WtIp1B9lI", // Securely store and use your API key
          "X-Goog-FieldMask": "places.displayName",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
