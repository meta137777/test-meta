import GetDatasSSR from "@/apis/static-datas/get-static-datas-not-ssr.api";
import Home from "@/page/home@";

const HomePage = async () => {
  let postedData = {
    page_number: 1,
    page_size: 200,
  };

  const brandData = await GetDatasSSR({
    endPoint: "/BrandModelType/Get/All",
    body: postedData,
    method: "post",
  });
  const top_published = await GetDatasSSR({
    endPoint: "/AdSale/Get/Published/Top",
    method: "get",
  });
  const multi_ads = await GetDatasSSR({
    endPoint: "/AdSale/Get/Brands/Count",
    method: "get",
  });

  return (
    <Home
      brandModelTypes={brandData?.brandModelTypes ?? []}
      top_published={top_published?.ads ?? []}
      multi_ads={multi_ads?.adsByBrands}
    />
  );
};

export default HomePage;
