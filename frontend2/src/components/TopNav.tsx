import { Box, Flex, IconButton, Spacer } from "@chakra-ui/react";
import { SearchIcon, BellIcon } from "@chakra-ui/icons";

// Replace these with your actual logo, search, and bell icons

const TopNav = () => {
  return (
    <Flex align="center" p={4}>
      <Box>
        <IconButton aria-label="Logo" />
      </Box>
      <Spacer />
      <Box>
        <IconButton aria-label="Search" icon={<SearchIcon />} />
        <IconButton aria-label="Notifications" icon={<BellIcon />} />
      </Box>
    </Flex>
  );
};

export default TopNav;
