import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "@/constants";
import { storage } from "@/utils/storage";
import { User } from "@/types/user";

const baseQuery = fetchBaseQuery({
	baseUrl: BACKEND_URL,
	prepareHeaders: async (headers) => {
		const token = await storage.getToken();
		console.log("🚀 ~ prepareHeaders: ~ token:", token);

		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}

		return headers;
	},
});

export const userApi = createApi({
	reducerPath: "currentUser",
	baseQuery: baseQuery,

	endpoints: (builder) => ({
		getCurrentUser: builder.query<User, void>({
			query: () => ({
				url: "/user/current-user",
				method: "GET",
			}),
		}),
	}),
});

export const { useGetCurrentUserQuery } = userApi;
