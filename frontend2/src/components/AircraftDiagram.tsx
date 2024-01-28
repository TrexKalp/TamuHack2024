import React from "react";
import Engine from "./DiagramInfo/Engine.tsx";
import InfoText from "./DiagramInfo/InfoText.tsx";

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

  const [infoText, setInfoText] = useState(
    "Click on the highlighted areas to learn about them!"
  );

  const handleClick = (areaId: string) => {
    // Perform different actions based on the clicked area
    switch (areaId) {
      case "area1":
        console.log("Clicked on Area 1");
        setInfoText(
          "Engines make the tremendous power needed to propel the aircraft through the sky.\n" +
            'The engines "breathe in" massive amounts of air, mix it with fuel, and then ignite it, creating a controlled explosion that releases an incredible amount of energy.\n' +
            "The powerful explosion inside the engine creates a force that gets pushed out of the back of the engine at an extremely high speed. This force, also known as thrust, is what makes the plane zoom forward through the air.\n" +
            "It's like blowing up a balloon and letting it go, but on a much larger and more controlled scale."
        );
        break;
      case "area2":
        console.log("Clicked on Area 2");
        setInfoText("This is the second area!");
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
              borderRadius: "30%", // To make the highlight circular
            }}
            onClick={() => toggleVisibility("engine")}
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
              borderRadius: "30%", // To make the highlight circular
            }}
            /*onClick={() => handleClick("area2")}*/
          ></div>

          <Image src="..\src\assets\plane_pic.jpg" />
        </div>
        <Text fontSize="lg">{infoText}</Text>
      </VStack>
    </Box>
  );
};

export default AircraftDiagram;
