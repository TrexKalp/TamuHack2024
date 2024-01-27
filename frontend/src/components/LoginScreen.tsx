import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // You should implement actual authentication logic here
    // For demonstration, we'll just call onLogin when the button is clicked
    onLogin();
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" h="100vh">
      <VStack spacing={4}>
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="blue" size="lg" onClick={handleLogin}>
          Login with American Airlines account
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginScreen;
