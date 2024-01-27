import React from "react";
import { Box, Text, Button, VStack } from "@chakra-ui/react";

const ConfirmationScreen = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" h="100vh">
      <VStack spacing={4}>
        <Text>Your flight details have been submitted successfully!</Text>
        <Button colorScheme="blue">Proceed</Button>
      </VStack>
    </Box>
  );
};

export default ConfirmationScreen;
