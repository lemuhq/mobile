import {
	View,
	Text,
	SafeAreaView,
	Platform,
	TouchableOpacity,
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/provider/ThemeProvider";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import PageHeader from "@/components/PageHeader";
import PasswordInput from "@/components/inputs/PasswordInput";
import Button from "@/components/Button";

export default function CreatePassword() {
	const paramsData: {
		firstName: string;
		lastName: string;
		email: string;
		phoneNumber: string;
		bvn: string;
		identityType: string;
		identityNumber: string;
		identityId: string;
		otp: string;
		// referalCode: string;
	} = useLocalSearchParams();
	const { isDarkMode, theme } = useContext(ThemeContext);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [confirmError, setConfirmError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	function passwordValidation() {
		if (password) {
			if (password.length < 8) {
				setPasswordError("Password must be at least 8 characters long");
			} else if (!/[a-z]/.test(password)) {
				setPasswordError(
					"Password must contain at least one lowercase letter"
				);
			} else if (!/[A-Z]/.test(password)) {
				setPasswordError(
					"Password must contain at least one uppercase letter"
				);
			} else if (!/[0-9]/.test(password)) {
				setPasswordError("Password must contain at least one number");
			} else if (!/[!@#$%^&.,*()]/.test(password)) {
				setPasswordError(
					"Password must contain at least one special character"
				);
			} else {
				setPasswordError("");
			}

			if (confirmPassword.length !== 0) {
				if (password !== confirmPassword) {
					setConfirmError("Passwords do not match");
				} else {
					setConfirmError("");
				}
			} else {
				setConfirmError("");
			}
		} else {
			setPasswordError("");
			setConfirmError("");
		}
	}

	useEffect(() => {
		passwordValidation();
	}, [password, confirmPassword]);

	return (
		<SafeAreaView
			style={[
				{
					flex: 1,
					backgroundColor: theme.background,
					paddingTop: Platform.OS === "android" ? SPACING.space_30 : 0,
					paddingBottom: Platform.OS === "android" ? SPACING.space_10 : 0,
				},
			]}
		>
			<StatusBar style={isDarkMode ? "light" : "dark"} />
			<View style={{ flex: 1 }}>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						paddingHorizontal: SPACING.space_20,
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
						<Text style={{ fontFamily: "PoppinsSemiBold" }}>Step 4/</Text>
						6
					</Text>
				</View>

				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
					style={{ flex: 1 }}
				>
					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{
							paddingBottom: SPACING.space_20,
							flex: 1,
						}}
					>
						<View
							style={{
								marginTop: SPACING.space_20,
								gap: SPACING.space_20,
								paddingHorizontal: SPACING.space_20,
								flex: 1,
							}}
						>
							<PageHeader
								header="Create new password"
								// subHeader="Enter new password"
								variant="left"
							/>
							<View
								style={{
									marginVertical: SPACING.space_20,
									gap: SPACING.space_20,
								}}
							>
								{/* Input Fields */}
								<View>
									<Text
										style={[styles.inputLabel, { color: theme.text }]}
									>
										Enter new password
									</Text>
									<PasswordInput
										value={password}
										setValue={setPassword}
										errorMessage={passwordError}
									/>
								</View>

								<View>
									<Text
										style={[styles.inputLabel, { color: theme.text }]}
									>
										Confirm new password
									</Text>
									<PasswordInput
										value={confirmPassword}
										setValue={setConfirmPassword}
										errorMessage={confirmError}
									/>
								</View>
							</View>
						</View>
						<View
							style={{
								paddingHorizontal: SPACING.space_20,
								flex: 1,
								justifyContent: "flex-end",
							}}
						>
							<Button
								buttonText="Continue"
								onPress={() => {
									router.push({
										pathname:
											"/register/verification/createTransactionPin",
										params: { ...paramsData, password: password },
									});
								}}
								isLoading={false}
								disabled={
									(passwordError || confirmError ? true : false) ||
									!password ||
									!confirmPassword
								}
								variant="primary"
							/>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	inputLabel: {
		fontSize: FONTSIZE.size_14,
		fontFamily: "PoppinsRegular",
		marginBottom: 8,
	},
});
