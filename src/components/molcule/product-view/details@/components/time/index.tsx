import { timestampDiffrenceConvertor } from "@/utils/timestamp-diffrence-convertor";

export default function Time({ created_at }: { created_at: number }) {
  const { daysDiff, hoursDiff } = timestampDiffrenceConvertor(created_at);

  return (
    <>
      <div className="w-[1px] h-4 bg-gray-250"></div>
      <>
        {daysDiff ? (
          <span className="text-xs text-[#878C91] whitespace-nowrap">{daysDiff} روز پیش</span>
        ) : (
          hoursDiff !== 0 && (
            <span className="text-xs text-[#878C91] whitespace-nowrap">
              {hoursDiff} ساعت پیش
            </span>
          )
        )}
      </>
    </>
  );
}
