import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import React, { Suspense } from 'react';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import SmoothScroll from "@/components/SmoothScroll";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "@/stack";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Xieriee Store",
  description: "A premium destination for high-quality apps and games.",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Suspense fallback={null}>
          <StackProvider app={stackServerApp}>
            <StackTheme>
              {children}
            </StackTheme>
          </StackProvider>
        </Suspense>
      </body>
    </html>
  );
}
