import { Flex } from "@chakra-ui/react";
import Footer from "../_layout/footer";
import Header from "../_layout/header";

export default function Layout({ children }: any) {
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <main>{children}</main>
      <Footer />
    </Flex>
  );
}
