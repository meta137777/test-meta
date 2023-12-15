import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";

export const GetBase64ImageIdAPI = async (image_id: string) => {
  try {
    const res = await httpService.get(`${FRONT2DB}/File/Id/${image_id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};