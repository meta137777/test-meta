"use client";
import { FRONT2DB } from "@/config/url";
import { useRequest } from "@/hooks/useRequest";
import ProductDetails from "@/molcule/product-view/details@";
import { useParams } from "next/navigation";
import React from "react";

export default function page() {
  const params = useParams();

  const { data, isLoading } = useRequest({
    method: "GET",
    url: `${FRONT2DB}/AdSale/Get/Code/${params.id}`,
  });

  return (
    <div>
      <ProductDetails
        inAdminPanel={true}
        productData={data?.ads}
        isLoading={isLoading}
        user_name={data?.user_name}
        exhibitor_profile={data?.exhibitor_profile}
      />
    </div>
  );
}
