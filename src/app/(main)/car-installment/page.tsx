import GetDatasSSR from "@/apis/static-datas/get-static-datas-not-ssr.api";
import CarInstallmentPage from "@/page/car-installment";
import React from "react";

const page = async() => {


  let postedData = {
    page_number: 1,
    page_size: 200,
  };

  const brandData = await GetDatasSSR({
    endPoint: "/BrandModelType/Get/All",
    body: postedData,
    method: "post",
  });


  return <CarInstallmentPage brandData={brandData?.brandModelTypes ?? []}  />;
};

export default page;
