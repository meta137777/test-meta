"use client";
import { PostAdSaleSearch } from "@/apis/search";
import { PREVIEW_DATA, SET_SHOW_NULL } from "@/redux/filter/filter-slice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch } from "react-redux";
import { brandData } from "./brands-data";

const PopularBrands = () => {
  const { all_brands, other_popular, top_brands } = brandData;
  const [showBrands, setShowBrands] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => setShowBrands(false);
  }, []);

  const router = useRouter();

  const handleSearch = async (brand: string) => {
    let data = {
      is_draft: false,
      models: "",
      brands: brand,
      types: "",
      car_damaged: "",
      min_price: -1,
      max_price: -1,
      min_Mileage: -1,
      max_Mileage: -1,
      colors: "",
      with_image: false,
      gear_box_types: "",
      fuel_types: "",
      min_year_of_manufacture: -1,
      max_year_of_manufacture: -1,
      keywords: "",
      body_insurance: false,
      third_party_insurance: false,
      car_accident_insurance: false,
      international_car_insurance: false,
      lat: -1,
      long: -1,
      distance: -1,
      engine_volume: -1,
      engine_power: -1,
      engine_torque: -1,
      sort: "",
      ascending: true,
      is_car_made_aboard: false,
    };

    const tempSearch = await PostAdSaleSearch(data);
    console.log(tempSearch);
    if (tempSearch == null) {
      dispatch(SET_SHOW_NULL(true));
      router.push("/car-order/list/products");
      return;
    }

    dispatch(PREVIEW_DATA(tempSearch));
    dispatch(SET_SHOW_NULL(false));

    router.push("/car-order/list/products");
  };

  return (
    <div className="flex flex-col items-center border-solid border-2 border-[#E0E0E2] rounded-md mt-28 select-none py-8">
      <p className="font-bold mb-8 text-xl md:text-2xl">جست‌وجو در میان بیش از 70 برند</p>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1  gap-10">
        {top_brands.map((brand) => (
          <div
            key={brand.title}
            className="border-solid border-2 border-[#E0E0E2] rounded-sm cursor-pointer"
            onClick={() => handleSearch(brand?.alt_title || brand.title)}
          >
            <div className="h-[190px] w-[210px] flex flex-col-reverse items-center justify-center">
              <div className="mt-5 font-bold">{brand.title}</div>
              <div className="relative h-[70px] w-[100px]">
                <img
                  alt={brand.title}
                  src={brand.icon}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-11/12 md:w-9/12">
        <p className="font-semibold text-lg my-8 text-center">
          برندهای محبوب دیگر
        </p>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 md:gap-6">
          {other_popular.map((brand) => (
            <div
              key={brand.title}
              className="border-solid border-2 border-[#E0E0E2] rounded-sm cursor-pointer"
              onClick={() => handleSearch(brand.title)}
            >
              <div className="h-[43px] w-full flex flex-row-reverse  items-center justify-end gap-4 px-3 py-2">
                <div className="font-bold">{brand.title}</div>
                <div className="relative  max-w-[30px]">
                  <img alt={brand.title} src={brand.icon} className="max-h-7" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-11/12 md:w-9/12">
        <p
          className="font-semibold text-lg my-8 flex gap-2 justify-center items-center cursor-pointer"
          onClick={() => setShowBrands(!showBrands)}
        >
          <span>سایر برندها</span>

          {!showBrands ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </p>
        {showBrands ? (
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 md:gap-6">
            {all_brands.map((brand) => (
              <div
                key={brand.title}
                className="border-solid border-2 border-[#E0E0E2] rounded-sm cursor-pointer"
                onClick={() => handleSearch(brand.title)}
              >
                <div className="h-[43px] w-full flex flex-row-reverse  items-center justify-end gap-4 px-3 py-2">
                  <div className="font-bold">{brand.title}</div>
                  <div className="relative  max-w-[30px]">
                    <img
                      alt={brand.title}
                      src={brand.icon}
                      className="max-h-7"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default PopularBrands;
