import { Loading } from "@/attom/loading/loading";
import React, { Suspense } from "react";
import LikeCount from "../like-count";
const ImageComponent = React.lazy(
  () => import("@/attom/image/image-component")
);

export default function OneImage({
  base64Images,
  like_count,
}: {
  base64Images: any;
  like_count: number;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative h-fit">
        <ImageComponent
          src={`data:image/png;base64,${base64Images[0]}`}
          alt="product"
        />
     
      <LikeCount like_count={like_count} /> </div>
    </Suspense>
  );
}
