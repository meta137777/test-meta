import { staticData } from "@/data";
import {
  ADD_MONTH,
  CALCULATE_CHECK,
} from "@/redux/car-installment/car-installment/car-Installment-slice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "src/hooks/redux-hooks";
import CheckCount from "./check-count";

const RepaymentPeriod = () => {
  // Use Selector
  const { installments_duration, loan_amount } = useAppSelector(
    (state) => state.carInstallment
  );

  //   Use Dispacth
  const dispatch = useDispatch();

  // Click Handler
  const clickMonthHandler = (item) => {
    dispatch(ADD_MONTH(item));
    dispatch(
      CALCULATE_CHECK({ announced_price: loan_amount, product_details: false })
    );
  };

  return (
    <>
      {/* مدت  باز‌پرداخت */}
      <span className="font-medium whitespace-nowrap text-gray-800">
        مدت بازپرداخت مورد نظرتان را انتخاب کنید:
      </span>

      <div className="flex w-full justify-between items-center p-1 text-gray border border-gray-250 rounded mt-2">
        {staticData.repayment_period_data.map((item, index) => (
          <>
            <button
              className={`text-center md:px-3 px-1 text-sm whitespace-nowrap w-full rounded-[2px] py-[0.3rem] ${
                installments_duration == item.month
                  ? "text-blue bg-blue-100 font-bold"
                  : "text-gray bg-white"
              }`}
              onClick={() => clickMonthHandler(item)}
            >
              {item.month} ماهه
            </button>

            {index !== 3 && (
              <span className="bg-gray-200 block h-[1.5rem] w-[4px] mx-2"></span>
            )}
          </>
        ))}
      </div>

      <CheckCount />
    </>
  );
};

export default RepaymentPeriod;
