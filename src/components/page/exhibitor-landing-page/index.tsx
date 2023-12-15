"use client";

import ExhibitorHeaderBanner from "./main-components/exhibitor-header-banner";
import ExhibitorLandingFaq from "./main-components/exhibitor-landing-faq";
import ExhibitorOtoService from "./main-components/exhibitor-oto-service";
import ExhibitorRegistrationLevels from "./main-components/exhibitor-registration-levels";
import OtoAdvantage from "./main-components/oto-advantage";

const ExhibitorLandingPage = () => {
  return (
    <>
      <ExhibitorHeaderBanner />
      <ExhibitorOtoService />
      <OtoAdvantage />
      <ExhibitorRegistrationLevels />
      <ExhibitorLandingFaq />
    </>
  );
};

export default ExhibitorLandingPage;
