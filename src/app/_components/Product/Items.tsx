"use client";

import {
  Badge,
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";

import ButtonComponent from "@/components/Buttons/Button";
import { ProductSchema } from "@/app/_models/Product";
import React from "react";
import { useCart } from "@/app/_context/CartContext";
import { useProductsContext } from "@/app/_context/ProductsContext";

const ProductsItems: React.FC = () => {
  const { isLoading, products } = useProductsContext();
  const { addToCart } = useCart(); // Access cart context
  const handleAddToCart = (product: ProductSchema) => {
    addToCart({ productId: product?._id }); // Add the product to cart
  };
  if (isLoading) {
    return (
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={8}
        p={5}
      >
        {Array(8)
          .fill(null)
          .map((_, index) => (
            <GridItem key={index}>
              <Skeleton
                height="300px"
                borderRadius="xl"
                // startColor="gray.100"
                // endColor="gray.300"
              />
              <Skeleton height="20px" mt={4} width="80%" />
              <Skeleton height="20px" mt={2} width="60%" />
              <Skeleton height="20px" mt={2} width="40%" />
            </GridItem>
          ))}
      </Grid>
    );
  }
console.log(products, "products")
  return (
    <Box p={{ base: 4, md: 8 }}>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={8}
      >
        {products.map((product) => (
          <GridItem
            key={product.id}
            // bg={cardBg}
            border="1px solid"
            // borderColor={cardBorder}
            borderRadius="2xl"
            p={6}
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-5px)",
              shadow: "2xl",
            }}
            position="relative"
            overflow="hidden"
          >
            {/* Stock Status Badge */}
            {product.stock <= 10 && product.stock > 0 && (
              <Badge
                colorScheme="orange"
                position="absolute"
                top={2}
                right={2}
                borderRadius="full"
                px={3}
                py={1}
              >
                Low Stock
              </Badge>
            )}
            {product.stock === 0 && (
              <Badge
                colorScheme="red"
                position="absolute"
                top={2}
                right={2}
                borderRadius="full"
                px={3}
                py={1}
              >
                Sold Out
              </Badge>
            )}

            <Image
              src={product?.images?.[0] || "/placeholder-product.jpg"}
              alt={product?.name}
              borderRadius="xl"
              objectFit="cover"
              height="200px"
              width="100%"
              mb={4}
            />

            <Stack>
              <Heading fontSize="xl" fontWeight="bold">
                {product.name}
              </Heading>

              <Text fontSize="sm" color="gray.500" minHeight="40px">
                {product.description}
              </Text>

              <Flex align="center" justify="space-between">
                <Text fontSize="lg" fontWeight="bold" color="blue.600">
                  ${product.price.toFixed(2)}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {product.stock} in stock
                </Text>
              </Flex>

              <ButtonComponent
                float={"right"}
                size="lg"
                width="full"
                mt={4}
                className="btn-3d"
                _hover={{ transform: "scale(1.02)" }}
                transition="transform 0.2s"
                disabled={product.stock === 0}
                onClick={() => handleAddToCart(product)}
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </ButtonComponent>
            </Stack>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductsItems;
