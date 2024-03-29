import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_URL from "../config/api.ts";
import loginDto from "../modules/Login/types/login.dto.ts";

export const managerAPI = createApi({
  reducerPath: "managerAPI",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL, credentials: "include" }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (body: loginDto) => ({
        url: `auth/token/login/`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = managerAPI;

export const { login } = managerAPI.endpoints;
