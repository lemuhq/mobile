import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "@/constants";
import { storage } from "@/utils/storage";
import { User } from "@/types/user";

const baseQuery = fetchBaseQuery({
	baseUrl: BACKEND_URL,
	prepareHeaders: async (headers) => {
		const token = await storage.getToken();

		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}

		return headers;
	},
});

export const userApi = createApi({
	reducerPath: "currentUser",
	baseQuery: baseQuery,
	tagTypes: ["LoginUser", "User"],

	endpoints: (builder) => ({
		getCurrentUser: builder.query<User, void>({
			query: () => ({
				url: "/user/current-user",
				method: "GET",
			}),
			providesTags: ["User", "LoginUser"],
		}),
	}),
});

const { util } = userApi;

export const clearUserCache = () => {
	util.resetApiState(); // Clear all cache
};

export const {} = userApi;
