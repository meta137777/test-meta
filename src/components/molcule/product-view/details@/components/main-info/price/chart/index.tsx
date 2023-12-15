import ChartImage from "./chart-image";
import { PriceChartType } from "./type";

export default function PriceChart({
  pricing_estimation,
  announced_price,
}: PriceChartType) {
  const { estimated, lower_estimated, upper_estimated } = pricing_estimation;

  const up_to_estimated =
    ((estimated - lower_estimated) * 2) / 3 + lower_estimated;

  const end_to_estimated = ((upper_estimated - estimated) * 1) / 3 + estimated;

  function checkPrice() {
    let price_label;
    if (announced_price < up_to_estimated) {
      price_label = "خوش قیمت";
    } else if (
      announced_price > up_to_estimated &&
      announced_price < end_to_estimated
    ) {
      price_label = "منصفانه و به قیمت";
    } else if (announced_price > end_to_estimated) {
      price_label = "بالاتر از قیمت بازار";
    }
    return price_label;
  }

  return (
    <div className="mt-4 flex items-center justify-between">
      <ChartImage check_price={checkPrice} />

      <span className="block font-bold">{checkPrice()}</span>
    </div>
  );
}
