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
import globalStyles from "@/styles/global.styles";
import { SPACING } from "@/constants/Theme";

export default function Register() {
	const { isDarkMode, theme } = useContext(ThemeContext);
	const [phoneNumber, setPhoneNumber] = useState<string>("");

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<SafeAreaView
				style={[
					{
						flex: 1,
						backgroundColor: theme.background,
					},
					globalStyles.safeAreaViewStyles,
				]}
			>
				<StatusBar style={isDarkMode ? "light" : "dark"} />
				<View
					style={{
						paddingHorizontal: Colors.spacing * 2,
						paddingVertical: SPACING.space_10,
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
							marginTop: 25,
							flex: 1,
						}}
					>
						<PhoneNumberInput
							value={phoneNumber}
							setValue={setPhoneNumber}
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
							By clicking "continue", you confirm that you agree to our{" "}
							<Text style={{ fontWeight: "600", color: Colors.orange }}>
								Terms and Conditions
							</Text>{" "}
							and{" "}
							<Text style={{ fontWeight: "600", color: Colors.orange }}>
								Privacy Policy.
							</Text>
						</Text>
					</View>

					<Button
						buttonText="Continue"
						onPress={() => {
							router.navigate("/register/confirmPhone");
						}}
						isLoading={false}
						disabled={false}
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
