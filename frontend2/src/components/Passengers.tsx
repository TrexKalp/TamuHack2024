import React from "react";
import { HStack, Box, Text, Icon } from "@chakra-ui/react";
import { FaChair } from "react-icons/fa";

interface Passenger {
  id: number;
  name: string;
  seatNumber: string;
}

const Passengers: React.FC = () => {
  const passengers: Passenger[] = [
    { id: 1, name: "John Doe", seatNumber: "12A" },
    { id: 2, name: "Jane Doe", seatNumber: "12B" },
    // Add more passengers as needed
  ];

  return (
    <HStack overflowX="auto" spacing={4} p={4}>
      {passengers.map((passenger) => (
        <Box key={passenger.id} bg="gray.200" p={4} borderRadius="md">
          <Icon as={FaChair} w={6} h={6} />
          <Text>{passenger.name}</Text>
          <Text>{passenger.seatNumber}</Text>
        </Box>
      ))}
    </HStack>
  );
};

export default Passengers;
