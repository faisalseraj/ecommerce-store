"use client";

// products/context.tsx
import { createContext, useContext, useEffect, useState } from "react";

import { ProductSchema } from "../_models/Product";
import axiosInstance from "../_utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

interface ProductsContext {
  products: ProductSchema[];
  isLoading: boolean;
  refetchProducts: () => void;
}

const ProductsContext = createContext<ProductsContext>({
  products: [],
  isLoading: false,
  refetchProducts: () => {},
});

const ProductsProvider = ({ children }: any) => {
  const {
    data: products = [],
    refetch: refetchProducts,
    isPending,
  } = useQuery<ProductSchema[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/products`);
      return response.data; // Assuming response.data contains the cart items
    },
  });

  return (
    <ProductsContext.Provider
      value={{ products, isLoading: isPending, refetchProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

const useProductsContext = () => useContext(ProductsContext);

export { ProductsProvider, ProductsContext, useProductsContext };
