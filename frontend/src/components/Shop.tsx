import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Flex,
  Badge,
  Text,
  Button,
  Progress,
  useToast,
} from "@chakra-ui/react";
localStorage.setItem("points", "150");

const Shop: React.FC = () => {
  const [points, setPoints] = useState(0); // Initialize points state
  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);
  const toast = useToast();

  // Effect to initialize points
  useEffect(() => {
    const initialPoints = localStorage.getItem("points") // Get points from localStorage
      ? Number(localStorage.getItem("points")) // Use stored value if it exists
      : 300; // Default to 500 if no value is stored
    setPoints(initialPoints);
  }, []);
  const items = [
    {
      name: "Airbud Plushy",
      price: 100,
      image:
        "https://cdn.shoplightspeed.com/shops/635203/files/30922406/1024x1024x2/american-airlines-plush-plane.jpg",
      description: "Airbud Plushy",
    },
    {
      name: "American Airlines Coffee Mug",
      price: 100,
      image:
        "https://airlineemployeeshop.com/cdn/shop/files/logomug_1200x1200.jpg?v=1692909185",
      description: "American Airlines Themed Coffee Mug",
    },
    {
      name: "American Airlines Phone Case",
      price: 150,
      image: "https://i1.cssps.com/aa/media/Product/DET/7/480297_96340_DET.jpg",
      description: "American Airlines Phone Case",
    },
    {
      name: "American Airlines T-Shirt",
      price: 200,
      image:
        "https://res.cloudinary.com/teepublic/image/private/s--Vczmctlj--/t_Resized%20Artwork/c_crop,x_10,y_10/c_fit,w_470/c_crop,g_north_west,h_626,w_470,x_0,y_0/g_north_west,u_upload:v1462829024:production:blanks:a59x1cgomgu5lprfjlmi,x_-395,y_-325/b_rgb:eeeeee/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1555946302/production/designs/4693367_0.jpg",
      description: "American Airlines T-shirt",
    },
    {
      name: "American Airlines Backpack",
      price: 350,
      image:
        "https://airlineemployeeshop.com/cdn/shop/products/5850_1024x1024.jpg?v=1599271047",
      description: "American Airlines Backpack",
    },
    {
      name: "American Airlines Model Plane",
      price: 500,
      image: "https://m.media-amazon.com/images/I/610U7IOCkFL.jpg",
      description: "Model American Airlines Plane",
    },
  ];

  const handlePurchase = (itemName: string, itemPrice: number) => {
    if (points >= itemPrice && !purchasedItems.includes(itemName)) {
      setPoints(points - itemPrice); // Deduct the item price from current points
      setPurchasedItems([...purchasedItems, itemName]); // Add the item to the purchased list
      localStorage.setItem("points", (points - itemPrice).toString()); // Update localStorage

      toast({
        title: "Purchase successful",
        description: `You have purchased ${itemName}. A flight attendant will be with you soon!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Purchase failed",
        description:
          "You do not have enough points. Please attempt more quizzes!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex wrap="wrap" justify="center">
      {items.map((item) => (
        <Box
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          m={4}
          key={item.name}
        >
          <Image src={item.image} alt={item.name} />

          <Box p="6">
            <Box d="flex" alignItems="baseline">
              <Badge
                borderRadius="full"
                px="2"
                colorScheme={item.name === "Airbud" ? "orange" : "teal"}
              >
                {item.name === "Airbud" ? "Best Seller" : "New"}
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

            <Box>{item.price} Points</Box>

            <Button
              colorScheme={purchasedItems.includes(item.name) ? "gray" : "teal"}
              variant="outline"
              width="full"
              mt={4}
              onClick={() => handlePurchase(item.name, item.price)}
              isDisabled={purchasedItems.includes(item.name)}
            >
              {purchasedItems.includes(item.name) ? "Purchased" : "Buy Now"}
            </Button>

            <Progress
              mt={5}
              value={(points / item.price) * 100}
              colorScheme="green"
            />
          </Box>
        </Box>
      ))}
    </Flex>
  );
};

export default Shop;
