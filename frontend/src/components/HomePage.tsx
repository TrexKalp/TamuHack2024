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

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  useEffect(() => {
    const manageMap = async () => {
      setLocalFlightNumber(storedFlightNumber ?? "0123");
    };
    manageMap();
  });

  useEffect(() => {
    const getData = async () => {
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
        } else {
          console.error("Flight data not found.");
        }
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };

    getData();
  }, [localFlightNumber]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.api-ninjas.com/v1/airports?iata=${fromIATA}&X-Api-key=nwvktBCjZEcFYDbXMOUo0w==OVLL6rKIDNbcL47Z`
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
          `https://api.api-ninjas.com/v1/airports?iata=${toIATA}&X-Api-key=nwvktBCjZEcFYDbXMOUo0w==OVLL6rKIDNbcL47Z`
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
        const response = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.flightplandatabase.com/search/plans?fromICAO=${fromICAO}&toICAO=${toICAO}&limit=1`
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
          <Heading>American Companion</Heading>

          <SimpleGrid columns={1} spacing={4} w="full" maxW="md" px={2}>
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

              <Heading size="md" mt={5}>
                Leaderboard
                <Leaderboard />
              </Heading>

              <Heading size="md" mt={5}>
                Landmarks Along Your Trip
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
            <Box
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
            </Box>
          </SimpleGrid>
        </VStack>
      </Box>
    </Flex>
  );
};

export default HomePage;
