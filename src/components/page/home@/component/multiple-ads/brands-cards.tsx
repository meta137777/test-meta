import { GetBrandsImages } from "@/apis/brand-model";
import { useEffect, useState } from "react";

interface PropTypes {
  brandData: {
    count: number;
    brand: string;
  };
}

export default function BrandsCards({ brandData }: PropTypes) {
  const [loading, setLoading] = useState(true);
  const [imgBrand, setImgBrand] = useState<string>("");

  function fetchImage() {
    let postedData = {
      brand: brandData.brand,
      model: "",
      type: "",
    };

    GetBrandsImages(postedData)
      .then((res) => {
        setLoading(false);
        setImgBrand(res.data);
      })
      .catch(() => setLoading(false));
  }

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <div className="flex flex-col gap-6 items-center justify-between bg-white rounded p-10 border border-gray-150 h-full">
      {loading ? (
        <div className="rounded bg-gray-250 h-32 w-24  mx-auto"></div>
      ) : (
        <img
          src={`data:image/png;base64,${imgBrand}`}
          alt={brandData.brand}
          className="h-32 w-24 object-contain"
        />
      )}

      <span className="text-lg font-bold block ">{brandData?.brand}</span>
    </div>
  );
}
