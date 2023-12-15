import { img } from "@/data";
import Link from "next/link";
import React from "react";
import { IoChevronBackSharp } from "react-icons/io5";

export default function VehicleCheckPack() {
  return (
    <div
      className="mt-4 bg-white rounded md:grid lg:grid-cols-3 md:grid-cols-3 flex flex-col-reverse"
      style={{
        filter: "drop-shadow(0px 1px 8px rgba(0, 0, 0, 0.18))",
      }}
    >
      <div className="col-span-2 p-8 flex flex-col justify-between items-center">
        <p className="text-gray-800 font-medium lg:text-lg text-base ">
          با استفاده از کارشناسی تخصصی تیم اُتو، از وضعیت خودروی خود قبل از خرید
          به طور کامل مطلع شوید.
        </p>
        <Link
          href="/vehicle-check"
          className="bg-blue-100 text-blue rounded px-4 py-2 mr-auto font-medium flex items-center gap-2 lg:text-base text-sm"
        >
          کارشناسی خودرو
          <IoChevronBackSharp />
        </Link>
      </div>
      <div className="bg-gray-150 p-6 flex flex-col">
        <span className="text-gray-800 text-center block font-bold lg:text-2xl text-xl">
          خرید خودروی کارشناسی شده
        </span>
        <img src={img.vechicle_check.src} alt="man" className="mx-auto mt-6" />
      </div>
    </div>
  );
}
