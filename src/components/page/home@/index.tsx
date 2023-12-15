import CarSaleSection from "./component/car-sale.tsx";
import ExhibitorSection from "./component/exhibitor";
import HomeBanner from "./component/home-banner";
import HomeFAQ from "./component/home-faq";
import { MostVisitedProductSlider } from "./component/most-visited-tab";
import { MultipleAds } from "./component/multiple-ads";
import OurBenefits from "./component/our-benefits";
import HomePagePrcing from "./component/pricing";
import SearchInBrands from "./component/search-in-brands";
import Services from "./component/services";
import HomePageVehicleCheck from "./component/vehicle-check";

export default function Home({
  brandModelTypes,
  top_published,
  multi_ads,
}: {
  brandModelTypes: any;
  top_published: any;
  multi_ads: any;
}) {
  return (
    <div className="home-page mb-10">
      <HomeBanner brandModelTypes={brandModelTypes} />
      <Services />
      <CarSaleSection brandModelTypes={brandModelTypes} />
      <MostVisitedProductSlider
        data={top_published}
        link={"/car-order/list/products"}
      />
      <HomePagePrcing />
      <MultipleAds data={multi_ads} />
      {/* جستجو در بین بیش از ۷۰ برند */}
      <SearchInBrands />
      <HomePageVehicleCheck />
      <OurBenefits />
      <ExhibitorSection />
      <HomeFAQ />
    </div>
  );
}
