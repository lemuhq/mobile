import {
	View,
	Text,
	StyleSheet,
	Platform,
	TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import { ThemeContext } from "@/provider/ThemeProvider";
import { Colors } from "@/constants/Colors";
import OtpInput from "@/components/inputs/OtpInput";
import { router, useLocalSearchParams } from "expo-router";
import Button from "@/components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { FONTSIZE, SPACING } from "@/constants/Theme";

import {
	useResendOtpMutation,
	useVerifyOtpMutation,
} from "@/redux/services/auth";
import Constants from "expo-constants";
import KeyboardAvoidingViewContainer from "@/components/KeyboardAvoidingViewContainer";

export default function ConfirmPhone() {
	const statusHeight =
		Platform.OS === "android"
			? Constants.statusBarHeight
			: Constants.statusBarHeight;

	const { theme, isDarkMode } = useContext(ThemeContext);
	const [otp, setOtp] = useState<string>("");
	const [isInputFocused, setIsInputFocused] = useState(false);
	const {
		phoneNumber,
		expiryTime,
		otpId,
	}: { phoneNumber: string; expiryTime: string; otpId: string } =
		useLocalSearchParams();

		console.log("otpId", phoneNumber);
	const [remainingTime, setRemainingTime] = useState<number>(0);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [isExpired, setIsExpired] = useState(false);

	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (expiryTime) {
			const expiryTimestamp = Number(expiryTime);
			if (!isNaN(expiryTimestamp)) {
				setRemainingTime(expiryTimestamp - Date.now());
			} else {
				setErrorMessage("Invalid expiry time received.");
			}
		}
	}, [expiryTime]);

	useEffect(() => {
		if (remainingTime > 0) {
			intervalRef.current = setInterval(() => {
				setRemainingTime((prev) => {
					const newTime = prev - 1000;
					if (newTime <= 0) {
						clearInterval(intervalRef.current as NodeJS.Timeout);
						setIsExpired(true);
						return 0;
					}
					return newTime;
				});
			}, 1000);
		} else {
			setIsExpired(true);
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [remainingTime]);

	// Convert remainingTime from milliseconds to minutes and seconds
	const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

	//Mutations
	const [resendOtp, {}] = useResendOtpMutation();
	const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

	const handleOtpChange = React.useCallback((text: string) => {
		setOtp(text);
		setErrorMessage("");
	}, []);

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

			// Ensure expiryTime is a valid timestamp
			const newExpiryTime = Number(data?.expiryTime);
			if (!isNaN(newExpiryTime)) {
				const newRemainingTime = newExpiryTime - Date.now();
				setRemainingTime(newRemainingTime > 0 ? newRemainingTime : 0);
				setIsExpired(newRemainingTime <= 0);
			} else {
				setErrorMessage("Invalid expiry time received.");
			}
		} catch (error) {
			console.log("🚀 ~ handleOtpResend ~ error:", error);
		}
	};

	const handleOtpVerify = async () => {
		if (!otp || !otpId || otp.length !== 4) {
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
		<>
			<StatusBar style={isDarkMode ? "light" : "dark"} />
			<View
				style={[
					{
						flex: 1,
						backgroundColor: theme.background,
						paddingTop: statusHeight,
						paddingBottom: statusHeight - 30,
					},
				]}
			>
				<KeyboardAvoidingViewContainer>
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
							<OtpInput 
								otpVal={otp} 
								setOtpVal={handleOtpChange}
								onFocus={() => setIsInputFocused(true)}
								onBlur={() => setIsInputFocused(false)}
							/>
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
							onPress={handleOtpVerify}
							isLoading={isLoading}
							disabled={otp.length < 4 || isLoading}
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
										{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
									</Text>
									)
								</Text>
							)}
						</View>
					</View>
				</KeyboardAvoidingViewContainer>
			</View>
		</>
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
