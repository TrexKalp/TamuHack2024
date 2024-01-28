import React, { useEffect, useState } from "react";

import {
  Box,
  VStack,
  Heading,
  Button,
  SimpleGrid,
  Text,
  useColorModeValue,
  Image,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
  Flex,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { SearchIcon, BellIcon } from "@chakra-ui/icons";
import logo from "../assets/logolong.png";
import FlightMap from "./FlightMap";
import PlacesDisplay from "./PlacesDisplay";
import FlightCall from "./FlightCall";

const HomePage: React.FC = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.800");

  const images = [
    "https://travelprnews.com/wp-content/uploads/2021/11/https___specials-images.forbesimg.com_imageserve_920377840_0x0.jpg",
    "https://travelprnews.com/wp-content/uploads/2021/11/https___specials-images.forbesimg.com_imageserve_920377840_0x0.jpg",
    "https://travelprnews.com/wp-content/uploads/2021/11/https___specials-images.forbesimg.com_imageserve_920377840_0x0.jpg",
    "https://travelprnews.com/wp-content/uploads/2021/11/https___specials-images.forbesimg.com_imageserve_920377840_0x0.jpg",
    "https://travelprnews.com/wp-content/uploads/2021/11/https___specials-images.forbesimg.com_imageserve_920377840_0x0.jpg",
    "https://travelprnews.com/wp-content/uploads/2021/11/https___specials-images.forbesimg.com_imageserve_920377840_0x0.jpg",
    "https://travelprnews.com/wp-content/uploads/2021/11/https___specials-images.forbesimg.com_imageserve_920377840_0x0.jpg",
  ];

  const [localFlightNumber, setLocalFlightNumber] = useState<string>("");
  const [flightData, setFlightData] = useState<any | null>(null);
  const [fromIATA, setFromIATA] = useState("IAH");
  const [toIATA, setToIATA] = useState("LHR");

  useEffect(() => {
    if (localFlightNumber) {
      fetch(
        `http://localhost:4000/flights?date=2024-01-27&flightNumber=${localFlightNumber}`
      )
        .then((response) => response.json())
        .then((data) => setFlightData(data[0]))
        .catch((error) => console.error("Error fetching flight data:", error));
      setFromIATA(flightData.origin.code);
      setToIATA(flightData.destination.code);
    }
  }, [localFlightNumber]);

  const [fromICAO, setFromICAO] = useState("");
  const [toICAO, setToICAO] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const username = "nwvktBCjZEcFYDbXMOUo0w==OVLL6rKIDNbcL47Z";
      const password = "";
      const url = `https://api.api-ninjas.com/v1/airports?iata=${fromIATA}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.length > 0 && result[0].icao) {
          setFromICAO(result[0].icao);
        }
      }

      const url2 = `https://api.api-ninjas.com/v1/airports?iata=${toIATA}`;
      const response2 = await fetch(url2, {
        method: "GET",
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });

      if (response2.ok) {
        const result = await response2.json();
        if (result.length > 0 && result[0].icao) {
          setToICAO(result[0].icao);
        }
      }
    };

    fetchData();
  }, [fromIATA, toIATA]);

  const [text, setText] = useState("");
  const [polyline, setEncodedPolyline] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const username = "dJnwxZRcvhLLug8rb6KmGssOBlP4c73I6bIlgIT5";
      const password = "";
      const url = `https://cors-anywhere.herokuapp.com/https://api.flightplandatabase.com/search/plans?fromICAO=${fromICAO}&toICAO=${toICAO}&limit=1`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        // Check if encodedPolyline is present in the response
        if (result.length > 0 && result[0].encodedPolyline) {
          // Update the state with the encodedPolyline
          setEncodedPolyline(result[0].encodedPolyline);
        } else {
          console.error("encodedPolyline not found in the API response");
        }
      } else {
        console.error("Failed to fetch data");
      }
    };

    fetchData();
  }, [fromICAO, toICAO]);

  const encodedPolyline = polyline;
  const mapCenter = { lat: 40.714, lng: -74.005 }; // Example: New York City

  return (
    <Flex direction="column" h="100vh" mb="800px">
      <Box minH="100vh" py={5}>
        <VStack spacing={4}>
          <Heading>American Companion</Heading>

          <SimpleGrid columns={1} spacing={4} w="full" maxW="md" px={2}>
            <Box bg={cardBgColor} p={4} borderRadius="lg" shadow="md">
              <Image
                src="https://travelprnews.com/wp-content/uploads/2021/11/https___specials-images.forbesimg.com_imageserve_920377840_0x0.jpg"
                alt="Flight Quiz Logo"
                style={{ width: "100%", height: "100%", borderRadius: "5%" }}
              />
              {/* <Text
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                borderRadius="5%"
                overflow="hidden"
              >
                Your Journey Just Got Better with Our Inflight Companion.
              </Text> */}
            </Box>

            <FlightCall />

            <Box bg={cardBgColor} p={4} borderRadius="lg" shadow="md">
              <Heading size="md" mb={5}>
                Flight Map
              </Heading>
              <FlightMap
                encodedPolyline={encodedPolyline}
                style={{ marginRight: "20px" }}
              />
              <Heading size="md" mt={5}>
                Stops Along Your Trip
              </Heading>
              <PlacesDisplay />
              <Button mt={4} colorScheme="blue">
                Learn More
              </Button>
            </Box>

            {/* Aircraft Trivia Section */}
            <Box bg={cardBgColor} p={4} borderRadius="lg" shadow="md">
              <Heading size="md">Aircraft Trivia</Heading>
              <Text mt={2}>Did you know?</Text>
              {/* Placeholder for trivia content */}
            </Box>

            {/* Quiz Section */}
            <Box bg={cardBgColor} p={4} borderRadius="lg" shadow="md">
              <Heading size="md">Quiz</Heading>
              <Text mt={2}>Test your knowledge</Text>

              <Link to="/quiz">
                <Button mt={4} colorScheme="blue">
                  Start Quiz
                </Button>
              </Link>
            </Box>

            {/* Diagram Section */}
            <Box bg={cardBgColor} p={4} borderRadius="lg" shadow="md">
              <Heading size="md">Your Aircraft</Heading>
              <Text mt={2}>Learn about your plane</Text>
              <Link to="/diagram">
                <Button mt={4} colorScheme="blue">
                  Learn
                </Button>
              </Link>
            </Box>
          </SimpleGrid>
        </VStack>
      </Box>
    </Flex>
  );
};

export default HomePage;
