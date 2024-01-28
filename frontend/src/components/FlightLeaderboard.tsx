import React from "react";
import {
  Avatar,
  Box,
  VStack,
  Text,
  Badge,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { MdOutlineEmojiEvents } from "react-icons/md"; // Import medal icon from react-icons

const FlightMembers = () => {
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // Function to return the appropriate icon based on index
  const getMedalIcon = (index) => {
    const colorScheme = ["#FFD700", "#C0C0C0", "#CD7F32"];
    return (
      <Icon
        as={MdOutlineEmojiEvents}
        color={colorScheme[index]}
        boxSize={6}
        mr={2}
      />
    );
  };

  const members = [
    { id: 1, name: "Emma Johnson", seat: "7A", points: 1800 },
    { id: 2, name: "Noah Smith", seat: "14B", points: 1500 },
    { id: 3, name: "Olivia Williams", seat: "21C", points: 1300 },
  ];

  return (
    <VStack
      spacing={4}
      p={4}
      bg={useColorModeValue("blue.50", "blue.900")}
      borderRadius="md"
      alignItems="start"
      mt={5}
    >
      {members.map((member, index) => (
        <Box
          key={member.id}
          p={4}
          bg={bg}
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="lg"
          boxShadow="lg"
          width="100%"
          _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
          transition="all 0.2s ease-in-out"
        >
          <VStack spacing={2} align="start">
            {index < 3 && getMedalIcon(index)}{" "}
            {/* Display medal icon for top 3 members */}
            <Avatar
              name={member.name}
              src={`https://i.pravatar.cc/150?u=${member.id}`}
            />
            <Text fontWeight="bold" fontSize="lg">
              {member.name}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Seat: {member.seat}
            </Text>
            <Badge colorScheme="purple" py={1} px={2}>
              {member.points} pts
            </Badge>
          </VStack>
        </Box>
      ))}
    </VStack>
  );
};

export default FlightMembers;
