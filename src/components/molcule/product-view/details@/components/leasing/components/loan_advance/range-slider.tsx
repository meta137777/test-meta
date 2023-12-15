import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import {
  ADD_MONTH,
  CALCULATE_CHECK,
  CHANGE_PERSENTAGE,
  installmentSelector,
} from "@/redux/car-installment/car-installment/car-Installment-slice";
import { useEffect } from "react";

export default function RangeSlider({
  announced_price,
}: {
  announced_price: number;
}) {
  const dispatch = useAppDispatch();
  const { loan_advance_percentage } = useAppSelector(installmentSelector);

  const changeHandler = (e) => {
    const { value } = e.target;
    dispatch(
      CHANGE_PERSENTAGE({
        loan_advance_percentage: value / 100,
        facility_percentage: (100 - value) / 100,
      })
    );

    dispatch(
      CALCULATE_CHECK({
        announced_price: announced_price,
        product_details: false,
      })
    );
  };

  useEffect(() => {
    dispatch(
      ADD_MONTH({
        month: 6,
        number_of_installment: 2,
        marketing_percentage: 0.09,
        facility_interest_percentage: 0.0985230024213074,
      })
    );

    dispatch(
      CHANGE_PERSENTAGE({
        loan_advance_percentage: 0.4,
        facility_percentage: 0.6,
      })
    );

    dispatch(
      CALCULATE_CHECK({
        announced_price: announced_price,
        product_details: false,
      })
    );
  }, []);

  return (
    <div className="my-2">
      <div className="wrapper">
        <div className="range">
          <input
            id="typeinp"
            type="range"
            min="40"
            max="90"
            defaultValue="40"
            value={loan_advance_percentage * 100}
            onChange={changeHandler}
            step="5"
            style={{
                direction: 'ltr'
            }}
          />
        </div>
      </div>
    </div>
  );
}
