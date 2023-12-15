import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";

interface PropTypes {
  body?: {
    page_number: number;
    page_size: number;
  };
  data?: any;
  endpoint?: string;
}

export default async function getPublishedUsedNewList({
  body,
  data = {},
  endpoint = "",
}: PropTypes) {
  //@ts-ignore
  const publishdedEshibitorList = await httpService
    .post(
      `${FRONT2DB}/AdSale/Get/Published${
        endpoint
          ? `/${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}`
          : ""
      }`,
      body,
      data
    )
    .then((res) => {
      return res.data;
    });
  return publishdedEshibitorList;
}
