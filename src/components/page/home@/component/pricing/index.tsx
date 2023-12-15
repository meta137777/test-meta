import { img } from "@/data";
import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";

export default function HomePagePrcing() {
  return (
    <div
      className="lg:w-10/12 w-full mx-auto mt-10 bg-white md:grid md:grid-cols-2 flex flex-col-reverse md:gap-8 rounded"
      style={{
        boxShadow: "0px 2px 33px 0px rgba(0, 0, 0, 0.18)",
      }}
    >
      <div className="p-8 flex flex-col">
        <h3 className="font-bold text-xl mb-4">
          قیمت خودروی خود را دست‌ کم نگیرید!
        </h3>
        <p className="leading-loose text-justify">
          با استفاده از <b>ابزار قیمت‌گذاری اُتو</b>، به راحتی می‌توانید بدون
          پرداخت هیچ هزینه‌ای قیمت خودرو مورد‌نظر خودتان را به صورت آنلاین
          محاسبه و ارزش آن را در بازار خرید و فروش تخمین بزنید.
        </p>
        <Link
          href="/pricing"
          className="bg-blue-100 text-blue px-6 py-2 rounded flex justify-center gap-2 items-center font-bold w-fit mt-auto mr-auto text-lg"
        >
          قیمت‌گذاری خودرو
          <IoChevronBack />
        </Link>
      </div>
      <div className="w-full">
        <img
          src={img.pricing_home_page.src}
          alt="prcing home page"
          className="rounded-tl md:rounded-bl rounded-tr"
        />
      </div>
    </div>
  );
}
