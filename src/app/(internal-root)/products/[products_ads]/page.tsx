import { FRONT2DB } from "@/config/url";
import ProductDetails from "@/molcule/product-view/details@";
import React from "react";

const getData = async (params: { products_ads: number | string }) => {
  const res = await fetch(
    `${FRONT2DB}/AdSale/Get/Code/${params.products_ads}`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());
  let data = res ?? {};
  return data;
};

const ProductView = async ({ params }: any) => {
  const data = await getData(params);


  return (
    <div>
      <ProductDetails
        productData={data?.ads}
        exhibitor_profile={data?.exhibitor_profile}
        isLoading={typeof data?.result !== "string"}
        user_name={data.user_name}
      />
    </div>
  );
};

export default ProductView;
