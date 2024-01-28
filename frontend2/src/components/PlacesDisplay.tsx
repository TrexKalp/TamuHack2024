import React, { useState, useEffect } from "react";

interface Place {
  displayName: {
    text: string;
    languageCode: string;
  };
}

const PlacesDisplay: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Direct API call (not recommended for production due to exposed API key)
    fetch("https://places.googleapis.com/v1/places:searchNearby", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": "AIzaSyALs4j7Aw0B1OVAnxV2r9PQ-0WtIp1B9lI", // Replace 'YOUR_API_KEY' with your actual Google API key
        "X-Goog-FieldMask": "places.displayName",
      },
      body: JSON.stringify({
        includedTypes: ["museum"],
        maxResultCount: 10,
        locationRestriction: {
          circle: {
            center: { latitude: 37.7937, longitude: -122.3965 },
            radius: 500.0,
          },
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPlaces(data.places);
        setLoading(false);
      })
      .catch((err) => {
        console.error("There was an error!", err);
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Nearby Places</h2>
      <ul>
        {places.map((place, index) => (
          <li key={index}>{place.displayName.text}</li> // Displaying the 'text' part of 'displayName'
        ))}
      </ul>
    </div>
  );
};

export default PlacesDisplay;
