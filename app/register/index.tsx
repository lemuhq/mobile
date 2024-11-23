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

export default function Register() {
	const { isDarkMode, theme } = useContext(ThemeContext);
	const [phoneNumber, setPhoneNumber] = useState<string>("");
	const [sendOtp, { isLoading }] = useSendOtpMutation();
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [successMessage, setSuccessMessage] = useState<string>("");

	const handleOtpRequest = async () => {
		if (phoneNumber?.length < 11) {
			setErrorMessage("Please enter a valid 11-digit phone number.");
			return;
		}

		console.log(phoneNumber, "Phone number");

		try {
			console.log(phoneNumber, "Phone number");
			const {
				data: { data, message },
				error,
			} = await sendOtp({ phoneNumber });
			console.log("🚀 ~ handleOtpRequest ~ data:", data);
			console.log("🚀 ~ handleOtpRequest ~ error:", error);

			setSuccessMessage(message);
			router.navigate(
				`/register/confirmPhone?phoneNumber=${phoneNumber}&otpId=${data?.otpId}&expiryTime=${data?.expiryTime}`
			);
		} catch (error: any) {
			console.log("🚀 ~ sendOtp ~ error:", error);
			// setErrorMessage("Failed to send OTP. Please try again later.");
		}
	};

	return (
		<KeyboardAvoidingViewContainer>
			<SafeAreaView
				style={[
					{
						flex: 1,
						backgroundColor: theme.background,
						paddingTop: Platform.OS === "android" ? SPACING.space_30 : 0,
						paddingBottom:
							Platform.OS === "android" ? SPACING.space_10 : 0,
					},
				]}
			>
				<StatusBar style={isDarkMode ? "light" : "dark"} />
				<View
					style={{
						paddingHorizontal: SPACING.space_20,
						paddingTop: SPACING.space_10,
						flex: 1,
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
							By clicking "continue", you confirm that you agree to our
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
				</View>
			</SafeAreaView>
		</KeyboardAvoidingViewContainer>
	);
}

const styles = StyleSheet.create({
	pageContainer: {
		paddingTop: 10,
		flex: 1,
	},
	welcomeH2: {
		fontSize: 28,
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
