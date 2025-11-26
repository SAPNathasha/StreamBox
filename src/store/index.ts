// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import favouritesReducer from "./favouritesSlice";
import moviesReducer from "./moviesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favourites: favouritesReducer,
    movies: moviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
