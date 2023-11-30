import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { cartSlice } from "./cartSlices";
import { useDispatch, TypedUseSelectorHook ,useSelector } from "react-redux";

export const store =configureStore({
  reducer: {
    cart:cartSlice.reducer
  },
  devTools: true,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false})
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch:()=>AppDispatch = useDispatch;

export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;