import Time from "../time";
import Actions from "./actions";
import BreadCrumbs from "./bread-crumbs";
import PriceCard from "./price";

export default function MainInfo({ productData, is_leasing }: any) {
  const {
    model,
    brand,
    type,
    color,
    year_of_manufacture_display,
    advertiser_type,
    advertiser_id,
    like,
    announced_price,
    created_at,
    city,
    area,
    name,
    pricing_estimation
  } = productData;

  return (
    <div className="border border-gray-250 p-6 rounded flex flex-col gap-4">
      {/* عنوان آگهی */}
      <h3 className="font-bold text-lg text-gray-800">{name}</h3>
      <div className="flex flex-wrap justify-between items-center">
        {/* bread crumbs */}
        <div className="flex flex-wrap gap-2 items-center mt-1">
          <BreadCrumbs
            model={model}
            brand={brand}
            type={type}
            year_of_manufacture_display={year_of_manufacture_display}
          />
          <Time created_at={created_at} />

          {city && (
            <span className="text-[#878C91] text-xs whitespace-nowrap">
              در {city}
            </span>
          )}
          {area && (
            <span className="text-[#878C91] text-xs whitespace-nowrap">
              ، {area}
            </span>
          )}
        </div>

        {/* Actions */}
        <Actions
          advertiser_type={advertiser_type}
          advertiser_id={advertiser_id}
          like={like}
        />
      </div>
      <PriceCard
        announced_price={announced_price}
        is_leasing={is_leasing}
        advertiser_id={advertiser_id}
        pricing_estimation={pricing_estimation}
      />
    </div>
  );
}
