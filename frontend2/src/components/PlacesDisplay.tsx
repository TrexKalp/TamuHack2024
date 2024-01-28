import React, { useState, useEffect } from "react";
import { Box, Image, Text, HStack, VStack } from "@chakra-ui/react";

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

  const placeholderImageUrl =
    "https://travelprnews.com/wp-content/uploads/2021/11/https___specials-images.forbesimg.com_imageserve_920377840_0x0.jpg"; // URL of the placeholder image

  return (
    <VStack spacing={4} align="stretch">
      <HStack overflowX="auto" spacing={4} p={4}>
        {places.map((place, index) => (
          <Box key={index} position="relative" minW="200px">
            <Image
              src={placeholderImageUrl}
              alt={place.displayName.text}
              borderRadius="md"
            />
            <Text
              position="absolute"
              bottom="0"
              width="100%"
              textAlign="center"
              bgColor="rgba(0, 0, 0, 0.5)"
              color="white"
            >
              {place.displayName.text}
            </Text>
          </Box>
        ))}
      </HStack>
    </VStack>
  );
};

export default PlacesDisplay;
