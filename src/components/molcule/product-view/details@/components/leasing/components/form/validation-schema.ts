import { regexNationalCode, regexPersianCharacter } from "@/utils/regex";
import * as Yup from "yup";

export const LeasignFormInitValuesValidationSchema = Yup.object({
  name: Yup.string()
    .matches(regexPersianCharacter, "مقدار صحیح نیست.")
    .required("درج نام الزامی است."),
  family: Yup.string()
    .matches(regexPersianCharacter, "مقدار صحیح نیست.")
    .required("نام‌خانوادگی الزامی است."),
  birth_date: Yup.string().required("تاریخ تولد الزامی است."),
  national_code: Yup.string()
    .matches(regexNationalCode, "مقدار صحیح نیست.")
    .required("کد ملی الزامی است."),
  city: Yup.string().required("انتخاب استان الزامی است."),
  phone_number: Yup.string().required("شماره تلفن الزامی است."),
  job: Yup.string()
    .matches(regexPersianCharacter, "مقدار صحیح نیست.")
    .required("شغل الزامی است."),
});
