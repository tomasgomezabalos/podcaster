import {configureStore} from "@reduxjs/toolkit";
import {podcastApi} from "../services/podcastApi";

export const store = configureStore({
  reducer: {
    [podcastApi.reducerPath]: podcastApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(podcastApi.middleware)
});
