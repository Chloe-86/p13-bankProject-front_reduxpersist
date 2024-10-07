import { apiSlice } from './apiSlice';
const USERS_URL =`${process.env.REACT_APP_API_URL}api/user`;


export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'GET',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url:  `${USERS_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: ({id, data}) => ({
        url:`${USERS_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    getProfil: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: 'GET',
      }),
    }),
    getAllUsers: builder.query({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'GET',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useGetProfilQuery,
  useGetAllUsersQuery,
} = userApiSlice;
