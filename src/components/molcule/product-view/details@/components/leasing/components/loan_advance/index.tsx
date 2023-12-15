import { useAppSelector } from "@/hooks/redux-hooks";
import { NumberSeprator } from "@/utils/number-seprator";
import RangeSlider from "./range-slider";

export default function LoanAdvance({announced_price}: {announced_price: number}) {
  // Use Selector
  const { loan_advance, check_installments_monthly } = useAppSelector(
    (state) => state.carInstallment
  );

  return (
    <div className="border border-gray-250 rounded p-4">
      <span className="block text-sm font-medium">
        می‌خواهید چه پیش‌پرداخت و اقساطی پرداخت کنید؟
      </span>

      <RangeSlider announced_price={announced_price}/>

      <div className="flex md:flex-row flex-col justify-between gap-4 mt-4">
        <div className="border border-gray-250 px-2 py-1 rounded flex md:justify-start justify-between">
          <span className="text-[#62666D] text-sm">
            پیش پرداخت:
          </span>
          <span className="font-bold">
            {" "}
            {NumberSeprator(loan_advance)} <small className="text-base">تومان</small>
          </span>
        </div>
        <div className="border border-gray-250 px-2 py-1 rounded flex md:justify-start justify-between">
          <span className="text-[#62666D] text-sm">
            قسط ماهیانه:
          </span>
          <span className="font-bold">
            {" "}
            {NumberSeprator(check_installments_monthly)} <small className="text-base">تومان</small>
          </span>
        </div>
      </div>
    </div>
  );
}
