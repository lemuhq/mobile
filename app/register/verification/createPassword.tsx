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
import KeyboardAvoidingViewContainer from "@/components/KeyboardAvoidingViewContainer";
import Constants from "expo-constants";
import VerificationPageHeader from "@/components/VerificationPageHeader";

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

	const statusHeight =
		Platform.OS === "android"
			? Constants.statusBarHeight
			: Constants.statusBarHeight;

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
		<View
			style={[
				{
					flex: 1,
					backgroundColor: theme.background,
					// backgroundColor: "green",
					paddingTop: statusHeight,
					paddingBottom: statusHeight - 30,
				},
			]}
		>
			<StatusBar style={isDarkMode ? "light" : "dark"} />
			<View style={{ flex: 1, paddingHorizontal: SPACING.space_20 }}>
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
						<Text style={{ fontFamily: "PoppinsSemiBold" }}>Step 4/</Text>
						6
					</Text>
				</View>

				<KeyboardAvoidingViewContainer>
					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{
							paddingBottom: SPACING.space_20,
							flex: 1,
						}}
					>
						<View
							style={{
								// marginTop: SPACING.space_20,
								gap: SPACING.space_20,

								flex: 1,
							}}
						>
							<VerificationPageHeader header="Create new password" />
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
				</KeyboardAvoidingViewContainer>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	inputLabel: {
		fontSize: FONTSIZE.size_14,
		fontFamily: "PoppinsRegular",
		marginBottom: 8,
	},
});
