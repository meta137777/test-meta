"use client";
import { GetAdminParameterAdExpireGet } from "@/apis/authentication@";
import { SelectBox } from "@/attom/form@/components@/select@/select-box";
import { InfoCircle } from "iconsax-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ExpireDate = ({ formik }: { formik: any }) => {
  const [expireData, setExpireData] = useState<number>(50);

  useEffect(() => {
    GetAdminParameterAdExpireGet()
      .then((res) => {
        setExpireData(res.AdExpireParameter);
        formik.setFieldValue("expire_day_count", res.AdExpireParameter);
      })
      .catch(() => toast.error("متاسفانه خطایی رخ داده است."));
  }, []);

  const expirationDates = Array.from(
    { length: expireData },
    (_, index) => index + 1
  );

  return (
    <div className="my-8">
      <span className="text-blue font-bold text-xl">
        مدت زمان اعتبار هر آگهی
      </span>
      <div className="flex items-center gap-1 mt-6">
        <InfoCircle size="24" color="#EB6E02" variant="Bold" />
        <p>
          مدت زمان اعتبار این آگهی از زمان انتشار بر روی پلتفرم اُتو
          <span className="font-extrabold text-orange text-lg mx-1">
            {expireData} روز
          </span>
          است. در صورت نیاز می توانید مدت{" "}
          <span className="font-extrabold">زمان کمتری</span> برای اعتبار آگهی
          خود انتخاب نمایید.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 items-start mt-4">
        <SelectBox
          formik={formik}
          selectValue={expireData}
          options={expirationDates.map((item) => ({
            value: item,
            label: item,
          }))}
          name="expire_day_count"
        />
      </div>
    </div>
  );
};

export default ExpireDate;
