import {
  ADD_BRAND,
  ADD_MODEL,
  ADD_TYPE,
  REMOVED_BRAND,
  REMOVED_MODEL,
  REMOVED_TYPE,
  REMOVE_SHOW_CAR,
  SET_SHOW_CAR,
} from "@/redux/filter/filter-slice";
import { Checkbox, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useState } from "react";
import { FaTable } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

const ShowSearchResult = ({
  customHandleChange,
  singleSelection,
  result,
  handleClose,
  indexOfBrand,
  brand,
}) => {
  const { multiple } = useSelector((state) => state.brandModel);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const dataFilter = useSelector((state) => state.filter);


  const handleRadio = (e, category, model, type, brand) => {
    setValue(e.target.value);
    customHandleChange(e, indexOfBrand, category, brand, model, type);
    handleClose();
  };


  const handleCheckBox = (car) => {

    //برای بار اول
    if (dataFilter.shownCars.length == 0) {
      dispatch(SET_SHOW_CAR(car))
    }

    else {
      dataFilter.shownCars.map((item) => {

        if (item.type == car.type && item.type) {
          dispatch(REMOVE_SHOW_CAR(dataFilter.shownCars.filter((el) => el.type != car.type)))
        }
        else if (item.model == car.model && !item.type) {
          dispatch(REMOVE_SHOW_CAR(dataFilter.shownCars.filter((el) => el.model != car.model)))
        }
        else {

          dispatch(SET_SHOW_CAR(car))
        }
      })

    }


  };





  return multiple && !singleSelection
    ? result.map((car) => {

      return (
        <div className="flex items-center" key={car.brand}>
          <Checkbox
            name={car.type ? car.type : car.model}
            onChange={() => handleCheckBox(car)}
            value={car.type || car.model}
          />

          {/* @@@___________________ همه مدل ها ___________________@@@ */}
          <span className="block">
            {!car.type && !car.model
              ? car.brand
              : car.type
                ? car.type
                : car.model}
          </span>
        </div>
      );
    })
    : result?.map((item, index) => {
      return (
        <RadioGroup
          value={value}
          name="controlled-radio-buttons-group"
          sx={{ my: 1 }}
        >
          <FormControlLabel
            key={index}
            value={item.type || item.model || brand}
            onChange={(e) =>
              handleRadio(
                e,
                item.is_car_made_aboard,
                item.model,
                item.type,
                item.brand
              )
            }
            control={<Radio />}
            label={item.type || item.model || brand}
            name={"carBrandModel"}
          />
        </RadioGroup>
      );
    });
};
export default ShowSearchResult;
