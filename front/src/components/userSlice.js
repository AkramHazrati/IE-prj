import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user_id: -1,
    user_type: null,
    user_name: ""
  },
  reducers: {
    change_id: (state, action) => {
      state.user_id = action.payload;
    },
    change_type: (state, action) => {
      state.user_type = action.payload;
    },
    change_name: (state, action) => {
      state.user_name = action.payload;
    }
  },
});

export const { change_id, change_type, change_name } = userSlice.actions;

export default userSlice.reducer;