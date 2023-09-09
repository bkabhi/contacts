import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiBaseUrl } from '../lib/react-query/api';
import { Contact } from "../features/contacts/models/Contacts";
import { apiRoutes } from "../routes/api.routes";

export const apiSlice = createApi({
    reducerPath: "apiSlice",
    baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
    tagTypes: ['Contact'],
    endpoints: (builder) => ({
        getAllContacts: builder.query<Contact[], void>({
            query: () => apiRoutes.contacts,
            providesTags: ['Contact'],
        }),
        createContact: builder.mutation({
            query: (data) => ({
                url: apiRoutes.contacts,
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ['Contact'],
        }),
        editContacts: builder.mutation({
            query: (payload) => {
                const { id, ...body } = payload;
                return ({
                    url: `${apiRoutes.contacts}/${id}`,
                    method: 'PUT',
                    body
                })
            },
            invalidatesTags: ['Contact'],
        }),
        deleteContact: builder.mutation({
            query: (id) => ({
                url: `${apiRoutes.contacts}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Contact'],
        }),
    }),
});

export const {
    useGetAllContactsQuery,
    useCreateContactMutation,
    useEditContactsMutation,
    useDeleteContactMutation,
} = apiSlice;
