"use client";

import Alert from "@/attom/alerts/alert";
import { CardAdminInstallmentUser } from "@/attom/cards/car/installment/card-admin-installment-user";
import { Loading } from "@/attom/loading/loading";
import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

const page = () => {
  const searchParams = useSearchParams();

  const phone_number = searchParams.get("phone_number");
  const user_name = searchParams.get("user_name");

  async function fetchData() {
    const { data } = await httpService.get(
      `${FRONT2DB}/Leasing/Get/User/${phone_number}`
    );
    return data;
  }

  const { data, isError, isLoading } = useQuery("leasing", fetchData);


  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Alert title="متاسفانه خطایی پیش آمده‌ است" type="error" />;
  }

  return <CardAdminInstallmentUser data={data.leasing} user_name={user_name} />;
};

export default page;
