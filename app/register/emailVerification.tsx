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
import { ThemeContext } from "@/provider/ThemeProvider";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Input from "@/components/inputs/Input";
import Button from "@/components/Button";

export default function EmailVerification() {
	const { isDarkMode, theme } = useContext(ThemeContext);
	const [email, onChangeEmail] = useState<string>("");

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
				<StatusBar style={isDarkMode ? "light" : "dark"} />
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
						Email Verification
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
						Enter a valid email address
					</Text>
					<View
						style={{
							marginTop: SPACING.space_20,
							flex: 1,
						}}
					>
						<Input
							value={email}
							setValue={onChangeEmail}
							placeholder="Email address"
							keyboardType="email-address"
						/>
					</View>
					<Button
						buttonText="Continue"
						onPress={() => {
							router.navigate("/register/confirmEmail");
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
