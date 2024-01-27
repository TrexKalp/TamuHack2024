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

const AircraftDiagram = () => {
  const bgColor = useColorModeValue("gray.100", "gray.700"); // Responsive background color for light/dark mode
  const textColor = useColorModeValue("gray.800", "gray.100"); // Responsive text color for light/dark mode

  const handleClick = (areaId: string) => {
    // Perform different actions based on the clicked area
    switch (areaId) {
      case "area1":
        console.log("Clicked on Area 1");
        // Add your logic for Area 1
        break;
      case "area2":
        console.log("Clicked on Area 2");
        // Add your logic for Area 2
        break;
      // Add more cases for other areas as needed
      default:
        break;
    }
  };

  return (
    <Box
      w="100vw"
      h="100vh"
      bg={bgColor}
      display="flex"
      alignItems="top"
      justifyContent="center"
    >
      <VStack spacing={8} p={5} align="center">
        <Heading color={textColor}>All About Your Plane!</Heading>
        <Text fontSize="lg" color={textColor}>
          Discover everything about the plane you're flying in. From history to
          how it was made and more.
        </Text>
        <div style={{ position: "relative" }}>
          {/* Highlight Area 1 */}
          <div
            style={{
              position: "absolute",
              top: "30vw",
              left: "42vw",
              width: "15vw",
              height: "15vw",
              backgroundColor: "rgba(106, 106, 107, 0.3)", // Red highlight (adjust color as needed)
              pointerEvents: "none", // To allow clicking through the overlay
              borderRadius: "30%", // To make the highlight circular
            }} 
            onClick={() => handleClick("area1")}
          ></div>

          {/* Highlight Area 2 */}
          <div
            style={{
              position: "absolute",
              top: "35vw",
              left: "76vw",
              width: "10vw",
              height: "10vw",
              backgroundColor: "rgba(106, 106, 107, 0.3)", // Blue highlight (adjust color as needed)
              pointerEvents: "none",
              borderRadius: "30%", // To make the highlight circular
            }} 
            onClick={() => handleClick("area2")}
          ></div>

          <Image src="..\src\assets\plane_pic.jpg" />
        </div>
      </VStack>
    </Box>
  );
};

export default AircraftDiagram;
