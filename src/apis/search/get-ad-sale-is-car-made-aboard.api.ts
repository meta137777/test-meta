import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";

export const GetAdSaleIsMadeAboard = async (type: string): Promise<any> => {
  try {
    const res = await httpService.get(
      `${FRONT2DB}/AdSale/Search/IsCarMadeAboard/${type}`
    );
    return res.data.ads;
  } catch (error) {
    return await Promise.reject(error);
  }
};
