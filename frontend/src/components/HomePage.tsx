import React, { useEffect, useState } from "react";
import axios from "axios";

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
import Leaderboard from "./Leaderboard";
import DaeModel from "./DaeModel";
import landing from "../assets/airlines.png";
import FlightLeaderboard from "./FlightLeaderboard.tsx";
import { globalTopic } from "./GlobalTopic.tsx";

const HomePage: React.FC = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.800");

  const [localFlightNumber, setLocalFlightNumber] = useState<string>("");
  const [flightData, setFlightData] = useState<any | null>(null);
  const [fromIATA, setFromIATA] = useState<string>("");
  const [toIATA, setToIATA] = useState<string>("");
  const storedFlightNumber = localStorage.getItem("flightNumber");
  const [fromICAO, setFromICAO] = useState("");
  const [toICAO, setToICAO] = useState("");
  const [polyline, setEncodedPolyline] = useState("");
  useEffect(() => {
    const manageMap = async () => {
      setLocalFlightNumber(storedFlightNumber ?? "");
    };
    manageMap();
  });

  useEffect(() => {
    const getData = async () => {
      if (storedFlightNumber) {
        try {
          const response = await fetch(
            `http://localhost:4000/flights?date=2024-01-27&flightNumber=${localFlightNumber}`
          );
          const data = await response.json();

          if (data && data.length > 0) {
            // Set flightData and IATA codes inside the .then block

            setFlightData(data[0]);
            setFromIATA(data[0].origin.code);
            setToIATA(data[0].destination.code);
            globalTopic["landmarkTopic"] =
              "Make questions about the city that the airport " +
              data[0].destination.code +
              " is located in. DO NOT MENTION THE AIRPORT CODE. ONLY ASK HISTORICAL QUESTIONS WITH ABOUT THE CITY ITSELF.";
          } else {
            console.error("Flight data not found.");
          }
        } catch (error) {
          console.error("Error fetching flight data:", error);
        }
      }
    };

    getData();
  }, [localFlightNumber]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.api-ninjas.com/v1/airports?iata=${fromIATA}`,
          {
            headers: {
              "X-Api-key": import.meta.env.VITE_APP_API_NINJA,
            },
          }
        );

        setFromICAO(response.data[0].icao);
      } catch (error) {
        console.error("Error fetching data for fromIATA:", error);
      }
    };

    fetchData();
  }, [fromIATA]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.api-ninjas.com/v1/airports?iata=${toIATA}`,
          {
            headers: {
              "X-Api-key": "nwvktBCjZEcFYDbXMOUo0w==OVLL6rKIDNbcL47Z",
            },
          }
        );

        setToICAO(response.data[0].icao);
      } catch (error) {
        console.error("Error fetching data for toIATA:", error);
      }
    };

    fetchData();
  }, [toIATA]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "8tmSfVuqXzTZVsdIhvhkjbjIMUQnqAuzxhMcBeV7"; // Replace with your API key

        const response = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.flightplandatabase.com/search/plans?fromICAO=${fromICAO}&toICAO=${toICAO}&limit=1`,
          {
            headers: {
              Authorization: `Basic ${btoa(`${apiKey}:`)}`,
            },
          }
        );

        setEncodedPolyline(response.data[0].encodedPolyline);
        localStorage.setItem(
          "encodedPolyline",
          response.data[0].encodedPolyline
        );
      } catch (error) {}
    };

    fetchData();
  }, [fromICAO, toICAO]); // Run once on component mount

  const encodedPolyline = polyline;
  const mapCenter = { lat: 40.714, lng: -74.005 }; // Example: New York City

  return (
    <Flex direction="column" h="100vh" marginBottom="100px">
      <Box minH="100vh" py={5}>
        <VStack spacing={4}>
          <Heading>Welcome To Airbud!</Heading>
          <Text mt={-4}>Your personal in-flight companion.</Text>

          <SimpleGrid columns={1} spacing={4} w="full" maxW="md" px={2} mb={10}>
            <Box bg={cardBgColor} p={4} borderRadius="lg" shadow="md">
              <Image
                src={landing}
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

              <Heading size="md" mt={8}>
                Flight Leaderboard
              </Heading>
              <FlightLeaderboard />

              <Heading size="md" mt={3}>
                Landmarks Along Your Trip
              </Heading>
              <PlacesDisplay />
            </Box>
            {/* 
            <Box bg={cardBgColor} p={4} borderRadius="lg" shadow="md">
              <Heading size="md">Aircraft Trivia</Heading>
              <Text mt={2}>Did you know?</Text>]
            </Box> */}

            {/* <Box bg={cardBgColor} p={4} borderRadius="lg" shadow="md">
              <Heading size="md">Quiz</Heading>
              <Text mt={2}>Test your knowledge</Text>

              <Link to="/quiz">
                <Button mt={4} colorScheme="blue">
                  Start Quiz
                </Button>
              </Link>
            </Box> */}

            {/* <Box
              bg={cardBgColor}
              p={4}
              borderRadius="lg"
              shadow="md"
              mb="100px"
            >
              <Heading size="md">Your Aircraft</Heading>
              <Text mt={2}>Learn about your plane</Text>
              <Link to="/diagram">
                <Button mt={4} colorScheme="blue">
                  Learn
                </Button>
              </Link>
            </Box> */}
          </SimpleGrid>
        </VStack>
      </Box>
    </Flex>
  );
};

export default HomePage;
