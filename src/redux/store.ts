import {configureStore} from "@reduxjs/toolkit";
import {podcastApi} from "../services/podcastApi";
import {podcastSlice} from "./podcastSlice";

export const store = configureStore({
  reducer: {
    podcast: podcastSlice.reducer,
    [podcastApi.reducerPath]: podcastApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(podcastApi.middleware)
});
