import MainPageFilter from "@/molcule/filter";
import React from "react";

const ProductListFilter = ({
  colors = [],
  models = [],
  setShowFilter,
  showFilter,
}: {
  colors: any[];
  models: any[];
  setShowFilter: () => void;
  showFilter: null | boolean;
}) => {
  return (
    <div className="lg:col-span-1 md:col-span-1">
      <div
        className="md:static fixed bg-white top-[8rem] z-10 right-0 left-0 md:p-0 px-4 py-2"
        style={{ zIndex: "100" }}
      >
        <button
          className="lg:hidden flex items-center gap-1 text-blue font-medium text-sm px-5 py-1 border border-gray-200 rounded-lg leading-relaxed"
          // onClick={showFilterhandler}
        >
          فیلترها
        </button>
      </div>
      <MainPageFilter
        colors={colors}
        models={models}
        setShowFilter={setShowFilter}
        showFilter={showFilter}
        showMileAge={true}
        classes={`${
          showFilter ? "right-0 top-0  z-9999 " : "-right-[50rem] top-32"
        }`}
      />
    </div>
  );
};

export default ProductListFilter;
