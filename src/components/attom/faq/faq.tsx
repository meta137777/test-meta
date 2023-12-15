"use client";
import { convertToArraysOfSpecificIndex } from "@/utils/convert-to-arrays-of-specific-index";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { AddSquare, MinusSquare } from "iconsax-react";
import { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type LimitedData = {
  data: any[];
  level: number;
};

const FAQ = ({
  accordionValue,
  isMore,
}: {
  accordionValue: any[];
  isMore?: boolean;
}) => {
  const [expanded, setExpanded] = useState<number | boolean>(-1);
  const [isExpanded, setIsExpanded] = useState<number | boolean>(false);
  const [limitedData, setLimitedData] = useState<LimitedData>({
    data: [],
    level: 1,
  });

  const limitedLength = 5;

  const handleChange = (panel: number) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
    setIsExpanded(panel);
  };

  const slicedData = (limitedLevel = 1) => {
    const data = convertToArraysOfSpecificIndex({
      array: accordionValue || [],
      uniquePropertyName: "title",
      indexLengths: 5,
    });

    const currData = data.slice(0, limitedLevel);

    return currData.flat();
  };

  useEffect(() => {
    const data = slicedData(limitedData.level);
    setLimitedData({ ...limitedData, data });
  }, []);

  const handleShowMoreFaq = () => {
    const data = slicedData(limitedData.level + 1);
    setLimitedData({ data: data, level: limitedData.level + 1 });
  };

  const handleShowLessFaq = () => {
    const data = slicedData(limitedData.level - 1);
    setLimitedData({ data: data, level: limitedData.level - 1 });
  };

  return (
    <div className="mt-20 lg:w-1/2 md: w-[100vw - 40px] mx-auto ">
      <span className="font-bold tablet:text-2xl p-5 text-xl mt-14 mb-6 text-center block bg-dark-d_2 text-white">
        سوالات متداول
      </span>
      <div className="mx-auto pb-20">
        {limitedData?.data?.map((item, index) => {
          return (
            <>
              <Accordion
                style={{ margin: "16px 0px" }}
                expanded={expanded === index}
                onChange={handleChange(index)}
                className="custom-accordion py-5 bg-[#fff] border border-[#E0E0E2] m-0"
              >
                <AccordionSummary
                  expandIcon={
                    isExpanded === index && expanded === index ? (
                      <MinusSquare size="16" color="#3A3D42" />
                    ) : (
                      <AddSquare size="16" color="#3A3D42" />
                    )
                  }
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className="text-[#151618] font-bold">
                    {item.title}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails className="car-order-acc ">
                  {item.desc.map((txt: string, index: number) => {
                    return Array.isArray(txt) ? (
                      txt.map((p, index) => {
                        return (
                          <p
                            key={index}
                            className="text-justify text-[#7B808C]  leading-relaxed mb-2"
                          >
                            <span className="font-medium text-[#5A6276] mt-10 ">
                              {p}
                            </span>
                          </p>
                        );
                      })
                    ) : (
                      <p
                        key={index}
                        className="text-justify text-[#7B808C]  leading-relaxed mb-2"
                      >
                        <span className="font-medium text-[#5A6276] mt-10 ">
                          {txt}
                        </span>
                      </p>
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            </>
          );
        })}
        {limitedData.data.length !== accordionValue.length &&
          accordionValue.length && (
            <div className="flex gap-2 items-center justify-center">
              <p className="flex gap-2" onClick={handleShowMoreFaq}>
                <span className="font-medium cursor-pointer">مشاهده بیشتر</span>
                <IoIosArrowDown />
              </p>
            </div>
          )}

        {limitedData.data.length === accordionValue.length &&
          accordionValue.length > limitedLength && (
            <div className="flex gap-2 items-center justify-center">
              <p className="flex gap-2" onClick={handleShowLessFaq}>
                <span className="font-medium cursor-pointer">بستن</span>
                <IoIosArrowUp />
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default FAQ;
