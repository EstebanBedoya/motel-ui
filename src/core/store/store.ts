/** @packages */
import { configureStore, createSlice } from '@reduxjs/toolkit';

export const iconslice = createSlice({
  name: 'icon',
  initialState: {
    icon: 'moon',
  },
  reducers: {
    iconMoon: (state) => {
      state.icon = 'moon';
    },
    iconSun: (state) => {
      state.icon = 'sun';
    },
  },
});

export const store = configureStore({
  reducer: {
    icon: iconslice.reducer,
  },
});

export const iconAction = iconslice.actions;
