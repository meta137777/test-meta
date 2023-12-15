import GetDatasSSR from "@/apis/static-datas/get-static-datas-not-ssr.api";
import AdvancedSearch from "@/page/advanced-search";

export default async function AdvancedSearchPage() {
  const data = await GetDatasSSR({
    endPoint: "/Color/Get/All",
    method: "get",
  });
  let postedData = {
    page_number: 1,
    page_size: 200,
  };

  const brandData = await GetDatasSSR({
    endPoint: "/BrandModelType/Get/All",
    body: postedData,
    method: "post",
  });

  return (
    <AdvancedSearch
      colors={data?.colors || []}
      models={brandData?.brandModelTypes ?? []}
    />
  );
}
