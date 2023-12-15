import { useAppSelector } from "@/hooks/redux-hooks";

export default function CheckAmount() {
  // Use Selector
  const { installments_duration, } = useAppSelector(
    (state) => state.carInstallment
  );
  return (
    <div className="my-4 flex justify-between items-center">
      <span className="font-medium whitespace-nowrap">تعداد چک مورد نیاز:</span>
      <span className="bg-[#F5F5F5] block px-2 py-1 text-sm font-medium">
        {installments_duration / 3} چک با تنفس سه ماهه
      </span>
    </div>
  );
}
