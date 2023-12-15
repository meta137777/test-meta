"use client ";

import { PostAdBuyVip } from "@/apis/ad-buy";
import { FormInput } from "@/attom/form@/components@/inputs/form-input";
import { InputNumberSeprator } from "@/attom/form@/components@/inputs/input-number-seprator";
import DynamicBrandModal from "@/attom/modals/brand-model-of-car/dynamic-brand-modal";
import { img } from "@/data";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { SET_IS_MULTIPLE } from "@/redux/brand-model/brand-model-slice";
import { regexPersianCharacter, regexPhoneNumber } from "@/utils/regex";
import { useFormik } from "formik";
import { useEffect } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function FindInstallmentCars({ brandData }: any) {
  let initialValues = {
    brand: "",
    model: "",
    type: "",
    contact_phone_number: "",
    budget: "",
    first_name: "",
    last_name: "",
  };
  const dispatch = useAppDispatch();

  const customHandleChange = (
    e,
    indexOfBrand,
    category,
    brand,
    model,
    type
  ) => {
    formik.setValues({
      ...formik.values,
      brand: brand,
      model: model,
      type: type,
    });
  };
  const validationSchema = Yup.object({
    first_name: Yup.string()
      .matches(regexPersianCharacter, "مقدار وارد شده صحیح نیست")
      .required("نام الزامی است"),
    last_name: Yup.string()
      .matches(regexPersianCharacter, "مقدار وارد شده صحیح نیست")
      .required(" الزامی است"),
    contact_phone_number: Yup.string()
      .matches(regexPhoneNumber, "مقدار وارد شده صحیح نیست.")
      .required("شماره تماس الزامی است"),
  });

  const onSubmit = (values: any) => {
    let postData = new FormData();

    Object.entries(values).map(([key, value]) => postData.append([key], value));

    PostAdBuyVip(postData)
      .then(() => {
        formik.resetForm();
        toast.success("درخواست شما با موفقیت ثبت شد.");
      })
      .catch(() => toast.error("متاسفانه خطایی رخ داده است."));
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    dispatch(SET_IS_MULTIPLE(false));
  }, []);

  return (
    <>
      <div className="" id="req-registeration"></div>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-[rgb(224,224,226)] md:p-10 p-6 mt-10"
      >
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8 items-center justify-center">
          <div className="flex justify-center items-center">
            <img
              src={img.installment_man_pic.src}
              alt="arch_installment_cars"
              style={{
                boxShadow: "0px 0px 33px 0px rgba(0, 0, 0, 0.22)",
              }}
            />
          </div>
          <div>
            <div className="flex gap-5 flex-col mt-5">
              <h1 className="font-bold">ثبت درخواست خرید اقساطی</h1>
              <p className="pb-5">
                متقاضی محترم خرید اقساطی، با تکمیل اطلاعات زیر و ثبت درخواست،
                کارشناسان اُتو به زودی با شما تماس خواهند گرفت.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col col-span-2 gap-1">
                <label className="font-bold text-sm">برند و مدل</label>
                <DynamicBrandModal
                  defaultValue={
                    formik.values.type
                      ? formik.values.type
                      : formik.values.model
                      ? formik.values.model
                      : "انتخاب کنید."
                  }
                  models={brandData}
                  hasLabel={true}
                  customHandleChange={customHandleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-bold text-sm" id="mileage">
                  شماره تلفن همراه
                </label>
                <FormInput
                  className="col-span-1"
                  formik={formik}
                  name="contact_phone_number"
                  placeholder="09125478744"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-sm" id="mileage">
                  بودجۀ مد نظر{" "}
                </label>
                <InputNumberSeprator
                  className="col-span-1"
                  formik={formik}
                  name="budget"
                  placeholder="مثال:3,000,000,000"
                  // type="number"
                  showEndAdorMent={true}
                  showEndAdorMentValue="ریال"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-sm">نام</label>
                <FormInput
                  className="col-span-1"
                  formik={formik}
                  name="first_name"
                  placeholder="امیررضا"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-sm">نام خانوادگی</label>
                <FormInput
                  className="col-span-1"
                  formik={formik}
                  name="last_name"
                  placeholder="سیفی"
                />
              </div>

              <div></div>
              <button
                type="submit"
                className="bg-blue col-span-1 mt-3 text-white px-4 py-2 rounded"
              >
                ثبت درخواست
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
