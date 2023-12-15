export type priceCardType = {
  advertiser_id: string | number;
  is_leasing: boolean;
  announced_price: number;
  pricing_estimation: {
    estimate_at: number;
    lower_estimated: number;
    estimated: number;
    upper_estimated: number;
  };
};
