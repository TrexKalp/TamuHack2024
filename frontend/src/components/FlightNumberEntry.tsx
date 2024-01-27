import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

const FlightNumberEntry = ({
  onFlightNumberEntered,
}: {
  onFlightNumberEntered: (flightNumber: string) => void;
}) => {
  const [flightNumber, setFlightNumber] = useState("");

  const handleSubmit = () => {
    // Implement submission logic here
    // For demonstration, we'll call onFlightNumberEntered when the button is clicked
    onFlightNumberEntered(flightNumber);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" h="100vh">
      <VStack spacing={4}>
        <FormControl id="flightNumber">
          <FormLabel>Flight Number</FormLabel>
          <Input
            type="text"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Submit
        </Button>
      </VStack>
    </Box>
  );
};

export default FlightNumberEntry;
