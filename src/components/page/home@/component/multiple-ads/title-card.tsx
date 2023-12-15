"use client";

import { useAppDispatch } from "@/hooks/redux-hooks";
import { REMOVE_ALL } from "@/redux/filter/filter-slice";
import { REMOVE_KEYWORD } from "@/redux/keywords/keywords-slice";
import { useRouter } from "next/navigation";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function MultipleAdsTitle() {
  const dispatch = useAppDispatch();
  const navigate = useRouter();

  const navigateHandler = () => {
    dispatch(REMOVE_ALL(""));
    dispatch(REMOVE_KEYWORD());
  };

  return (
    <div
      className="bg-white rounded p-12 flex flex-col justify-between items-center gap-8"
      style={{
        boxShadow:
          "0px 1px 12px 0px rgba(0, 0, 0, 0.12), 0px 0px 1px 0px rgba(13, 68, 250, 0.16) inset",
      }}
    >
      <h3 className="text-gray-800  font-bold text-xl text-center mb-4 ">
        پرآگهی ترین خودروها
      </h3>
      <p className="text-justify leading-loose">
      خودروهایی که بیشترین تعداد آگهی را در اُتو دارند، به ترتیب این مدل‌ها هستند:
      </p>
      <button
        className="bg-[#E3ECFF] text-[#0D45FF] w-full h-[48px] mx-auto rounded font-bold flex justify-center items-center"
        onClick={navigateHandler}
      >
        همه آگهی ها
        <MdKeyboardArrowLeft fontSize={"24px"} />
      </button>
    </div>
  );
}
