import { Box, Flex, IconButton, Spacer, Image, Badge } from "@chakra-ui/react";
import { SearchIcon, BellIcon } from "@chakra-ui/icons";
import logo from "../assets/imagesquare.png";
import { useEffect, useState } from "react";
import ColorModeSwitcher from "./ColorModeSwitcher";

const TopNav = () => {
  const [points, setPoints] = useState(localStorage.getItem("points") || "0");

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(localStorage.getItem("points") || "0");
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Flex align="center" p={4} bgGradient="linear(to-r, blue.300, blue.400)">
      <Box>
        <Image boxSize="40px" src={logo} alt="Logo" />
      </Box>
      <Box ml={3} fontSize="lg" fontWeight="bold" color="white">
        <ColorModeSwitcher />
      </Box>

      <Spacer />
      <Box>
        <IconButton
          aria-label="Search"
          icon={<SearchIcon />}
          marginRight={"10px"}
        />
        <IconButton
          aria-label="Notifications"
          icon={<BellIcon />}
          marginRight={"10px"}
        />
        <Badge ml="4" colorScheme="red">
          {points} Points
        </Badge>
      </Box>
    </Flex>
  );
};

export default TopNav;
