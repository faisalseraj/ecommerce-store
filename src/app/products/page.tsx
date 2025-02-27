"use client"; // Allowing the use of React hooks

import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import AddProduct from "../_components/Product/Add";
import { ProductSchema } from "../_models/Product";
import ProductsItems from "../_components/Product/Items";
import { signOut } from "next-auth/react";

// Adjust the import path accordingly

const ProductsPage: React.FC = () => {

  return (
    <Box p={5}>
      <AddProduct />

      <ProductsItems />
    </Box>
  );
};

export default ProductsPage;
