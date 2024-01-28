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
import { useAuth } from "./AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from AuthContext

  const handleLogin = async (e) => {
    e.preventDefault();

    // Here you'd replace this with your actual login logic,
    // such as making an API call to your authentication service
    try {
      // Simulate a login API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network request

      login(); // Update the auth context to reflect that the user is authenticated
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

  const [flightNumber, setFlightNumber] = useState("");

  return (
    <Flex
      as="form"
      onSubmit={handleLogin}
      direction="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <VStack spacing={8} width="400px">
        <Heading textAlign="center" size="xl">
          Login
        </Heading>
        <Box p={4} borderWidth={1} borderRadius="lg">
          <Heading size="md" mb={4}>
            Please sign in
          </Heading>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" mt={4} isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl id="flightNumber" mt={4}>
            <FormLabel>Flight Number</FormLabel>
            <Input
              type="text"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full" mt={4}>
            Login
          </Button>
          <Button type="submit" colorScheme="red" width="full" mt={4}>
            Login with American Airlines
          </Button>
        </Box>
      </VStack>
    </Flex>
  );
};

export default Login;
