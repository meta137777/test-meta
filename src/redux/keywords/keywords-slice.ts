import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { initialState } from "./inital-state";
import { InitialType } from "./initial-type";
import { checkExistWindow } from "@/utils/check-exist-window";

export const keyword = createSlice({
  name: "keyword",
  initialState,
  reducers: {
    ADD_KEYWORD: (state: InitialType, { payload }) => {
      // checkExistWindow() && window.sessionStorage.setItem("keyword", payload);
      // let sessionKeyword =
      //   checkExistWindow() && window.sessionStorage.getItem("keyword");
      state.keywords = payload ? payload : "";
    },
    REMOVE_KEYWORD: (state: InitialType) => {
      state.keywords = "";
    },
  },
});

export const { ADD_KEYWORD, REMOVE_KEYWORD } = keyword.actions;

export const keywordSelector = (state: RootState) => state.keywords;

export default keyword.reducer;
