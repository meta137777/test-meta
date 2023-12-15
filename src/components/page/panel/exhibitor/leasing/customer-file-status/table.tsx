"use client";

import Alert from "@/attom/alerts/alert";
import { Loading } from "@/attom/loading/loading";
import CustomPagination from "@/attom/pagination/pagination";
import { FRONT2DB } from "@/config/url";
import { useAppSelector } from "@/hooks/redux-hooks";
import { useRequest } from "@/hooks/useRequest";
import { useState } from "react";
import TableRow from "./table-row";

export const CustomerFileStatusTable = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const [pagenum, setPageNum] = useState(1);

  const { data, isLoading, isError } = useRequest({
    method: "GP",
    url: `${FRONT2DB}/Exhibitor/Leasing/UserName/${userInfo?.phone_number}`,
    data: {
      page_number: pagenum,
      page_size: 12,
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
      <div className="tablet:col-span-5 col-span-1 gap-2 tablet:grid tablet:grid-cols-12 hidden bg-blue-100 items-center rounded-tr-md rounded-tl-md px-3 py-4">
        <div className="text-xs font-medium lg:block hidden">#</div>
        <div className="text-xs text-center font-medium">کد پرونده</div>
        <div className="text-xs text-center font-medium col-span-2">
          نام و نام‌خانوادگی
        </div>
        <div className="text-xs text-center font-medium col-span-2">کدملی</div>
        <div className="text-xs text-center font-medium col-span-2">
          شماره تماس
        </div>
        <div className="text-xs text-center font-medium col-span-2">وضعیت</div>
        <div className="text-xs text-center font-medium lg:col-span-2 tablet:col-span-3"></div>
      </div>

      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div className="mt-4">
          <Alert type="error" title="متاسفانه خطایی رخ داده است" />
        </div>
      ) : data ? (
        data?.exhibitorLeasings?.map((leasing: any, index: number) => (
          <TableRow leasing={leasing} index={++index} />
        ))
      ) : (
        <Alert type="error" title="درخواست خرید اقساطی ثبت نشده است." />
      )}

      <CustomPagination
        count={Math.ceil(data?.count_all / 12)}
        handleChangePage={handleChangePage}
      />
    </>
  );
};
