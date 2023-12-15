"use client";
import { PostAuthUserUpdate } from "@/apis/authentication@/post-auth-user-update.api";
import { PostCarSaleAPI } from "@/apis/car-sale";
import { staticData } from "@/data";
import { adSaleDefaultSelector } from "@/redux/ad-sale-default/ad-sale-default-slice";
import {
  REMOVE_CAR_INFO,
  REMOVE_PRICING_DATA,
} from "@/redux/pricing/pricing-slice";
import { checkExistWindow } from "@/utils/check-exist-window";
import { parseJwt } from "@/utils/jwt";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "src/hooks/redux-hooks";
import { carSaleInitValues } from "./components/form/initial-value";
import { carSalevalidationSchema } from "./components/form/validation-schema";
import FurtherInfo from "./components/further-info";
import RequiredInfo from "./components/required-info";
import UserInfo from "./components/user-info";

export default function SellMyCar({ cars, cities, colors }: any) {
  const [roles, setRoles] = useState<any[]>([]);

  useEffect(() => {
    if (checkExistWindow()) {
      if (!localStorage.getItem("userInfo")) {
        return router.push("/auth/check");
      } else {
        if (localStorage.getItem("userToken")) {
          setRoles(
            parseJwt(JSON.parse(localStorage.getItem("userToken") ?? "{}"))
              .roles
          );
        }
      }
    }
    dispatch(REMOVE_PRICING_DATA());
    dispatch(REMOVE_CAR_INFO());
  }, []);

  // @@@___________________ Redux ___________________@@@
  const { userInfo } = useAppSelector((state) => state.auth);
  const { insurances } = useAppSelector((state) => state.insurance);
  const pricing = useAppSelector((state) => state.pricing);
  const ad_sale_default_data = useAppSelector(adSaleDefaultSelector);

  // @@@___________________ use State ___________________@@@
  const [imgsSrc, setImgsSrc] = useState<any>([]);
  const [showSearched, setShowSearched] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // @@@___________________ use App Dispatch ___________________@@@
  const dispatch = useAppDispatch();

  // @@@___________________ use Router ___________________@@@
  const router = useRouter();

  // @@@___________________ formik onSubmit ___________________@@@
  const onSubmit = (values: any) => {
    let data = new FormData();

    setIsLoading(true);

    if (imgsSrc.length === 1) {
      data.append("files", imgsSrc[0].blob);
    } else if (imgsSrc.length > 1) {
      imgsSrc.map((item: any) => {
        return data.append("files", item.blob);
      });
    }

    staticData.car_sale_items.map(({ name, value }) =>
      name == "expire_day_count" && value == ""
        ? data.append("expire_day_count", 50)
        : data.append(name, values[name] ? values[name] : value)
    );

    staticData.pricing_list_items.map(({ en }) => data.append(en, pricing[en]));

    data.append("status", "ثبت اولیه آگهی خودرو");
    data.append("user_name", userInfo.phone_number);
    data.append("type", values.type);
    data.append("keywords", JSON.stringify(showSearched));
    data.append("insurances", JSON.stringify(insurances));
    data.append("model", values.model);

    let userData = {
      user_name: userInfo.phone_number,
      phone_number: userInfo.phone_number,
      last_name: values.last_name,
      first_name: values.first_name,
    };

    data.delete("mileage");
    data.append("mileage", values.mileage);

    PostCarSaleAPI(data)
      .then(() => {
        toast.success("آگهی شما پس از تایید منتشر خواهد شد");
        PostAuthUserUpdate(userData)
          .then(() => {
            setIsLoading(false);
            dispatch(REMOVE_CAR_INFO());
            router.push(`/panel/${roles?.[0]}/info`);
          })
          .catch((err) => {
            toast.error("ثبت آگهی با خطا مواجه شد");
            setIsLoading(false);
            dispatch(REMOVE_CAR_INFO());
          });
      })
      .catch((err) => {
        toast.error("ثبت آگهی با خطا مواجه شد");
        setIsLoading(false);
        dispatch(REMOVE_CAR_INFO());
      });
  };

  // @@@___________________ use Formik ___________________@@@
  const formik = useFormik({
    initialValues: carSaleInitValues(ad_sale_default_data),
    validationSchema: carSalevalidationSchema,
    onSubmit,
    enableReinitialize: true,
    validateOnMount: true,
  });

  const MapModal = useMemo(
    () =>
      dynamic(() => import("@/attom/form@/components@/map@/map"), {
        ssr: false,
      }),
    []
  );

  return (
    <>
      <div className="bg-blue flex md:flex-row flex-col w-fit mx-auto mb-10 p-4 rounded-md items-center md:gap-12 gap-5">
        <span className="text-white text-center xl:text-lg">
          برای خرید و فروش آسان و مطمئن خودرو در کنار شما هستیم.
        </span>
      </div>
      <div className="custom-shadow md:p-4 p-3 rounded-md">
        <div className="mt-3">
          <h1 className="font-bold text-2xl text-blue mb-8">
            ثبت آگهی فروش خودرو
          </h1>
          <form onSubmit={formik.handleSubmit} className="flex flex-col">
            {/* @@@___________________ اطلاعات خودرو ___________________@@@ */}
            <RequiredInfo
              cities={cities}
              models={cars}
              colors={colors}
              formik={formik}
            />

            {/* @@@___________________ اطلاعات فردی ___________________@@@ */}
            <UserInfo formik={formik} />

            {/* @@@___________________ نقشه ___________________@@@ */}
            <MapModal
              classes="h-[18rem] mt-8 mr-0 ml-auto"
              hasDistance={false}
              formik={formik}
              name={{
                lat: "location_lat",
                long: "location_long",
              }}
            />

            {/* @@@___________________ اطلاعات تکمیلی ___________________@@@ */}
            <FurtherInfo
              formik={formik}
              showSearched={showSearched}
              setShowSearched={setShowSearched}
              imgsSrc={imgsSrc}
              setImgsSrc={setImgsSrc}
            />

            <button
              type="submit"
              className={`bg-blue text-white px-12 py-2 rounded-md w-fit mx-auto disabled:bg-gray-border disabled:text-gray-dark disabled:cursor-not-allowed`}
              disabled={isLoading}
            >
              ثبت خودرو
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
