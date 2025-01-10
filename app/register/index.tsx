import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	Platform,
	KeyboardAvoidingView,
} from "react-native";
import React, { useContext, useState } from "react";
import { ThemeContext } from "@/provider/ThemeProvider";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";
import { router } from "expo-router";
import PhoneNumberInput from "@/components/inputs/PhoneNumberInput";
import { SPACING } from "@/constants/Theme";
import { useSendOtpMutation } from "@/redux/services/auth";
import KeyboardAvoidingViewContainer from "@/components/KeyboardAvoidingViewContainer";
import Constants from "expo-constants";
import axios from "axios";
import { BACKEND_URL, fontSizes, statusBarHeight } from "@/constants";
import useToast from "@/hooks/useToast";
import { useDispatch, useSelector } from "react-redux";
import { setOnboardingData } from "@/redux/slice/onboarding.slice";
import { RootState } from "@/redux/store";
export default function Register() {
	const dispatch = useDispatch();
	const onboardingData = useSelector(
		(state: RootState) => state.onboarding.value
	);
	const { isDarkMode, theme } = useContext(ThemeContext);
	const [phoneNumber, setPhoneNumber] = useState<string>("");
	const [sendOtp, { isLoading }] = useSendOtpMutation();
	const [errorMessage, setErrorMessage] = useState<string>("");
	const { showCustomToast } = useToast();

	console.log("🚀 ~ Register ~ onboardingData:", onboardingData);

	const handleOtpRequest = async () => {
		if (phoneNumber?.length < 11) {
			setErrorMessage("Please enter a valid 11-digit phone number.");
			return;
		}

		try {
			const payload = {
				phoneNumber: phoneNumber,
				
			};
			const response = await sendOtp(payload);
			console.log("response", response.data);

			if(response.data.stage === "2"){
				dispatch(setOnboardingData({...onboardingData, ...response.data}));
				return router.navigate('/register/createUser')
			}

			if(response.data.stage === "3"){
			   return router.navigate("/login");

			}

			// 
			

			router.navigate(
				`/register/confirmPhone?phoneNumber=${phoneNumber}&otpId=${response.data?.otpId}&expiryTime=${response.data?.expiryTime}`
			);





			
			// const {
			// 	data: { data, message },
			// 	error,
			// } = await sendOtp({ phoneNumber: phoneNumber });

			// if (error) {
			// 	console.log("🚀 ~ handleOtpRequest ~ error:", error);
			// 	showCustomToast("error", "Something went wrong.");
			// 	return;
			// }

			// console.log("🚀 ~ handleOtpRequest ~ data:", data);

			// router.navigate(
			// 	`/register/confirmPhone?phoneNumber=${phoneNumber}&otpId=${data?.otpId}&expiryTime=${data?.expiryTime}`
			// );

		} catch (error: any) {
			console.log("🚀 ~ handleOtpRequest ~ error:", error);
			showCustomToast("error", "Something went wrong.");
		}
	};

	return (
		<KeyboardAvoidingViewContainer>
			<StatusBar style={isDarkMode ? "light" : "dark"} />
			<View
				style={{
					backgroundColor: theme.background,
					flex: 1,
					paddingTop: statusBarHeight + 20,
					paddingBottom: statusBarHeight - 20,
				}}
			>
				<View
					style={{
						flex: 1,
						backgroundColor: theme.background,
						paddingHorizontal: SPACING.space_20,
						justifyContent: "space-between",
					}}
				>
					<Text
						style={[
							styles.welcomeH2,
							{
								color: theme.pageTextColor,
								textAlign: "center",
							},
						]}
					>
						Welcome to Lemu
					</Text>

					<View
						style={{
							marginTop: SPACING.space_10,
							flex: 1,
						}}
					>
						<PhoneNumberInput
							value={phoneNumber}
							setValue={setPhoneNumber}
							errorMessage={errorMessage}
						/>
						<Text
							style={[
								styles.subText,
								{
									color: theme.text,
									marginTop: 10,
								},
							]}
						>
							By clicking "continue", you confirm that you agree to our{" "}
							<Text
								style={{
									fontFamily: "PoppinsSemiBold",
									color: Colors.orange,
								}}
							>
								Terms and Conditions
							</Text>{" "}
							and{" "}
							<Text
								style={{
									fontFamily: "PoppinsSemiBold",
									color: Colors.orange,
								}}
							>
								Privacy Policy.
							</Text>
						</Text>
					</View>

					<View>
						<Button
							buttonText="Continue"
							onPress={() => {
								handleOtpRequest();
							}}
							isLoading={isLoading}
							disabled={
								(phoneNumber.length === 0 || phoneNumber.length < 11
									? true
									: false) || isLoading
							}
							variant="primary"
						/>
						
						<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
							<Text style={[styles.subText, { color: theme.text }]}>
								Already have an account?{' '}
							</Text>
							<Text
								style={[styles.subText, { color: Colors.orange, fontFamily: 'PoppinsSemiBold' }]}
								onPress={() => router.navigate('/login')}
							>
								Login
							</Text>
						</View>
					</View>
				</View>
			</View>
		</KeyboardAvoidingViewContainer>
		// <View
		// 	style={[
		// 		{
		// 			flex: 1,
		// 			backgroundColor: theme.background,

		// 			paddingTop: statusBarHeight,
		// 			paddingBottom: statusBarHeight - 30,
		// 		},
		// 	]}
		// >
		// 	<KeyboardAvoidingViewContainer>
		// 		<View
		// 			style={[
		// 				{
		// 					flexGrow: 1,
		// 					backgroundColor: theme.background,
		// 				},
		// 			]}
		// 		>
		// 			<StatusBar style={isDarkMode ? "light" : "dark"} />
		// 			<View
		// 				style={{
		// 					paddingHorizontal: SPACING.space_20,
		// 					flex: 1,
		// 				}}
		// 			>
		// <Text
		// 	style={[
		// 		styles.welcomeH2,
		// 		{
		// 			color: theme.pageTextColor,
		// 			textAlign: "center",
		// 		},
		// 	]}
		// >
		// 	Welcome to Lemu
		// </Text>

		// <View
		// 	style={{
		// 		marginTop: SPACING.space_10,
		// 		flex: 1,
		// 	}}
		// >
		// <PhoneNumberInput
		// 	value={phoneNumber}
		// 	setValue={setPhoneNumber}
		// 	errorMessage={errorMessage}
		// />
		// <Text
		// 	style={[
		// 		styles.subText,
		// 		{
		// 			color: theme.text,
		// 			marginTop: 10,
		// 		},
		// 	]}
		// >
		// 	By clicking "continue", you confirm that you agree to
		// 	our
		// 	<Text
		// 		style={{
		// 			fontFamily: "PoppinsSemiBold",
		// 			color: Colors.orange,
		// 		}}
		// 	>
		// 		Terms and Conditions
		// 	</Text>{" "}
		// 	and{" "}
		// 	<Text
		// 		style={{
		// 			fontFamily: "PoppinsSemiBold",
		// 			color: Colors.orange,
		// 		}}
		// 	>
		// 		Privacy Policy.
		// 	</Text>
		// </Text>
		// 				</View>

		// 				<View
		// 					style={{
		// 						// flex: 1,
		// 						justifyContent: "flex-end",
		// 					}}
		// 				>
		// <Button
		// 	buttonText="Continue"
		// 	onPress={() => {
		// 		handleOtpRequest();
		// 	}}
		// 	isLoading={isLoading}
		// 	disabled={
		// 		(phoneNumber.length === 0 || phoneNumber.length < 11
		// 			? true
		// 			: false) || isLoading
		// 	}
		// 	variant="primary"
		// />
		// 				</View>
		// 			</View>
		// 		</View>
		// 	</KeyboardAvoidingViewContainer>
		// </View>
	);
}

const styles = StyleSheet.create({
	pageContainer: {
		paddingTop: 10,
		flex: 1,
	},
	welcomeH2: {
		fontSize: fontSizes.FONT28,
		fontFamily: "PoppinsBold",
	},
	subText: {
		fontSize: 11,
		lineHeight: 18,
		fontFamily: "PoppinsLight",
	},

	inputLabel: {
		fontSize: 14,
		fontFamily: "PopppinsMedium",
		marginBottom: 8,
	},
});
