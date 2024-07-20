import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchParams: "",
    globalSearch: "",
  },
  reducers: {
    setSearchParams: (state, action: PayloadAction<string>) => {
      state.searchParams = action.payload;
    },
    clearSearchParams: (state) => {
      state.searchParams = "";
    },
    setGlobalSearch: (state, action: PayloadAction<string>) => {
      state.globalSearch = action.payload;
    },
    clearGlobalSearch: (state) => {
      state;
    },
  },
});

export const {
  setSearchParams,
  clearSearchParams,
  setGlobalSearch,
  clearGlobalSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
