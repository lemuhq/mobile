import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import React, { useContext, useState } from "react";
import { ThemeContext } from "@/provider/ThemeProvider";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import Button from "@/components/Button";
import PasswordInput from "@/components/inputs/PasswordInput";
import { StatusBar } from "expo-status-bar";
import globalStyles from "@/styles/global.styles";
import { SPACING } from "@/constants/Theme";

export default function CreatePassword() {
	const { isDarkMode, theme } = useContext(ThemeContext);
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
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
					},
					globalStyles.safeAreaViewStyles,
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
						Create new password
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
						Enter new password
					</Text>

					<View style={{ marginTop: 20, flex: 1 }}>
						<View>
							<Text style={[styles.inputLabel, { color: theme.text }]}>
								Enter new password
							</Text>
							<PasswordInput value={password} setValue={setPassword} />
						</View>
						<View style={{ marginTop: 20 }}>
							<Text style={[styles.inputLabel, { color: theme.text }]}>
								Confirm new password
							</Text>
							<PasswordInput
								value={confirmPassword}
								setValue={setConfirmPassword}
							/>
						</View>
					</View>

					<Button
						buttonText="Continue"
						onPress={() => {
							router.push("/register/createPin");
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
		fontFamily: "PoppinsRegular",
		marginBottom: 8,
	},
});
