import FAQ from "@/attom/faq/faq";
import React from "react";
import { data } from "./faq-data";

const ExhibitorLandingFaq = () => {
  const accValue = data.map((faq) => {
    return {
      title: faq.title,
      desc: [faq.content],
    };
  });

  return <div>{<FAQ accordionValue={accValue} />}</div>;
};

export default ExhibitorLandingFaq;
