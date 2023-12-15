import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaChevronRight } from "react-icons/fa6";

export default function ReturnButton() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="w-full my-2">
      <button
        onClick={handleBack}
        className="text-sm flex items-center gap-2 justify-start text-[#62666D] hover:bg-[#F0F0F1] bg-white w-fit px-2 py-1"
      >
        <FaChevronRight />
        بازگشت
      </button>
    </div>
  );
}
