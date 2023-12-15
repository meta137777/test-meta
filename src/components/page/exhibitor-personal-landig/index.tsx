"use client";

import ExhibiitorsDetailInfo from "./components/details-info";
import ExhibitorAds from "./components/ads";
import ExhibiitorMainInfo from "./components/main-info";

export default function ExhibitorPersonalLanding({ exhibitorData }: any) {  
  return (
    <>
      <ExhibiitorMainInfo exhibitorData={exhibitorData} />

      <ExhibiitorsDetailInfo profile={exhibitorData?.exhibitor_profile} />

      <ExhibitorAds
        name={
          exhibitorData?.exhibitor_profile?.exhibition_name
            ? exhibitorData?.exhibitor_profile?.exhibition_name
            : "-"
        }
        ads={exhibitorData?.ads}
      />
    </>
  );
}
