import { PiWarningCircleFill } from "react-icons/pi";

export default function ImagesCondition() {
  return (
    <button className="border border-gray-250 py-2 w-full mt-2 rounded flex justify-center gap-1">
      <span className="block text-center text-sm text-gray-600">
        ضوابط عکس‌ها
      </span>
      <PiWarningCircleFill color="#C0C2C5" />
    </button>
  );
}
