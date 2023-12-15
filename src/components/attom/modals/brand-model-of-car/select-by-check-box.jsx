import { REMOVE_SHOW_CAR, SET_SHOW_CAR } from "@/redux/filter/filter-slice";
import { Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const SelectByCheckbox = ({ children, brand }) => {
  const dispatch = useDispatch();
  const { shownCars } = useSelector((state) => state.filter);

  const handleCheckBoxModel = (car) => {
    if (shownCars.length == 0) {
      dispatch(
        SET_SHOW_CAR({
          brand: brand,
          model: car.alias,
          is_car_made_aboard: car.is_car_made_aboard,
        })
      );
    } else {
      shownCars.map((item) => {
        if (item.model == car.alias && !item.type) {
          dispatch(
            REMOVE_SHOW_CAR(
              shownCars.filter(
                (el) => el.model != car.alias && el.brand === brand
              )
            )
          );
        } else {
          dispatch(
            SET_SHOW_CAR({
              brand: brand,
              model: car.alias,
              is_car_made_aboard: car.is_car_made_aboard,
            })
          );
        }
      });
    }
  };

  const handleCheckBoxType = (car) => {
    if (shownCars.length == 0) {
      dispatch(
        SET_SHOW_CAR({
          brand: brand,
          model: children?.model,
          type: car.alias,
          is_car_made_aboard: car.is_car_made_aboard,
        })
      );
    } else {
      shownCars.map((item) => {
        if (item.type == car.alias && item.type) {
          dispatch(
            REMOVE_SHOW_CAR(shownCars.filter((el) => el.type != car.alias))
          );
        } else {
          dispatch(
            SET_SHOW_CAR({
              brand: brand,
              model: children?.model,
              type: car.alias,
              is_car_made_aboard: car.is_car_made_aboard,
            })
          );
        }
      });
    }
  };

  return children.type
    ? children.type?.map((car) => {
        return (
          <div className="flex items-center" key={children.brand}>
            <Checkbox
              checked={shownCars?.some((el) => el.type == car.alias)}
              name={car.alias}
              onChange={() => handleCheckBoxType(car)}
              value={car.alias}
            />

            <span className="block">{car.alias}</span>
          </div>
        );
      })
    : children.map((car, index) => {
        return (
          <div key={car.id} className="flex items-center ">
            <Checkbox
              checked={shownCars?.some((el) => el.model == car.alias)}
              name={car.alias}
              onChange={() => handleCheckBoxModel(car)}
              value={car.alias}
            />
            <h1>{car.alias}</h1>
          </div>
        );
      });
};

export default SelectByCheckbox;
