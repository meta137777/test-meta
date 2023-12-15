// "use client";
// import { PageProvider } from "@/template";
// import React, { ReactNode } from "react";

// interface LayoutType {
//   children: ReactNode;
// }

// const Layout = ({ children }: LayoutType) => {
//   return <PageProvider>{children}</PageProvider>;
// };

// export default Layout;

"use client";
import TemplateProvider from "@/components/template/main/layout/template-provider";
import { img } from "@/data";
import { Footer, Navbar, PageProvider } from "@/template";
import Link from "next/link";
import React, { ReactNode } from "react";

interface LayoutType {
  children: ReactNode;
}

const Layout = ({ children }: LayoutType) => {
  return (
    <PageProvider>
      <TemplateProvider>{children}</TemplateProvider>
    </PageProvider>
  );
};

export default Layout;
export const revalidate = 60;
