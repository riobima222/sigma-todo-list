"use client";

import { Poppins } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import NavigateProvider from "@/context/navigate";
import AlertProvider from "@/context/alert";

const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppinsFont.className} text-gray-950`}>
        <NavigateProvider>
          <AlertProvider>
            <SessionProvider>{children}</SessionProvider>
          </AlertProvider>
        </NavigateProvider>
      </body>
    </html>
  );
}
