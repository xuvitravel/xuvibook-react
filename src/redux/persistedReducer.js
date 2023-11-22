import { persistReducer } from "redux-persist";
import persistConfig from "./persistConfig";
import rootSlice from "./slice/rootSlice";

const persistedReducer = persistReducer(persistConfig, rootSlice);

export default persistedReducer;
