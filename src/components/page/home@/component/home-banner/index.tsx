import { img } from "@/data";
import SearchCard from "./search/search-card";


const HomeBanner = ({ brandModelTypes }: any) => {
  return (
    <div className="w-full mx-auto mt-8">
      <div
        className="mx-auto lg:p-8 p-4 flex items-center md:justify-end justify-center rounded"
        style={{
          background: `url(${img.home_page_banner.src}) no-repeat center right`,
          backgroundSize: "cover",
          boxShadow: '0px 1px 8px 0px rgba(0, 0, 0, 0.16)'
        }}
      >
        <SearchCard brandModelTypes={brandModelTypes} />
      </div>
    </div>
  );
};

export default HomeBanner;
