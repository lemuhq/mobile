import { View, Text, TouchableOpacity, Animated } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
	fontSizes,
	SCREEN_HEIGHT,
	SCREEN_WIDTH,
	statusBarHeight,
} from "@/constants";
import { SPACING } from "@/constants/Theme";
import { ThemeContext } from "@/provider/ThemeProvider";
import PinInputSheet from "@/components/PinInputSheet";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

import useToast from "@/hooks/useToast";
import { useCreateNewUserMutation } from "@/redux/services/auth";

const CreateLoginPinScreen = () => {
	//Redux
	const dispatch = useDispatch();
	const { firstTimeUser, secondTimeUser, userStage } = useSelector(
		(state: RootState) => state.onboarding
	);

	console.log("🚀 ~ CreateLoginScreen ~ firstTimeUser:", firstTimeUser);
	console.log("🚀 ~ CreateLoginScreen ~ secondTimeUser:", secondTimeUser);
	console.log("��� ~ CreateLoginScreen ~ userStage:", userStage);

	const { showCustomToast } = useToast();
	const { theme, isDarkMode } = useContext(ThemeContext);
	const [pin, onChangePin] = useState<number[]>([]);

	const [createNewUser, { isLoading }] = useCreateNewUserMutation();

	async function handlePinSet() {
		try {
			if (pin.length !== 4) {
				showCustomToast("error", "Please set a login pin");
				return;
			}

			if (userStage === 1) {
				const firstUserPayload = {
					phoneNumber: firstTimeUser?.phoneNumber,
					emailAddress: firstTimeUser?.emailAddress,
					identityType: "BVN",
					identityNumber: firstTimeUser?.bvn,
					identityId: firstTimeUser?.identityId,
					otp: firstTimeUser?.otp,
					transactionPin: firstTimeUser.transactionPin,
					lockPin: pin.join(""),
					password: firstTimeUser.password,
					referalCode: firstTimeUser?.referalCode || "",
				};
				console.log(
					"🚀 ~ handlePinSet ~ firstUserPayload:",
					firstUserPayload
				);

				const response = await createNewUser(firstUserPayload);

				if (!response?.error) {
					router.navigate("/login");
					return;
				}
				showCustomToast(
					"error",
					//@ts-ignore
					response?.data?.error?.message || "User not found"
				);

				return;
			}

			if (userStage === 2) {
				const payload = {
					phoneNumber: secondTimeUser?.phoneNumber,
					emailAddress: secondTimeUser?.emailAddress,
					identityType: secondTimeUser?.identityType,
					identityNumber: secondTimeUser?.providerResponse?.bvn,
					identityId: secondTimeUser?.identityId,
					otp: secondTimeUser?.bvnOtp,
					transactionPin: secondTimeUser.transactionPin,
					lockPin: pin.join(""),
					password: secondTimeUser.password,
					referalCode: secondTimeUser?.referalCode || "",
				};
				console.log("🚀 ~ handlePinSet ~ payload:", payload);

				const response = await createNewUser(payload);

				if (!response?.error) {
					router.navigate("/login");
					return;
				}

				showCustomToast(
					"error",
					//@ts-ignore
					response?.data?.error?.message || "User not found"
				);
			}
		} catch (error: any) {
			showCustomToast(
				"error",
				error?.response?.data?.message || "Invalid OTP pin"
			);
		}
	}

	useEffect(() => {
		if (pin.length === 4) {
			handlePinSet();
		}
	}, [pin]);

	const [bounceValue] = useState(new Animated.Value(1));

	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(bounceValue, {
					toValue: 0.8,
					duration: 500,
					useNativeDriver: true,
				}),
				Animated.timing(bounceValue, {
					toValue: 1,
					duration: 500,
					useNativeDriver: true,
				}),
			])
		).start();
	}, []);

	const animatedStyle = {
		transform: [{ scaleY: bounceValue }],
	};

	return (
		<>
			{isLoading && (
				<View
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						// flex: 1,
						height: "100%",
						width: SCREEN_WIDTH,
						zIndex: 50,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Animated.Image
						source={require("@/assets/SplashLogo.png")}
						style={[
							{ width: 100, height: 100, objectFit: "contain" },
							animatedStyle,
						]}
					/>
				</View>
			)}
			<View
				style={{
					backgroundColor: theme.background,
					flexGrow: 1,
					width: SCREEN_WIDTH,
					paddingTop: statusBarHeight + 20,
					paddingBottom: statusBarHeight - 20,
					paddingHorizontal: SPACING.space_20,
					gap: 10,
				}}
			>
				<StatusBar style={isDarkMode ? "light" : "dark"} />
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<TouchableOpacity
						onPress={() => router.back()}
						style={{ width: 30, height: 30 }}
					>
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
							fontSize: fontSizes.FONT20,
						}}
					>
						<Text style={{ fontFamily: "PoppinsSemiBold" }}>Step 6/</Text>
						6
					</Text>
				</View>
				<PinInputSheet
					header="Create Login Pin"
					subheader="Create a 4 digit pin to Login"
					pin={pin}
					setPin={onChangePin}
					pinCount={4}
				/>
			</View>
		</>
	);
};

export default CreateLoginPinScreen;
