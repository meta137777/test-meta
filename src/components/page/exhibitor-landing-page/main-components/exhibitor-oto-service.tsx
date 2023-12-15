import { img } from "@/data";
import React from "react";

const ExhibitorOtoService = () => {
  const data = [
    "نمایشگاه آنلاین اختصاصی به‌صورت کاملاً رایگان",
    "امکان ثبت نامحدود آگهی فروش خودرو",
    "امکان استفاده از تسهیلات اُتو جهت فروش اقساطی",
  ];
  return (
    <div
      className="w-full px-6 py-12 rounded relative flex md:flex-row flex-col items-center lg:justify-center justify-end mt-10"
      style={{
        boxShadow: "0px 1px 8px 0px rgba(0, 0, 0, 0.16)",
      }}
    >
      <div>
        <h5 className="font-bold md:text-2xl text-xl">سرویس نمایشگاه‌داران اُتو:</h5>
        <ul className=" list-disc mr-8 mt-4">
          {data.map((text) => (
            <li className="mt-2 md:text-lg">{text}</li>
          ))}
        </ul>
      </div>
      <img
        src={img.exhibitors_oto_service.src}
        alt=""
        className="mx-auto tablet:absolute right-10 -bottom-20 md:mt-0 mt-6"
      />
    </div>
  );
};

export default ExhibitorOtoService;
