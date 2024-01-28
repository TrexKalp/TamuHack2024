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

  const [text, setText] = useState("");
  const [polyline, setEncodedPolyline] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const username = "dJnwxZRcvhLLug8rb6KmGssOBlP4c73I6bIlgIT5";
      const password = "";
      const url =
        "https://cors-anywhere.herokuapp.com/https://api.flightplandatabase.com/search/plans?fromICAO=KIAH&toName=Kennedy&limit=1";

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
  }, []);

  const encodedPolyline = polyline;
  const mapCenter = { lat: 40.714, lng: -74.005 }; // Example: New York City

  useEffect(() => {
    fetch("http://localhost:3000")
      .then((response) => response.text())
      .then((data) => setText(data));
  }, []);

  return (
    <Flex direction="column" h="100vh" mb="250px">
      <Box minH="100vh" py={5}>
        <VStack spacing={4}>
          <Heading>American Companion</Heading>

          <SimpleGrid columns={1} spacing={4} w="full" maxW="md" px={2}>
            <Image
              src="https://travelprnews.com/wp-content/uploads/2021/11/https___specials-images.forbesimg.com_imageserve_920377840_0x0.jpg"
              alt="Flight Quiz Logo"
              style={{ width: "100%", height: "100%", borderRadius: "5%" }}
            />

            <Box bg={cardBgColor} p={4} borderRadius="lg" shadow="md">
              <Heading size="md">Flight Map</Heading>
              <FlightMap
                encodedPolyline={encodedPolyline}
                style={{ marginRight: "20px" }}
              />
              <Heading size="md">Stops Along Your Trip</Heading>
              <Flex overflowX="scroll" mt={4}>
                {images.map((image, index) => (
                  <Box key={index} minWidth="160px" mr={4} _last={{ mr: 0 }}>
                    <Image
                      src={image}
                      alt={`Landmark ${index + 1}`}
                      borderRadius="md"
                    />
                  </Box>
                ))}
              </Flex>
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
