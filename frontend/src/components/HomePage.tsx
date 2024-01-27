import React from "react";
import {
  Box,
  VStack,
  Heading,
  Button,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const HomePage = ({ onStartQuiz }) => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.800");

  return (
    <Box bg={bgColor} minH="100vh" py={5}>
      <VStack spacing={4}>
        <Heading>Flight Quiz App</Heading>

        <SimpleGrid columns={1} spacing={4} w="full" maxW="md" px={2}>
          {/* Leaderboard Section */}
          <Box bg={cardBgColor} p={4} borderRadius="lg" shadow="md">
            <Heading size="md">Leaderboard</Heading>
            <Text mt={2}>Top scores of the week</Text>
            {/* Placeholder for leaderboard content */}
          </Box>

          {/* Landmark Map Section */}
          <Box bg={cardBgColor} p={4} borderRadius="lg" shadow="md">
            <Heading size="md">Landmark Map</Heading>
            <Text mt={2}>Explore famous landmarks</Text>
            {/* Placeholder for map content */}
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
            <Button mt={4} colorScheme="blue" onClick={onStartQuiz}>
              Start Quiz
            </Button>
          </Box>
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default HomePage;
