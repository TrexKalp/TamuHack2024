import React, { useEffect, useState } from "react";
import { Box, Image, Text, VStack, Spinner } from "@chakra-ui/react";
import logolong from "../assets/logolong.png";

const SplashScreen = ({ onLoaded }: { onLoaded: () => void }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      onLoaded(); // Callback function to signal that loading is complete
    }, 500); // Adjust the timeout duration as needed

    return () => clearTimeout(timer);
  }, [onLoaded]);

  if (!loading) {
    return null; // or transition to your main app content
  }

  return (
    <Box
      w="100vw"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="blue.500"
    >
      <VStack spacing={{ base: 3, md: 4 }} paddingX={{ base: 4, md: 8 }}>
        <Image
          src={logolong}
          boxSize={{ base: "80px", md: "100px", lg: "120px" }}
          alt="Flight Quiz Logo"
        />
        <Text
          fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
          color="white"
          textAlign="center"
        >
          Flight Quiz
        </Text>
        <Spinner size="xl" color="white" thickness="4px" />
      </VStack>
    </Box>
  );
};

export default SplashScreen;
