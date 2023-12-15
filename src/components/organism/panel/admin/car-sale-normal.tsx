"use client";
import Alert from "@/attom/alerts/alert";
import CardProduct from "@/attom/cards/card-product";
import CustomPagination from "@/attom/pagination/pagination";
import { FRONT2DB } from "@/config/url";
import { useRequest } from "@/hooks/useRequest";
import CardSkeleton from "@/molcule/skeleton-components/card-skeleton";
import { useState } from "react";

interface StateData {
  ads: any[];
  isLoading: boolean;
  isError: boolean;
  page: number;
  pagingData: any[];
}

const NormalCarSaleRequestsPage = () => {
  const [pagenum, setPageNum] = useState(1);

  const { data, isLoading, isError } = useRequest({
    method: "GP",
    url: `${FRONT2DB}/AdSale/Get/All`,
    data: {
      page_number: pagenum,
      page_size: 21,
    },
    pagination: {
      isPagination: true,
      currentPage: pagenum,
    },
  });

  const handleChangePage = (
    event: React.ChangeEvent<HTMLInputElement>,
    newPage: number
  ): void => {
    setPageNum(newPage);
  };

  return (
    <>
      <h1 className="font-bold text-xl mb-4 text-blue">
        درخواست‌های ثبت‌شده فروش عادی
      </h1>

      {isLoading ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : isError ? (
        <Alert type="error" title="متاسفانه خطایی رخ داده است." />
      ) : data?.ads == null ? (
        <Alert type="error" title="آگهی ثبت نشده است" />
      ) : (
        <>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {data?.ads?.map((product: any) => {
              return (
                <CardProduct
                  inAdminPanel={true}
                  key={product.ad_code}
                  image={product.front_firstImage_base64File}
                  data={product}
                />
              );
            })}
          </div>
          <CustomPagination
            count={Math.ceil(data?.count_all / 21)}
            handleChangePage={handleChangePage}
          />
        </>
      )}
    </>
  );
};
export default NormalCarSaleRequestsPage;
