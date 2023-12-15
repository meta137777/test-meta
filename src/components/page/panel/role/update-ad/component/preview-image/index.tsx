import { GetAdSaleIdImagesRemoveId, GetImageId } from "@/apis/images";
import { CloseCircle } from "iconsax-react";
import { memo, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ImageDataType, PreviewImagePropsType } from "./type";
import { useCallback } from "react";

export function PreviewImage({ image_guids, ad_id, imagesSetter }: PreviewImagePropsType) {
  const [imageData, setImageData] = useState<ImageDataType>([]);
  let imageArray = image_guids?.split(",").filter((image: string) => Boolean(image));

  imagesSetter(imageData);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const promises = imageArray?.map((image_id: string) => GetImageId(image_id));
        const images = await Promise.all(promises);
        const imageDataWithIds = images.map((image, index) => ({
          image,
          id: imageArray[index],
        }));
        setImageData(imageDataWithIds);
      } catch (error) {
        toast.error("مشکلی در بارگزاری تصاویر بوجود آمده‌است");
      }
    };
  
    if (imageArray?.length) {
      fetchImages();
    }
  }, [image_guids]);

  const deleteImagehandler = (image_id: string) => {
    const filteredData = imageData.filter((item) => item.id !== image_id);

    GetAdSaleIdImagesRemoveId(ad_id, image_id)
      .then(() => {
        toast.success("تصویر با موفقیت حذف شد");
        setImageData(filteredData);
      })
      .catch(() => {
        toast.error("مشکلی در حذف تصویر بوجود آمده‌است");
      });
  };

  const arr = imageData.filter(
    (v, i, a) => a.findIndex((v2) => v2.id === v.id) === i
  );

  const ReturnImage = useCallback(() => {
    return arr?.slice(1)?.map((imageItem, index) => (
      <div
        key={imageItem.image}
        className="relative p-2 bg-gray-150 rounded h-fit"
      >
        {
          index !== 0 ?
          <button
            type="button"
            className="absolute -top-2 -right-2"
            onClick={() => deleteImagehandler(imageItem.id)}
          >
            <CloseCircle color="#2E2E2E" size="25" variant="Bold" />
          </button>
          :
          <span className="absolute	text-[12px] top-[-12px] right-[5px] rounded bg-[#f0f0f1] px-1">thumbnail</span>
        }
        <img
          src={imageItem.image}
          className="rounded-md w-full md:h-28 object-cover"
        />
      </div>
    ));
  }, [arr.length]);

  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 gap-2 my-4">
      {imageData.length ? <ReturnImage /> : <></>}
    </div>
  );
}

export default memo(PreviewImage);
