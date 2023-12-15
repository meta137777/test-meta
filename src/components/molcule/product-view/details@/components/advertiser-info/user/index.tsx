import dynamic from "next/dynamic";
import { BsPersonFill } from "react-icons/bs";
import { FaChevronLeft } from "react-icons/fa6";
const Map = dynamic(
  () => import("@/page/exhibitor-personal-landig/components/address/map"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          flexGrow: 1,
          textAlign: "center",
          height: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        در حال بارگزاری نقشه ...
      </div>
    ),
  }
);
export default function ProductUserData({ location, name }: any) {
  return (
    <div className="border border-gray-250 p-6 rounded mt-4 grid md:grid-cols-2 grid-cols-1 gap-6">
      <div>
        <div className="flex md:flex-row flex-col gap-4 justify-between">
          <div className="text-[#3A3D42] flex items-center gap-2 ">
            <BsPersonFill size={20} />
            <span className="block font-bold text-lg">آگهی شخصی</span>
          </div>
          <button className="bg-gray-150 w-fit mr-auto text-gray-600 px-4 py-2 rounded flex items-center justify-center gap-2">
            زنگ خطر معاملات شخصی
            <FaChevronLeft />
          </button>
        </div>
      </div>
      <div className="lg:flex gap-4">
        <Map name={name} position={location} />
      </div>
    </div>
  );
}
