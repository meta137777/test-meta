import { AUTH_URL } from "@/config/url";
import httpService from "@/services/http-service";

export function postAuthExhibitorRegisterAPI(postData: any): Promise<any> {
  return httpService
    .post(`${AUTH_URL}/Auth/Exhibitor/Register`, postData)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}
