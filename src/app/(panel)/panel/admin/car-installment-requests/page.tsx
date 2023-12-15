"use client";

import Alert from "@/attom/alerts/alert";
import CardAdminInstallmentList from "@/attom/cards/car/installment/card-admin-installment-list";
import { Loading } from "@/attom/loading/loading";
import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";
import { useQuery } from "react-query";

const CarInstallmentRequestsPage = () => {
  async function fetchData() {
    const { data } = await httpService.get(`${FRONT2DB}/Leasing/Get/All`);
    return data;
  }

  const { data, isError, isLoading } = useQuery("leasing", fetchData);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Alert title="متاسفانه خطایی پیش آمده‌ است" type="error" />;
  }

  return (
    <>
      <h1 className="font-bold text-xl mb-4 text-blue">
        درخواست‌های ثبت‌شده خرید اقساطی
      </h1>

      {data?.count !== 0 ? (
        <CardAdminInstallmentList data={data?.leasing} />
      ) : (
        <Alert
          title="شما تا کنون درخواست خرید اقساطی ثبت نکرده‌اید"
          type="error"
        />
      )}
    </>
  );
};

export default CarInstallmentRequestsPage;
