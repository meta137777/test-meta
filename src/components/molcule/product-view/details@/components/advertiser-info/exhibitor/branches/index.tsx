import React from "react";
import WorkHour from "../work-hour";

export default function Branches({ exhibition_branches_infos, exhibition_working_hours }: any) {

  return exhibition_branches_infos ? (
    <div className="mt-4 border-t border-t-gray-250 pt-4">
      {exhibition_branches_infos?.map(({ branch_name, phone_number }) => (
        <div className="flex justify-between items-center mt-2">
          <span className="block text-center">شعبه {branch_name}</span>
          <span className="block font-medium ltr text-left">
            {phone_number}
          </span>
        </div>
      ))}
      {exhibition_working_hours && <WorkHour exhibition_working_hours={exhibition_working_hours}/> }
    </div>
  ) : (
    <></>
  );
}
