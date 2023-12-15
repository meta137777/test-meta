import Link from "next/link";
import { IoChevronBackOutline } from "react-icons/io5";
import Factor from "./factor";
import RepaymentPeriod from "./repayment-period";
import RequestedAmount from "./requested-amount";

const CardInstallment = () => {
  return (
    <div className="tablet:w-[28rem] md:w-[25rem] w-full flex flex-col rounded pt-4 bg-white p-4">
      <span className="pb-3 font-bold">قیمت خودرو دلخواهتان چقدر است؟</span>

      {/* مبلغ درخواستی  */}
      <RequestedAmount />

      <div className="flex flex-col gap-2 py-4">
        {/* مدت  باز‌پرداخت */}
        <RepaymentPeriod />
      </div>

      {/* فاکتور پیش پرداخت */}
      <Factor />

      <Link
        href="/car-order/list/products"
        className="bg-blue text-white font-bold w-full py-2 rounded flex gap-2 items-center justify-center mt-4"
      >
        مشاهده آگهی‌ها
        <IoChevronBackOutline />
      </Link>
    </div>
  );
};

export default CardInstallment;
