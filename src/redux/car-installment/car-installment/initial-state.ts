import { InitialType } from "./initial-type";

export const initialState: InitialType = {
  // بازپرداخت به ماه
  installments_duration: 6,

  // مبلغ درخواستی - مبلغ وام
  loan_amount: 0,

  // کل بازپرداخت
  refund_total: 0,

  // مبلغ تسهیلات
  facility_amount: 0,

  // درصد تسهیلات
  facility_percentage: 0.6,

  // تعداد اقساط
  number_of_installment: 2,

  // درصد سود تسهیلات
  facility_interest_percentage: 0.0985230024213074,

  // سود تسهیلات
  facility_interest: 0,

  // درصد بازاریابی
  marketing_percentage: 0.09,

  // مبلغ چک بجز چک آخر
  check_installments_monthly: 0,

  // مبلغ چک آخر
  last_check: 0,

  // پیش پرداخت
  loan_advance: 0,

  // درصد پیش پرداخت
  loan_advance_percentage: 0.4,


  showFactor: true,
  leasing_id: "",
  brand_models: [],
  brand: "",
  model: "",
  brandModelError: "",
  current_step: 1,
  advertiser_id: "",
  ad_code: "",
  monthly_installment: 0,
  constant_monthly_payment:0
};
