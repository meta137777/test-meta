import GetDatasSSR from "@/apis/static-datas/get-static-datas-not-ssr.api";
import TemplateProvider from "@/components/template/main/layout/template-provider";
import UsedCarOrder from "@/page/car-order/used";
import { ConvertAPIImagesToBase64 } from "@/utils/get-images-base64-api";

export default async function UsedCarOrderPage() {
  const postedData = { page_number: 1, page_size: 200 };

  const brandModel = await GetDatasSSR({
    endPoint: "/BrandModelType/Get/All",
    body: postedData,
    method: "post",
  });

  const data = await GetDatasSSR({
    endPoint: "/AdSale/Get/Published/Used",
    method: "post",
    data: {
      next: { revalidate: 1 },
    },
    body: {
      page_number: 1,
      page_size: 6,
    },
  });

  // await ConvertAPIImagesToBase64(data?.ads ?? []);

  return (
    <UsedCarOrder
      usedData={data?.ads ?? []}
      brandModel={brandModel?.brandModelTypes ?? []}
    />
  );
}
