import { GetBase64ImageIdAPI } from "@/apis/images";
import { useEffect, useState } from "react";
import AdvertiseCode from "../advertise-code";
import ImageCount from "./image-count";
import MultiImage from "./multi-image";
import NoImage from "./no-image";
import OneImage from "./one-image";

type ImagePreviewTypes = {
  imageGuids: string;
  ad_code: number;
  inAdminPanel: boolean;
  like_count?: number;
};

export default function ImagePreview({
  imageGuids,
  ad_code,
  inAdminPanel,
  like_count,
}: ImagePreviewTypes) {
  const [base64Images, setBase64Images] = useState<string[]>([]);

  const setImage = (imagesLength: number) => {

    switch (imagesLength) {
      case 0:
        return <NoImage like_count={like_count ?? 0} />;
      case 1:
        return <OneImage base64Images={base64Images} like_count={like_count ?? 0} />;
      case 2:
        return (
          <OneImage
            base64Images={base64Images.slice(1)}
            like_count={like_count ?? 0}
          />
        );
      default:
        return (
          <MultiImage
            inAdminPanel={inAdminPanel}
            base64Images={base64Images.slice(1)}
            like_count={like_count ?? 0}
          />
        );
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      const imageArray: string[] = imageGuids.split(",").filter((item) => item);
      const result = await Promise.all(
        imageArray.map(async (item: string) => {
          const imgRes: string = await GetBase64ImageIdAPI(item);
          return imgRes;
        })
      );
      setBase64Images(result);
    };
    if (imageGuids.length > 0) {
      fetchImages();
    }
  }, [imageGuids]);

  return (
    <div className="product-details__image w-full xl:col-span-1 relative">
      {/* نمایش عکس‌ها */}
      {setImage(base64Images?.length)}

      {/* کد آگهی */}
      <AdvertiseCode ad_code={ad_code} />

      {/* تعداد عکس‌ها */}
      {base64Images?.length > 1 && (
        <ImageCount image_count={+base64Images.length - 1} />
      )}

      {/* ضوابط عکس‌ها */}
      {/* <ImagesCondition /> */}
    </div>
  );
}
