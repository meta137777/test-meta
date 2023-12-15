import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";

export const usePublishedUsedNewList = (page: number, route: string) => {
  const queryClient = useQueryClient();

  const addPublishedData = useMutation(
    (newData) => {
      return httpService.post(`${FRONT2DB}/AdSale/Add/Published`, newData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("publishedUsedNewList");
      },
    }
  );

  return useInfiniteQuery(
    "publishedUsedNewList",
    ({ pageParam = page }) => {
      const endpoint =
        route !== "list" ? route.charAt(0).toUpperCase() + route.slice(1) : "";
      return httpService
        .post(`${FRONT2DB}/AdSale/Get/Published/${endpoint}`, {
          page_number: pageParam,
          page_size: 9,
        })
        .then((res) => res.data);
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );
};
