import {
	View,
	Text,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import OtpInput from "@/components/inputs/OtpInput";
import Button from "@/components/Button";
import { ThemeContext } from "@/provider/ThemeProvider";
import { Colors } from "@/constants/Colors";

const ConfrimEmail = () => {
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
						Confirm Email Address
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
						Enter OTP code sent to this email: lemu@gmail.com
					</Text>

					<View style={{ marginTop: 20, flex: 1 }}>
						<OtpInput otpVal={otp} setOtpVal={setOtp} />
					</View>
					<Button
						buttonText="Continue"
						onPress={() => {
							router.navigate("/register/verification");
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
};

export default ConfrimEmail;

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
