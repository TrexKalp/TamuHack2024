import React from "react";
import { Flex, IconButton, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  FaTrophy,
  FaMapMarkedAlt,
  FaPlane,
  FaQuestionCircle,
  FaHome,
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
      bgGradient="linear(to-r, blue.300, blue.400)"
    >
      <Link to="/">
        <IconButton
          aria-label="Leaderboard"
          icon={<FaHome />}
          variant="ghost"
          color="white"
        />
      </Link>
      <Link to="/shop">
        <IconButton
          aria-label="Landmark Map"
          icon={<FaMapMarkedAlt />}
          variant="ghost"
          color="white"
        />
      </Link>
      <Link to="/diagram">
        <IconButton
          aria-label="Aircraft Trivia"
          icon={<FaPlane />}
          variant="ghost"
          color="white"
        />
      </Link>
      <Link to="/quizselection">
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
