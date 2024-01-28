import React from "react";
import { Box, Image, Flex, Badge, Text, Button } from "@chakra-ui/react";

const Shop: React.FC = () => {
  const items = [
    {
      name: "American Airlines Model Plane",
      price: 50,
      image: "https://via.placeholder.com/1000",
      description: "A detailed model of an American Airlines plane.",
    },
    {
      name: "American Airlines T-Shirt",
      price: 20,
      image: "https://via.placeholder.com/150",
      description: "A comfortable t-shirt with the American Airlines logo.",
    },
    {
      name: "American Airlines Coffee Mug",
      price: 15,
      image: "https://via.placeholder.com/150",
      description: "A sturdy coffee mug with the American Airlines logo.",
    },
  ];

  return (
    <Flex wrap="wrap" justify="center">
      {items.map((item, index) => (
        <Box
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          m={4}
          key={index}
        >
          <Image src={item.image} alt={item.name} />

          <Box p="6">
            <Box d="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="teal">
                New
              </Badge>
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                {item.name}
              </Box>
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {item.description}
            </Box>

            <Box>
              ${item.price}
              <Box as="span" color="gray.600" fontSize="sm">
                / ea
              </Box>
            </Box>

            <Button colorScheme="teal" variant="outline" width="full" mt={4}>
              Add to Cart
            </Button>
          </Box>
        </Box>
      ))}
    </Flex>
  );
};

export default Shop;
