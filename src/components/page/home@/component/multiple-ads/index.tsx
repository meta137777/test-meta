"use client";
import { GetBase64ImageIdAPI } from "@/apis/images";
import Alert from "@/attom/alerts/alert";
import CardProduct from "@/attom/cards/card-product";
import CardSkeleton from "@/molcule/skeleton-components/card-skeleton";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MultipleAdsTitle from "./title-card";
import BrandsCards from "./brands-cards";

export const MultipleAds = ({ link, data }: any) => {

 

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 md:gap-4 mt-10">
      <MultipleAdsTitle link={link} MultipleAds={data} />

      <div className="lg:col-span-3 md:col-span-2 md:mt-0 mt-4">
        {!Array.isArray(data) || !data.length ? (
          <Alert title="محصولی موجود نیست" type="error" classes="my-10" />
        ) : (
          
            <Swiper
              loop={false}
              spaceBetween={12}
              navigation={true}
              modules={[Navigation]}
              className="p-10 home-page_slider h-full"
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 2,
                },
                1280: {
                  slidesPerView: 3,
                },
              }}
            >
              {data.length ? (
                data?.length >= 1 &&
                data?.map(({_id}: any) => {
         
                  return (
                    <SwiperSlide>
                      <BrandsCards brandData={_id}/>
                    </SwiperSlide>
                  );
                })
              ) : (
                <div className="flex gap-1 w-full">
                  <div className="w-full">
                    <CardSkeleton />
                  </div>
                  <div className="w-full hidden md:block">
                    <CardSkeleton />
                  </div>
                  <div className="w-full hidden lg:block">
                    <CardSkeleton />
                  </div>
                </div>
              )}
            </Swiper>
         
        )}
      </div>
    </div>
  );
};
