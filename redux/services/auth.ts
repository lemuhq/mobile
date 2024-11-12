import { BACKEND_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
	reducerPath: "auth",
	baseQuery: fetchBaseQuery({
		baseUrl: BACKEND_URL,
	}),
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
	}),
});

export const {
	useSendOtpMutation,
	useResendOtpMutation,
	useVerifyOtpMutation,
	useInitiateBvnVerficationMutation,
	useValidateBvnVerificationMutation,
	useCreateNewUserMutation,
	useLoginUserMutation,
} = authApi;
