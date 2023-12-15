import { GetAdSaleSearchKeywords } from "@/apis/search";
import { useAppDispatch } from "@/hooks/redux-hooks";
import {
  PREVIEW_DATA,
  SET_SHOW_NULL,
  SHOW_NULL_BUTTON,
} from "@/redux/filter/filter-slice";
import { ADD_KEYWORD } from "@/redux/keywords/keywords-slice";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductKeywords({ keywords }: any) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {keywords?.length
        ? keywords.map(
            (item) =>
              item !== "" &&
              item !== undefined &&
              item !== "undefined" && (
                <Link
                  href={{
                    pathname: "/car-order/list/products",
                    query: { keyword: item },
                  }}
                  className="bg-[#DCE4FF] px-3 py-1 rounded text-blue text-sm font-medium h-fit whitespace-nowrap"
                >
                  {item}
                </Link>
              )
          )
        : "-"}
    </div>
  );
}
