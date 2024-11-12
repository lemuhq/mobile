import {
	View,
	Text,
	Platform,
	Image,
	StyleSheet,
	TouchableOpacity,
	KeyboardAvoidingView,
} from "react-native";
import React, { useContext, useState } from "react";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "@/provider/ThemeProvider";
import splashStyles from "@/styles/splashStyles.styles";
import { SPACING } from "@/constants/Theme";
import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Input from "@/components/inputs/Input";
import PasswordInput from "@/components/inputs/PasswordInput";
import { useLoginUserMutation } from "@/redux/services/auth";
import useToast from "@/hooks/useToast";
import { useDispatch } from "react-redux";
import { storage } from "@/utils/storage";

export default function LoginScreen() {
	const statusHeight =
		Platform.OS === "android" ? Constants.statusBarHeight : 60;
	const { isDarkMode, theme } = useContext(ThemeContext);
	const { showCustomToast } = useToast();
	const dispatch = useDispatch();

	const [phoneNumber, onChangePhoneNumber] = useState("");
	const [password, onChangePassword] = useState("");

	const [loginUser, { isLoading }] = useLoginUserMutation();

	async function handleLoginUser() {
		try {
			const { data, error } = await loginUser({
				phoneNumber,
				password,
			});

			if (error) {
				//@ts-ignore
				showCustomToast("error", `${error?.data?.message}`);

				onChangePassword("");
				onChangePhoneNumber("");
				return;
			}

			await storage.saveUserFirstName(data?.user?.firstName);
			await storage.setToken(data?.token);

			router.push("/(tabs)/home");
		} catch (error) {
			console.error("Error logging in user:", error);
		}
	}

	return (
		<View
			style={{
				paddingTop: statusHeight + 10,
				paddingBottom: statusHeight - 20,
				flex: 1,
				gap: 5,
				backgroundColor: theme.background,

				alignItems: "center",
			}}
		>
			<StatusBar style={isDarkMode ? "light" : "dark"} />
			{isDarkMode ? (
				<Image
					source={require("@/assets/SplashLogo.png")}
					style={splashStyles.logo}
				/>
			) : (
				<Image
					source={require("@/assets/SplashLogoTwo.png")}
					style={splashStyles.logo}
				/>
			)}
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
				style={{ flex: 1, width: "100%" }}
			>
				<View style={styles.formContainer}>
					<View style={styles.inputContainer}>
						<Text style={styles.formHeader}>Welcome back</Text>

						<View>
							<Text style={[styles.inputLabel, { color: theme.text }]}>
								Phone Number
							</Text>
							<Input
								value={phoneNumber}
								setValue={onChangePhoneNumber}
								placeholder="Enter Phone Number"
								keyboardType="number-pad"
							/>
						</View>

						<View>
							<Text style={[styles.inputLabel, { color: theme.text }]}>
								Enter new password
							</Text>
							<PasswordInput
								value={password}
								setValue={onChangePassword}
								// errorMessage={passwordError}
							/>
						</View>
					</View>
					<Button
						buttonText="Sign in"
						disabled={!password || !phoneNumber ? true : false}
						isLoading={isLoading}
						onPress={handleLoginUser}
					/>
				</View>
			</KeyboardAvoidingView>

			<View
				style={{
					alignItems: "center",
					justifyContent: "flex-end",
					height: 40,
				}}
			>
				<TouchableOpacity
					onPress={() => {
						router.push("/onboarding");
					}}
				>
					<Text
						style={{
							fontFamily: "PoppinsSemiBold",
							color: Colors.orange,
						}}
					>
						Don't have an account? Create one
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		// backgroundColor: "green",
		flex: 1,
		width: "100%",
		paddingHorizontal: SPACING.space_20,
	},

	inputContainer: {
		flex: 1,
		gap: SPACING.space_20,
		marginBottom: SPACING.space_10,
	},
	formHeader: {
		textAlign: "center",
		fontSize: hp("3.5%"),
		fontFamily: "PoppinsSemiBold",
		marginBottom: SPACING.space_8,
	},
	inputLabel: {
		fontSize: hp("1.5%"),
		fontFamily: "PoppinsRegular",
		marginBottom: 8,
	},
});
