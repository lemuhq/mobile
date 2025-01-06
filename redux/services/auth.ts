import { BACKEND_URL } from "@/constants";
import { User } from "@/types/user";
import { storage } from "@/utils/storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



const baseQuery = fetchBaseQuery({
	baseUrl: "http://192.168.1.147:5000/api/v1",
	prepareHeaders: async (headers) => {
		const token = await storage.getUserToken("token");

		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

export const authApi = createApi({
	reducerPath: "auth",
	baseQuery: baseQuery,
	tagTypes: ["LoginUser"],
	endpoints: (builder) => ({
		//Onboarding
		//Send otp
		sendOtp: builder.mutation({
			query: ({ phoneNumber }: { phoneNumber: string }) => ({
				url: "/onboarding/send-otp",
				method: "POST",
				body: { phoneNumber },
				headers: { "Content-Type": "application/json" },
			}),
		}),

		//Verify otp
		verifyOtp: builder.mutation({
			query: ({ otpId, otp }: { otpId: string; otp: string }) => ({
				url: "/onboarding/verify-otp",
				method: "POST",
				body: { otpId, otp },
				headers: { "Content-Type": "application/json" },
			}),
		}),

		//resend otp
		resendOtp: builder.mutation({
			query: ({ otpId }: { otpId: string }) => ({
				url: "/onboarding/resend-otp",
				method: "POST",
				body: { otpId },
				headers: { "Content-Type": "application/json" },
			}),
		}),

		//Initial bvn verification
		initiateBvnVerfication: builder.mutation({
			query: ({
				bvnNumber,
				phoneNumber,
			}: {
				bvnNumber: string;
				phoneNumber: string;
			}) => ({
				url: "/onboarding/initiate-bvn-verification",
				method: "POST",
				body: { bvnNumber, phoneNumber },
				headers: { "Content-Type": "application/json" },
			}),
		}),

		//Validate user BVN
		validateBvnVerification: builder.mutation({
			query: ({ identityId, otp }: { identityId: string; otp: string }) => ({
				url: "/onboarding/validate-bvn",
				method: "POST",
				body: { identityId, otp },
				headers: { "Content-Type": "application/json" },
			}),
		}),

		//Create a new user
		createNewUser: builder.mutation({
			query: ({
				phoneNumber,
				emailAddress,
				identityId,
				identityNumber,
				identityType,
				otp,
				password,
				lockPin,
				transactionPin,
			}: {
				phoneNumber: string;
				emailAddress: string;
				identityType: "BVN";
				identityNumber: string;
				identityId: string;
				otp: string;
				password: string;
				lockPin: string;
				transactionPin: string;
			}) => ({
				url: "/onboarding/create-account-number",
				method: "POST",
				body: {
					phoneNumber,
					emailAddress,
					identityType,
					identityNumber,
					identityId,
					otp,
					password,
					transactionPin,
					lockPin,
				},
				headers: { "Content-Type": "application/json" },
			}),
		}),

		//Login user
		loginUser: builder.mutation({
			query: ({
				phoneNumber,
				password,
			}: {
				phoneNumber: string;
				password: string;
			}) => ({
				url: "/user/login",
				method: "POST",
				body: { phoneNumber, password },
				headers: { "Content-Type": "application/json" },
			}),
		}),

		//Get referesh token
		getNewRefreshToken: builder.mutation({
			query: ({ oldRefreshToken }: { oldRefreshToken: string }) => ({
				url: "/user/refresh-token",
				method: "POST",
				body: { refreshToken: oldRefreshToken },
				headers: { "Content-Type": "application/json" },
			}),
		}),

		getCurrentUser: builder.query<User, void>({
			query: () => ({
				url: "/user/current-user",
				method: "GET",
			}),
			providesTags: ["LoginUser"],
		}),
	}),
});

const { util } = authApi;

export const clearAuthCache = () => {
	util.invalidateTags(["LoginUser"]);
};

export const {
	useSendOtpMutation,
	useResendOtpMutation,
	useVerifyOtpMutation,
	useInitiateBvnVerficationMutation,
	useValidateBvnVerificationMutation,
	useCreateNewUserMutation,
	useLoginUserMutation,
	useGetCurrentUserQuery,
	useGetNewRefreshTokenMutation,
} = authApi;
