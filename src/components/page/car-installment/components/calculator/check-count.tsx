import { useAppSelector } from "@/hooks/redux-hooks";

export default function CheckCount() {
  // Use Selector
  const { installments_duration, } = useAppSelector(
    (state) => state.carInstallment
  );
  return (
    <div className="flex justify-between items-center">
      <span className="font-medium whitespace-nowrap text-sm text-gray-600">تعداد چک مورد نیاز:</span>
      <span className="block px-2 py-1 text-sm border border-gray-250 rounded font-medium">
        {installments_duration / 3} چک با تنفس سه ماهه
      </span>
    </div>
  );
}
