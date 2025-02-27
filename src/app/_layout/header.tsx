"use client"; // Add this at the top for client component

import "@/components/Buttons/BorderAnimation/style.css";

import { Badge, Button, Flex, IconButton, Image, Link } from "@chakra-ui/react";

import { FaShoppingCart } from "react-icons/fa";
import { usePathname } from "next/navigation"; // Next.js 15 navigation hook

const Header = () => {
  const currentPath = usePathname();

  // Helper function to check active path
  const isActive = (path: string) => currentPath === path;

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      px={8}
      py={4}
      bg="white"
      boxShadow="md"
      position="sticky"
      top="0"
      zIndex="sticky"
    >
      {/* Logo */}
      <Link
        href="/"
        _hover={{ transform: "scale(1.05)" }}
        transition="all 0.2s"
      >
        <Image src="/logo.png" alt="Logo" height={"80px"} />
      </Link>

      {/* Navigation Links */}
      <Flex align="center" gap={8}>
        <Link
          className={`border-animate-btn ${
            isActive("/products") ? "border-animate-btn-active" : ""
          }`}
          href="/products"
          fontWeight="500"
        >
          Products
        </Link>
        <Link
          className={`border-animate-btn ${
            isActive("/categories") ? "border-animate-btn-active" : ""
          }`}
          href="/categories"
          fontWeight="500"
        >
          Categories
        </Link>
        <Link
          className={`border-animate-btn ${
            isActive("/about") ? "border-animate-btn-active" : ""
          }`}
          href="/about"
          fontWeight="500"
        >
          About
        </Link>
        <Link
          className={`border-animate-btn ${
            isActive("/contact") ? "border-animate-btn-active" : ""
          }`}
          href="/contact"
          fontWeight="500"
        >
          Contact
        </Link>

        {/* Cart Icon */}
        <IconButton
          aria-label="Cart"
          variant="ghost"
          position="relative"
          fontSize="xl"
        >
          <FaShoppingCart />
          <Badge
            position="absolute"
            top="-2px"
            right="-2px"
            colorScheme="red"
            borderRadius="full"
          >
            3
          </Badge>
        </IconButton>

        {/* Logout Button */}
        <Button
          colorScheme="gray"
          variant="outline"
          size="sm"
          _hover={{ bg: "gray.100" }}
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
