import React from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

const HomePage = ({ onStartQuiz }) => {
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
        <Heading color={textColor}>Welcome To The Flight Companion!</Heading>
        <Text fontSize="lg" color={textColor}>
          Test your aviation knowledge and learn interesting facts about the
          world of flight.
        </Text>
        <Button colorScheme="blue" size="lg" onClick={onStartQuiz}>
          Start Quiz
        </Button>
      </VStack>
    </Box>
  );
};

export default HomePage;
