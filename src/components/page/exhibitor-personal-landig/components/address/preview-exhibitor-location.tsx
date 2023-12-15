"use client";

export default function PreviewExhibitorLocation({
  exhibition_address,
}: {
  exhibition_address: string;
}) {
  return (
    <div className="flex">
      <div>
        <span className="font-bold">آدرس:</span>
        <span>{exhibition_address}</span>
      </div>
    </div>
  );
}
