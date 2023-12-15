import React from "react";

export default function WorkHour({ exhibition_working_hours }: any) {
  return (
    <div className="border border-gray-250 p-4 rounded flex justify-between mt-4">
      <span className="block">ساعت کاری:</span>
      <span className="block">{exhibition_working_hours ?exhibition_working_hours : "درج نشده است."}</span>
    </div>
  );
}
