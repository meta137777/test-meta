import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import ImageComponent from "@/attom/image/image-component";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import LikeCount from "../like-count";

export default function CustomSlider({
  base64Images,
  like_count,
}: {
  base64Images: string[];
  like_count: number;
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        // thumbs={{ swiper: thumbsSwiper }}
        thumbs={{
          swiper:
            thumbsSwiper && !thumbsSwiper?.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        <div className="h-fit realtive">
          {base64Images?.map((sliderItem, index) => (
            <SwiperSlide key={index}>
              <ImageComponent
                src={`data:image/png;base64,${sliderItem}`}
                alt="product"
              />
              <LikeCount like_count={like_count} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
      <div className="mt-4">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={3}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {base64Images?.map((sliderItem, index) => (
            <SwiperSlide key={index}>
              <img
                className="h-20 w-full object-cover rounded"
                src={`data:image/png;base64,${sliderItem}`}
                alt="product"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
