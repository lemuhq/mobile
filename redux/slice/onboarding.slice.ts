import { createSlice } from "@reduxjs/toolkit";

interface OnboardProps {
	firstTimeUser: any;
	secondTimeUser: any;
	userStage: number;
}

const initialState: OnboardProps = {
	firstTimeUser: {},
	secondTimeUser: {},
	userStage: 1,
};

// Define the reducer
export const onboardingSlice = createSlice({
	name: "onboarding",
	initialState: initialState,

	reducers: {
		setFirstTimeOnboardingData: (state, action) => {
			state.firstTimeUser = action.payload;
			state.userStage = 1;
		},
		setSecondTimeOnboardingData: (state, action) => {
			state.secondTimeUser = action.payload;
			state.userStage = 2;
		},
	},
});
export const { setFirstTimeOnboardingData, setSecondTimeOnboardingData } =
	onboardingSlice.actions;

export default onboardingSlice.reducer;
