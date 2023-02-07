import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "../../common/confing";

export const bidApi = createApi({
    reducerPath: "bidApi",
    baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
    endpoints: (builder) => ({
        getItems: builder.mutation({
            query(data) {
                return {
                    url: `/item?limit=${data.limit}&skip=${data.skip}&search=${data.search}&sort=${data.sort}&open=${data.open}`,
                    method: "GET",
                };
            },
        }),
        getItem: builder.mutation({
            query(data) {
                return {
                    url: `/item/${data.name}`,
                    method: "GET",
                };
            },
        }),
        createItem: builder.mutation({
            query(data) {
                const { item, ...body } = data;
                return {
                    url: "/item",
                    method: "POST",
                    body,
                };
            },
        }),
        deleteItem: builder.mutation({
            query(data) {
                return {
                    url: `/item/${data.name}`,
                    method: "DELETE",
                };
            },
        }),
        updateItem: builder.mutation({
            query(data) {
                return {
                    url: `/item/${data.name}`,
                    method: "PATCH",
                    body: data.item,
                };
            },
        }),
        createImage: builder.mutation({
            query(data) {
                return {
                    url: "/image",
                    method: "POST",
                    body: {
                        image: data,
                    },
                };
            },
        }),
    }),
});

export const {
    useCreateItemMutation,
    useGetItemsMutation,
    useGetItemMutation,
    useDeleteItemMutation,
    useUpdateItemMutation,
    useCreateImageMutation,
} = bidApi;
