import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	Platform,
	KeyboardAvoidingView,
	TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/provider/ThemeProvider";
import { Colors } from "@/constants/Colors";
import OtpInput from "@/components/inputs/OtpInput";
import { router, useLocalSearchParams } from "expo-router";
import Button from "@/components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import { useCountdownTimer } from "@/hooks/useCountdownTiner";
import {
	useResendOtpMutation,
	useVerifyOtpMutation,
} from "@/redux/services/auth";

export default function ConfirmPhone() {
	const { theme, isDarkMode } = useContext(ThemeContext);
	const [otp, setOtp] = useState<string>("");
	const {
		phoneNumber,
		expiryTime,
		otpId,
	}: { phoneNumber: string; expiryTime: string; otpId: string } =
		useLocalSearchParams();
	const [timer, setTimer] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");

	useEffect(() => {
		if (expiryTime) {
			setTimer(expiryTime);
		}
	}, [expiryTime]);

	const { minutes, seconds, isExpired } = useCountdownTimer({
		expiryTime: expiryTime,
		newTimer: timer,
		onExpire: () => {},
	});

	//Mutations
	const [resendOtp, {}] = useResendOtpMutation();
	const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

	const handleOtpResend = async () => {
		if (!otpId) {
			router.back();
			return;
		}

		try {
			const {
				data: { data },
				error,
			} = await resendOtp({ otpId: otpId });

			if (error) {
				//@ts-ignore
				setErrorMessage(error?.data?.message);
				return;
			}
			console.log("🚀 ~ handleOtpResend ~ data:", data);

			setTimer(data?.expiryTime);
		} catch (error) {
			console.log("🚀 ~ handleOtpResend ~ error:", error);
		}
	};

	const handleOtpVerify = async () => {
		setTimer("");
		if (!otp || !otpId) {
			router.back();
			return;
		}

		try {
			const { data, error } = await verifyOtp({ otpId, otp });

			if (error) {
				//@ts-ignore
				setErrorMessage(error?.data?.message);
				return;
			}
			console.log("🚀 ~ handleOtpVerify ~ data:", data);

			router.navigate(`/register/verification?phoneNumber=${phoneNumber}`);
		} catch (error) {
			console.log("Error verifying OTP", error);
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 0}
			style={{ flex: 1, backgroundColor: theme.background }}
		>
			<StatusBar style={isDarkMode ? "light" : "dark"} />
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
				<View
					style={{
						paddingHorizontal: SPACING.space_20,
						flex: 1,
					}}
				>
					<TouchableOpacity onPress={() => router.back()}>
						<Ionicons
							name="arrow-back-outline"
							size={30}
							color={theme.text}
						/>
					</TouchableOpacity>
					<Text
						style={[
							styles.welcomeH2,
							{
								color: theme.pageTextColor,
								marginTop: 20,
								textAlign: "left",
							},
						]}
					>
						Confirm Phone Number
					</Text>
					<Text
						style={[
							styles.subText,
							{
								color: theme.text,
								marginTop: 2,
							},
						]}
					>
						Enter OTP code sent to the number ending with{" "}
						{phoneNumber &&
							phoneNumber.slice(
								phoneNumber.length - 4,
								phoneNumber.length
							)}
					</Text>
					<View style={{ marginTop: 20, flex: 1 }}>
						<OtpInput otpVal={otp} setOtpVal={setOtp} />
						{errorMessage && (
							<Text
								style={{
									color: "red",
									fontSize: 11,
									marginTop: 10,
									fontFamily: "PoppinsMedium",
								}}
							>
								{errorMessage}
							</Text>
						)}
					</View>

					<Button
						buttonText="Continue"
						onPress={() => {
							handleOtpVerify();
						}}
						isLoading={isLoading}
						disabled={(otp.length < 4 ? true : false) || isLoading}
						variant="primary"
					/>
					<View style={{ marginTop: 10 }}>
						{isExpired ? (
							<TouchableOpacity onPress={handleOtpResend}>
								<Text
									style={{
										color: Colors.orange,
										fontFamily: "PoppinsMedium",
									}}
								>
									Resend Otp
								</Text>
							</TouchableOpacity>
						) : (
							<Text
								style={{
									color: theme.text,
									fontFamily: "PoppinsRegular",
								}}
							>
								Request new OTP in? (
								<Text style={{ color: Colors.orange }}>
									{minutes}:{seconds}
								</Text>
								)
							</Text>
						)}
					</View>
				</View>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	pageContainer: {
		paddingTop: 10,
		flex: 1,
	},
	welcomeH2: {
		fontSize: FONTSIZE.size_24,
		fontFamily: "PoppinsBold",
	},
	subText: {
		fontSize: FONTSIZE.size_12,
		lineHeight: 18,
		fontFamily: "PoppinsLight",
	},

	inputLabel: {
		fontSize: 14,
		fontFamily: "PoppinsRegular",
		marginBottom: 8,
	},
});
