import { SliderLatestProduct } from "@/attom/slider/latest-product";
import CarOrderFAQ from "../components/faq";
import NormalVipPurchase from "../components/normal-vip-purchase";
import AffordablePrice from "./components/affordable-price";
import PopularCars from "./components/popular-cars";
import VehicleCheckPack from "./components/vehicle-check";

export default function NewCarOrders({ brandModel, newData }: any) {
  return (
    <div>
      <div className="my-4">
        <NormalVipPurchase brandModel={brandModel} />
      </div>
      <SliderLatestProduct link="/new" data={newData} />
      {/* <PopularCars popularAds={popularAds} /> */}
      <AffordablePrice />
      <VehicleCheckPack />
      <CarOrderFAQ />
    </div>
  );
}
