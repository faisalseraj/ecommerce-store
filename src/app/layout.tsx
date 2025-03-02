"use client";

import "./globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { CartProvider } from "./_context/CartContext";
import { Provider } from "@/components/ui/provider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <CartProvider>
              <Provider>
                <Toaster />

                {children}
              </Provider>
            </CartProvider>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
export default RootLayout;
