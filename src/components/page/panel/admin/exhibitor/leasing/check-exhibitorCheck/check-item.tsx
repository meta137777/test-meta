import DownloadDocument from "@/attom/exhibitors/download-document/download-document";
import PreviewDetail from "@/attom/exhibitors/preview-detail";
import { checkIndexName } from "@/utils/check-index-name";

export default function CheckItem({
  check,
  index,
  pay_to,
  check_national_id,
}: {
  check: any;
  index: number;
  pay_to: string;
  check_national_id: string | null;
}) {
  const check_data = [
    {
      title: "تاریخ چک به عدد",
      value: check?.date_in_number,
    },
    {
      title: "تاریخ چک به حروف",
      value: check?.date_in_letters,
    },
    {
      title: "مبلغ چک به (ریال)",
      value: check?.amount_in_number,
    },
    {
      title: "مبلغ چک به حروف",
      value: check?.amount_in_letters,
    },
    {
      title: "در وجه",
      value: pay_to,
    },
    {
      title: "شماره ملی",
      value: check_national_id,
    },
    {
      title: "بابت",
      value: "اخذ تسهیلات",
    },
    {
      title: "شرح",
      value: "خرید خودرو",
    },
  ];

  const check_details = [
    {
      title: "شناسه صیادی",
      value: check?.sayadi_id,
    },
    {
      title: "شماره چک",
      value: check?.check_no,
    },
    {
      title: "نام بانک",
      value: check?.bank,
    },
    {
      title: "شعبه بانک",
      value: check?.bank_branch,
    },
  ];

  return (
    <div>
      <h5 className="text-xs font-bold mb-2">چک {checkIndexName(index)}</h5>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 p-4 mb-4 rounded-lg border border-dashed border-gray-250">
        {check_data.map(({ title, value }) => (
          <div className="" key={title}>
            <span className="text-gray-300 block text-sm">{title}</span>
            <span className="text-gray-800 block text-sm font-medium">
              {value}
            </span>
          </div>
        ))}
        <div className="col-span-2 grid grid-cols-2 gap-4 mt-4">
          {check_details.map(({ title, value }) => (
            <PreviewDetail label={title} value={value} />
          ))}
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-4 mt-4">
          <DownloadDocument
            key={check?.image_id}
            title=""
            file={{
              image_id: check?.image_id?.split(",")[0],
              name: `تصویر چک ${checkIndexName(index)}`,
              suffix: "png",
            }}
          />
          <DownloadDocument
            key={check?.image_back_id}
            title=""
            file={{
              image_id: check?.image_back_id?.split(",")[0],
              name: `تصویر پشت چک ${checkIndexName(index)}`,
              suffix: "png",
            }}
          />
        </div>
      </div>
    </div>
  );
}
