import { GetAdSaleIdInfo } from "@/apis/ad-sale";
import { checkExistWindow } from "@/utils/check-exist-window";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { toast } from "react-toastify";

export default function SellerNumber({ advertiser_id }: any) {
  const [state, setState] = useState({
    show: false,
    phone_number: null,
  });
  const auth = checkExistWindow() && window.localStorage.getItem("userInfo");
  const router = useRouter();
  const handleClick = () => {
    if (auth) {
      GetAdSaleIdInfo(advertiser_id)
        .then((res) => {
          
          setState({
            show: true,
            phone_number: res.Info?.info,
          });
        })
        .catch((err) => {
          toast.error("متاسفانه خطایی رخ داده است.");
          setState({
            show: false,
            phone_number: null,
          });
        });
    } else router.push("/auth/check");
  };

  if (state.show) {
    return (
      <a
        href={`tel: ${state.phone_number}`}
        className="mt-4 text-blue bg-blue-100 py-2 w-full rounded flex justify-center items-center font-medium"
      >
        <span>{state.phone_number}</span>
      </a>
    );
  }

  return (
    <button
      className="mt-4 text-blue bg-blue-100 py-2 w-full rounded flex justify-center items-center font-medium"
      onClick={handleClick}
    >
      تماس با فروشنده
      <IoChevronBackOutline />
    </button>
  );
}
