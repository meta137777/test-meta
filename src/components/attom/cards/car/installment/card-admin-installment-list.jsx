import moment from "jalali-moment";
import { useRouter } from "next/navigation";


export default function CardAdminInstallmentList({ data }) {
  
  return (
    <>
      <div className="tablet:grid lg:grid-cols-9 tablet:grid-cols-5 flex flex-col lg:gap-0 gap-4">
        <div
          className="col-span-9 tablet:grid lg:grid-cols-12 tablet:grid-cols-6 hidden text-blue font-bold items-center rounded-tr-md rounded-tl-md px-6 py-3"
          style={{ background: "rgba(37, 109, 133, 0.1)" }}
        >
          <div className="lg:block hidden text-sm ">#</div>
          <div className="text-sm text-center lg:col-span-2">
            نام و نام‌‌خانوادگی
          </div>
          <div className="text-sm text-center lg:col-span-2"> تاریخ تولد</div>
          <div className="text-sm text-center lg:col-span-2">شغل</div>
          <div className="text-sm text-center lg:col-span-2">شهر</div>
          <div className="text-sm lg:col-span-3">وضعیت</div>
          <></>
        </div>
        {data.map((item, index) => (
          <TableItem index={++index} data={item} />
        ))}
      </div>
    </>
  );
}

const TableItem = ({ index, data }) => {
  const router = useRouter();

  const showUserInfoHadler = () => {
    router.push(`/products/${data?.ad_code}`);
  };

  return (
    <div className="col-span-9 tablet:grid lg:grid-cols-12 tablet:grid-cols-6 tablet:gap-0 gap-2  flex flex-col items-center rounded-tr-tablet rounded-tl-tablet tablet:px-6 tablet:py-12 p-5 tablet:border-0 border border-grey-300 rounded-lg tablet:border-b border-b-gray-250 lg:rounded-none">

      <div className="font-medium lg:block hidden tablet:w-fit w-full">
        {index}
      </div>

      <div className="tablet:hidden block  flex-col justify-between tablet:w-fit w-full ">
        <span className="tablet:hidden block font-bold mb-4">
          درخواست خرید اقساطی
        </span>
      </div>

      <div class="tablet:block flex justify-between w-full lg:col-span-2">
        <span className="tablet:hidden block font-bold text-sm">
          نام و نام‌خانوادگی
        </span>
        <div className="md:text-center lg:text-base">{`${data.name} ${data.family}`}</div>
      </div>

      <div class="tablet:block flex justify-between w-full lg:col-span-2">
        <span className="tablet:hidden block font-bold text-sm">تاریخ تولد</span>
        <div className="text-sm font-medium md:text-center">
          {data.user.year_of_birth + "/" + data.user.month_of_birth + "/" + data.user.day_of_birth}
        </div>
      </div>

      <div class="tablet:block flex justify-between w-full lg:col-span-2">
        <span className="tablet:hidden block font-bold text-sm">
          شغل
        </span>
        <div className="text-sm md:text-center flex gap-1 items-center justify-center">
          <span className="font-bold">{data.job}</span>
        </div>
      </div>

      <div class="tablet:block flex justify-between w-full lg:col-span-2">
        <span className="tablet:hidden block font-bold text-sm">
          شهر
        </span>
        <div className="text-sm md:text-center flex gap-1 items-center justify-center">
          <span className="font-bold">{data.city}</span>
        </div>
      </div>

      <div class="tablet:block flex justify-between w-full items-center col-span-1">
        <span className="tablet:hidden block font-bold text-sm">وضعیت</span>
        <div className="text-sm font-medium ">{data.status}</div>
      </div>

      <div
        class="flex justify-end w-full items-center lg:col-span-2"
        onClick={showUserInfoHadler}
      >
        <button className="bg-blue text-white lg:px-6 px-2 py-2 w-full font-bold rounded-lg text-sm text-center">
          نمایش آگهی
        </button>
      </div>

    </div>
  );
};
