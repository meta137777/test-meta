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
import MostVisitedTitle from "./title-card";

export const MostVisitedProductSlider = ({
  link,
  data,
}: {
  link?: string;
  data: any;
}) => {


  const fetchDataAndSetImages = async (dataArray: any[]) => {
    const getImage = (img: any) =>
      img !== "" ? img.toString().split(",")[0] : null;

    const promises = dataArray.map(async (item) => {
      if (item.image_guids) {
        const imgData = await GetBase64ImageIdAPI(getImage(item.image_guids));
        return typeof imgData === "string" ? imgData : "init";
      } else {
        return "init";
      }
    });

    const results = await Promise.allSettled(promises);

    const imageObject = results.reduce((acc: any, result, index) => {
      const item = dataArray[index];
      const advertiserId = item.advertiser_id;

      if (result.status === "fulfilled") {
        acc[advertiserId] = result.value;
      } else {
        acc[advertiserId] = "init";
      }

      return acc;
    }, {});

    return imageObject;
  };

  const [sliderImageData, setSliderImageData] = useState<any>({});
  const [sliderData, setSliderData] = useState([]);

  useEffect(() => {
    setSliderData(data || []);
    (async () => {
      const list = await fetchDataAndSetImages(data);
      setSliderImageData(list);
    })();
  }, [data]);

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 md:gap-4 mt-10">
      <MostVisitedTitle link={link ?? ""} />

      <div className="lg:col-span-3 md:col-span-2 md:mt-0 mt-4">
        {!Array.isArray(data) || !data.length ? (
          <Alert title="محصولی موجود نیست" type="error" classes="my-10" />
        ) : (
          <div>
            <Swiper
              loop={false}
              spaceBetween={12}
              navigation={Boolean(
                sliderData.length && Object.keys(sliderImageData).length
              )}
              modules={[Navigation]}
              className="p-10 home-page_slider"
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
              {sliderData.length && Object.keys(sliderImageData).length ? (
                sliderData?.length >= 1 &&
                sliderData?.slice(0, 6).map((product: any) => {
                  return (
                    <SwiperSlide>
                      <CardProduct
                        key={product.ad_code}
                        // image={product.front_firstImage_base64File}
                        images={sliderImageData[product.advertiser_id]}
                        data={product}
                      />
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
          </div>
        )}
      </div>
    </div>
  );
};
