import "swiper/css";
import "./style";

import { Box, IconButton, Image, Text, VStack } from "@chakra-ui/react";
import { FaRemoveFormat, FaTrash } from "react-icons/fa";

import { LuDelete } from "react-icons/lu";
import { useCart } from "@/app/_context/CartContext";

// CartModal.tsx

export const Item = ({ item }: any) => {
  const { removeFromCart, isRemoving } = useCart();

  return (
    <Box
      className="shine-hover"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={4}
      // style={{ width: "220px" }}
      border="1px"
      borderColor="gray.100"
      borderRadius="xl"
      boxShadow="md"
      transition="all 0.3s ease-in-out"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "xl",
        borderColor: "purple.100",
      }}
      position="relative"
      overflow="hidden"
      flexDir={"row"}
    >
      <VStack align="start" flex={1}>
        <Box
          position="relative"
          overflow="hidden"
          borderRadius="lg"
          transition="transform 0.3s ease-in-out"
          _hover={{
            transform: "scale(1.05)",
          }}
          //   maxW="100%"
          //   maxH="100%"
          //   margin="auto"
        >
          <Image
            src={item.productId?.images?.[0]}
            alt={item.productId.name}
            objectFit="fill" // Fits within container without stretching
            // w="120px"
            h="200px"
          />
        </Box>

        <VStack align="start">
          <Text fontWeight="extrabold" fontSize="lg" color="gray.700">
            {item.productId.name}
          </Text>
          <Text fontSize="sm" color="gray.500" fontWeight="medium">
            Quantity: {item.quantity}
          </Text>
          <Text fontSize="lg" color="purple.600" fontWeight="bold">
            ${item.productId.price?.toFixed(2)}
          </Text>
        </VStack>
      </VStack>

      <IconButton
        position={"absolute"}
        top={0}
        right={0}
        onClick={() => removeFromCart({ productId: item.productId?._id })}
        aria-label="Remove item"
        colorScheme="red"
        variant="ghost"
        size="lg"
        _hover={{
          color: "red.600",
          transform: "scale(1.1)",
        }}
        loading={isRemoving}
        transition="all 0.2s ease-in-out"
      >
        <FaTrash />
      </IconButton>
    </Box>
  );
};
