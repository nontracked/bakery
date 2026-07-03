import type {Metadata} from "next";
import {Geist} from "next/font/google";
import "@/styles/index.js";
import "./globals.css";
import {QueryProvider} from "@/providers/QueryProvider";
import React from "react";
import localFont from "next/font/local";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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

export const metadata: Metadata = {
  title: "Bakery",
  description: "Exquisite handcrafted croissants, New York rolls, and pastry illusions.",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${oswaldFont.variable} ${asapFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
