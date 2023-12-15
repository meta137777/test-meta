import { FRONT2MESSAGE } from "@/config/url";
import httpService from "@/services/http-service";

export const GetAdSaleIdInfo = async (id: number) => {
  try {
    const res = await httpService.get(`${FRONT2MESSAGE}/AdSale/Id/${id}/Info`);
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};
