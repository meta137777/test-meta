import { FRONT2DB, FRONT2MESSAGE } from "@/config/url";
import httpService from "@/services/http-service";

export function GetBrandsCountAPI(): Promise<any> {
  return httpService
    .get(`${FRONT2DB}/AdSale/Get/Brands/Count`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}
