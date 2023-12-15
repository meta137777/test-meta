//@ts-nocheck

"use client";

import getPublishedUsedNewList from "@/apis/ad-sale/get-published-used-new-list";
import { PostFilterSave } from "@/apis/filter-save";
import { GetAdSaleSearchKeywords } from "@/apis/search";
import CardProduct from "@/attom/cards/card-product";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import MainPageFilter from "@/molcule/filter";
import SelectSortBy from "@/molcule/filter/components@/sort";
import NotFoundResult from "@/organism/car-order/not-found/not-found-result";
import { authSelector } from "@/redux/auth/auth-Slice";
import {
  PREVIEW_DATA,
  SET_SHOW_NULL,
  SHOW_NULL_BUTTON,
  filterSelector,
} from "@/redux/filter/filter-slice";
import { ADD_KEYWORD } from "@/redux/keywords/keywords-slice";
import { convertToArraysOfSpecificIndex } from "@/utils/convert-to-arrays-of-specific-index";
import CircularProgress from "@mui/material/CircularProgress";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";

const ProductListOrganinsm = ({
  models,
  colors,
  cities,
}: {
  models: any[];
  colors: any[];
  cities: any[];
}) => {
  const dataFilter = useAppSelector(filterSelector);
  const { sort, ascending } = dataFilter;
  const { userInfo } = useAppSelector(authSelector);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean | null>(null);
  const [pagingData, setPagingData] = useState<{
    page: number;
    mainPageNumber: number;
    data: any[];
    loading: boolean;
    count_all: number;
  }>({
    page: 1,
    data: [],
    loading: false,
    count_all: 0,
  });

  const [pagingFilterData, setPagingFilterData] = useState<any>({
    pageFilter: 1,
    data: [],
    filterWith: "",
  });

  const { pageFilter } = pagingFilterData;

  const searchParams = useSearchParams();

  const keyword = searchParams.get("keyword");

  const dispatch = useAppDispatch();

  const keywordHandler = (value) => {
    if (document.querySelector("#search_input_header")) {
      document.querySelector("#search_input_header").value = value;
    }
    GetAdSaleSearchKeywords(value)
      .then((res) => {
        dispatch(SET_SHOW_NULL());
        dispatch(ADD_KEYWORD(value));
        dispatch(PREVIEW_DATA(res));
        dispatch(SHOW_NULL_BUTTON(true));
      })
      .catch((err) => console.log(err));
  };

  const routess = usePathname();

  useEffect(() => {
    if (keyword && routess.includes("car-order/list")) {
      keywordHandler(keyword);
    }
  }, [keyword]);

  const filteredArr = dataFilter?.previewData?.reduce((acc, current) => {
    const x = acc.find(
      (item: any) => item.advertiser_id === current.advertiser_id
    );
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  if (pagingData.data === null) {
    return (
      <div className="text-center font-bold text-lg bg-red-100 text-red-500  py-4 rounded">
        محصولی موجود نیست
      </div>
    );
  }

  const showFilterhandler = () => {
    setShowFilter(!showFilter);
  };

  const handleOpen = () => {
    setOpenModal(true);
    const data = {
      brands: dataFilter?.model?.join(",") ?? -1,
      models: dataFilter?.model?.join(",") ?? -1,
      min_price: +dataFilter.min_price ? +dataFilter.min_price : -1,
      max_price: +dataFilter.max_price ? +dataFilter.max_price : -1,
      city: "",
      notification_type: "SMS",
      user_name: userInfo?.phone_number,
    };
    PostFilterSave(data)
      .then(() => toast.success("جستجو با موفقیت ذخیره شد."))
      .catch(() => toast.error("متاسفانه خطایی رخ داده است."));
  };

  const fetchData = () => {
    if (dataFilter?.previewData?.length) {
      setPagingFilterData({
        ...pagingFilterData,
        pageFilter: pagingFilterData.pageFilter + 1,
      });
      return;
    }

    setPagingData({ ...pagingData, page: pagingData.page + 1 });
  };

  const route = usePathname().split("/")[2];

  useEffect(() => {
    setPagingData({ ...pagingData, loading: true });

    (async () => {
      const published = await getPublishedUsedNewList({
        body: { page_number: pagingData.page, page_size: 9 },
        endpoint:
          route !== "list"
            ? route.charAt(0).toUpperCase() + route.slice(1)
            : "",
      });
      setPagingData({
        ...pagingData,
        data: [...pagingData.data, ...published?.ads],
        count_all: published.count_all,
      });
    })();
  }, [pagingData.page]);

  //---------------- when filter or sort data ----------------
  useEffect(() => {
    setPagingFilterData({ ...pagingFilterData, pageFilter: 1 });
  }, [sort, ascending]);

  useEffect(() => {
    const data = convertToArraysOfSpecificIndex({
      array: dataFilter?.previewData,
      uniquePropertyName: "advertiser_id",
      indexLengths: 9,
    });
    const curData = data.slice(0, pageFilter);

    if (dataFilter?.previewData?.length) {
      setPagingFilterData({ ...pagingFilterData, data: curData.flat() || [] });
    }
  }, [
    dataFilter?.previewData?.length,
    pageFilter,
    JSON.stringify(dataFilter?.previewData),
  ]);

  useEffect(() => {
    return () => {
      if (document.querySelector("#search_input_header")) {
        document.querySelector("#search_input_header").value = "";
      }
    };
  }, []);

  console.log(dataFilter.showNull);

  return (
    <div
      className="grid lg:grid-cols-4 md:grid-cols-3 gap-4 md:mt-0 mt-5 mb-16"
      id="product-list"
    >
      <div className="lg:col-span-1 md:col-span-1">
        <div
          className="md:static fixed bg-white top-[8rem] z-10 right-0 left-0 md:p-0 px-4 py-2"
          style={{ zIndex: "100" }}
        >
          <button
            className="lg:hidden flex items-center gap-1 text-blue font-medium text-sm px-5 py-1 border border-gray-200 rounded-lg leading-relaxed"
            onClick={showFilterhandler}
          >
            فیلترها
          </button>
        </div>
        <MainPageFilter
          colors={colors}
          models={models}
          setShowFilter={setShowFilter}
          showFilter={showFilter}
          showMileAge={true}
          classes={`${
            showFilter ? "right-0 top-0  z-9999 " : "-right-[50rem] top-32"
          }`}
        />
      </div>

      {dataFilter.showNull && dataFilter.showNull == true ? (
        <div className="grid lg:col-span-3 md:col-span-3  lg:grid-cols-3 tablet:grid-cols-3 md:grid-cols-2 gap-6 h-fit">
          <NotFoundResult
            cities={cities}
            models={models}
            handleOpen={handleOpen}
            setOpen={setOpenModal}
            open={openModal}
          />
        </div>
      ) : (
        <div className="grid lg:col-span-3 md:col-span-3  lg:grid-cols-3 tablet:grid-cols-3 md:grid-cols-2 gap-6 h-fit">
          {/*@ts-ignore */}
          <SelectSortBy
            newCar={usePathname().includes("car-order/new")}
            usedCar={usePathname().includes("car-order/used")}
          />
          {filteredArr?.length > 0 ? (
            filteredArr.length > 1 ? (
              <InfiniteScroll
                dataLength={pagingFilterData.data.length}
                next={fetchData}
                hasMore={true}
                loader={<></>}
                endMessage={<p></p>}
                style={{ width: "100%", overflow: "hidden !important" }}
                className="grid lg:grid-cols-3 tablet:grid-cols-3 md:grid-cols-2 gap-6 h-fit overflow-hidden"
              >
                {pagingFilterData.data.map((product: any) => {
                  return (
                    <Fragment key={product.ad_code}>
                      {/*@ts-ignore */}
                      <CardProduct
                        key={product.ad_code}
                        image={product.front_firstImage_base64File}
                        data={product}
                      />
                    </Fragment>
                  );
                })}
              </InfiniteScroll>
            ) : (
              <>
                {/*@ts-ignore */}
                <CardProduct
                  image={filteredArr[0].front_firstImage_base64File}
                  data={filteredArr[0]}
                />
              </>
            )
          ) : (
            <InfiniteScroll
              dataLength={pagingData.data.length}
              next={fetchData}
              hasMore={pagingData.data.length < pagingData?.count_all}
              loader={
                <div className="col-span-3 flex justify-center mt-4">
                  <CircularProgress />
                </div>
              }
              endMessage={<p></p>}
              style={{ width: "100%", overflow: "hidden !important" }}
              className="grid lg:grid-cols-3 tablet:grid-cols-3 md:grid-cols-2 gap-6 h-fit overflow-hidden"
            >
              {pagingData.data.map((product: any) => {
                return (
                  <Fragment key={product.ad_code}>
                    {/*@ts-ignore */}
                    <CardProduct
                      image={product.front_firstImage_base64File}
                      data={product}
                    />
                  </Fragment>
                );
              })}
            </InfiniteScroll>
          )}
        </div>
      )}
    </div>
  );
};
export default ProductListOrganinsm;
