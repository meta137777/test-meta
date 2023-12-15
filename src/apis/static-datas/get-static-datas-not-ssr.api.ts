import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";

interface PropTypes {
  endPoint: string;
  method?: string;
  data?: any;
  body?: any;
}

export default function GetDatasSSR({
  method = "get",
  endPoint,
  data = {},
  body = {},
}: PropTypes) {
  //@ts-ignore
  if (method.toLowerCase() === "post") {
    return httpService
      .post(`${FRONT2DB}${endPoint}`, body, data)
      .then((res: { data: any }) => res.data)
      .catch((err: any) => console.log(err));
  } else {
    return httpService
      .get(`${FRONT2DB}${endPoint}`, data)
      .then((res: { data: any }) => res.data)
      .catch((err: any) => console.log(err));
  }
}
