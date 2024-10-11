import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { ThemeContext } from "@/provider/ThemeProvider";
import { Colors } from "@/constants/Colors";
import OtpInput from "@/components/inputs/OtpInput";
import { router } from "expo-router";
import Button from "@/components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ConfirmPhone() {
	const { isDarkMode, theme } = useContext(ThemeContext);
	const [otp, setOtp] = useState<string>("");
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: theme.background,
				paddingHorizontal: Colors.spacing * 2,
			}}
		>
			<SafeAreaView style={{ flex: 1 }}>
				<View style={[styles.pageContainer, { paddingBottom: 10 }]}>
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
		</View>
	);
}

const styles = StyleSheet.create({
	pageContainer: {
		// paddingHorizontal: 15,
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
		fontFamily: "PoppinsRegular",
		marginBottom: 8,
	},
});
