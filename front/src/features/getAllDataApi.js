import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

export const vocationApi = createApi({
  reducerPath: "vocation",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["dltUpdate"],

  endpoints: (builder) => ({
    getAllData: builder.query({
      query: () => "/",
      providesTags: ["dltUpdate"],
    }),
    pagginationData: builder.query({
      query: (page = 1) => `/api/data?page=${page}`,
      providesTags: ["dltUpdate"],
    }),
    deleteVocation: builder.mutation({
      query: (vocation_Id) => ({
        url: `/api/deleteVocation/${vocation_Id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["dltUpdate"],
    }),
    editVocation: builder.mutation({
      query: (formData) => ({
        url: `/api/updateCards`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["dltUpdate"],
    }),
    addVocation: builder.mutation({
      query: (formData) => ({
        url: `/api/uploadCards`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetAllDataQuery,
  useDeleteVocationMutation,
  useEditVocationMutation,
  useAddVocationMutation,
  usePagginationDataQuery,
} = vocationApi;
