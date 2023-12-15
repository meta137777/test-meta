"use client";

import PostExhibitorPublishedAdsAPI from "@/apis/exhibitor/post-exhibitor-published-ads.api";
import NotFound from "@/attom/errors/not-found";
import ExhibitorPersonalLanding from "@/page/exhibitor-personal-landig";
import { useParams } from "next/navigation";
import React from "react";

export default async function page() {
  let { id } = useParams();

  let formData = new FormData();
  formData.append("exhibitor", id);
  formData.append("page_number", 1);
  formData.append("page_size", 200);

  const exhibitorData = await PostExhibitorPublishedAdsAPI({
    body: formData,
    data: {
      next: { revalidate: 1 },
    },
  });

  return (
    <div>
      {exhibitorData?.ads ? (
        <ExhibitorPersonalLanding exhibitorData={exhibitorData} />
      ) : (
        <NotFound />
      )}
    </div>
  );
}
