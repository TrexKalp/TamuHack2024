import React, { useState, useEffect } from "react";
import { Box, Image, Text, HStack, VStack } from "@chakra-ui/react";
import axios from "axios";

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
  const [localFlightNumber, setLocalFlightNumber] = useState<string>("");
  const [flightData, setFlightData] = useState<any | null>(null);

  useEffect(() => {
    const storedFlightNumber = localStorage.getItem("flightNumber");
    if (storedFlightNumber) {
      setLocalFlightNumber(storedFlightNumber);
    }
  }, []);

  useEffect(() => {
    if (localFlightNumber) {
      fetch(
        `http://localhost:4000/flights?date=2024-01-27&flightNumber=${localFlightNumber}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data.length > 0) {
            setFlightData(data[0]);
          } else {
            console.log("No flight data found for this flight number");
          }
        })
        .catch((error) => console.error("Error fetching flight data:", error));
    } else {
      console.log("No local flight number found");
    }
  }, [localFlightNumber]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://opentripmap-places-v1.p.rapidapi.com/en/places/radius",
      params: {
        radius: "250",
        lon: "38.364285",
        lat: "59.855685",
      },
      headers: {
        "X-RapidAPI-Key": "c21c76fa2fmshca97611323aace0p1c3a66jsn9faa413d8ab5",
        "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((response) => {
        setPlaces(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Error fetching places");
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
        {places.features.map((place, index) => (
          <Box key={index} position="relative" minW="200px">
            <Image
              src={placeholderImageUrl}
              alt={place.properties.name}
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
              {place.properties.name}
            </Text>
          </Box>
        ))}
      </HStack>
    </VStack>
  );
};

export default PlacesDisplay;
