import {
	View,
	Text,
	Platform,
	Image,
	StyleSheet,
	TouchableOpacity,
	KeyboardAvoidingView,
	SafeAreaView,
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
import { statusBarHeight } from "@/constants";
import KeyboardAvoidingViewContainer from "@/components/KeyboardAvoidingViewContainer";

export default function LoginScreen() {
	const { isDarkMode, theme } = useContext(ThemeContext);
	const { showCustomToast } = useToast();
	const KEYBOARD_VERTICAL_OFFSET = Platform.OS === "android" ? 30 : 60;

	const [phoneNumber, onChangePhoneNumber] = useState("");
	const [password, onChangePassword] = useState("");
	const [loading, setIsLoading] = useState<boolean>(false);
	const [loginUser, { isLoading }] = useLoginUserMutation();

	async function handleLoginUser() {
		try {
			setIsLoading(true);

			const payload = {
				phoneNumber,
				password,
			};

			const response = await loginUser(payload);

			if (response.error) {
				showCustomToast(
					"error",
					//@ts-ignore
					response?.error?.data?.message || "Something went wrong"
				);

				onChangePassword("");
				onChangePhoneNumber("");
				clearAuthCache();
				setIsLoading(false);

				return;
			}

			await storage.saveUserToken("token", response?.data?.accessToken);
			await storage.saveUserToken(
				"refreshToken",
				response?.data?.refreshToken
			);
			router.push("/(tabs)/home");
		} catch (error: any) {
			showCustomToast(
				"error",
				//@ts-ignore
				response?.error?.data?.message || "Something went wrong"
			);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<KeyboardAvoidingViewContainer>
			<StatusBar style={isDarkMode ? "light" : "dark"} />
			<View>
				<View
					style={{
						alignItems: "center",
						justifyContent: "center",
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
				</View>
				<Text style={styles.formHeader}>Welcome back</Text>

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
							// errorMessage={passwordError}
						/>
					</View>
				</View>
			</View>

			<View>
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
		</KeyboardAvoidingViewContainer>
		// <SafeAreaView
		// 	style={{
		// 		backgroundColor: "red",
		// 		flex: 1,
		// 		paddingTop: Platform.OS === "android" ? statusBarHeight + 10 : 0,
		// 		paddingBottom: Platform.OS === "android" ? statusBarHeight - 30 : 0,
		// 	}}
		// >
		// 	<StatusBar style={isDarkMode ? "light" : "dark"} />
		// 	<KeyboardAvoidingView
		// 		style={[styles.container, { backgroundColor: theme.background }]}
		// 		behavior={Platform.OS === "ios" ? "padding" : "height"}
		// 		keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
		// 	>
		// <View
		// 	style={{
		// 		alignItems: "center",
		// 		justifyContent: "center",
		// 	}}
		// >
		// 	{isDarkMode ? (
		// 		<Image
		// 			source={require("@/assets/SplashLogo.png")}
		// 			style={splashStyles.logo}
		// 		/>
		// 	) : (
		// 		<Image
		// 			source={require("@/assets/SplashLogoTwo.png")}
		// 			style={splashStyles.logo}
		// 		/>
		// 	)}
		// </View>

		// 		<Text style={styles.formHeader}>Welcome back</Text>

		// 		<ScrollView
		// 			style={{ flexGrow: 1 }}
		// 			contentContainerStyle={{
		// 				flexGrow: 1,
		// 				paddingTop: SPACING.space_20,
		// 				paddingHorizontal: SPACING.space_20,
		// 				paddingBottom:
		// 					Platform.OS === "ios"
		// 						? SPACING.space_30
		// 						: SPACING.space_20,
		// 				gap: SPACING.space_20,
		// 			}}
		// 			showsVerticalScrollIndicator={false}
		// 			bounces={false}
		// 		>
		// <View>
		// 	<Text style={[styles.inputLabel, { color: theme.text }]}>
		// 		Phone Number
		// 	</Text>
		// 	<Input
		// 		value={phoneNumber}
		// 		setValue={onChangePhoneNumber}
		// 		placeholder="Enter Phone Number"
		// 		keyboardType="number-pad"
		// 	/>
		// </View>
		// <View
		// 	style={
		// 		{
		// 			// marginTop: SPACING.space_20,
		// 		}
		// 	}
		// >
		// 	<Text style={[styles.inputLabel, { color: theme.text }]}>
		// 		Password
		// 	</Text>
		// 	<PasswordInput
		// 		value={password}
		// 		setValue={onChangePassword}
		// 		// errorMessage={passwordError}
		// 	/>
		// </View>
		// 		</ScrollView>
		// <View
		// 	style={{
		// 		justifyContent: "flex-end",
		// 		// marginTop: SPACING.space_30,
		// 	}}
		// >
		// 	<Button
		// 		buttonText="Sign in"
		// 		disabled={!password || !phoneNumber ? true : false}
		// 		isLoading={isLoading || loading}
		// 		onPress={handleLoginUser}
		// 	/>
		// 	<View
		// 		style={{
		// 			alignItems: "center",
		// 			justifyContent: "flex-end",
		// 			marginTop: SPACING.space_20,
		// 		}}
		// 	>
		// 		<TouchableOpacity
		// 			onPress={() => {
		// 				router.push("/onboarding");
		// 			}}
		// 		>
		// 			<Text
		// 				style={{
		// 					fontFamily: "PoppinsMedium",
		// 					color: Colors.black,
		// 				}}
		// 			>
		// 				Don't have an account?{" "}
		// 				<Text
		// 					style={{
		// 						fontFamily: "PoppinsSemiBold",
		// 						color: Colors.orange,
		// 					}}
		// 				>
		// 					Create one
		// 				</Text>
		// 			</Text>
		// 		</TouchableOpacity>
		// 	</View>
		// </View>
		// 	</KeyboardAvoidingView>
		// </SafeAreaView>
		// <View
		// 	style={[
		// 		{
		// 			flex: 1,
		// 			backgroundColor: theme.background,
		// 			// backgroundColor: "blue",
		// 			paddingTop: statusHeight,
		// 			paddingBottom: statusHeight - 20,
		// 		},
		// 	]}
		// >
		// 	<StatusBar style={isDarkMode ? "light" : "dark"} />
		// 	<View
		// 		style={{
		// 			justifyContent: "space-between",
		// 			alignItems: "center",
		// 			paddingHorizontal: SPACING.space_20,
		// 			flex: 1,
		// 		}}
		// 	>
		// {isDarkMode ? (
		// 	<Image
		// 		source={require("@/assets/SplashLogo.png")}
		// 		style={splashStyles.logo}
		// 	/>
		// ) : (
		// 	<Image
		// 		source={require("@/assets/SplashLogoTwo.png")}
		// 		style={splashStyles.logo}
		// 	/>
		// )}

		// <Text style={styles.formHeader}>Welcome back</Text>

		// 		<KeyboardAvoidingView
		// 			style={styles.container}
		// 			behavior={Platform.OS === "ios" ? "padding" : "height"}
		// 			keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
		// 		>
		// 			<ScrollView
		// 				showsVerticalScrollIndicator={false}
		// 				contentContainerStyle={{
		// 					flexGrow: 1,

		// 					paddingBottom:
		// 						Platform.OS === "ios"
		// 							? SPACING.space_30
		// 							: SPACING.space_20,
		// 					// justifyContent: "space-between",
		// 				}}
		// 			>
		// <View>
		// 	<Text style={[styles.inputLabel, { color: theme.text }]}>
		// 		Phone Number
		// 	</Text>
		// 	<Input
		// 		value={phoneNumber}
		// 		setValue={onChangePhoneNumber}
		// 		placeholder="Enter Phone Number"
		// 		keyboardType="number-pad"
		// 	/>
		// </View>
		// <View
		// 	style={{
		// 		marginTop: SPACING.space_20,
		// 	}}
		// >
		// 	<Text style={[styles.inputLabel, { color: theme.text }]}>
		// 		Password
		// 	</Text>
		// 	<PasswordInput
		// 		value={password}
		// 		setValue={onChangePassword}
		// 		// errorMessage={passwordError}
		// 	/>
		// </View>
		// 			</ScrollView>
		// <View
		// 	style={{
		// 		justifyContent: "flex-end",
		// 		marginTop: SPACING.space_30,
		// 	}}
		// >
		// 	<Button
		// 		buttonText="Sign in"
		// 		disabled={!password || !phoneNumber ? true : false}
		// 		isLoading={isLoading || loading}
		// 		onPress={handleLoginUser}
		// 	/>
		// 	<View
		// 		style={{
		// 			alignItems: "center",
		// 			justifyContent: "flex-end",
		// 			marginTop: SPACING.space_20,
		// 		}}
		// 	>
		// 		<TouchableOpacity
		// 			onPress={() => {
		// 				router.push("/onboarding");
		// 			}}
		// 		>
		// 			<Text
		// 				style={{
		// 					fontFamily: "PoppinsMedium",
		// 					color: Colors.black,
		// 				}}
		// 			>
		// 				Don't have an account?{" "}
		// 				<Text
		// 					style={{
		// 						fontFamily: "PoppinsSemiBold",
		// 						color: Colors.orange,
		// 					}}
		// 				>
		// 					Create one
		// 				</Text>
		// 			</Text>
		// 		</TouchableOpacity>
		// 	</View>
		// </View>
		// 		</KeyboardAvoidingView>
		// 	</View>
		// </View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
});
