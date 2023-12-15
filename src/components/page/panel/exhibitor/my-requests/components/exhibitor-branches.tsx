import { FormInput } from "@/attom/form@/components@/inputs/form-input";
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

export default function ExhibitorBranches({ formik, number }: any) {
  return (
    <div className="mt-5">
      <div className="grid grid-cols-3 gap-4">
        <FormInput
          formik={formik}
          classNames="md:col-span-1 "
          name={`exhibition_branches_infos[${number}].branch_name`}
          label="نام شعبه"
          placeholder="شنبه تا چهارشنبه، 9 تا 18"
        />
        <FormInput
          formik={formik}
          classNames="md:col-span-1 "
          name={`exhibition_branches_infos[${number}].phone_number`}
          label="شماره تماس شعبه"
          placeholder="02188108260 و 02188108261 "
        />
      </div>

    </div>
  );
}
