import { GetAdSaleIsMadeAboard } from "@/apis/search";
import { img } from "@/data";
import { useRouter } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";

export default function CarTypes() {
  const router = useRouter();

  const handleClick = (is_car_made_aboard: any) => {
    GetAdSaleIsMadeAboard(is_car_made_aboard).then((res) => {
      router.push("/car-order/list/products");
    });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-4  mt-10">
      <div className="bg-[#F0F0F1] lg:p-10 p-6 flex xl:flex-row flex-col relative">
        <img
          src={img.shahin.src}
          alt="shahin"
          className="xl:absolute xl:-right-6 xl:-bottom-10 w-fit lg:h-fit h-[10rem]"
        />
        <div className="flex flex-col xl:w-1/2 lg:w-2/3 w-full mr-auto xl:mt-0 mt-4">
          <button
            className="text-blue  flex items-center border  border-[#B1C8FD]  rounded py-2 px-2 gap-2 justify-center font-bold  mb-4 bg-white"
            onClick={() => handleClick(false)}
          >
            خرید اقساطی خودرو داخلی
            <FiChevronLeft />
          </button>
          <span className="justify-end tracking-wide font-medium md:text-left text-justify">
            اُتو به کلیه خودروهای داخلی که محصول سال 1397 به بعد باشند، تا یک
            میلیارد تومان و تا سقف 60 درصد ارزش کلی خودرو تسهیلات ارائه می‌کند.
          </span>
        </div>
      </div>

      <div className="bg-[#F0F0F1] lg:p-10 p-6 flex xl:flex-row flex-col relative">
        <img
          src={img.hunda.src}
          alt="hunda"
          className="xl:absolute xl:-left-12 mr-auto -bottom-10 w-fit lg:h-fit h-[10rem]"
        />
        <div className="flex flex-col xl:w-1/2 lg:w-2/3 w-full ml-auto xl:mt-0 mt-4">
          <button
            className="text-blue  flex items-center border  border-[#B1C8FD]  rounded py-2 px-2 gap-2 justify-center font-bold  mb-4 bg-white"
            onClick={() => handleClick(true)}
          >
            خرید اقساطی خودرو خارجی
            <FiChevronLeft />
          </button>
          <span className="md:text-right text-justify font-medium tracking-wide">
            اُتو به کلیه خودروهای وارداتی که محصول سال 2013 به بعد باشند، تا یک
            میلیارد تومان و تا سقف 60 درصد ارزش کلی خودرو تسهیلات ارائه می‌کند.
          </span>
        </div>
      </div>
    </div>
  );
}
