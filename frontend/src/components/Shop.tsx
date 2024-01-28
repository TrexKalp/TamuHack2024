import React from "react";
import { Box, Image, Flex, Badge, Text, Button } from "@chakra-ui/react";

const Shop: React.FC = () => {
  const items = [
    {
      name: "American Airlines Model Plane",
      price: 50,
      image: "https://m.media-amazon.com/images/I/610U7IOCkFL.jpg",
      description: "Model American Airlines Plane",
    },
    {
      name: "American Airlines T-Shirt",
      price: 20,
      image: "https://ae01.alicdn.com/kf/HTB1XpmQeW1s3KVjSZFAq6x_ZXXac.jpg_640x640Q90.jpg_.webp",
      description: "American Airlines T-shirt",
    },
    {
      name: "American Companion",
      price: 10,
      image: "https://cdn.shoplightspeed.com/shops/635203/files/30922406/1024x1024x2/american-airlines-plush-plane.jpg",
      description: "American Companion",
    },
    {
      name: "American Airlines Phone Case",
      price: 15,
      image: "https://i1.cssps.com/aa/media/Product/DET/7/480297_96340_DET.jpg",
      description: "American Airlines Phone Case",
    },
    {
      name: "American Airlines Coffee Mug",
      price: 10,
      image: "https://airlineemployeeshop.com/cdn/shop/files/logomug_1200x1200.jpg?v=1692909185",
      description: "American Airlines Themed Coffee Mug",
    },
    {
      name: "American Airlines Backpack",
      price: 35,
      image: "https://airlineemployeeshop.com/cdn/shop/products/5850_1024x1024.jpg?v=1599271047",
      description: "American Airlines Backpack",
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
              ${item.price - 0.01}
              <Box as="span" color="gray.600" fontSize="sm">
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
