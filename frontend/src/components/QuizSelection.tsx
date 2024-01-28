import React from "react";
import {
  Box,
  Button,
  Center,
  Image,
  VStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaStar, FaCloudSun, FaPlane, FaLandmark } from "react-icons/fa";

// Assuming globalTopic is imported from your state management solution
import { globalTopic } from "./GlobalTopic.tsx";
import { Link } from "react-router-dom";

type QuizType = {
  name: string;
  imageUrl: string;
  icon: JSX.Element;
};

const quizzes: QuizType[] = [
  {
    name: "Astronomy",
    imageUrl:
      "https://wallpaperswide.com/download/stars_galaxies-wallpaper-1920x1080.jpg",
    icon: <FaStar />,
  },
  {
    name: "Meteorology",
    imageUrl:
      "https://media.istockphoto.com/id/1124405196/photo/cloud-formation-panorama-16-9.jpg?s=612x612&w=0&k=20&c=Vz0LGHlbceToflbvxGx47WT5b8Nw9U9KF6e-EVx1Qt4=",
    icon: <FaCloudSun />,
  },
  {
    name: "Aircraft Trivia",
    imageUrl:
      "https://static.seekingalpha.com/cdn/s3/uploads/getty_images/1295996763/image_1295996763.jpg?io=getty-c-crop-16-9",
    icon: <FaPlane />,
  },
  {
    name: "Landmarks",
    imageUrl:
      "https://i.pinimg.com/736x/a2/c3/0a/a2c30a5893b7f19cfab3b8e4bdcd7d8c.jpg",
    icon: <FaLandmark />,
  },
];

const QuizSelection = () => {
  const bgColor = useColorModeValue("gray.100", "gray.700"); // Adjusts color based on light/dark mode
  const handleButtonClick = (quizName: string) => {
    globalTopic["topic"] = quizName;
    // Additional logic here if needed
    if (quizName === "Landmarks") {
      globalTopic["topic"] = globalTopic["landmarkTopic"];
    }
  };

  return (
    <Center bg={bgColor} minHeight="100vh">
      <VStack spacing={6} m={8}>
        {quizzes.map((quiz, index) => (
          <Box
            key={index}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            bgGradient="linear(to-r, blue.300, blue.400)"
          >
            <Link to="/quiz">
              <Image
                borderRadius="md"
                src={quiz.imageUrl}
                alt={quiz.name}
                boxSize="250px"
                objectFit="cover"
              />
              <Center mt={3}>
                <Button
                  leftIcon={quiz.icon}
                  colorScheme="red"
                  variant="solid"
                  onClick={() => handleButtonClick(quiz.name)}
                >
                  {quiz.name}
                </Button>
              </Center>
            </Link>
          </Box>
        ))}
      </VStack>
    </Center>
  );
};

export default QuizSelection;
