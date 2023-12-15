"use client";
import { img } from "@/data";
import { Footer, Navbar, PageProvider } from "@/template";
import Link from "next/link";
import React, { ReactNode } from "react";

interface LayoutType {
  children: ReactNode;
}

const TemplateProvider = ({ children }: LayoutType) => {
  return (
    <PageProvider>
      <Link href="/auth/check">
        <img
          src={img.role_banner.src}
          alt="role_banner"
          className="mx-auto md:block hidden lg:h-auto md:h-[3rem] object-cover"
        />
        <img
          src={img.role_banner_mobile.src}
          alt="role_banner"
          className="mx-auto md:hidden block h-[4rem] object-cover"
        />
      </Link>
      <Navbar />
      <div className="max-w-[1280px] m-auto lg:p-0 p-4 min-h-[calc(100vh_-_550px)]">
        {children}
      </div>
      <Footer />
    </PageProvider>
  );
};

export default TemplateProvider;
export const revalidate = 60;
