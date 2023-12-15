"use client";
import { PostAdSaleSearch } from "@/apis/search";
import DynamicBrandModal from "@/attom/modals/brand-model-of-car/dynamic-brand-modal";
import SelectPrice from "@/molcule/filter/components@/select/select-price";
import { SET_IS_MULTIPLE } from "@/redux/brand-model/brand-model-slice";
import {
  ADD_MODEL,
  PREVIEW_DATA,
  REMOVE_ALL,
  SET_SHOW_NULL,
  SET_SHOW_NULL_BTN,
  filterSelector,
} from "@/redux/filter/filter-slice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "src/hooks/redux-hooks";
import { StatusType } from "./type";
import { LinearProgress } from "@mui/material";

const SearchCard = ({ brandModelTypes }: any) => {
  const dataFilter = useAppSelector(filterSelector);

  const [status, setStatus] = useState<StatusType>({
    loading: false,
    error: false,
  });
  const dispatch = useAppDispatch();
  const router = useRouter();

  let check = false;

  const handleClick = async () => {
    setStatus({ loading: true, error: false });

    let data = {
      brands: dataFilter.shownCars.map(({ brand }) => brand).toString() ?? -1,
      models: dataFilter.shownCars.map(({ model }) => model).toString() ?? -1,
      types: dataFilter.shownCars.map(({ type }) => type).toString() ?? -1,
      min_price: +dataFilter.min_price ? +dataFilter.min_price : -1,
      max_price: +dataFilter.max_price ? +dataFilter.max_price : -1,
      min_Mileage: +dataFilter.min_Mileage ? +dataFilter.min_Mileage : -1,
      max_Mileage: +dataFilter.max_Mileage ? +dataFilter.max_Mileage : -1,
      colors: dataFilter?.colors?.join(",")
        ? dataFilter?.colors?.join(",")
        : "",
      with_image: check,
      gear_box_types: dataFilter?.gear_box_types?.join(",") ?? "",
      fuel_types: dataFilter?.fuel_types?.join(",") ?? "",
      min_year_of_manufacture: +dataFilter.min_year_of_manufacture
        ? +dataFilter.min_year_of_manufacture
        : -1,
      max_year_of_manufacture: +dataFilter.max_year_of_manufacture
        ? +dataFilter.max_year_of_manufacture
        : -1,
      car_damaged: dataFilter.carDamage.join(" - "),
      body_insurance: false,
      third_party_insurance: false,
      car_accident_insurance: false,
      international_car_insurance: false,
      distance: dataFilter?.distance,
      long: -1,
      lat: -1,
      keywords: "",
      engine_volume: -1,
      engine_power: -1,
      engine_torque: -1,
      sort: dataFilter.sort,
      ascending: dataFilter.ascending,
      is_car_made_aboard: false,
    };

    try {
      const tempSearch = await PostAdSaleSearch(data);

      if (tempSearch == null) {
        dispatch(SET_SHOW_NULL(true));
      } else {
        dispatch(SET_SHOW_NULL(false));
      }

      // await ConvertAPIImagesToBase64(tempSearch ?? []);

      dispatch(PREVIEW_DATA(tempSearch));

      setStatus({ ...status, loading: false });
      router.push("/car-order/list/products");
    } catch (error: any) {
      setStatus({ loading: true, error: false });
    }
  };

  useEffect(() => {
    dispatch(SET_IS_MULTIPLE(true));
  }, [dataFilter]);

  const handleRemoveClick = () => {
    dispatch(REMOVE_ALL(-1));
    dispatch(SET_SHOW_NULL(false));
  };

  useEffect(() => {
    dispatch(SET_SHOW_NULL_BTN(Boolean(dataFilter.shownCars.length)));
  }, [JSON.stringify(dataFilter.shownCars)]);

  return (
    <div
      className="tablet:w-[23rem] md:w-[22rem] w-full flex flex-col rounded p-4 bg-white"
      style={{ boxShadow: "0px 1px 11px 0px rgba(0, 0, 0, 0.33)" }}
    >
      <h2 className="text-gray-800 font-bold text-lg pb-3 mb-4 border-b border-b-gray-250">
        دنبال چه خودرویی هستید؟
      </h2>

      <div className="flex flex-col">
        <div className="flex flex-col gap-4">
          <DynamicBrandModal
            singleSelection={false}
            models={brandModelTypes}
            defaultValue={dataFilter.shownCars}
          />
          <SelectPrice />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <button
            onClick={handleClick}
            className={`rounded py-2 w-full text-white bg-blue font-semibold ${
              status.loading && "cursor-not-allowed"
            }`}
            disabled={status.loading ? true : false}
          >
            جست‌و‌جو
            {status.loading && <LinearProgress />}
          </button>

          {status.error && (
            <span className="block text-center text-red-500 text-sm">
              متاسفانه خطایی رخ داده است
            </span>
          )}
        </div>

        <div className="flex">
          {dataFilter.showNullButton && (
            <button
              className="text-red flex items-center justify-center gap-1 mx-auto text-sm w-1/2 mt-4"
              onClick={handleRemoveClick}
            >
              <HiOutlineTrash size={20} />
              <span className="ml-2 whitespace-nowrap font-medium">
                حذف فیلترها{" "}
              </span>
            </button>
          )}
          {/* <Link
            className="block text-gray text-center w-1/2 mr-auto"
            href="/advanced-search"
          >
            جستجوی پیشرفته
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
