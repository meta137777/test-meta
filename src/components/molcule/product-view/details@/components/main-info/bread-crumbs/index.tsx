import { HiChevronLeft } from "react-icons/hi";

export default function BreadCrumbs({
  model,
  brand,
  type,
  year_of_manufacture_display,
}: any) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-xs font-medium whitespace-nowrap">{brand}</span>
      <HiChevronLeft color="#C0C2C5" />
      <span className="text-xs font-medium whitespace-nowrap">{type !== "" && type !== undefined && type !== "undefined" ? type : model}</span>
      <HiChevronLeft color="#C0C2C5" />
      <span className="text-xs font-medium whitespace-nowrap">{year_of_manufacture_display}</span>
    </div>
  );
}
