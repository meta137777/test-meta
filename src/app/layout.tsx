"use client";
import { PageProvider } from "@/template";
import Script from "next/script";
import React, { ReactNode } from "react";

interface LayoutType {
  children: ReactNode;
}

const Layout = ({ children }: LayoutType) => {
  return (
    <html lang="en">
      <head>
        <title>OtO | اُتو</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <PageProvider>{children}</PageProvider>
        <Script src="/yektanet.js"></Script>
        <Script src="/clarity.js"></Script>
        <Script src="/ga.js"></Script>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-MGK9E2EVKX"></Script>
      </body>
    </html>
  );
};

export default Layout;
export const revalidate = 60;
