"use client";

import { Center, Loader, Progress } from "@chakra-ui/react";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();

  useEffect(() => {
    if (session.status == "loading") {
      return;
    }
    if (session.status == "authenticated") {
      const { user } = session.data.user as any;

      if (user?.user?.role === "seller") {
        redirect("/seller/home");
      }
      if (user?.user?.role === "buyer") {
        redirect("/products");
      }
    } else {
      redirect("/products");
    }
  }, [session]);
  return session.status !== "loading" ? (
    <Center w={"100vw"} h="100vh">
      <Progress.Root maxW="240px" w={"240px"} value={null}>
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
    </Center>
  ) : null;
}
