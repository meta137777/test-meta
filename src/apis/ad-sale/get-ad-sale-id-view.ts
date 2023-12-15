import { FRONT2MESSAGE } from "@/config/url";
import httpService from "@/services/http-service";

export const GetAdSaleIdView = async (id: number) => {
  try {
    const res = await httpService.get(`${FRONT2MESSAGE}/AdSale/Id/${id}/View`);
    
  } catch (err) {
    return Promise.reject(err);
  }
};
