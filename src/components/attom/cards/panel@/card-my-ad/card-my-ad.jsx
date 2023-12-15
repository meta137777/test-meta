import { GetBase64ImageIdAPI } from "@/apis/images";
import { useEffect, useState } from "react";
import { Puff } from "react-loading-icons";
import MyAdDetails from "./components/my-ad-details";
import MyAdDraftUndraft from "./components/my-ad-draft-undraft";
import MyAdImageModal from "./components/my-ad-image-modal";

const CardMyAd = ({ product }) => {
  const [imageData, setImageData] = useState("");
  const [loadImage, setLoadImage] = useState(true);
  const [open, setOpen] = useState(false);

  const fetchImage = () => {
    if (product?.image_guids?.length > 0) {
      GetBase64ImageIdAPI(product?.image_guids?.split(",")[0]).then((res) => {
        setImageData(res);
        setLoadImage(false);
      });
    } else if (imageData.length > 0) {
   
        return GetBase64ImageIdAPI(imageData.split(",")[0]).then((res) => {
          setImageData(res);
          setLoadImage(false);
        });

    } else {
      setLoadImage(false);
    }
  };

  useEffect(() => {
    fetchImage();
  }, [open, imageData]);
  return (
    <div>
      <div className="bg-white grid grid-cols-7 gap-4 my-2 mb-3 p-4 items-end rounded-md custom-shadow">
        {loadImage && (
          <div className="lg:col-span-2 col-span-7 lg:h-full h-56  flex flex-col justify-center items-center lg:object-cover object-fit rounded-md m-auto">
            <Puff stroke="#1242E0" strokeOpacity={0.125} speed={0.75} />
          </div>
        )}

        {!loadImage && imageData && (
          <div className="lg:col-span-2 col-span-7 lg:h-48 sm:h-56 h-36 object-cover w-full shadow-lg m-auto object-bottom">
            <img
              className="object-contain h-full rounded-lg mx-auto"
              alt="product"
              src={`data:image/png;base64,${imageData}`}
            />
          </div>
        )}

        {product.image_guids == "" && (
          <MyAdImageModal
            setOpen={setOpen}
            open={open}
            setImgsSrc={setImageData}
            advertiser_id={product.advertiser_id}
            imgsSrc={imageData}
          />
        )}

        <div className="lg:col-span-5 col-span-7 flex flex-col h-full justify-between gap-2">
          <MyAdDraftUndraft product={product} />
          <MyAdDetails product={product} />
        </div>
      </div>
    </div>
  );
};

export default CardMyAd;
