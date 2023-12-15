import GetDatasSSR from "@/apis/static-datas/get-static-datas-not-ssr.api";
import TemplateProvider from "@/components/template/main/layout/template-provider";
import ProductListOrganinsm from "@/organism/product-list";

export default async function Product() {
  let pagedata = { page_number: 1, page_size: 100 };

  const brandData = await GetDatasSSR({
    endPoint: "/BrandModelType/Get/All",
    body: pagedata,
    method: "post",
  });

  const colorsList = await GetDatasSSR({
    method: "get",
    endPoint: "/Color/Get/All",
  });

  const citiesData = await GetDatasSSR({
    method: "get",
    endPoint: "/City/Get/All",
  });

  return (
    <ProductListOrganinsm
      models={brandData?.brandModelTypes || []}
      colors={colorsList?.colors || []}
      cities={citiesData?.cities || []}
    />
  );
}
