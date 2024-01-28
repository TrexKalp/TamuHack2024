import { Box, Flex, IconButton, Spacer, Image } from "@chakra-ui/react";
import { SearchIcon, BellIcon } from "@chakra-ui/icons";
import logo from "../assets/imagesquare.png";

const TopNav = () => {
  return (
    <Flex align="center" p={4} bg="blue.500">
      <Box>
        <Image boxSize="40px" src={logo} alt="Logo" />
      </Box>
      <Spacer />
      <Box>
        <IconButton aria-label="Search" icon={<SearchIcon />} marginRight={"10px"}/>
        <IconButton aria-label="Notifications" icon={<BellIcon />} />
      </Box>
    </Flex>
  );
};

export default TopNav;
