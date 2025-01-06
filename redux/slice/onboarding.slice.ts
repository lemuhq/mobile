import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// interface OnboardingState {
//   currentStep: number;
//   phoneNumber: string;
//   bvnNumber: string;
//   identityId: string;
//   identityType: "BVN" | "";
//   identityNumber: string;
//   otp: string;
//   bvnOtp: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   emailAddress: string;
//   referralCode: string;
//   stage: number;
//   password: string;
//   transactionPin: string;
//   lockPin: string;
//   verified: boolean;
//   attempts: number;
//   otpId: string;
//   providerResponse: any;
//   expiryTime: Date | null;
// }




const onboardingData = {};
export const onboardingSlice = createSlice({
	name: "onboarding",
	initialState: { value: onboardingData },

	reducers: {
		setOnboardingData: (state, action) => {
			state.value = action.payload;
		},
	},
});
export const { setOnboardingData } = onboardingSlice.actions;

export default onboardingSlice.reducer;
