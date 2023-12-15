"use client";
import {
  VehicleCheckSteps,
  WhyVehicleCheckWithUs,
} from "@/organism/vehicle-check/cards-vehicle-check";
import Benefites from "./components/benefites";
import VehicleCheckPacks, {
  VehicleCheckPacksMobile,
} from "./components/packages";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { useEffect } from "react";
import { REMOVE_SHOW_CAR } from "@/redux/filter/filter-slice";

export default function VehicleCheck() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(REMOVE_SHOW_CAR(""));
  }, []);
  return (
    <div className="flex flex-col justify-center items-center gap-16">
      <div>
        <h2 className="block text-center md:text-2xl text-xl font-bold mt-2 lg:mb-0 mb-4">
          پکیج‌های کارشناسی خودرو
        </h2>

        <VehicleCheckPacks />
        <VehicleCheckPacksMobile />
      </div>
      <Benefites />
      <WhyVehicleCheckWithUs />
      <VehicleCheckSteps />
    </div>
  );
}
