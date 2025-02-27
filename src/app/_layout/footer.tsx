import {
    Box,
    Flex,
    Grid,
    IconButton,
    Link,
    Text
} from "@chakra-ui/react";
import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaYoutube
} from "react-icons/fa";

const Footer = () => {

  return (
    <Box bg="gray.800" color="white" py={12} px={8}>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={8}
        maxW="1200px"
        mx="auto"
        mb={8}
      >
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Company
          </Text>
          <Flex direction="column" gap={2}>
            <Link href="/about">About Us</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/press">Press</Link>
          </Flex>
        </Box>

        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Support
          </Text>
          <Flex direction="column" gap={2}>
            <Link href="/contact">Contact Us</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/returns">Returns</Link>
            <Link href="/shipping">Shipping</Link>
          </Flex>
        </Box>

        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Connect With Us
          </Text>
          <Flex gap={4}>
            <IconButton
              aria-label="Instagram"
              fontSize="24px"
              variant="ghost"
              _hover={{ color: "pink.400" }}
            >
              <FaInstagram />
            </IconButton>
            <IconButton
              aria-label="Twitter"
              fontSize="24px"
              variant="ghost"
              _hover={{ color: "blue.400" }}
            >
              <FaTwitter />
            </IconButton>
            <IconButton
              aria-label="Facebook"
              fontSize="24px"
              variant="ghost"
              _hover={{ color: "blue.600" }}
            >
              <FaFacebook />
            </IconButton>
            <IconButton
              aria-label="YouTube"
              fontSize="24px"
              variant="ghost"
              _hover={{ color: "red.500" }}
            >
              <FaYoutube />
            </IconButton>
          </Flex>
        </Box>
      </Grid>

      <Text textAlign="center" mt={8} opacity="0.8">
        © 2023 Your Store Name. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer
