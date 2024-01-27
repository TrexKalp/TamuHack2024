import React from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";

const LandingPage = ({ onStartQuiz }) => {
  const bgColor = useColorModeValue("gray.100", "gray.700"); // Responsive background color for light/dark mode
  const textColor = useColorModeValue("gray.800", "gray.100"); // Responsive text color for light/dark mode

  return (
    <Box
      w="100vw"
      h="100vh"
      bg={bgColor}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={8} p={5} align="center">
        <Heading color={textColor}>All About Your Plane!</Heading>
        <Text fontSize="lg" color={textColor}>
          Discover everything about the plane you're flying in from history
          to how it was made.
        </Text>
        <Image src="frontend\src\components\AircraftDiagram.tsx">

        </Image>
      </VStack>
    </Box>
  );
};

export default LandingPage;
