import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import {
  IoBagOutline,
  IoCartOutline,
  IoExitOutline,
  IoHomeOutline,
  IoPricetagsOutline,
  IoSettingsOutline,
  IoWalletOutline,
} from "react-icons/io5";
import React, { useMemo } from "react";

import ButtonComponent from "@/components/Buttons/Button";
import Link from "next/link"; // Using Next.js Link for navigation
import { Welcome } from "../_components/Shared/Welcome";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react"; // Import signOut for user logout functionality

const sellerLinks = [
  { name: "Home", path: "/seller/home", icon: <IoHomeOutline /> },
  { name: "Products", path: "/seller/products", icon: <IoBagOutline /> },
  {
    name: "Categories",
    path: "/seller/categories",
    icon: <IoPricetagsOutline />,
  },
  { name: "Earnings", path: "/seller/earnings", icon: <IoWalletOutline /> },
  { name: "Orders", path: "/seller/orders", icon: <IoCartOutline /> },
  { name: "Settings", path: "/seller/settings", icon: <IoSettingsOutline /> },
  { name: "Logout", path: "/auth/signout", icon: <IoExitOutline /> },
];

const SellerLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const session = (await getServerSession()) as any;

  if (!session) {
    redirect("/auth"); // Redirect to sign in if not authenticated
  }

  return (
    <Flex>
      {/* Sidebar */}
      <Box width="250px" p={4} bg="gray.800" color="white" height="100vh">
        <Heading as="h3" size="lg" mb={6}>
          Seller Dashboard
        </Heading>
        <Welcome />
        <Stack>
          {sellerLinks.map((link) => (
            <Link key={link.path} href={link.path}>
              <Flex
                p={2}
                align="center"
                _hover={{ bg: "gray.700", borderRadius: "md" }}
              >
                {link.icon}
                <Text ml={2} cursor="pointer">
                  {link.name}
                </Text>
              </Flex>
            </Link>
          ))}
        </Stack>
      </Box>

      {/* Main Content Area */}
      <Box flex="1" p={5} bg="gray.100" height="100vh">
        {children}
      </Box>
    </Flex>
  );
};

export default SellerLayout;
