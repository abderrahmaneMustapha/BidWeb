import { configureStore } from '@reduxjs/toolkit'
import { bidApi } from './redux/queries'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [bidApi.reducerPath]: bidApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bidApi.middleware),
})