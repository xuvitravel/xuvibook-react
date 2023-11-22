import storage from "redux-persist/lib/storage"; // defaults to local storage

const persistConfig = {
  key: "root", // key for the storage
  storage, // storage method

  /* Add the reducer keys you want to persist here */
  whitelist: ["auth", "user"],
  // navigation will not be persisted
  blacklist: [],
};

export default persistConfig;
