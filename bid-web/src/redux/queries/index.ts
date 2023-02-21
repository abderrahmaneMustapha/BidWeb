import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "../../common/confing";
import { addAuthToHeader } from "../../common/auth";

export const bidApi = createApi({
    reducerPath: "bidApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BACKEND_URL,
        prepareHeaders: (headers) => {
            const auth = addAuthToHeader();
            headers.set("authorization", auth.authorization);
            return headers;
        },
    }),

    endpoints: (builder) => ({
        getItems: builder.mutation({
            query(data) {
                return {
                    url: `/item?limit=${data.limit}&skip=${data.skip}&search=${data.search}&sort=${data.sort}&open=${data.open}&bidSort=${data.bidSort}`,
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
        createBid: builder.mutation({
            query(data) {
                return {
                    url: "/bid",
                    method: "POST",
                    body: data,
                };
            },
        }),
        listBid: builder.mutation({
            query(data) {
                return {
                    url: `/bid?limit=${data.limit}&skip=${data.skip}&name=${data.name}`,
                    method: "GET",
                };
            },
        }),
        maxBid: builder.mutation({
            query(data) {
                return {
                    url: `/bid/${data.name}/max`,
                    method: "GET",
                };
            },
        }),
        userItems: builder.mutation({
            query() {
                return {
                    url: `/bid/user`
                }
            }
        }),
        authUser: builder.mutation({
            query(data) {
                return {
                    url: "/auth",
                    method: "POST",
                    body: {
                        ...data,
                    },
                };
            },
        }),
        updateUser: builder.mutation({
            query(data) {
                return {
                    url: "/user",
                    method: "PATCH",
                    body: {
                        ...data
                    }
                }

            }
        }),
        getUser: builder.mutation({
            query(data) {
                return {
                    url: "/user",
                    method: "GET",
                }

            }
        }),
        notifyUser: builder.mutation({
            query(data) {
                return {
                    url: "/user/notifications",
                    method: "GET",
                }

            }
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
    useCreateBidMutation,
    useListBidMutation,
    useMaxBidMutation,
    useUserItemsMutation,
    useAuthUserMutation,
    useUpdateUserMutation,
    useGetUserMutation,
    useCreateImageMutation,
    useNotifyUserMutation,
} = bidApi;
