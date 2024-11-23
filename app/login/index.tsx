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
import { useDispatch } from "react-redux";
import { storage } from "@/utils/storage";
import axios from "axios";
import { BACKEND_URL } from "@/constants";
import { setCurrentUser } from "@/redux/slice/user.slice";
import KeyboardAvoidingViewContainer from "@/components/KeyboardAvoidingViewContainer";
import { ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Keyboard } from "react-native";

export default function LoginScreen() {
	const statusHeight = Constants.statusBarHeight;
	const { isDarkMode, theme } = useContext(ThemeContext);
	const { showCustomToast } = useToast();
	const dispatch = useDispatch();

	const [phoneNumber, onChangePhoneNumber] = useState("");
	const [password, onChangePassword] = useState("");
	const [loading, setIsLoading] = useState<boolean>(false);

	const [loginUser, { isLoading }] = useLoginUserMutation();

	async function handleLoginUser() {
		console.log("🚀 ~ handleLoginUser ~ password:", password);
		console.log("Phonenumber", phoneNumber);

		try {
			setIsLoading(true);

			const { data, error } = await loginUser({
				phoneNumber,
				password,
			});

			console.log("🚀 ~ handleLoginUser ~ error:", error);

			if (error) {
				console.log("Error logging in user:", error);

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
				const response = await axios.get(
					`${BACKEND_URL}/user/current-user`,
					{
						headers: {
							Authorization: `Bearer ${data?.token}`,
							"Cache-Control": "no-cache", // Prevents caching by the browser
							Pragma: "no-cache", // HTTP 1.0 cache control for compatibility
							Expires: "0", // Immediately expires the cached response
						},
					}
				);
				console.log("��� ~ handleLoginUser ~ response:", response?.data);

				onChangePassword("");
				onChangePhoneNumber("");
				dispatch(setCurrentUser(response.data));

				await storage.saveUserFirstName(response.data?.firstName);
				await storage.saveLockPin(response.data?.lockPin);
				await storage.setToken(data?.token);
				router.push("/(tabs)/home");
				setIsLoading(false);
				clearAuthCache();
			}
		} catch (error) {
			//@ts-ignore
			console.log(error?.response?.data);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<View
			style={[
				{
					flex: 1,
					backgroundColor: theme.background,
					// backgroundColor: "blue",
					paddingTop: statusHeight,
					paddingBottom: statusHeight - 20,
				},
			]}
		>
			<StatusBar style={isDarkMode ? "light" : "dark"} />
			<View
				style={{
					justifyContent: "space-between",
					alignItems: "center",
					paddingHorizontal: SPACING.space_20,
					flex: 1,
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
				<KeyboardAwareScrollView
					style={styles.container}
					onTouchStart={() => Keyboard.dismiss()}
					extraScrollHeight={80}
					keyboardShouldPersistTaps="handled"
					contentContainerStyle={styles.scrollViewContent}
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.content}>
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
								// errorMessage={passwordError}
							/>
						</View>

						<View
							style={{
								justifyContent: "flex-end",
								marginTop: SPACING.space_30,
							}}
						>
							<Button
								buttonText="Sign in"
								disabled={!password || !phoneNumber ? true : false}
								isLoading={isLoading || loading}
								onPress={handleLoginUser}
							/>
							<View
								style={{
									alignItems: "center",
									justifyContent: "flex-end",
									marginTop: SPACING.space_20,
								}}
							>
								<TouchableOpacity
									onPress={() => {
										router.push("/onboarding");
									}}
								>
									<Text
										style={{
											fontFamily: "PoppinsMedium",
											color: Colors.black,
										}}
									>
										Don't have an account?{" "}
										<Text
											style={{
												fontFamily: "PoppinsSemiBold",
												color: Colors.orange,
											}}
										>
											Create one
										</Text>
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</KeyboardAwareScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
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
	container: {
		flex: 1,
		width: "100%",
	},
	scrollViewContent: {
		flexGrow: 1,
	},
	content: {
		flex: 1,
		marginTop: 20,
	},
});
