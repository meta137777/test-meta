"use client";
import { InputNumberSeprator } from "@/attom/form@/components@/inputs/input-number-seprator";
import SelectYear from "@/attom/form@/components@/select@/select-year";
import SingleSelectBrandModel from "@/attom/modals/brand-model-of-car/single-select-brand-modal";
import { img } from "@/data";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { SET_CAR_DATA } from "@/redux/ad-sale-default/ad-sale-default-slice";
import { ADD_CAR_MODEL } from "@/redux/brand-model/brand-model-slice";
import { checkExistWindow } from "@/utils/check-exist-window";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";

export default function CarSaleSection({
  brandModelTypes,
}: {
  brandModelTypes: any;
}) {
  let initialValues = {
    brand: "",
    model: "",
    type: "",
    mileage: "",
    year_of_manufacture: "",
  };

  const dispatch = useAppDispatch();
  const router = useRouter();
  let user_info = checkExistWindow() && window.localStorage.getItem("userInfo");
  let user_token =
    checkExistWindow() && window.localStorage.getItem("userToken");

  const onSubmit = (values: any) => {
    dispatch(SET_CAR_DATA(values));
    dispatch(ADD_CAR_MODEL(values.type || values.model));

    if (user_info) {
      router.push("/car-sale/sell-my-car");
    } else {
      router.push("/auth/check");
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const customHandleChange = (
    e,
    index,
    category,
    brandOfCar,
    modelOfCar,
    typeOfCar
  ) => {
    let formikValue = formik.values;
    formik.setValues({
      ...formikValue,
      brand: brandOfCar,
      model: modelOfCar,
      type: typeOfCar,
    });

    dispatch(
      ADD_CAR_MODEL({
        name: "brand",
        value: e.target.value,
      })
    );

    formik.setFieldValue("is_car_made_aboard", category);
  };

  return (
    <div className="bg-gray-250 mt-10 md:p-12 p-6 gap-8 grid lg:grid-cols-5 grid-cols-1">
      <div className="lg:col-span-2">
        <img
          src={img.car_sale_home_page.src}
          alt="home page"
          className="rounded"
        />
      </div>
      <div className="lg:col-span-3 flex flex-col justify-between">
        <h3 className="font-bold text-lg text-gray-800">
          خودروی خود را اینجا آگهی کنید:
        </h3>

        <p className="text-gray-800 my-4 leading-loose">
          با ثبت آگهیِ فروش خودروی مورد نظرتان در <b>اُتو</b>، به راحتی آن را در
          معرض دید خریداران و بازدید‌کننده‌ها قرار دهید:
        </p>
        <form
          onSubmit={formik.handleSubmit}
          className="grid md:grid-cols-4 grid-cols-2 gap-4 "
        >
          <div className="col-span-2">
            <label className="font-bold text-sm">برند و مدل</label>
            <SingleSelectBrandModel
              singleSelection={true}
              customHandleChange={customHandleChange}
              defaultValue={
                formik.values.type || formik.values.model || "انتخاب کنید."
              }
              hasLabel={true}
              models={brandModelTypes}
            />
          </div>

          <div className="flex flex-col mt-1">
            <label className="font-bold text-sm">کارکرد</label>
            <InputNumberSeprator
              formik={formik}
              name="mileage"
              placeholder="280000"
              showEndAdorMent={true}
              showEndAdorMentValue="کیلومتر"
            />
          </div>
          <SelectYear
            inVehicle={true}
            title="سال ساخت"
            defaultValue={"انتخاب کنید"}
            formik={formik}
            badgeClassName="top-0"
            yearType={
              formik.values.year_of_manufacture <= 1402 &&
              formik.values.year_of_manufacture >= 1350
                ? false
                : true
            }
          />

          <div className=" md:col-span-4 col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-blue text-white px-16 mt-4 py-2 rounded font-semibold flex justify-center items-center gap-2"
            >
              ثبت آگهی
              <IoChevronBack size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
