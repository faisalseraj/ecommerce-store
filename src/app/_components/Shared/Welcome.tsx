"use client";

import { Box, Flex, Text } from "@chakra-ui/react";

import { Avatar } from "@/components/ui/avatar";
import { useMemo } from "react";
import { useSession } from "next-auth/react";

export const Welcome = () => {
  const session = useSession() as any;
  const user = useMemo(() => {
    return (session as any)?.data?.user?.user;
  }, [session]);

  return (
    <Box p={4} bg="gray.100" borderRadius="md" boxShadow="md">
      <Flex align="center" mb={2}>
        <Avatar size="md" name={user?.fullName} src={user?.image} />
        <Text color="gray.700" ml={2} fontSize="xs" fontWeight="bold">
          Welcome, {user?.fullName}
        </Text>
      </Flex>
      <Text fontSize="xs" color="gray.500">
        You're logged in as {user?.email}
      </Text>
    </Box>
  );
};