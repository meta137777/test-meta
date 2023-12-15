import React from "react";

export default function AdvertiseCode({ ad_code }: { ad_code: number }) {
  return (
    <div
      className="absolute top-4 left-4 bg-white text-gray-600 text-sm px-3 py-1 rounded font-medium z-10"
      style={{
        boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.16)",
      }}
    >
      <span>کد آگهی: {ad_code.toString()}</span>
    </div>
  );
}
