import { FRONT2MESSAGE } from "@/config/url";
import httpService from "@/services/http-service";

interface PropTypes {
  postData: any;
}

export function PostCreateLeasing(postData: PropTypes): Promise<any> {
  return httpService
    .post(`${FRONT2MESSAGE}/Leasing`, postData)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}
