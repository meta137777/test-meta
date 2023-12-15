import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";

interface PropTypes {
  body: any;
  data?: any;
}

export default async function PostExhibitorPublishedAdsAPI({
  body,
  data = {},
}: PropTypes) {
  //@ts-ignore
  const publishdedEshibitorList = await httpService
    .post(`${FRONT2DB}/AdSale/Get/Published/Exhibitor`, body, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => err);
  return publishdedEshibitorList;
}
