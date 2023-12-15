import { NumberSeprator } from "@/utils/number-seprator";
import { useAppSelector } from "src/hooks/redux-hooks";

const Factor = () => {
  const {loan_advance, check_installments_monthly} = useAppSelector((state) => state.carInstallment);

  const items = [
    {
      title: "پیش پرداخت",
      value: NumberSeprator(loan_advance),
    },
    {
      title: "قسط ماهیانه",
      value: NumberSeprator(check_installments_monthly),
    }
  ];

  return (
    <>
      {/* فاکتور پیش پرداخت */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">

        {/* قسط ماهیانه */}
        {items.map(({ title, value }, index) => {
          return (
            <div
              className="flex justify-between items-center bg-[#F5F5F5] p-2"
              key={title}
            >
              <span className="text-xs font-medium text-gray-600 whitespace-nowrap">
                {title}:
              </span>
              <div className="flex gap-2 items-center">
                <span className="font-bold items-center text-gray-900 block truncate max-w-[5rem] w-full text-left ltr hover:text-clip text-sm hover:max-w-none">
                  {value == 0 ? "-" : value}
                </span>
                <span
                  className="text-gray-900"
                  style={{ fontSize: "10px" }}
                >
                  تومان
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Factor;
