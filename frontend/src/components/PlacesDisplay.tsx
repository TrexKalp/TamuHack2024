import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Text,
  Flex,
  Icon,
  useColorModeValue,
  Fade,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Badge,
  Button,
  Image,
  LinkBox,
  LinkOverlay,
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import { Tooltip } from "@chakra-ui/react";
import { FaMapMarkedAlt, FaMapPin, FaStreetView } from "react-icons/fa";

interface PlaceFeature {
  properties: {
    name: string;
  };
}

interface PlacesResponse {
  features: PlaceFeature[];
}

// Function to decode polyline
function decodePolyline(encoded) {
  let points = [];
  let index = 0,
    len = encoded.length;
  let lat = 0,
    lng = 0;

  while (index < len) {
    let b,
      shift = 0,
      result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    let dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    let dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    points.push({ lat: lat / 1e5, lng: lng / 1e5 });
  }

  return points;
}

const PlacesDisplay: React.FC = () => {
  const [places, setPlaces] = useState<PlaceFeature[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const encodedPolyline = localStorage.getItem("encodedPolyline");
    if (encodedPolyline) {
      const points = decodePolyline(encodedPolyline);

      // Sample points if there are too many to manage API requests
      points.forEach((point, index) => {
        if (index % 5 === 0) {
          // Example: Fetch places for every 10th point
          const options = {
            method: "GET",
            url: "https://opentripmap-places-v1.p.rapidapi.com/en/places/radius",
            params: {
              radius: "10000",
              lon: point.lng.toString(),
              lat: point.lat.toString(),
              kinds: "historical_places",
              limit: "10",
            },
            headers: {
              "X-RapidAPI-Key":
                "710e73b16cmsh6805e995b5ca6b3p1a6384jsn459fe4a45b61",
              "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
            },
          };

          axios
            .request<PlacesResponse>(options)
            .then((response) => {
              setPlaces((prevPlaces) => [
                ...new Set([...prevPlaces, ...response.data.features]),
              ]);
            })
            .catch((error) => {
              console.error(error);
              setError("Error fetching places");
            });
        }
      });

      setLoading(false);
    } else {
      setError("No encoded polyline found");
      setLoading(false);
    }
  }, []);

  if (loading) return <Box>Loading...</Box>;
  if (error) return <Box>Error: {error}</Box>;

  const bg = useColorModeValue("white", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.600");
  const borderColor = useColorModeValue("gray.200", "gray.500");

  return (
    <VStack spacing={5} align="stretch" p={5}>
      {places.slice(0, 6).map(
        (place, index) =>
          place.properties.name && (
            <LinkBox
              key={index}
              as="article"
              p="5"
              bg={bg}
              borderWidth="1px"
              borderRadius="lg"
              shadow="md"
              borderColor={borderColor}
              _hover={{
                bg: hoverBg,
                transform: "translateY(-2px)",
                transition: "all .2s ease-in-out",
              }}
            >
              <Flex justify="space-between" align="center">
                <Flex align="center">
                  <Icon as={FaMapPin} color="red.500" boxSize={5} mr={2} />
                  <Text fontSize="lg" fontWeight="bold" mr={2}>
                    <LinkOverlay
                      href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${place.geometry.coordinates[1]},${place.geometry.coordinates[0]}`}
                      isExternal
                    >
                      {place.properties.name}
                    </LinkOverlay>
                  </Text>
                </Flex>
                <Tooltip label="View Street View" hasArrow>
                  <IconButton
                    as="a"
                    href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${place.geometry.coordinates[1]},${place.geometry.coordinates[0]}`}
                    aria-label="View Street View"
                    icon={<FaStreetView />}
                    size="sm"
                    colorScheme="teal"
                    variant="ghost"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                </Tooltip>
              </Flex>
              {/* Additional details or interactive elements can be added here */}
            </LinkBox>
          )
      )}
    </VStack>
  );
};

export default PlacesDisplay;
