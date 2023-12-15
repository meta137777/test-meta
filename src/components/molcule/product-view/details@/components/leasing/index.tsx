import { checkExistWindow } from "@/utils/check-exist-window";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import CheckAmount from "./components/check-amount";
import LeasingForm from "./components/form";
import LoanAdvance from "./components/loan_advance";
import RepaymentPeriod from "./components/repayent-period";

export default function ProductLeasing({
  announced_price,
  ad_code,
  advertiser_id,
}: any) {
  const auth = checkExistWindow() && window.localStorage.getItem("userInfo");
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    
    if (!auth) {
      router.push("/auth/check");
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="border border-gray-250 rounded p-4" id="leasing-card">
      {/* مدت  باز‌پرداخت */}
      <RepaymentPeriod />

      {/* تعداد چک مورد نیاز */}
      <CheckAmount />

      {/* پیش پرداخت و اقساط */}
      <LoanAdvance announced_price={announced_price} />

      <button
        className="bg-blue text-white w-full py-2 rounded flex gap-2 items-center justify-center mt-4 font-bold"
        onClick={handleClick}
      >
        ثبت درخواست خرید اقساطی
        <IoChevronBackOutline />
      </button>

      {/* مودال خرید اقساطی */}
      <LeasingForm
        open={open}
        setOpen={setOpen}
        ad_code={ad_code}
        advertiser_id={advertiser_id}
      />
    </div>
  );
}
