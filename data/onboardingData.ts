export const onboardingData = [
	{
		header: "Next level banking on your fingertips",
		subHeader:
			"Saving you time, money, and effort in your day-to-day transactions.",
		image: require("../assets/Onboarding/onboarding_one.png"),
	},
	{
		header: "Financial inclusion for everyone",
		subHeader:
			"With your Lemu Card, you don’t have to worry about monthly or annual maintenance fees.",
		image: require("../assets/Onboarding/onboarding_two.png"),
	},
	{
		header: "Your phone, your POS",
		subHeader:
			"Pay, or get paid instantly by vendors, customers, friends and family.",
		image: require("../assets/Onboarding/onboarding_three.png"),
	},
];

export type OnboardingDataType = (typeof onboardingData)[0];
