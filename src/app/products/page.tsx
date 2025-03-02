"use client"; // Allowing the use of React hooks

import AddProduct from "../_components/Product/Add";
import {
  Box
} from "@chakra-ui/react";
import ProductsItems from "../_components/Product/Items";
import { ProductsProvider } from "../_context/ProductsContext";
import React from "react";
import withContextProvider from "../_HOC/withContextProvider";

// Adjust the import path accordingly

const ProductsPage: React.FC = () => {

  return (
    <Box p={5}>
      <AddProduct />

      <ProductsItems />
    </Box>
  );
};

const ProductsPageWithProvider =
  withContextProvider(ProductsProvider)(ProductsPage);

export default ProductsPageWithProvider;
