import {
	View,
	Text,
	SafeAreaView,
	Platform,
	KeyboardAvoidingView,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import React, { useContext, useState } from "react";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import { ThemeContext } from "@/provider/ThemeProvider";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import OtpInput from "@/components/inputs/OtpInput";
import Button from "@/components/Button";
import { useValidateBvnVerificationMutation } from "@/redux/services/auth";

export default function ValidateBvn() {
	const { theme } = useContext(ThemeContext);
	const {
		identityId,
		phoneNumber,
	}: { identityId: string; phoneNumber: string } = useLocalSearchParams();
	console.log("🚀 ~ ValidateBvn ~ phoneNumber:", phoneNumber);
	const [otp, setOtp] = useState<string>("");

	const [validateBvnVerification, { isLoading }] =
		useValidateBvnVerificationMutation();

	async function handleValidateBvn() {
		try {
			const {
				data: { data },
				error,
			} = await validateBvnVerification({
				identityId,
				otp,
			});

			console.log("🚀 ~ handleValidateBvn ~ data:", data);
			if (error) {
				console.log("��� ~ handleValidateBvn ~ error:", error);
				return;
			}

			router.push({
				pathname: `/register/verification/createUser`,
				params: {
					firstName: data?.providerResponse?.firstName,
					lastName: data?.providerResponse?.lastName,
					email: data?.providerResponse?.email,
					phoneNumber: phoneNumber,
					// phoneNumber: data?.providerResponse?.phoneNumber1,
					bvn: data?.providerResponse?.bvn,
					identityType: "BVN",
					identityNumber: data?.providerResponse?.bvn,
					identityId: identityId ?? data?._id,
					otp: otp,
				},
			});
		} catch (error) {
			console.log("🚀 ~ handleValidateBvn ~ error:", error);
		}
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 0}
			style={{ flex: 1, backgroundColor: theme.background }}
		>
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
						// paddingTop: SPACING.space_10,
						paddingHorizontal: SPACING.space_20,
						flex: 1,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
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
							style={{
								color: theme.text,
								fontFamily: "PoppinsLight",
								fontSize: FONTSIZE.size_20,
							}}
						>
							<Text style={{ fontFamily: "PoppinsSemiBold" }}>
								Step 2/
							</Text>
							6
						</Text>
					</View>

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
						Confirm BVN
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
						Enter OTP code sent to the number assigned to your BVN
						{/* {phoneNumber &&
							phoneNumber.slice(
								phoneNumber.length - 4,
								phoneNumber.length
							)} */}
					</Text>
					<View style={{ marginTop: 20, flex: 1 }}>
						<OtpInput otpVal={otp} setOtpVal={setOtp} />
					</View>
					<Button
						buttonText="Continue"
						onPress={() => {
							handleValidateBvn();
						}}
						isLoading={isLoading}
						disabled={(otp.length < 4 ? true : false) || isLoading}
						variant="primary"
					/>
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
