import { staticData } from "@/data";
import GuarantorsOneDatePickerInput from "./components/date-picker/guarantors-one-date-picker";
import GuarantorsTwoDatePickerInput from "./components/date-picker/guarantors-two-date-picker";
import { GuarantorsOneInput } from "./components/input/guarantors-one-input";
import { GuarantorsTwoInput } from "./components/input/guarantors-two-input";
import { GuarantorsOneSelectBox } from "./components/select-box/guarantors-one-select-box";
import { GuarantorsTwoSelectBox } from "./components/select-box/guarantors-two-select-box";
import GuarantorsOneTextarea from "./components/text-area/guarantors-one-text-area";
import GuarantorsTwoTextarea from "./components/text-area/guarantors-two-text-area";

const GuarantorsInfo = ({ formik }:any) => {
  return (
    <div className="lg:col-span-4 md:col-span-2 col-span-1 mt-6 border-b border-b-gray-200 pb-4">
      <h2 className="font-bold text-xl mb-4 text-blue">اطلاعات ضامن‌ها</h2>

      <>
        <h3 className="text-gray-500 font-medium mb-6">1- ضامن اول</h3>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
          <GuarantorsOneInput
            formik={formik}
            label="نام ضامن اول"
            name="guarantors[0].name"
            subName="name"
          />
          <GuarantorsOneInput
            formik={formik}
            label="نام‌خانوادگی ضامن اول"
            name="guarantors[0].family"
            subName="family"
          />
          <GuarantorsOneInput
            formik={formik}
            label="کدملی ضامن اول"
            name="guarantors[0].national_code"
            subName="national_code"
          />
          <GuarantorsOneInput
            formik={formik}
            label="موبایل ضامن اول"
            name="guarantors[0].mobile_number"
            subName="mobile_number"
          />
          <GuarantorsOneSelectBox
            formik={formik}
            label="نسبت ضامن اول"
            name="guarantors[0].relative"
            subName="relative"
            options={staticData.relatives}
            showEndAdorMent={true}
            showEndAdorMentValue="تست"
          />
          <GuarantorsOneInput
            formik={formik}
            label="شغل ضامن اول"
            name="guarantors[0].job"
            subName="job"
          />
          <GuarantorsOneInput
            formik={formik}
            label="محل صدور شناسنامه"
            name="guarantors[0].birth_certificate_issuing_place"
            subName="birth_certificate_issuing_place"
          />
          <GuarantorsOneInput
            formik={formik}
            label="شماره شناسنامه"
            name="guarantors[0].birth_certificate_code"
            subName="birth_certificate_code"
          />
          <GuarantorsOneDatePickerInput
            formik={formik}
            nameObject={{
              "guarantors[0].birth_date_year": "",
              "guarantors[0].birth_date_month": "",
              "guarantors[0].birth_date_day": "",
            }}
            name="guarantors[0].birth_date_year"
            subName="birth_date_year"
          />
          <GuarantorsOneInput
            formik={formik}
            label="تلفن ثابت"
            name="guarantors[0].landline_phone_number"
            subName="landline_phone_number"
          />
          <GuarantorsOneInput
            formik={formik}
            label="کد پستی"
            name="guarantors[0].postal_code"
            subName="postal_code"
          />
          <GuarantorsOneInput
            formik={formik}
            label="نام پدر"
            name="guarantors[0].father_name"
            subName="father_name"
          />
          <GuarantorsOneInput
            formik={formik}
            label="شماره تماس محل کار"
            name="guarantors[0].workplace_number"
            subName="workplace_number"
          />
          <GuarantorsOneTextarea
            customClass="lg:col-span-3 md:col-span-2 col-span-1"
            formik={formik}
            label="آدرس"
            subName="residence_address"
            name="guarantors[0].residence_address"
            row="5"
          />
        </div>
      </>
      <>
        <h3 className="text-gray-500 font-medium my-6">2- ضامن دوم</h3>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 mt-6">
          <GuarantorsTwoInput
            formik={formik}
            label="نام ضامن دوم"
            name="guarantors[1].name"
            subName="name"
          />
          <GuarantorsTwoInput
            formik={formik}
            label="نام‌خانوادگی ضامن دوم"
            name="guarantors[1].family"
            subName="family"
          />
          <GuarantorsTwoInput
            formik={formik}
            label="کدملی ضامن دوم"
            name="guarantors[1].national_code"
            subName="national_code"
          />
          <GuarantorsTwoInput
            formik={formik}
            label="موبایل ضامن دوم"
            name="guarantors[1].mobile_number"
            subName="mobile_number"
          />
          <GuarantorsTwoSelectBox
            formik={formik}
            subName="relative"
            label="نسبت ضامن دوم"
            name="guarantors[1].relative"
            options={staticData.relatives}
            showEndAdorMent={true}
          />
          <GuarantorsTwoInput
            formik={formik}
            label="شغل ضامن دوم"
            name="guarantors[1].job"
            subName="job"
          />

          <GuarantorsTwoInput
            formik={formik}
            label="محل صدور شناسنامه"
            name="guarantors[1].birth_certificate_issuing_place"
            subName="birth_certificate_issuing_place"
          />
          <GuarantorsTwoInput
            formik={formik}
            label="شماره شناسنامه"
            name="guarantors[1].birth_certificate_code"
            subName="birth_certificate_code"
          />
          <GuarantorsTwoDatePickerInput
            formik={formik}
            nameObject={{
              "guarantors[1].birth_date_year": "",
              "guarantors[1].birth_date_month": "",
              "guarantors[1].birth_date_day": "",
            }}
            name="guarantors[1].birth_date_year"
            subName="birth_date_year"
          />
          <GuarantorsTwoInput
            formik={formik}
            label="تلفن ثابت"
            name="guarantors[1].landline_phone_number"
            subName="landline_phone_number"
          />
          <GuarantorsTwoInput
            formik={formik}
            label="کد پستی"
            name="guarantors[1].postal_code"
            subName="postal_code"
          />
          <GuarantorsTwoInput
            formik={formik}
            label="نام پدر"
            name="guarantors[1].father_name"
            subName="father_name"
          />
          <GuarantorsTwoInput
            formik={formik}
            label="شماره تماس محل کار"
            name="guarantors[1].workplace_number"
            subName="workplace_number"
          />
          <GuarantorsTwoTextarea
            customClass="lg:col-span-3 md:col-span-2 col-span-1"
            formik={formik}
            subName="residence_address"
            label="آدرس"
            name="guarantors[1].residence_address"
            row="5"
          />
        </div>
      </>
    </div>
  );
};

export default GuarantorsInfo;
