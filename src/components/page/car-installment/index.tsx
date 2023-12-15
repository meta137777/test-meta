"use client";

import { GetAdSaleIsMadeAboard, PostAdSaleSearch } from "@/apis/search";
import { img } from "@/data";
import { REMOVE_CONTENT } from "@/redux/car-installment/car-installment/car-Installment-slice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { useAppDispatch } from "src/hooks/redux-hooks";
import CardInstallment from "./components/calculator/card-installment";
import InstallmentFAQ from "./components/faq/installment-faq";
import FindInstallmentCars from "./components/find-installment-cars";
import TersmAndConditions from "./components/terms-and-conditions";
import TashilatSteps from "./components/steps";
import InstallmentSteps from "./components/steps";
import CarTypes from "./components/car-types";

const CarInstallmentPage = ({ brandData }: any) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(REMOVE_CONTENT());
  }, []);

  return (
    <>
      <div
        className="mx-auto lg:p-10 p-5 flex items-center md:justify-end justify-center rounded-3xl car-installment-bg"
        style={{
          background: `url(${img.buy_car_man.src}) no-repeat center right`,
          backgroundSize: "cover",
        }}
      >
        <div className="md:w-fit w-full">
          <CardInstallment />
        </div>
      </div>
      <InstallmentSteps />
      <TersmAndConditions />
      <FindInstallmentCars brandData={brandData} />

      <CarTypes />
      <div className="mt-[10rem]">
        <InstallmentFAQ />
      </div>
    </>
  );
};

export default CarInstallmentPage;
