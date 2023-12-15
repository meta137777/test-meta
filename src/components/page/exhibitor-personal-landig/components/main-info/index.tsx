import { GetBase64ImageIdAPI } from "@/apis/images";
import { img } from "@/data";
import { useEffect, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";

export default function ExhibiitorMainInfo({ exhibitorData }: any) {
  const [logo, setLogo] = useState("");

  useEffect(() => {
    if (exhibitorData?.exhibitor_profile?.exhibition_logo_image_id) {
      GetBase64ImageIdAPI(
        exhibitorData?.exhibitor_profile?.exhibition_logo_image_id
      )
        .then((res) => {
          setLogo(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  const clickHandler = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 1000,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
        <img
          className="w-full"
          src={img.exhibitor_personal_landing.src}
          alt="exhibitors"
        />
        <div className="md:mt-0 mt-4 md:col-span-2 flex flex-col">
          <div className="flex gap-2 items-center mb-4">
            {/*  @@@___________________ لوگو نمایشگاه ___________________@@@ */}
            {logo && (
              <div className="border border-gray-250 p-1 rounded">
                <img
                  src={`data:image/png;base64,${logo}`}
                  alt="logo"
                  className="w-12 h-12"
                />
              </div>
            )}

            {/*  @@@___________________ نام نمایشگاه ___________________@@@ */}
            <h1 className="font-bold text-xl">
              {exhibitorData?.exhibitor_profile?.exhibition_name
                ? exhibitorData?.exhibitor_profile?.exhibition_name
                : "-"}
            </h1>
          </div>

          <p className="text-justify">
            {exhibitorData?.exhibitor_profile?.exhibition_about_us
              ? exhibitorData?.exhibitor_profile?.exhibition_about_us
              : "-"}
          </p>

          <button
            onClick={clickHandler}
            className="mt-auto bg-blue items-center gap-2 text-white px-4 py-3 flex justify-center rounded mr-auto w-fit text-sm font-medium"
          >
            همه آگهی های این نمایشگاه
            <FiChevronLeft size="20px" />
          </button>
        </div>
      </div>
    </div>
  );
}
