import { getCurrentUserToken } from "@/helpers/token";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
	baseUrl: "https://your-api-endpoint.com/",
	prepareHeaders: async (headers) => {
		const token = await getCurrentUserToken();
		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}
		headers.set("Content-Type", "application/json");
		return headers;
	},
});

export const api = createApi({
	reducerPath: "api",
	baseQuery: baseQuery,
	tagTypes: ["Transaction", "CurrentUser", "Users"],
	endpoints: (builder) => ({
		getExampleData: builder.query<{ id: number; name: string }, void>({
			query: () => "example-endpoint",
		}),
	}),
});

export const { useGetExampleDataQuery } = api;
