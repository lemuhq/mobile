import {
	View,
	Text,
	Platform,
	TouchableOpacity,
	KeyboardAvoidingView,
} from "react-native";
import React, {
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useState,
} from "react";
import { fontSizes, SCREEN_WIDTH, statusBarHeight } from "@/constants";
import Button from "@/components/Button";
import { ThemeContext } from "@/provider/ThemeProvider";
import { SPACING } from "@/constants/Theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import VerificationPageHeader from "@/components/VerificationPageHeader";
import OtpInput from "@/components/inputs/OtpInput";
import KeyboardAvoidingViewContainer from "@/components/KeyboardAvoidingViewContainer";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useValidateBvnVerificationMutation } from "@/redux/services/auth";
import useToast from "@/hooks/useToast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setFirstTimeOnboardingData } from "@/redux/slice/onboarding.slice";

const ValidateBvnScreen = () => {
	const { theme, isDarkMode } = useContext(ThemeContext);
	const { showCustomToast } = useToast();

	//Redux
	const dispatch = useDispatch();
	const { firstTimeUser } = useSelector(
		(state: RootState) => state.onboarding
	);

	const [otpValue, onChangeOtp] = useState<string>(firstTimeUser?.otp || "");

	const [validateBvnVerification, { isLoading }] =
		useValidateBvnVerificationMutation();

	const handleSubmit = async () => {
		try {
			const payload = {
				otp: otpValue,
				identityId: firstTimeUser?.identityId,
			};

			const response = await validateBvnVerification(payload);
			console.log("🚀 ~ handleSubmit ~ response:", response?.data);

			const newUserData = {
				...firstTimeUser,
				...response.data,
				otp: otpValue,
			};
			dispatch(setFirstTimeOnboardingData({ ...newUserData }));
			router.navigate("/register/createUser");
			return;
		} catch (error: any) {
			showCustomToast(
				"error",
				error?.response?.data?.message || "Invalid OTP pin"
			);
		}
	};

	return (
		<KeyboardAvoidingViewContainer>
			<StatusBar style={isDarkMode ? "light" : "dark"} />
			<View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<TouchableOpacity
						onPress={() => router.back()}
						style={{ width: 30, height: 30 }}
					>
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
							fontSize: fontSizes.FONT20,
						}}
					>
						<Text style={{ fontFamily: "PoppinsSemiBold" }}>Step 2/</Text>
						6
					</Text>
				</View>

				<VerificationPageHeader
					header="Confirm BVN"
					subHeader="Enter OTP code sent to the number assigned to your BVN"
				/>

				<View style={{ marginTop: SPACING.space_20 }}>
					<OtpInput otpVal={otpValue} setOtpVal={onChangeOtp} />
				</View>
			</View>

			<Button
				buttonText="Next"
				onPress={handleSubmit}
				disabled={otpValue.length !== 4}
				isLoading={isLoading}
			/>
		</KeyboardAvoidingViewContainer>
	);
};

export default ValidateBvnScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		justifyContent: "space-between",
	},
	content: {
		flex: 1,
	},
});
