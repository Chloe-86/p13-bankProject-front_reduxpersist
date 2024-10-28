import { apiSlice } from "./apiSlice";
const USERS_URL = `${import.meta.env.VITE_API_URL}/api/v1/user`;

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ token, data }) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        headers: { Authorization: token },
        body: data,
      }),
    }),
    getProfil: builder.mutation({
      query: ({ token }) => ({
        url: `${USERS_URL}/profile`,
        method: "POST",
        headers: { Authorization: token },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useUpdateUserMutation, useGetProfilMutation } = userApiSlice;
