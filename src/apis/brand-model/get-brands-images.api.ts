import { FRONT2DB, FRONT2MESSAGE } from "@/config/url";
import httpService from "@/services/http-service";

export function GetBrandsImages(postedData:any): Promise<any> {
  return httpService
    .post(`${FRONT2DB}/Landing/Get`, postedData)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}
