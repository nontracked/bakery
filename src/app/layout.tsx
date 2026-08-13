import type {Metadata, Viewport} from "next";
import "@/styles/index.js";
import "./globals.css";
import {QueryProvider} from "@/providers/QueryProvider";
import React from "react";
import localFont from "next/font/local";
import {CartDrawer} from "@/layout/CartDrawer";
import {Toaster} from "sonner";

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

export const viewport:Viewport = {
  themeColor: '#2a2a2a'
}

export const metadata: Metadata = {
  metadataBase: new URL('https://m-e-bakery.vercel.app'),
  title: {
    default: 'M.E. Bakery',
    template: '%s | M.E. Bakery'
  },
  description: "Exquisite handcrafted croissants, New York rolls, and pastry illusions.",
  openGraph: {
    title: 'M.E. Bakery',
    description: "Exquisite handcrafted croissants, New York rolls, and pastry illusions.",
    url: 'https://m-e-bakery.vercel.app',
    siteName: 'M.E. Bakery',
    images: {
      url: '/crop.jpg',
      width: 756,
      height: 960,
    },
    type: 'website',
    locale:'en_US'
  }
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
          {children}
          {<Toaster
            position="top-center"
            duration={3000}
            toastOptions={{
              classNames: {
                toast: 'custom-toast',
                title: 'custom-toast-title',
                success: 'custom-toast-success',
                error: 'custom-toast-error',
                warning: 'custom-toast-warning'
              }
            }}
          />}
          <CartDrawer />
        </QueryProvider>
      </body>
    </html>
  );
}
