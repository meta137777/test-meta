import React from "react";

export default function CarDetail({
  mileage,
  year_of_manufacture_display,
  fuel_type,
  gear_box_type,
}: any) {
  const data = [
    {
      title: "کارکرد (کیلومتر)",
      value: mileage,
    },
    {
      title: "سال ساخت",
      value: year_of_manufacture_display,
    },
    {
      title: "نوع سوخت",
      value: fuel_type ? fuel_type : "-",
    },
    {
      title: "گیربکس",
      value: gear_box_type ? gear_box_type : "-",
    },
  ];
  return (
    <div className="border border-gray-250 rounded p-6 grid md:grid-cols-4 grid-cols-2">
      {data.map(({ title, value }) => (
        <div>
          <span className="block text-center text-sm">{title}</span>
          <span className="block text-center font-bold">{value}</span>
        </div>
      ))}
    </div>
  );
}
