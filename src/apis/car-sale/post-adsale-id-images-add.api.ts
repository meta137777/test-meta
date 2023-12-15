import { FRONT2MESSAGE } from "@/config/url";
import httpService from "@/services/http-service";

export function PostAdSaleIdImagesAdd(
  advertiser_id: any,
  postData: any
): Promise<any> {
  return httpService
    .post(`${FRONT2MESSAGE}/AdSale/Id/${advertiser_id}/Images/Add`, postData)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}
