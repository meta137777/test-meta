import { CiImageOn } from "react-icons/ci";

export default function ImageCount({ image_count }: { image_count: number }) {
  return (
    <div
      className="absolute top-4 right-4 bg-white text-gray-600 text-sm px-2 py-1 rounded font-medium z-10 flex items-center justify-center gap-2"
      style={{
        boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.16)",
      }}
    >
      <CiImageOn size={20} />
      <span>{image_count}</span>
    </div>
  );
}
