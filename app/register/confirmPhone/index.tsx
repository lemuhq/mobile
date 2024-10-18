import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	Platform,
	KeyboardAvoidingView,
	TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { ThemeContext } from "@/provider/ThemeProvider";
import { Colors } from "@/constants/Colors";
import OtpInput from "@/components/inputs/OtpInput";
import { router } from "expo-router";
import Button from "@/components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import globalStyles from "@/styles/global.styles";
import { StatusBar } from "expo-status-bar";
import { FONTSIZE, SPACING } from "@/constants/Theme";

export default function ConfirmPhone() {
	const { theme, isDarkMode } = useContext(ThemeContext);
	const [otp, setOtp] = useState<string>("");

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
						Enter OTP code sent to the number ending with 9474
					</Text>

					<View style={{ marginTop: 20, flex: 1 }}>
						<OtpInput otpVal={otp} setOtpVal={setOtp} />
					</View>
					<Button
						buttonText="Continue"
						onPress={() => {
							router.navigate("/register/createPassword");
						}}
						isLoading={false}
						disabled={false}
						variant="primary"
					/>
					<View style={{ marginTop: 10 }}>
						<Text
							style={{ color: theme.text, fontFamily: "PoppinsRegular" }}
						>
							Request new OTP in? (
							<Text style={{ color: Colors.orange }}>00:40</Text>)
						</Text>
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
