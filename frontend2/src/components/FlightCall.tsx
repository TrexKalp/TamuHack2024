import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  StatHelpText,
  useColorModeValue,
  Flex,
  Icon,
  Stack,
  Badge,
} from "@chakra-ui/react";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaRulerHorizontal,
  FaClock,
} from "react-icons/fa";

const FlightCall: React.FC = () => {
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
        .then((response) => response.json())
        .then((data) => setFlightData(data[0]))
        .catch((error) => console.error("Error fetching flight data:", error));
    }
  }, [localFlightNumber]);

  const boxBg = useColorModeValue("blue.50", "blue.900");
  const statBg = useColorModeValue("white", "gray.800");

  return (
    <VStack spacing={5} align="stretch" p={5}>
      {flightData && (
        <Box bg={boxBg} borderWidth="1px" borderRadius="lg" p={5} shadow="lg">
          <Heading size="lg" mb={3}>
            Flight: {localFlightNumber}
          </Heading>
          <Badge colorScheme="green" p={2} borderRadius="full">
            On Time
          </Badge>
          <Divider mb={4} />
          <StatGroup>
            <Stat bg={statBg} p={3} borderRadius="lg" shadow="md">
              <Flex alignItems="center">
                <Icon
                  as={FaPlaneDeparture}
                  w={6}
                  h={6}
                  mr={2}
                  color="green.500"
                />
                <StatLabel>Origin</StatLabel>
              </Flex>
              <StatNumber>
                {flightData.origin.city} ({flightData.origin.code})
              </StatNumber>
              <StatHelpText>
                Departure: {new Date(flightData.departureTime).toLocaleString()}
              </StatHelpText>
            </Stat>

            <Stat bg={statBg} p={3} borderRadius="lg" shadow="md">
              <Flex alignItems="center">
                <Icon as={FaPlaneArrival} w={6} h={6} mr={2} color="red.500" />
                <StatLabel>Destination</StatLabel>
              </Flex>
              <StatNumber>
                {flightData.destination.city} ({flightData.destination.code})
              </StatNumber>
              <StatHelpText>
                Arrival: {new Date(flightData.arrivalTime).toLocaleString()}
              </StatHelpText>
            </Stat>
          </StatGroup>

          <Divider my={4} />

          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Stat bg={statBg} p={3} borderRadius="lg" shadow="md">
              <Flex alignItems="center">
                <Icon
                  as={FaRulerHorizontal}
                  w={5}
                  h={5}
                  mr={2}
                  color="purple.500"
                />
                <StatLabel>Distance</StatLabel>
              </Flex>
              <StatNumber>{flightData.distance} miles</StatNumber>
            </Stat>

            <Stat bg={statBg} p={3} borderRadius="lg" shadow="md">
              <Flex alignItems="center">
                <Icon as={FaClock} w={5} h={5} mr={2} color="orange.500" />
                <StatLabel>Duration</StatLabel>
              </Flex>
              <StatNumber>{flightData.duration.locale}</StatNumber>
            </Stat>
          </Stack>
        </Box>
      )}
    </VStack>
  );
};

export default FlightCall;
