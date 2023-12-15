import { img } from "@/data";
import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";

export default function HomePageVehicleCheck() {
  return (
    <div
      className="lg:w-11/12 w-full mx-auto mt-10 bg-white md:grid md:grid-cols-2 flex flex-col-reverse md:gap-8 rounded"
      style={{
        boxShadow: "0px 2px 33px 0px rgba(0, 0, 0, 0.18)",
      }}
    >
      <div className="p-8 flex flex-col">
        <h3 className="font-bold text-xl mb-4">
          کارشناسی خودرو را به اُتو بسپارید.
        </h3>
        <p className="leading-loose text-justify">
          متخصصان حرفه‌ای و مجرب <b>اُتو</b> در زمان و مکان دلخواه شما، خودرو
          مورد نظر شما را کارشناسی فنی و بدنه می‌کنند.
        </p>
        <Link
          href="/vehicle-check"
          className="bg-blue-100 text-blue px-6 py-2 rounded flex justify-center gap-2 items-center font-bold w-fit mt-auto mr-auto text-lg"
        >
          کارشناسی خودرو
          <IoChevronBack />
        </Link>
      </div>
      <div>
        <img
          src={img.vehicle_check_home_page.src}
          alt="vehicle check home page"
          className="rounded-tl md:rounded-bl rounded-tr lg:w-fit w-full"
        />
      </div>
    </div>
  );
}
