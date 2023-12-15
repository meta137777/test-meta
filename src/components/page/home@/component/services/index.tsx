import { icons } from "@/data";
import Link from "next/link";

const Services = () => {
  let serviceItems = [
    {
      title: "خرید خودرو",
      icon: icons.buycar_icon.src,
      path: "/car-order/used",
    },
    {
      title: "فروش خودرو",
      icon: icons.carsale_icon.src,
      path: "/car-sale",
    },
    {
      title: "کارشناسی خودرو",
      icon: icons.vehiclecheck_icon.src,
      path: "/vehicle-check",
    },
    {
      title: "قیمت‌گذاری خودرو",
      icon: icons.pricing_icon.src,
      path: "/pricing",
    },
    {
      title: "خرید اقساطی",
      icon: icons.leasing_icon.src,
      path: "/car-installment",
    },
  ];

  return (
    <div className="mt-10">
      <h2 className="text-center text-2xl font-bold">خدمات ما</h2>
      <div className="grid lg:grid-cols-5 tablet:grid-cols-4 grid-cols-2 items-center xl:gap-12 lg:gap-8 md:gap-4 gap-6 mt-6">
        {serviceItems.map(({ title, icon, path }) => {
          return (
            <Link href={path}>
              <div className="flex flex-col justify-center px-4 md:py-12 py-6 border border-gray-250 rounded items-center gap-8 text-center">
                <img src={icon} className="h-16 w-auto" />
                <span className="font-semibold md:text-lg">{title}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Services;
