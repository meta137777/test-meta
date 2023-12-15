import React from "react";

const CardSkeleton = () => {
  return (
    <div
      className="mx-1 bg-white rounded shadow-lg p-4 my-1 w-full"
      style={{
        boxShadow:
          "0px 1px 12px 0px rgba(0, 0, 0, 0.12), 0px 0px 1px 0px rgba(13, 68, 250, 0.16) inset",
      }}
    >
      <div className="h-52 p-3 overflow-hidden bg-gray-200 animate-pulse"></div>
      <div className="mt-12">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3 mt-2"></div>
        <div className="grid grid-cols-3 gap-4 mt-3">
          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-[1px] bg-gray-200 rounded animate-pulse my-2"></div>

        <div className="flex justify-end">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-2/3"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
