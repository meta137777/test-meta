import LikeIconInCards from "@/attom/cards/components/like-icon-in-cards";
import { GoShareAndroid } from "react-icons/go";
import { RWebShare } from "react-web-share";

export default function Actions({ advertiser_type, advertiser_id, like }: any) {
  return (
    <div className="flex justify-end items-center gap-2 mr-auto mt-1">
      {/* تایپ آگهی دهنده */}
      <span className="text-xs block bg-[#CEEDD9] text-[#0AA643] px-2 py-1 font-medium whitespace-nowrap">
        {advertiser_type}
      </span>

      {/* اشتراک گذاری آگهی */}
      <RWebShare
        data={{
          text: "برای خرید و فروش آسان و مطمئن خودرو کنار شما هستیم.",
          url: typeof window !== "undefined" ? window.location.href : "",
          title: "اُتو",
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <button className="flex items-center justify-center p-2 rounded-full w-9 h-9 hover:bg-gray-150 transition-all">
          <GoShareAndroid color="#62666D" size={20} />
        </button>
      </RWebShare>

      {/* لایک آگهی */}
      <LikeIconInCards
        advertiser_id={advertiser_id}
        productDetail={{ advertiser_id: advertiser_id, like: like }}
        index={advertiser_id}
      />
    </div>
  );
}
