"use client";
import { img } from "@/data";
import { Footer, Navbar, PageProvider } from "@/template";
import Link from "next/link";
import React from "react";
import ErrorImg from "@/assets/img/404.png";
import TemplateProvider from "@/components/template/main/layout/template-provider";

const NotFound = () => {
  return (
    <div>
      <PageProvider>
        <TemplateProvider>
          <div className="h-[85vh] flex items-center justify-center">
            <div>
              <img
                src={ErrorImg.src}
                alt="404Error"
                className="w-2/3  mx-auto"
              />
              <p className="text-center my-10 font-bold lg:text-2xl md:text-lg ">
                صفحۀ مورد نظر شما پیدا نشد!
              </p>
            </div>
          </div>
        </TemplateProvider>
      </PageProvider>
    </div>
  );
};

export default NotFound;
