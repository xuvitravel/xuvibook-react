import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: null,
  email: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, data) {
      state.id = data?.payload?.id;
      state.name = data?.payload?.name;
      state.email = data?.payload?.email;
    },
    cleanUser(state) {
      state.id = null;
      state.name = null;
      state.email = null;
    },
  },
});

export const { updateUser, cleanUser } = userSlice.actions;

export default userSlice.reducer;
