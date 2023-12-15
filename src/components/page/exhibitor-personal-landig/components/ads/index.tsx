import CardProduct from "@/attom/cards/card-product";
import { convertToArraysOfSpecificIndex } from "@/utils/convert-to-arrays-of-specific-index";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function ExhibitorAds({ ads, name }: any) {
  const [pagingData, setPagingData] = useState<{ page: number; data: any[] }>({
    page: 1,
    data: [],
  });
  const { page } = pagingData;

  const fetchData = () => {
    setPagingData({ ...pagingData, page: pagingData.page + 1 });
  };

  useEffect(() => {
    const data = convertToArraysOfSpecificIndex({
      array: ads,
      uniquePropertyName: "advertiser_id",
      indexLengths: 8,
    });
    const curData = data.slice(0, page);

    setPagingData({ ...pagingData, data: curData.flat() || [] });
  }, [page, ads?.length]);

  return (
    <div className="mt-5 border border-gray-150 p-5 shadow-md rounded">
      <h1 className="font-bold my-3 text-lg ">آگهی های {name}</h1>
      <InfiniteScroll
        dataLength={pagingData.data.length}
        next={fetchData}
        hasMore={true}
        loader={<p></p>}
        endMessage={<p></p>}
        style={{ width: "100%" }}
      >
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4" id="product-exhibitor">
          {pagingData?.data.map((product: any) => {
            return <CardProduct key={product?.ad_code} data={product} />;
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}
