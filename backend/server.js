const express = require("express");
const axios = require('axios');
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

app.post('/api/flightNum', async (req, res) => {
  try {
    const { iata } = req.body;
    const url = `https://api.api-ninjas.com/v1/airports?iata=${iata}`;

    const response = await axios.get(url, {
      headers: {
        'X-Api-Key': 'nwvktBCjZEcFYDbXMOUo0w==OVLL6rKIDNbcL47Z',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(`Error: ${error.response ? error.response.status : 'Unknown'}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/getPath', async (req, res) => {
  try {
      // Make API call to external service
      const username = "dJnwxZRcvhLLug8rb6KmGssOBlP4c73I6bIlgIT5";
      const password = "";
      const url = 'https://cors-anywhere.herokuapp.com/https://api.flightplandatabase.com/search/plans';

      const response3 = await axios.get(url, {
        method: "GET",
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });

      res.json(apiResponse.data);
  } catch (error) {
      console.error(`Error: ${error.response.status}`);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
