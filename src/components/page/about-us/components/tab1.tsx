"use client";
import { img } from "@/data";
import { useState } from "react";
import { Skeleton } from "@mui/material";

export default function Tab1() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <div className="relative">
        <img
          src={img.about_us_bg_image.src}
          style={{
            display: !loading ? "block" : "none",
            height: "349px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
          onLoad={() => setLoading(false)}
          alt="درباره ما"
          className="lg:w-11/12 mx-auto"
        />
        {loading && (
          <Skeleton variant="rounded" className="mx-auto" height={349} />
        )}

        <h1 className="absolute text-white font-bold lg:text-5xl text-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          درباره ما
        </h1>
      </div>
      <div className="bg-blue text-white flex md:flex-row flex-col-reverse gap-6 py-10 px-8 rounded-md mt-10">
        <p className="lg:text-lg leading-loose lg:text-right text-justify">
          اُتو در سال 1401 به عنوان پلتفرمی جامع در حوزه معاملات خودرو فعالیت
          خود را آغاز نموده است. این پلتفرم بستری آنلاین و قابل‌اطمینان برای
          خرید و فروش خودرو بوده که هدف اصلی آن، ایجاد تجربه‌ای رضایت‌بخش از
          معامله‌ای امن با همراهی مشاوران تخصصی، برای مشتریان است.
        </p>
      </div>
    </>
  );
}
