import GetDatasSSR from "@/apis/static-datas/get-static-datas-not-ssr.api";
import NewCarOrders from "@/components/page/car-order/new/index";
import TemplateProvider from "@/components/template/main/layout/template-provider";
import { ConvertAPIImagesToBase64 } from "@/utils/get-images-base64-api";

export default async function NewCarOrdersPage() {
  const postedData = { page_number: 1, page_size: 200 };

  const brandData = await GetDatasSSR({
    endPoint: "/BrandModelType/Get/All",
    body: postedData,
    method: "post",
  });

  const newData = await GetDatasSSR({
    endPoint: "/AdSale/Get/Published/New",
    method: "post",
    data: {
      next: { revalidate: 1 },
    },
    body: {
      page_number: 1,
      page_size: 6,
    },
  });

  return (
    <NewCarOrders
      brandModel={brandData?.brandModelTypes ?? []}
      // popularAds={publishedAds}
      newData={newData?.ads ?? []}
    />
  );
}
