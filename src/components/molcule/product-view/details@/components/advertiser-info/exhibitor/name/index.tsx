import { GetBase64ImageIdAPI, GetImageId } from "@/apis/images";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";

export default function ExhibitorName({ exhibitor_profile, user_name }: any) {
  const [imgRes, setImgRes] = useState("");  

  useEffect(() => {
    if (exhibitor_profile?.exhibition_logo_image_id) {
      GetImageId(exhibitor_profile?.exhibition_logo_image_id).then(
        (res) => {
          setImgRes(res);
        }
      );
    }
  }, []);
  
  

  return (
    <div className="md:flex justify-between items-center">
      <div className="flex gap-4 items-center">
        {imgRes && (
          <img src={imgRes} alt="نمایشگاه" className="w-12 h-12 rounded" />
        )}
        <div>
          <span className="font-bold block text-lg">
            {exhibitor_profile?.exhibition_name}
          </span>
          {/* <span className="block text-sm">www.test.com</span> */}
        </div>
      </div>
      <Link
        href={`/exhibitor/${user_name}`}
        className="text-blue bg-blue-100 h-fit px-6 py-2 font-medium rounded flex gap-2 items-center md:mt-0 mt-2 justify-center"
      >
        صفحه نمایشگاه
        <IoChevronBackOutline />
      </Link>
    </div>
  );
}
