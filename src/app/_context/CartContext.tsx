"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  UseMutateFunction,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import { ProductSchema } from "../_models/Product";
import axiosInstance from "../_utils/axiosInstance";
import { useSession } from "next-auth/react";

interface CartItem {
  productId: ProductSchema; // Use a string to match MongoDB ObjectId type
  quantity: number;
}

interface CartContext {
  cart: CartItem[];
  isRemoving: boolean;
  addToCart: UseMutateFunction<
    any,
    Error,
    {
      productId: string;
    },
    unknown
  >; // Updated to async
  removeFromCart: UseMutateFunction<
    any,
    Error,
    {
      productId: string;
    },
    unknown
  >;
  clearCart: () => void;
  placeOrder: UseMutateFunction<any, Error, void, unknown>;
  isPlacingOrder: boolean;
  userDetails: {
    fullName: string;
    phoneNumber: string;
    address: string;
    email: string;
  };
  setUserDetails: React.Dispatch<
    React.SetStateAction<{
      fullName: string;
      phoneNumber: string;
      address: string;
      email: string;
    }>
  >;
}

const CartContext = createContext<CartContext>({
  cart: [],
  isRemoving: false,
  addToCart: async () => {},
  removeFromCart: async () => {},
  clearCart: () => {},
  placeOrder: () => {},
  userDetails: {
    fullName: "",
    phoneNumber: "",
    address: "",
    email: "",
  },
  setUserDetails: () => {},
  isPlacingOrder: false,
});

const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const [cart, setCart] = useState<CartItem[]>([]);
  const { data: session } = useSession();
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    email: "",
  });

  const user = session?.user as any;
  const userId = user?.id;
  const { data: cart = [], refetch: refetchCart } = useQuery<CartItem[]>({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/cart?userId=${userId}`);
      return response.data; // Assuming response.data contains the cart items
    },
    enabled: userId !== undefined,
  });

  const { mutate: addToCart, isPending } = useMutation({
    mutationFn: async (variables: { productId: string }) => {
      const response = await axiosInstance("/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ ...variables, userId }),
      });
      return response.data;
    },
    onSuccess: () => {
      refetchCart(); // Optionally refetch the cart after adding
      console.log(`Product added to cart`);
    },
    onError: () => {
      console.error("Failed to add item to cart");
    },
  });

  const { mutate: removeFromCart, isPending: isRemoving } = useMutation({
    mutationFn: async (variables: { productId: string }) => {
      const response = await axiosInstance("/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ ...variables, userId }),
      });
      return response.data;
    },
    onSuccess: () => {
      refetchCart(); // Optionally refetch the cart after adding
      console.log(`Product added to cart`);
    },
    onError: () => {
      console.error("Failed to add item to cart");
    },
  });

  const clearCart = () => {
    // setCart([]);
  };

  const { mutate: placeOrder, isPending: isPlacingOrder } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/order/dispatch", {
        userId, // Replace with actual user ID
        items: cart.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
        })),
        shippingDetails: userDetails,
      });
      return response.data;
    },
    onSuccess: () => {
      clearCart();
      console.log("Order placed successfully!");
    },
    onError: () => {
      console.error("Failed to place order");
    },
  });

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isRemoving,
        placeOrder,
        isPlacingOrder,
        userDetails,
        setUserDetails,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
