import type {Metadata} from "next";
import "@/styles/index.js";
import "./globals.css";
import {QueryProvider} from "@/providers/QueryProvider";
import React from "react";
import localFont from "next/font/local";
import {Header} from "@/layout/Header";
import {Footer} from "@/layout/Footer";
import {CartDrawer} from "@/layout/CartDrawer";

const oswaldFont = localFont({
  src: [
    {
      path: './fonts/Oswald-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Oswald-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Oswald-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Oswald-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Oswald-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-oswald',
  display: 'swap'
})

const asapFont = localFont({
  src: './fonts/Asap-Regular.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-asap'
})

const dancingFont = localFont({
  src: './fonts/DancingScript-SemiBold.woff2',
  weight: '600',
  display: 'swap',
  variable: '--font-dancing'
})

export const metadata: Metadata = {
  title: "Bakery",
  description: "Exquisite handcrafted croissants, New York rolls, and pastry illusions.",
};

export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswaldFont.variable} ${asapFont.variable} ${dancingFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <Header />
          {children}
          <CartDrawer />
        </QueryProvider>
        <Footer />
      </body>
    </html>
  );
}
