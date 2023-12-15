"use client";
import React, { Fragment } from "react";

import { PostFilterSave } from "@/apis/filter-save";
import CardProduct from "@/attom/cards/card-product";
import { useAppSelector } from "@/hooks/redux-hooks";
import MainPageFilter from "@/molcule/filter";
import SelectSortBy from "@/molcule/filter/components@/sort";
import NotFoundResult from "@/organism/car-order/not-found/not-found-result";
import { authSelector } from "@/redux/auth/auth-Slice";
import { filterSelector } from "@/redux/filter/filter-slice";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import { convertToArraysOfSpecificIndex } from "@/utils/convert-to-arrays-of-specific-index";
import { usePathname } from "next/navigation";
import { useInfiniteQuery } from "react-query";
import { getPublishedUsed } from "@/apis/ad-sale/get-published-used-new-list";

const ProductListOrganinsm = ({
  ads,
  models,
  colors,
  cities,
  counts,
  queryKey,
}: {
  ads: any[];
  models: any[];
  colors: any[];
  cities: any[];
  counts: {
    count: number;
    count_all: number;
  };
  queryKey?: string;
}) => {
  const {
    data: dataAds,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    // queryKey: queryKey,
    queryFn: getPublishedUsed,
    getNextPageParam: (_, pages) => pages.length + 1,
  });

  const dataFilter = useAppSelector(filterSelector);
  const { sort, ascending } = dataFilter;
  const { userInfo } = useAppSelector(authSelector);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean | null>(null);
  const [pagingData, setPagingData] = useState<{
    page: number;
    mainPageNumber: number;
    data: any[];
  }>({
    page: 1,
    data: [],
    mainPageNumber: 1,
  });
  const [pagingFilterData, setPagingFilterData] = useState<any>({
    pageFilter: 1,
    data: [],
    filterWith: "",
  });

  const { page } = pagingData;
  const { pageFilter } = pagingFilterData;

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

  if (ads === null) {
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
    fetchNextPage();
    // const currPage = Math.ceil(
    //   filteredArr?.length
    //     ? pagingFilterData.data?.length / 50
    //     : pagingData?.data?.length / 50
    // );
    // if (dataFilter?.previewData?.length) {
    //   setPagingFilterData({
    //     ...pagingFilterData,
    //     pageFilter: pagingFilterData.pageFilter + 1,
    //   });
    // } else {
    //   if (pagingData?.data?.length === counts.count) {
    //     setPagingData({
    //       ...pagingData,
    //       page: pagingData.page + 1,
    //       mainPageNumber: pagingData.mainPageNumber + 1,
    //     });
    //   } else {
    //     setPagingData({ ...pagingData, page: pagingData.page + 1 });
    //   }
    // }
  };

  //   useEffect(() => {
  //     setPagingFilterData({ ...pagingFilterData, pageFilter: 1 });
  //   }, [sort, ascending]);

  //   useEffect(() => {
  //     const data = convertToArraysOfSpecificIndex({
  //       array: dataFilter?.previewData?.length ? dataFilter?.previewData : ads,
  //       uniquePropertyName: "advertiser_id",
  //     });
  //     const curData = data.slice(
  //       0,
  //       dataFilter?.previewData?.length ? pageFilter : page
  //     );

  //     if (dataFilter?.previewData?.length) {
  //       setPagingFilterData({ ...pagingFilterData, data: curData.flat() || [] });
  //     } else {
  //       setPagingData({ ...pagingData, data: curData.flat() || [] });
  //     }
  //   }, [
  //     page,
  //     dataFilter?.previewData?.length,
  //     pageFilter,
  //     JSON.stringify(dataFilter?.previewData),
  //   ]);
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

      {dataFilter.showNull == true ? (
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
        <>
          {/*@ts-ignore */}
          <InfiniteScroll
            dataLength={dataAds?.pages?.length * 8}
            next={fetchData}
            hasMore={true}
            loader={<p></p>}
            endMessage={<p></p>}
            style={{ width: "100%" }}
            className="grid lg:grid-cols-3 tablet:grid-cols-3 md:grid-cols-2 gap-6 h-fit"
          >
            <SelectSortBy
              newCar={usePathname().includes("car-order/new")}
              usedCar={usePathname().includes("car-order/used")}
            />
            {filteredArr?.length > 0 ? (
              filteredArr.length > 1 ? (
                pagingFilterData.data.map((product: any) => {
                  return (
                    <>
                      {/*@ts-ignore */}
                      <CardProduct
                        key={product.ad_code}
                        image={product.front_firstImage_base64File}
                        data={product}
                      />
                    </>
                  );
                })
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
              //   dataAds?.pages.map((ads: any) => {
              //     return (
              //       <>
              //         {/*@ts-ignore */}
              //         <CardProduct
              //           key={product.ad_code}
              //           image={product.front_firstImage_base64File}
              //           data={product}
              //         />
              //       </>
              //     );
              //   })
              dataAds?.pages.map(({ ads }, i) => {
                return (
                  <Fragment key={i}>
                    {ads?.map((product: any) => (
                      <CardProduct
                        key={product.ad_code}
                        image={product.front_firstImage_base64File}
                        data={product}
                      />
                    ))}
                  </Fragment>
                );
              })
            )}
          </InfiniteScroll>
        </>
      )}
    </div>
  );
};
export default React.memo(ProductListOrganinsm);
