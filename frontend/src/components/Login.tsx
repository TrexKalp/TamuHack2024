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
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Text,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Adjust the import path as necessary
import { FaPlane } from "react-icons/fa";
import logo from "../assets/imagesquare.png";

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

  const formBackground = useColorModeValue("white", "gray.800");
  const inputTextColor = useColorModeValue("gray.800", "whiteAlpha.900");

  return (
    <Flex
      as="form"
      onSubmit={handleLogin}
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgGradient="linear(to-br, red.600, blue.500)"
    >
      <VStack
        spacing={6}
        w={["90%", "400px"]}
        p={8}
        bg={formBackground}
        borderRadius="xl"
        boxShadow="2xl"
      >
        <Heading size="xl" textAlign="center">
          American Airlines Flight Login
        </Heading>
        <Image src={logo} alt="Flight Quiz Logo" />
        <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.200")}>
          Enter your flight number to proceed
        </Text>
        <Box w="full">
          <FormControl id="flightNumber">
            <FormLabel>Flight Number</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaPlane color="gray.300" />}
              />
              <Input
                type="text"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
                color={inputTextColor}
                borderColor={useColorModeValue("gray.300", "gray.600")}
                _hover={{
                  borderColor: useColorModeValue("gray.400", "whiteAlpha.800"),
                }}
                _placeholder={{ color: "gray.500" }}
              />
            </InputGroup>
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            mt={4}
            size="lg"
            boxShadow="md"
            _hover={{
              boxShadow: "lg",
            }}
          >
            Login
          </Button>
        </Box>
      </VStack>
    </Flex>
  );
};

export default Login;
