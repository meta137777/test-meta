import { img } from "@/data";

type ChartImageType = {
  check_price: any;
};

export default function ChartImage({ check_price }: ChartImageType) {
  const price = check_price();

  const priceDeg = () => {
    switch (price) {
      case "خوش قیمت":
        return "-70deg";
        break;
      case "منصفانه و به قیمت":
        return "0";
        break;
      case "بالاتر از قیمت بازار":
        return "75deg";
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative">
      <img alt="chart" src={img.price_chart.src} />
      <img
        className={`absolute bottom-1 mx-auto left-0 right-0 transition ease-in-out`}
        alt="chart"
        src={img.price_chart_arrow.src}
        style={{
          transformOrigin: "bottom center",
          transform: `rotate(${priceDeg()})`,
        }}
      />
    </div>
  );
}
