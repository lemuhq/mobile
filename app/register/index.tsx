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
import {
	BACKEND_URL,
	fontSizes,
	KEYBOARD_VERTICAL_OFFSET,
	statusBarHeight,
} from "@/constants";
import useToast from "@/hooks/useToast";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import {
	setFirstTimeOnboardingData,
	setSecondTimeOnboardingData,
} from "@/redux/slice/onboarding.slice";

export default function Register() {
	const { isDarkMode, theme } = useContext(ThemeContext);
	const [phoneNumber, setPhoneNumber] = useState<string>("");
	const [sendOtp, { isLoading }] = useSendOtpMutation();
	const [errorMessage, setErrorMessage] = useState<string>("");
	const { showCustomToast } = useToast();

	//Redux
	const dispatch = useDispatch();
	const { firstTimeUser, secondTimeUser } = useSelector(
		(state: RootState) => state.onboarding
	);

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
			console.log("🚀 ~ handleOtpRequest ~ response:", response.data);

			if (response.data.stage === "2") {
				console.log("��� ~ handleOtpRequest ~ response:", response.data);
				dispatch(
					setSecondTimeOnboardingData({
						...secondTimeUser,
						...response.data,
						phoneNumber: phoneNumber,
					})
				);
				router.navigate("/register/createUser");
				return;
			}

			if (response.data.stage === "3") {
				console.log("��� ~ handleOtpRequest ~ response:", response.data);
				dispatch(
					setSecondTimeOnboardingData({
						...secondTimeUser,
						...response.data,
						phoneNumber: phoneNumber,
					})
				);
				router.navigate("/login");
				return;
			}

			const newUserData = {
				phoneNumber: phoneNumber,
				otpId: response?.data?.data?.otpId,
				expiryTime: response?.data?.data?.expiryTime,
			};
			dispatch(
				setFirstTimeOnboardingData({ ...firstTimeUser, ...newUserData })
			);
			router.navigate("/register/confirmPhone");
		} catch (error: any) {
			showCustomToast(
				"error",
				error?.response?.data?.message || "Something went wrong"
			);
		}
	};

	return (
		<KeyboardAvoidingViewContainer>
			<StatusBar style={isDarkMode ? "light" : "dark"} />
			<View
				style={{
					gap: SPACING.space_20,
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
				<View>
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
			</View>

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
		</KeyboardAvoidingViewContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
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
