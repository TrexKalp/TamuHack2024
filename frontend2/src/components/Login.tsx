import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Adjust the import path as necessary

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [flightNumber, setFlightNumber] = useState<string>("");
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (
    e: React.FormEvent<HTMLDivElement>
  ): Promise<void> => {
    e.preventDefault();

    // Implement your actual login logic here...
    try {
      // Simulate a login API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      login(); // Update the auth context to reflect that the user is authenticated
      localStorage.setItem("flightNumber", flightNumber); // Store the flight number in local storage
      navigate("/"); // Redirect to the main page

      // Optionally, display a success message
      toast({
        title: "Login Successful",
        description: "You've been logged in.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      // Handle login error
      toast({
        title: "An error occurred.",
        description: "Unable to login with provided credentials.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      as="form"
      onSubmit={handleLogin}
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <VStack spacing={8} width="400px">
        <Heading textAlign="center" size="xl">
          Login
        </Heading>
        <Box p={4} borderWidth={1} borderRadius="lg">
          {/* Email and Password Inputs */}
          <FormControl id="flightNumber" mt={4}>
            <FormLabel>Flight Number</FormLabel>
            <Input
              type="text"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="red" width="full" mt={4}>
            Login To Your Flight
          </Button>
        </Box>
      </VStack>
    </Flex>
  );
};

export default Login;
