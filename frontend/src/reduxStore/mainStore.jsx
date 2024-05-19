import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import dataReducer from "./dataSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    datas: dataReducer,
  },
});

export default appStore;
