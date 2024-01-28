const express = require("express");
const axios = require('axios');
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/flightplan", async (req, res) => {
  try {
    const response = await axios.get('https://api.flightplandatabase.com/search/plans', {
      auth: {
        username: 'YOUR_API_KEY', // replace with your API key
        password: ''
      },
      params: {
        fromICAO: req.query.fromICAO,
        toName: req.query.toName,
        limit: req.query.limit || 1
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
