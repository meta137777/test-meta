import React from "react";
import ProductKeywords from "../keywords";

export default function Description({ data, keywords }: any) {
    
  return (
    <div className="border border-gray-250 p-6 rounded mt-4">
      <span className="font-bold text-lg block mb-2">توضیحات</span>
      {data ? <p className="pb-4 border-b border-b-gray-250">{data}</p> : ""}

      <ProductKeywords keywords={keywords}/>
    </div>
  );
}
