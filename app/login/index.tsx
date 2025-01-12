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
import { clearAuthCache, useLoginUserMutation } from "@/redux/services/auth";
import useToast from "@/hooks/useToast";
import { storage } from "@/utils/storage";


import { ScrollView } from "react-native";

export default function LoginScreen() {
	const statusHeight = Constants.statusBarHeight;
	const { isDarkMode, theme } = useContext(ThemeContext);
	const { showCustomToast } = useToast();
	const KEYBOARD_VERTICAL_OFFSET = Platform.OS === "android" ? 10 : 60;

	const [phoneNumber, onChangePhoneNumber] = useState("08146644586");
	const [password, onChangePassword] = useState("Joshua@25");
	const [loading, setIsLoading] = useState<boolean>(false);
	const [loginUser, { isLoading }] = useLoginUserMutation();

	async function handleLoginUser() {
		try {
			setIsLoading(true);

			const { data, error } = await loginUser({
				phoneNumber,
				password,
			});

			if (error) {
				showCustomToast(
					"error",
					//@ts-ignore
					error?.data?.message || "Something went wrong"
				);

				onChangePassword("");
				onChangePhoneNumber("");
				clearAuthCache();
				setIsLoading(false);

				return;
			}

			if (data) {
				await storage.saveUserToken("token", data?.accessToken);
				await storage.saveRefreshToken("refreshToken", data?.refreshToken);

				router.push("/(tabs)/home");
			}
		} catch (error) {
			//@ts-ignore
			console.log(error?.response?.data);
			showCustomToast("error", "Something went wrong");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
		>
			<ScrollView 
				contentContainerStyle={{ flexGrow: 1 }}
				keyboardShouldPersistTaps="handled"
			>
				<View
					style={[
						{
							flex: 1,
							backgroundColor: theme.background,
							paddingTop: statusHeight,
							paddingBottom: statusHeight - 20,
						},
					]}
				>
					<StatusBar style={isDarkMode ? "light" : "dark"} />
					<View
						style={{
							flex: 1,
							justifyContent: "space-between",
							alignItems: "center",
							paddingHorizontal: SPACING.space_20,
						}}
					>
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

						<Text style={styles.formHeader}>Welcome back</Text>

						<View style={styles.container}>
							<View>
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
								<View
									style={{
										marginTop: SPACING.space_20,
									}}
								>
									<Text style={[styles.inputLabel, { color: theme.text }]}>
										Password
									</Text>
									<PasswordInput
										value={password}
										setValue={onChangePassword}
									/>
								</View>
							</View>

							<View style={styles.bottomContainer}>
								<Button
									buttonText="Sign in"
									disabled={!password || !phoneNumber}
									isLoading={isLoading || loading}
									onPress={handleLoginUser}
								/>
								<View style={styles.signupContainer}>
									<TouchableOpacity
										onPress={() => {
											router.push("/onboarding");
										}}
									>
										<Text style={styles.signupText}>
											Don't have an account?{" "}
											<Text style={styles.signupLink}>Create one</Text>
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		justifyContent: "space-between",
	},
	content: {
		flex: 1,
	},

	formContainer: {
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
	bottomContainer: {
		marginTop: SPACING.space_30,
	},
	signupContainer: {
		alignItems: "center",
		marginTop: SPACING.space_20,
	},
	signupText: {
		fontFamily: "PoppinsMedium",
		color: Colors.black,
	},
	signupLink: {
		fontFamily: "PoppinsSemiBold",
		color: Colors.orange,
	},
});
