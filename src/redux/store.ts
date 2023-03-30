import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';

import {podcastApi} from './podcastApi';
import {podcastSlice} from './podcastSlice';

const store = configureStore({
  reducer: {
    podcast: podcastSlice.reducer,
    [podcastApi.reducerPath]: podcastApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(podcastApi.middleware)
});

setupListeners(store.dispatch);

export default store;
