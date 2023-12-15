import { img } from "@/data";
import React from "react";

const ExhibitorRegistrationLevels = () => {
  return (
    <div>
      <span className="text-center font-bold xl:text-2xl text-xl block mb-5">
        مراحل ثبت نام نمایشگاه داران در اُتو
      </span>
      <img src={img.exhibitors_registeration_levels.src} alt="exhibitors_registeration_levels" className="tablet:block hidden"/>
      <img src={img.exhibitors_registeration_levels_mobile.src} alt="exhibitors_registeration_levels_mobile" className="tablet:hidden block px-8 mx-auto"/>
    </div>
  );
};

export default ExhibitorRegistrationLevels;
