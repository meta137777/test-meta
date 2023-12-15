import { FaRegHeart } from "react-icons/fa6";

export default function LikeCount({ like_count }: { like_count: number }) {
  return (
    <div className="absolute bottom-4 left-4 py-1 flex items-center rounded justify-center gap-2 bg-white px-3">
      {like_count}
      <FaRegHeart color="#FF4759" size={16} />
    </div>
  );
}
