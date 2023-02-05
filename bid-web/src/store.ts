import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { bidApi } from './redux/queries'

export const store = configureStore({
  reducer: {
    [bidApi.reducerPath]: bidApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bidApi.middleware),
})

setupListeners(store.dispatch)