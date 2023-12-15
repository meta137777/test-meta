import { brandModelSelector } from "@/redux/brand-model/brand-model-slice";
import {
  REMOVED_BRAND,
  REMOVE_SHOW_CAR,
  filterSelector,
} from "@/redux/filter/filter-slice";
import { InputAdornment, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ArrowLeft2, CloseCircle, SearchNormal1 } from "iconsax-react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectByCheckbox from "./select-by-check-box";
import SelectByRadio from "./select-by-radio";
import ShowSearchResult from "./show-search-result";

interface DynamicBrandModalProps {
  models: any[];
  singleSelection?: boolean | undefined;
  mainValue?: any[] | undefined;
  customHandleChange: (
    e: any,
    index: any,
    category: any,
    brandOfCar: any,
    model: any,
    type: any
  ) => void;
  indexOfBrand?: number | undefined;
  defaultValue: any[] | undefined | string;
  hasLabel?: boolean | undefined;
}

type SelecteBrandObj = {
  alias: number;
  models: any[];
  id: number;
};

type SelectedBrand = {
  brand?: string | number;
  models?: any[];
  id?: number;
};

type TypeState = {
  brand?: string | number;
  model?: string | number;
  type?: string | number;
};

export default function DynamicBrandModal({
  models,
  singleSelection,
  mainValue,
  customHandleChange,
  indexOfBrand,
  defaultValue,
  hasLabel,
}: DynamicBrandModalProps) {
  //states
  const [open, setOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState<SelectedBrand>({});
  const [type, setType] = useState<TypeState>({});
  const [buttonValue, setButtonValue] = useState("");
  const [inputText, setInputText] = useState("");
  const [selectedBrandForScroll, setSelectedBrandForScroll] = useState<any>();
  const [selectedModelForScroll, setSelectedModelForScroll] = useState<any>();

  //handle scrolling in modal
  useEffect(() => {
    const elementBrand = document.getElementById(selectedBrandForScroll);
    if (elementBrand) {
      elementBrand.scrollIntoView({ behavior: "instant" });
    } else {
      const elementTopBrand = document.getElementById("topBrand");
      if (elementTopBrand) {
        elementTopBrand.scrollIntoView({ behavior: "instant" });
      }
    }

    const elementModel = document.getElementById(selectedModelForScroll);
    if (elementModel) {
      elementModel.scrollIntoView({
        behavior: "instant",
      });
    }
  }, [selectedModal]);

  const { multiple } = useSelector(brandModelSelector);
  const dataFilter = useSelector(filterSelector);

  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
    setSelectedModal(1);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedModal(1);
    setInputText("");
  };

  const handleBrandClick = (_id: number, selecteBrandObj: SelecteBrandObj) => {
    setSelectedBrandForScroll(_id);
    setSelectedBrand({
      brand: selecteBrandObj.alias,
      models: selecteBrandObj.models,
      id: selecteBrandObj.id,
    });
    setSelectedModal(2);
  };

  const handleModelClick = (
    _id: number,
    selectedModelObj: SelecteBrandObj,
    brand: any
  ) => {
    setSelectedModelForScroll(_id);
    setSelectedModal(3);
    const SelectedType = selectedBrand.models?.find((item) => item.id === _id);
    setType({
      brand: brand,
      model: selectedModelObj.alias,
      type: SelectedType.types,
    });
  };

  const handleCancle = () => {
    handleClose();
    dispatch(REMOVED_BRAND(""));
    setInputText("");
  };

  const handleRemoveModel = (car: any) => {
    dataFilter.shownCars.map((item) => {
      if (item.model == car.model) {
        dispatch(
          REMOVE_SHOW_CAR(
            dataFilter.shownCars.filter((el) => el.model != car.model)
          )
        );
      }
    });
  };

  let inputHandler = (e: any) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  let filteredModel: any[] = [];

  if (inputText) {
    models?.filter((el) => {
      el?.models?.map((item: any) => {
        if (item.alias.toLowerCase().includes(inputText) && !item.types) {
          filteredModel.push({
            brand: el.alias,
            model: item.alias,
            is_car_made_aboard: item.is_car_made_aboard,
          });
        } else if (item.types) {
          item?.types?.map((type: any) => {
            if (type.alias.toLowerCase().includes(inputText)) {
              filteredModel.push({
                brand: el.alias,
                model: item.alias,
                type: type.alias,
                is_car_made_aboard: type.is_car_made_aboard,
              });
            }
          });
        }
      });
    });
  }

  useEffect(() => {
    if (mainValue?.length == 0) {
      setButtonValue("انتخاب کنید");
    } else {
      mainValue?.map((item: any) => {
        if (item[0] == indexOfBrand) {
          setButtonValue(item[1]);
        }
      });
    }
  }, [mainValue]);

  return (
    <div>
      <div className="flex justify-start relative border border-gray-250 rounded h-[43px]">
        {hasLabel ? (
          ""
        ) : (
          <span
            className="absolute right-3 -top-2 bg-white pr-2 pl-6 text-gray-800 font-medium"
            style={{ fontSize: "12px" }}
          >
            برند و مدل
          </span>
        )}
        <button
          type="button"
          className="text-right rounded py-3 px-2 w-full md:truncate text-xs bg-white"
          onClick={handleOpen}
        >
          {Array.isArray(defaultValue) ? (
            defaultValue?.map((item) => (item.type || item.model) + "،")
          ) : defaultValue !== "" ? (
            defaultValue
          ) : (
            <span className="text-gray-300">انتخاب کنید</span>
          )}

          {Array.isArray(defaultValue) && defaultValue.length == 0 && (
            <span className="text-gray-300">انتخاب کنید</span>
          )}

          {buttonValue}
        </button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: "10px",
            boxShadow: 24,
            outline: "none",
            height: { xs: "95%", lg: "80%" },
            width: { xs: "90%", md: "35em" },
            padding: "1rem 1.5rem",
          }}
        >
          <div className="sticky top-0 z-20 md:h-[8rem] w-full shadow-sm flex flex-col md:gap-2 gap-1 h-1/6">
            <div className="flex relative justify-center items-center">
              <h1 className="text-center text-blue  text-lg font-bold">
                انتخاب برند و مدل
              </h1>
              <button onClick={handleClose} className="absolute top-0 left-0">
                <CloseCircle size="20" color="#7A7A7A" variant="Outline" />
              </button>
            </div>
            <TextField
              id="outlined-basic"
              inputProps={{
                style: {
                  height: "10px",
                },
              }}
              onChange={inputHandler}
              variant="outlined"
              fullWidth
              label="جست‌و‌جو"
              className="border-b mb-1"
              placeholder="جست‌و‌جو در برند و مدل"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchNormal1 size="16" />
                  </InputAdornment>
                ),
              }}
            />

            <div className="gap-2 md:pb-2 pb-1 flex flex-nowrap overflow-x-auto custom-scrollbar ">
              {dataFilter.shownCars.length == 0 && (
                <div className="flex items-center text-gray-disabled">
                  یک برند و مدل را انتخاب کنید
                </div>
              )}
              {dataFilter?.shownCars?.length > 0 &&
                dataFilter?.shownCars?.map((car, index) => {
                  return (
                    <div
                      key={index}
                      className="flex gap-1 items-center justify-between whitespace-nowrap text-sm py-1 px-2 rounded-full bg-blue -500 text-white border border-blue-400 transition-all hover:bg-blue  hover:text-white"
                    >
                      <span>{car.type || car.model || car.alias}</span>
                      <CloseCircle
                        size="16"
                        className="cursor-pointer"
                        onClick={() => handleRemoveModel(car)}
                      />
                    </div>
                  );
                })}
            </div>
          </div>

          {inputText !== "" && filteredModel.length > 0 ? (
            <div className="h-5/6">
              <div className="ml-2 px-3 overflow-y-auto h-5/6 custom-scrollbar">
                {filteredModel?.map((item) => {
                  return (
                    <>
                      {/*@ts-ignore */}
                      <ShowSearchResult
                        singleSelection={singleSelection}
                        indexOfBrand={indexOfBrand}
                        handleClose={handleClose}
                        customHandleChange={customHandleChange}
                        result={[item]}
                      />
                    </>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="h-5/6">
              <ul className="overflow-y-auto h-5/6 flex flex-col justify-start custom-scrollbar mt-2 pl-3">
                {selectedModal === 1 &&
                  models?.map((obj, index) => {
                    return (
                      <Fragment>
                        {index === 0 && <div id="topModel"></div>}
                        <div
                          id={obj.id}
                          key={obj.id}
                          className="flex justify-between items-center cursor-pointer py-3 border-b border-gray-250"
                          onClick={() => handleBrandClick(obj.id, obj)}
                        >
                          <li key={obj.id}>{obj.alias}</li>
                          <ArrowLeft2 size="20" color="#A3A3A3" />
                        </div>
                      </Fragment>
                    );
                  })}

                {selectedModal == 2 &&
                  selectedBrand?.models?.map((item, index) => {
                    return item.types ? (
                      <Fragment>
                        {index === 0 && <div id="topBrand"></div>}
                        <div
                          id={item.id}
                          key={item.id}
                          className="flex my-1 justify-between w-full items-center cursor-pointer py-2"
                          onClick={() =>
                            handleModelClick(
                              item.id,
                              item,
                              selectedBrand?.brand
                            )
                          }
                        >
                          <li key={item.id}>{item.alias}</li>
                          <ArrowLeft2 size="20" color="#A3A3A3" />
                        </div>
                      </Fragment>
                    ) : (
                      <li className="w-full">
                        <div className="flex my-1 justify-start w-full items-center cursor-pointer">
                          {multiple && !singleSelection ? (
                            <SelectByCheckbox
                              brand={selectedBrand.brand}
                              children={[item]}
                            />
                          ) : (
                            <SelectByRadio
                              brand={selectedBrand.brand}
                              indexOfBrand={indexOfBrand}
                              customHandleChange={customHandleChange}
                              children={[item]}
                              handleClose={handleClose}
                            />
                          )}
                        </div>
                      </li>
                    );
                  })}

                {selectedModal === 3 && (
                  <div className="flex flex-col  justify-start items-start cursor-pointer">
                    {multiple && !singleSelection ? (
                      <SelectByCheckbox
                        brand={selectedBrand.brand}
                        children={type}
                      />
                    ) : (
                      <SelectByRadio
                        brand={selectedBrand.brand}
                        indexOfBrand={indexOfBrand}
                        customHandleChange={customHandleChange}
                        children={type}
                        handleClose={handleClose}
                      />
                    )}
                  </div>
                )}
              </ul>
            </div>
          )}

          <div className="flex justify-between gap-3 px-3 text-center border-t border-gray-250est w-11/12 fixed mx-auto  pb-3 bottom-0 right-0 left-0 bg-white pt-4">
            <button
              className="border w-fit border-blue py-2 px-4 rounded-md text-blue "
              onClick={
                selectedModal == 1
                  ? handleCancle
                  : selectedModal == 2
                  ? () => setSelectedModal(1)
                  : () => setSelectedModal(2)
              }
            >
              {selectedModal == 1 ? "انصراف" : "قبلی"}
            </button>
            <button
              className="bg-blue w-fit py-2 px-4 rounded-md text-white"
              onClick={handleClose}
            >
              تایید
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
