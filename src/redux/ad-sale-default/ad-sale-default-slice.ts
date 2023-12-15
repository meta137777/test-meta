import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initial-state";
import { RootState } from "../store";

export const adSaleDefault = createSlice({
  name: "adSaleDefault",
  initialState,
  reducers: {
    SET_CAR_DATA: (state, { payload }) => {
      state.brand = payload.brand;
      state.model = payload.model;
      state.type = payload.type;
      state.mileage = payload.mileage;
      state.year_of_manufacture = payload.year_of_manufacture;
    },
  },
});

export const {SET_CAR_DATA} = adSaleDefault.actions;

export const adSaleDefaultSelector = (state: RootState) => state.adSaleDefault;

export default adSaleDefault.reducer;
