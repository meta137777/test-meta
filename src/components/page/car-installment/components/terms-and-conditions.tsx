"use client";
import { CiShare1 } from "react-icons/ci";

const TersmAndConditions = () => {
  const tabs = ["مدارک متقاضی", "مدارک ضامن‌ها", "تعداد ضامن‌ها "];

  const applicantDocuments = [
    { title: "برگه عضویت", badge: `سامانه ثنا `, icon: <CiShare1 /> },
    { title: "چک صیادی بنفش" },
    { title: "اصل مدارک هویتی (شناسنامه و کارت ملی)" },
  ];

  const guarantorsDocuments = [
    { title: "برگه عضویت", badge: "سامانه ثنا", icon: <CiShare1 /> },
    {
      title: "چک صیادی بنفش",
    },
    { title: "اصل مدارک هویتی (شناسنامه و کارت ملی)" },
  ];

  const guarantorsNum = [
    { label: "تا سقف مبلغ 300 میلیون تومان وام ", value: "بدون ضامن" },
    { label: "مبلغ 300 تا 600 میلیون تومان وام ", value: "نیازمند یک ضامن" },
    {
      label: "مبلغ 600 میلیون تا 1 میلیارد تومان وام",
      value: "نیازمند دو ضامن",
    },
  ];

  return (
    <div className="flex flex-col mt-10">
      <h3 className="text-gray-900 text-center my-8 text-2xl bg-white">
        شرایط و مدارک <span className="font-bold">خرید اقساطی</span>
      </h3>

      <div className="lg:flex hidden bg-white border  border-gray-150  justify-around lg:gap-10 md:gap-4 gap-2 md:py-6 py-2 md:px-4 px-2 ">
        {tabs.map((text, index) => {
          return (
            <div
              className={`w-fit px-6 cursor-pointer py-2 md:text-base text-sm flex transition-all justify-center items-center rounded-full`}
              key={index}
            >
              <span className="ml-15 font-bold">{text}</span>
            </div>
          );
        })}
      </div>

      <div className="p-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 border border-gray-150 rounded">
        <div>
          <h3 className="font-bold text-lg lg:hidden block mb-4">
            مدارک متقاضی
          </h3>
          <ul className="flex flex-col gap-4">
            {applicantDocuments.map(({ title, badge, icon, uIcon }, index) => {
              return (
                <li className="flex items-center gap-2">
                  <span
                    className={`rounded-full w-8 h-8 bg-white flex justify-center shadow-md font-bold items-center text-sm text-gray-900 `}
                  >
                    {++index}
                  </span>
                  <p className={`text-gray-900 flex gap-2 `} key={title}>
                    {title}
                    {badge && icon && (
                      <a
                        target="_blank"
                        href="https://sana.adliran.ir/Sana/Index#/Main"
                        className="bg-white gap-2 items-center flex border border-[#D9D9D9] px-2 rounded-lg"
                      >
                        {badge}
                        {icon}
                      </a>
                    )}
                    {uIcon && uIcon}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg lg:hidden block mb-4">
            مدارک ضامن‌ها
          </h3>
          {/* <div className="hidden lg:block" id="req-registeration"></div> */}
          <ul className="text-gray-900 font-light flex flex-col gap-4 mx-auto md:list-disc list-none">
            {guarantorsDocuments.map(({ title, badge, icon }, index) => {
              return (
                <li className="flex items-center gap-2">
                  <span
                    className={`rounded-full w-8 h-8 bg-white flex justify-center shadow-md font-bold items-center text-sm text-gray-900 `}
                  >
                    {++index}
                  </span>

                  <p className={`text-gray-900 flex gap-2`} key={title}>
                    {title}{" "}
                    {badge && icon && (
                      <a
                        target="_blank"
                        href="https://sana.adliran.ir/Sana/Index#/Main"
                        className="bg-white gap-2 items-center flex border border-[#D9D9D9] px-2 rounded-lg"
                      >
                        {badge}
                        {icon}
                      </a>
                    )}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg lg:hidden block mb-4">
            تعداد ضامن‌ها
          </h3>
          <ul className="text-gray-900 font-light flex flex-col gap-4 mx-auto md:list-disc list-none">
            {guarantorsNum.map((text, index) => {
              return (
                <li className="flex items-center gap-2">
                  <span
                    className={`rounded-full w-8 h-8 bg-white flex shadow-md font-bold justify-center items-center text-sm text-gray-900 `}
                  >
                    {++index}
                  </span>
                  <span className={`text-gray-900 `} key={index}>
                    {text.label} :{" "}
                    <span className="font-bold">{text.value}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TersmAndConditions;
