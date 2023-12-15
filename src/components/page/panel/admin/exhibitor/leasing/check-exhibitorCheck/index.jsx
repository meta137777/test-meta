"use client";

import { GetExhibitorData } from "@/apis/panel/exhibitor";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ChangeStatus from "../../components/change-status";
import CheckItem from "./check-item";

export default function UploadedChecksInfo() {
  const [state, setState] = useState({});
  const { id } = useParams();

  function fetchData() {
    GetExhibitorData(id).then((res) => {
      setState(res);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="font-bold">
        جزئیات پرونده کد :{state?.exhibitor_leasing_code}
      </h1>
      <div className="border-b border-gray-150 pb-4 mt-4">
        <h2 className="text-blue font-bold text-lg">
          اطلاعات چک‌های بارگذاری شده
        </h2>
      </div>
      <div className="mt-4">
        {state?.installment_info?.checks.map((check, index) => (
          <CheckItem
            check={check}
            index={index}
            key={index}
            pay_to={state?.installment_info?.check_templates[index]?.pay_to}
            check_national_id={
              state?.installment_info?.check_templates[index]?.check_national_id
            }
          />
        ))}
      </div>

      <div className="border-b border-gray-150 pb-4 mt-4">
        <h2 className="text-blue font-bold text-lg">
          اطلاعات چک‌های ضامن بارگذاری شده
        </h2>

        <div className="mt-4">
          {state?.installment_info?.guarantors_checks.map((check, index) => (
            <CheckItem
              check={check}
              index={index}
              key={index}
              pay_to={
                state?.installment_info?.guarantors_check_templates[index]
                  ?.pay_to
              }
              check_national_id={
                state?.installment_info?.guarantors_check_templates[index]
                  ?.check_national_id
              }
            />
          ))}
        </div>
      </div>

      <ChangeStatus
        exhibitor_leasing_id={id}
        confirmCondition="در انتظار پرداخت کارمزد"
        declineCondition="رد تصاویر چک"
      />
    </div>
  );
}
