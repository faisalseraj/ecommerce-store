'use client'

import { Box, Flex, Stack, Text } from "@chakra-ui/react";

import { useCart } from "@/app/_context/CartContext";

const BillingInfo = () => {
    const { cart } = useCart();
    const subtotal = cart.reduce((acc, item) => acc + item.productId?.price * item.quantity, 0);
    const tax = subtotal * 0.08; // assuming 8% tax rate
    const total = subtotal + tax;
  
    return (
      <Box
        mt={4}
        p={4}
        bg="gray.100"
        borderRadius="md"
        boxShadow="md"
      >
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Billing Info
        </Text>
        <Stack >
          <Flex justify="space-between" alignItems="center">
            <Text color="gray.600">Subtotal:</Text>
            <Text fontSize="lg" fontWeight="bold">${subtotal.toFixed(2)}</Text>
          </Flex>
          <Flex justify="space-between" alignItems="center">
            <Text color="gray.600">Tax (8%):</Text>
            <Text fontSize="lg" fontWeight="bold">${tax.toFixed(2)}</Text>
          </Flex>
          <Flex justify="space-between" alignItems="center">
            <Text color="gray.600">Total:</Text>
            <Text fontSize="xl" fontWeight="bold" color="primary.500">
              ${total.toFixed(2)}
            </Text>
          </Flex>
        </Stack>
      </Box>
    );
  };

  export default BillingInfo