import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";
import { toast } from "react-toastify";

type postedData = {
  page_number: number;
  page_size: number;
};

export const GetCarSaleListsAPI = (postData: postedData) => {
  return httpService
    .post(`${FRONT2DB}/AdSale/Get/All`, postData)
    .then((res) => res.data)
    .catch(() => {
      toast.error("دریافت لیست با خطا مواجه شد!");
    });
};
