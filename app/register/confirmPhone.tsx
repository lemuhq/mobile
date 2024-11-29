import {
	View,
	Text,
	StyleSheet,
	Platform,
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
import Constants from "expo-constants";
import KeyboardAvoidingViewContainer from "@/components/KeyboardAvoidingViewContainer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useToast from "@/hooks/useToast";

export default function ConfirmPhone() {
	const { showCustomToast } = useToast();
	//Redux
	const dispatch = useDispatch();
	const { firstTimeUser } = useSelector(
		(state: RootState) => state.onboarding
	);

	const { theme, isDarkMode } = useContext(ThemeContext);
	const [otp, setOtp] = useState<string>("");
	const [timer, setTimer] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");

	useEffect(() => {
		if (firstTimeUser?.expiryTime) {
			setTimer(firstTimeUser?.expiryTime);
		}
	}, [firstTimeUser]);

	const { minutes, seconds, isExpired } = useCountdownTimer({
		expiryTime: firstTimeUser?.expiryTime,
		newTimer: timer,
		onExpire: () => {},
	});

	//Mutations
	const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
	const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

	const handleOtpResend = async () => {
		if (!firstTimeUser?.otpId) {
			router.back();
			return;
		}

		try {
			const {
				data: { data },
				error,
			} = await resendOtp({ otpId: firstTimeUser?.otpId });

			if (error) {
				//@ts-ignore
				setErrorMessage(error?.data?.message);
				return;
			}

			setTimer(data?.expiryTime);
		} catch (error) {
			console.log("🚀 ~ handleOtpResend ~ error:", error);
		}
	};

	const handleOtpVerify = async () => {
		setTimer("");
		if (!otp || !firstTimeUser.otpId) {
			router.back();
			return;
		}

		const payload = {
			otpId: firstTimeUser.otpId,
			otp,
		};

		try {
			const response = await verifyOtp(payload);

			if (response?.data?.success) {
				router.navigate(`/register/verification`);
			}
		} catch (error: any) {
			console.log("Error verifying OTP", error);
			showCustomToast(
				"error",
				error?.response?.data?.message || "Otp verification failed"
			);
		}
	};

	return (
		<KeyboardAvoidingViewContainer>
			<StatusBar style={isDarkMode ? "light" : "dark"} />
			<View>
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
					{firstTimeUser?.phoneNumber &&
						firstTimeUser?.phoneNumber.slice(
							firstTimeUser?.phoneNumber.length - 4,
							firstTimeUser?.phoneNumber.length
						)}
				</Text>
				<View style={{ marginTop: SPACING.space_20 }}>
					<OtpInput otpVal={otp} setOtpVal={setOtp} />
				</View>
			</View>

			<View>
				<Button
					buttonText="Next"
					onPress={handleOtpVerify}
					disabled={otp.length !== 4}
					isLoading={isLoading}
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
		</KeyboardAvoidingViewContainer>
		// <>
		// 	<StatusBar style={isDarkMode ? "light" : "dark"} />
		// 	<View
		// 		style={[
		// 			{
		// 				flex: 1,
		// 				backgroundColor: theme.background,
		// 				paddingTop: statusHeight,
		// 				paddingBottom: statusHeight - 30,
		// 			},
		// 		]}
		// 	>
		// 		<KeyboardAvoidingViewContainer>
		// 			<View
		// 				style={{
		// 					paddingHorizontal: SPACING.space_20,
		// 					flex: 1,
		// 				}}
		// 			>
		// 				<TouchableOpacity onPress={() => router.back()}>
		// 					<Ionicons
		// 						name="arrow-back-outline"
		// 						size={30}
		// 						color={theme.text}
		// 					/>
		// 				</TouchableOpacity>
		// <Text
		// 	style={[
		// 		styles.welcomeH2,
		// 		{
		// 			color: theme.pageTextColor,
		// 			marginTop: 20,
		// 			textAlign: "left",
		// 		},
		// 	]}
		// >
		// 	Confirm Phone Number
		// </Text>
		// <Text
		// 	style={[
		// 		styles.subText,
		// 		{
		// 			color: theme.text,
		// 			marginTop: 2,
		// 		},
		// 	]}
		// >
		// 	Enter OTP code sent to the number ending with{" "}
		// 	{phoneNumber &&
		// 		phoneNumber.slice(
		// 			phoneNumber.length - 4,
		// 			phoneNumber.length
		// 		)}
		// </Text>
		// 				<View style={{ marginTop: 20, flex: 1 }}>
		// 					<OtpInput otpVal={otp} setOtpVal={setOtp} />
		// 					{errorMessage && (
		// 						<Text
		// 							style={{
		// 								color: "red",
		// 								fontSize: 11,
		// 								marginTop: 10,
		// 								fontFamily: "PoppinsMedium",
		// 							}}
		// 						>
		// 							{errorMessage}
		// 						</Text>
		// 					)}
		// 				</View>

		// 				<Button
		// 					buttonText="Continue"
		// 					onPress={() => {
		// 						handleOtpVerify();
		// 					}}
		// 					isLoading={isLoading}
		// 					disabled={(otp.length < 4 ? true : false) || isLoading}
		// 					variant="primary"
		// 				/>
		// <View style={{ marginTop: 10 }}>
		// 	{isExpired ? (
		// 		<TouchableOpacity onPress={handleOtpResend}>
		// 			<Text
		// 				style={{
		// 					color: Colors.orange,
		// 					fontFamily: "PoppinsMedium",
		// 				}}
		// 			>
		// 				Resend Otp
		// 			</Text>
		// 		</TouchableOpacity>
		// 	) : (
		// 		<Text
		// 			style={{
		// 				color: theme.text,
		// 				fontFamily: "PoppinsRegular",
		// 			}}
		// 		>
		// 			Request new OTP in? (
		// 			<Text style={{ color: Colors.orange }}>
		// 				{minutes}:{seconds}
		// 			</Text>
		// 			)
		// 		</Text>
		// 	)}
		// </View>
		// 			</View>
		// 		</KeyboardAvoidingViewContainer>
		// 	</View>
		// </>
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
