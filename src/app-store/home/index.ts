import { PayloadAction } from "@reduxjs/toolkit";
import { INITIAL_APP_STORE } from "../../constants";
import { createAppSlice } from "../../middlewares";

export const homeSlice = createAppSlice({
  name: "home",
  initialState: INITIAL_APP_STORE.home,
  reducers: (create) => ({
    setSearchText: create.reducer((state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    }),
  }),
});
