import React, { useState } from "react";
import Engine from "./DiagramInfo/Engine.tsx";
import InfoText from "./DiagramInfo/InfoText.tsx";
import LandingGear from "./DiagramInfo/LandingGear.tsx";
import Wing from "./DiagramInfo/Wing.tsx";
import Cockpit from "./DiagramInfo/Cockpit.tsx";

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

  const [elementVisibility, setElementVisibility] = useState({
    infoText: true,
    engine: false,
    gear: false,
    wing: false,
    cockpit: false,
  });

  const toggleVisibility = (elementId) => {
    // Create a new object with all elements set to false
    const newElementVisibility = Object.fromEntries(
      Object.keys(elementVisibility).map((key) => [key, false])
    );

    // Toggle the visibility of the clicked element
    newElementVisibility[elementId] = true;

    // Update the state
    setElementVisibility(newElementVisibility);
  };

  return (
    <Box
      w="100vw"
      bg={bgColor}
      display="flex"
      alignItems="top"
      justifyContent="center"
    >
      <VStack spacing={8} p={5} align="center">
        <Heading color={textColor}>All About Your Plane!</Heading>
        <Text fontSize="lg" color={textColor}>
          Discover everything about the plane you're flying in.
        </Text>
        <div style={{ position: "relative" }}>
          {/* Highlight Area 1 */}
          <div
            style={{
              position: "absolute",
              top: "28vw",
              left: "40vw",
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
              left: "74vw",
              width: "10vw",
              height: "10vw",
              backgroundColor: "rgba(106, 106, 107, 0.3)", // Blue highlight (adjust color as needed)
              borderRadius: "30%", // To make the highlight circular
            }}
            onClick={() => toggleVisibility("gear")}
          ></div>

          <div
            style={{
              position: "absolute",
              top: "22vw",
              left: "9vw",
              width: "30vw",
              height: "15vw",
              backgroundColor: "rgba(106, 106, 107, 0.3)", // Blue highlight (adjust color as needed)
              borderRadius: "30%", // To make the highlight circular
            }}
            onClick={() => toggleVisibility("wing")}
          ></div>

          <div
            style={{
              position: "absolute",
              top: "20vw",
              left: "75vw",
              width: "13vw",
              height: "13vw",
              backgroundColor: "rgba(106, 106, 107, 0.3)", // Blue highlight (adjust color as needed)
              borderRadius: "30%", // To make the highlight circular
            }}
            onClick={() => toggleVisibility("cockpit")}
          ></div>

          <Image src="..\src\assets\plane_pic.jpg" />
        </div>
        {elementVisibility.infoText && <InfoText></InfoText>}
        {elementVisibility.engine && <Engine></Engine>}
        {elementVisibility.gear && <LandingGear></LandingGear>}
        {elementVisibility.wing && <Wing></Wing>}
        {elementVisibility.cockpit && <Cockpit></Cockpit>}
      </VStack>
    </Box>
  );
};

export default AircraftDiagram;
