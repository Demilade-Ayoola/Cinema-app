import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "number",
  initialState: {
    numbers: "",
  },
  reducers: {
    setNumbers: (state, action) => {
      state.numbers = action.payload;
    },
  },
});
export const { setNumbers} = userSlice.actions;
export default userSlice.reducer;