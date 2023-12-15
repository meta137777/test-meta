import React from "react";

export default function ExhibitorWorkHours({ profile }: any) {
  return (
    <div className="flex justify-between border border-gray-150 p-4 mt-4 rounded">
      <span>ساعات کاری:</span>
      <span>{profile?.exhibition_working_hours}</span>
    </div>
  );
}
