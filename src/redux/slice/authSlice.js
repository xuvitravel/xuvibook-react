import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  expires_in: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuth(state, data) {
      state.token = data?.payload?.token;
      state.expires_in = data?.payload?.expires_in;
    },
    cleanAuth(state) {
      state.token = null;
      state.expires_in = null;
    },
  },
});

export const { updateAuth, cleanAuth } = authSlice.actions;

export default authSlice.reducer;
