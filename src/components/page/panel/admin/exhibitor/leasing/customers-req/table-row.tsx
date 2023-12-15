import { getExhibitorAdminMenu } from "@/utils/get-exhibitor-admin-menu";
import moment from "jalali-moment";
import Link from "next/link";

const TableRow = ({ leasing, index }: { leasing: any; index: number }) => {
  const links = getExhibitorAdminMenu(leasing?.status.condition, leasing);

  var date = moment
    .unix(leasing.created_at)
    .locale("fa")
    .format("YYYY/MM/D - HH:mm");

  return (
    <div className="lg:col-span-7 md:grid md:grid-cols-12 flex flex-col gap-2 items-center p-3 md:border-b md:border-0 md:border-b-gray-150 border border-gray-150 md:rounded-none rounded-lg md:mt-0 mt-4">
      <div className="font-bold lg:block hidden md:w-fit w-full text-sm">
        {index}
      </div>

      <div className="flex justify-between items-center md:justify-center w-full md:h-full md:border-r md:border-gray-150 md:pr-2">
        <span className="md:hidden block font-bold"> نام نمایشگاه</span>
        <span className="text-xs text-center">{leasing?.exhibition_name}</span>
      </div>

      <div className="flex justify-between items-center md:justify-center w-full  md:border-r md:border-gray-150 md:pr-2 md:h-full">
        <span className="md:hidden block font-bold">کد مقاضی </span>
        <span className="text-sm">{leasing?.exhibitor_leasing_code}</span>
      </div>

      <div className="flex justify-between items-center md:justify-center w-full col-span-2 md:border-r md:border-gray-150 md:pr-2 md:h-full ">
        <span className="md:hidden block font-bold">متقاضی</span>
        <span className="font-bold text-xs text-center">
          {leasing?.applicant_info?.name} {leasing?.applicant_info?.family}
        </span>
      </div>

      <div className="flex justify-between items-center md:justify-center w-full md:border-r md:border-gray-150 md:pr-2 md:h-full">
        <span className="md:hidden block font-bold">کد ملی</span>
        <span className="font-bold text-xs">
          {" "}
          {leasing?.applicant_info?.national_code}
        </span>
      </div>

      <div className="flex justify-between items-center md:justify-center w-full md:border-r md:border-gray-150 md:pr-2 md:h-full">
        <span className="md:hidden block font-bold">شماره تماس</span>
        <span className="text-xs">{leasing?.applicant_info.mobile_number}</span>
      </div>
      <div className="flex justify-between items-center md:justify-center w-full col-span-2 md:border-r md:border-gray-150 md:pr-2 md:h-full">
        <span className="md:hidden block font-bold">تاریخ و زمان درخواست</span>
        <span className="text-xs text-left ltr">{date}</span>
      </div>

      <div className="flex justify-between items-center md:justify-center w-full  md:border-r md:border-gray-150 md:pr-2 md:h-full">
        <span className="md:hidden block font-bold">وضعیت</span>
        <span className="text-xs text-orange block text-center">
          {leasing?.status.condition}
        </span>
      </div>

      <div className="flex flex-col items-end gap-2 lg:col-span-2 md:col-span-3 w-full md:border-r md:border-gray-150 md:pr-2">
        <Link
          href={`/panel/exhibitor/customer-folder/${leasing?.exhibitor_leasing_id}`}
          className="bg-white text-blue rounded-lg px-4 py-2 border border-blue text-center block md:w-full w-fit"
          style={{ fontSize: "11px" }}
        >
          مشاهده پرونده
        </Link>

        {links.map(({ link, title, state, onClick }) =>
          onClick ? (
            <button
              className="bg-blue text-white rounded-lg p-2 border border-blue text-center md:w-full w-fit"
              onClick={onClick}
              style={{ fontSize: "11px" }}
            >
              {title}
            </button>
          ) : (
            <Link
              href={{ pathname: link, query: state }}
              className="bg-blue text-white rounded-lg p-2 border border-blue text-center md:w-full w-fit"
              style={{ fontSize: "11px" }}
            >
              {title}
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default TableRow;
