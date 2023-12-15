import {
  ADD_AMOUNT,
  ADD_MONTH,
  CALCULATE_CHECK,
} from "@/redux/car-installment/car-installment/car-Installment-slice";
import { Num2persian } from "@/utils/num2persian";
import { InputAdornment, InputBase } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch } from "src/hooks/redux-hooks";

const RequestedAmount = () => {
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState({
    displayValue: "",
    actualNumberValue: "",
  });
  const [priceWords, setPriceWords] = useState("");

  // Change amount handler
  const handleChange = (e) => {
    const { value } = e.target;
    const strNumber = value
      .replace(/[^0-9]/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if (Number(strNumber.replace(/,/g, "")) <= 200000000000) {
      setAmount({
        displayValue: strNumber,
        actualNumberValue: Number(strNumber.replace(/,/g, "")),
      });

      dispatch(ADD_AMOUNT(Number(strNumber.replace(/,/g, ""))));

      dispatch(
        CALCULATE_CHECK({
          announced_price: Number(strNumber.replace(/,/g, "")),
          product_details: false,
        })
      );
    }
  };

  useEffect(() => {
    setPriceWords(Num2persian(amount.actualNumberValue));
  }, [amount.actualNumberValue]);

  return (
    <>
      {/* مبلغ درخواستی  */}
      <div className="mt-2 items-center border border-gray-250 rounded p-2 grid grid-cols-2">
        <InputBase
          type="text"
          sx={{
            textAlign: "center",
            fontSize: "14px",
            input: { textAlign: "center" },
            fontFamily: "IranSans-Bold",
            "&:focus-within": { border: "0", color: "#121127" },
          }}
          className="px-2"
          style={{ textAlign: "center", direction: "rtl" }}
          value={amount.displayValue}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <span className="text-xs">تومان</span>
            </InputAdornment>
          }
        />

        <span className="text-center block border-r border-r-gray-250 pr-2 text-sm font-bold">
          {priceWords} تومان
        </span>
      </div>
    </>
  );
};

export default RequestedAmount;
