import { useAppDispatch } from "@/hooks/redux-hooks";
import { REMOVE_ALL } from "@/redux/filter/filter-slice";
import { REMOVE_KEYWORD } from "@/redux/keywords/keywords-slice";
import { useRouter } from "next/navigation";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function LatestProductTitle({ link }: { link: string }) {
  const dispatch = useAppDispatch();
  const navigate = useRouter();

  const navigateHandler = () => {
    dispatch(REMOVE_ALL(""));
    dispatch(REMOVE_KEYWORD());
    navigate.push(`/car-order/${link}/products`);
  };

  return (
    <div
      className="bg-white rounded py-8 px-4 flex flex-col justify-between items-center gap-8"
      style={{
        boxShadow:
          "0px 1px 12px 0px rgba(0, 0, 0, 0.12), 0px 0px 1px 0px rgba(13, 68, 250, 0.16) inset",
      }}
    >
      <h3 className="text-gray-800  text-xl text-center mb-4 ">
        جدیدترین آگهی‌های
        <br />
        <b>خودروهای {link.includes("used") ? "کار کرده" : "صفر"}</b>
      </h3>
      <div className="max-w-md mx-auto p-5 ">
        <p className="text-justify leading-7">
          جدیدترین آگهی های مربوط به خودرو های{" "}
          {link.includes("used") ? "کار کرده" : "صفر"} را در اینجا ببینید.
          خودروهای کارشناسی شده با نشان{" "}
          <span className="text-[#0AA643] bg-[#cdedd8] p-1 inline-block">
            کارشناسی شده
          </span>{" "}
          مشخص شده اند.
        </p>
      </div>
      <button
        className="bg-[#E3ECFF] text-[#0D45FF] w-5/6 h-[48px] mx-auto rounded-md font-bold flex justify-center items-center"
        onClick={navigateHandler}
      >
        همه آگهی ها
        <MdKeyboardArrowLeft fontSize={"24px"} />
      </button>
    </div>
  );
}
