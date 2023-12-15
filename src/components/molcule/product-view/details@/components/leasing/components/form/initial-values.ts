let leasign_form_initial_values;

// @@@___________________ Formik initial Values ___________________@@@
export let LeasignFormInitValues = (ad_code: any, advertiser_id: any) => {
  leasign_form_initial_values = {
    name: "",
    family: "",
    birth_date: "",
    national_code: "",
    phone_number: "",
    city: "",
    job: "",
    status: "",
    ad_code: ad_code,
    advertiser_id: advertiser_id,
  };
  return leasign_form_initial_values;
};
