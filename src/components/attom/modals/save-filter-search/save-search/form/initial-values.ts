let modalSaveSearchInitlaValue;

// @@@___________________ Formik initial Values ___________________@@@
export let modalSaveSearchInitValue = (state: any) => {
  modalSaveSearchInitlaValue = {
    brands: state?.brands,
    models: state?.models,
    min_price: state?.min_price == -1 ? "" : state?.min_price,
    max_price: state?.max_price == -1 ? "" : state?.max_price,
    city: state?.city,
    notification_type: "SMS",
    user_name: state,
  };
  return modalSaveSearchInitlaValue;
};
