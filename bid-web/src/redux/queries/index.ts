import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BACKEND_URL } from '../../common/confing'

export const bidApi = createApi({
  reducerPath: 'bidApi',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL}),
  endpoints: (builder) => ({
    createItem: builder.mutation({
      query(data) {
        const { item, ...body} = data
        return {
          url: '/item',
          method: 'POST',
          body,
        }
      }
    }),
    createImage: builder.mutation({
      query(data) {
        return {
          url: '/image',
          method: 'POST',
          body:{
            image: data
          },
        }
      }
    })
  })
})

export const {
  useCreateItemMutation,
  useCreateImageMutation
} = bidApi