import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";

export const GetAdsaleGetPhoneNumberId = async (id: number) => {
  try {
    const res = await httpService.get(
      `${FRONT2DB}/AdSale/Get/PhoneNumber/Id/${id}`
    );
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};
