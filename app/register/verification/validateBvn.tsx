import {
	View,
	Text,
	Platform,
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
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import KeyboardAvoidingViewContainer from "@/components/KeyboardAvoidingViewContainer";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import VerificationPageHeader from "@/components/VerificationPageHeader";

export default function ValidateBvn() {
	const statusHeight =
		Platform.OS === "android"
			? Constants.statusBarHeight
			: Constants.statusBarHeight;

	const { theme, isDarkMode } = useContext(ThemeContext);
	const {
		identityId,
		phoneNumber,
	}: { identityId: string; phoneNumber: string } = useLocalSearchParams();

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
		<>
			<StatusBar style={isDarkMode ? "light" : "dark"} />
			<View
				style={[
					{
						flex: 1,
						backgroundColor: theme.background,
						paddingTop: statusHeight,
						paddingBottom: statusHeight - 20,
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
						<View
							style={{
								flexDirection: "row",
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
									marginLeft: "auto",
								}}
							>
								<Text style={{ fontFamily: "PoppinsSemiBold" }}>
									Step 2/
								</Text>
								6
							</Text>
						</View>

						<VerificationPageHeader
							header="Confirm BVN"
							subHeader="Enter OTP code sent to the number assigned to your BVN"
						/>

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
		fontSize: wp("6.2%"),
		fontFamily: "PoppinsBold",
	},
	subText: {
		fontSize: wp("3%"),
		lineHeight: 18,
		fontFamily: "PoppinsLight",
	},

	inputLabel: {
		fontSize: 14,
		fontFamily: "PoppinsRegular",
		marginBottom: 8,
	},
});
