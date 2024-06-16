import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import DollarSlice from "./redux/DollarSlice";

export const store = configureStore({
  reducer: {
    dollar: DollarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
