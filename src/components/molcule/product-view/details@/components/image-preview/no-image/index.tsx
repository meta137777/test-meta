import { img } from "@/data";
import LikeCount from "../like-count";

export default function NoImage({ like_count }: { like_count: number }) {
  return (
    <div className="h-96 flex justify-center items-center border border-gray-250 rounded relative">
      <img src={img.logo_main.src} alt="logo" />
      <LikeCount like_count={like_count} />
    </div>
  );
}
