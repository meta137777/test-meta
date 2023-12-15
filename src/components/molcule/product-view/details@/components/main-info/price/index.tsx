import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import {
  ADD_AMOUNT,
  ADD_MONTH,
  CALCULATE_CHECK,
} from "@/redux/car-installment/car-installment/car-Installment-slice";
import { NumberSeprator } from "@/utils/number-seprator";
import { useEffect } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import PriceChart from "./chart";
import SellerNumber from "./seller-number";
import { priceCardType } from "./type";

export default function PriceCard({
  announced_price,
  is_leasing,
  advertiser_id,
  pricing_estimation,
}: priceCardType) {
  const dispatch = useAppDispatch();
  const installment: any = useAppSelector((state) => state.carInstallment);

  useEffect(() => {
    dispatch(
      ADD_MONTH({
        month: 18,
        number_of_installment: 6,
        marketing_percentage: 0.18,
        facility_interest_percentage: 0.239409873455271,
      })
    );
    dispatch(ADD_AMOUNT(announced_price));
    dispatch(
      CALCULATE_CHECK({
        announced_price: announced_price,
        product_details: true,
      })
    );
  }, []);

  return (
    <div className="lg:w-1/2 md:w-1/2 w-full mr-auto mt-auto">
      <div className="border border-gray-250 rounded  p-4 ">
        <div className="flex justify-between">
          <span className="block">قیمت نقدی: </span>
          <div>
            <span className="font-bold">{NumberSeprator(announced_price)}</span>
            <span> تومان </span>
          </div>
        </div>
        {is_leasing && (
          <div className="mt-2 flex justify-between">
            <span className="block">اقساط از: </span>
            <div>
              <span className="font-bold">
                {NumberSeprator(installment.constant_monthly_payment)}
              </span>
              <span> تومان </span>
            </div>
          </div>
        )}
        <PriceChart pricing_estimation={pricing_estimation} announced_price={announced_price}/>

        {is_leasing && (
          <a
            href="#leasing-card"
            className="bg-blue mt-4 text-center text-white py-2 w-full rounded font-medium flex justify-center items-center gap-1"
          >
            خرید اقساطی
            <IoChevronBackOutline />
          </a>
        )}
      </div>
      <SellerNumber advertiser_id={advertiser_id} />
    </div>
  );
}
