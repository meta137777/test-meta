export interface PriceChartType {
  pricing_estimation: {
    estimate_at: number;
    lower_estimated: number;
    estimated: number;
    upper_estimated: number;
  };
  announced_price: number
}
