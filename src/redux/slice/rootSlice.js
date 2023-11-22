import { combineReducers } from "redux";
import authSlice from "./authSlice";
import userSlice from "./userSlice";

const rootSlice = combineReducers({
  auth: authSlice,
  user: userSlice,
});

export default rootSlice;
