import React from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  FaTrophy,
  FaMapMarkedAlt,
  FaPlane,
  FaQuestionCircle,
} from "react-icons/fa";

const BottomTabNav = () => {
  return (
    <Flex
      justifyContent="space-around"
      position="fixed"
      bottom={0}
      width="100%"
      pb={2}
      pt={4}
      bg="blue.500"
    >
      <Link to="/leaderboard">
        <IconButton
          aria-label="Leaderboard"
          icon={<FaTrophy />}
          variant="ghost"
          color="white"
        />
      </Link>
      <Link to="/diagram">
        <IconButton
          aria-label="Landmark Map"
          icon={<FaMapMarkedAlt />}
          variant="ghost"
          color="white"
        />
      </Link>
      <Link to="/aircraft-trivia">
        <IconButton
          aria-label="Aircraft Trivia"
          icon={<FaPlane />}
          variant="ghost"
          color="white"
        />
      </Link>
      <Link to="/quiz">
        <IconButton
          aria-label="Quiz"
          icon={<FaQuestionCircle />}
          variant="ghost"
          color="white"
        />
      </Link>
    </Flex>
  );
};

export default BottomTabNav;
