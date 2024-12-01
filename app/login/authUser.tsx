import { View, Text, Platform, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/provider/ThemeProvider";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import SuccessScreenItem from "@/components/SuccessScreenItem";
import PinInputSheet from "@/components/PinInputSheet";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "@/constants/Colors";
import Constants from "expo-constants";
import { fetchCurrentUser, setCurrentUser } from "@/redux/slice/user.slice";
import useToast from "@/hooks/useToast";
import { storage } from "@/utils/storage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BACKEND_URL } from "@/constants";
import { useGetNewRefreshTokenMutation } from "@/redux/services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

const AuthenticatedUser = () => {
	const { isDarkMode, theme } = useContext(ThemeContext);
	const { showCustomToast } = useToast();
	const [pin, setPin] = useState<number[]>([]);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const statusHeight = Constants.statusBarHeight;
	const [lockKey, setLockKey] = useState<string>("");
	const [firstName, setFirstName] = useState<string>("");
	const dispatch = useDispatch();

	const [getNewRefreshToken, { isLoading }] = useGetNewRefreshTokenMutation();

	async function verifyPin() {
		try {
			if (pin.join("").toString() === lockKey) {
				setIsSuccess(true);
				const refreshToken = await storage.getRefreshToken("refreshToken");

				if (refreshToken) {
					const payload = {
						oldRefreshToken: refreshToken,
					};
					const response = await getNewRefreshToken(payload);

					if (response.error) {
						showCustomToast(
							"error",
							//@ts-ignore
							response?.error?.data?.message || "Incorrect pin"
						);
						return;
					}

					await storage.saveUserToken(
						"token",
						response?.data?.accessToken
					);
					await storage.saveRefreshToken(
						"refreshToken",
						response?.data?.refreshToken
					);
					router.push("/(tabs)/home");
				}
			} else {
				showCustomToast("error", "Incorrect pin");
			}
			setPin([]);
		} catch (error) {
			console.log(error);
			showCustomToast("error", "Invalid token");
			router.push("/login");
		}
	}

	useEffect(() => {
		async function fetchLockKey() {
			const lockPin = await storage.getLockPin();

			const lockUser = await storage.getUserFirstName();

			if (lockPin && lockUser) {
				setLockKey(lockPin);
				setFirstName(lockUser);
			} else {
				router.push("/login");
			}
		}

		fetchLockKey();
	}, []);

	useEffect(() => {
		if (pin.length === 4) {
			verifyPin();
		}
	}, [pin]);

	return (
		<>
			<StatusBar style={isDarkMode ? "light" : "dark"} />
			{isSuccess && (
				<SuccessScreenItem
					header="Logged in successfully"
					subHeader="Congratulations. You can now sign into your account with your passcode."
				/>
			)}
			{!isSuccess && (
				<>
					<StatusBar style={isDarkMode ? "light" : "dark"} />
					<View
						style={{
							paddingTop: statusHeight + 10,
							paddingBottom: statusHeight - 28,
							flex: 1,
							gap: 5,
						}}
					>
						<View
							style={{
								width: wp("22%"),
								height: hp("10%"),
								borderRadius: wp("100%"),
								overflow: "hidden",
								marginLeft: "auto",
								marginRight: "auto",
							}}
						>
							<Image
								source={require("@/assets/default-user.png")}
								style={{
									width: "100%",
									height: "100%",

									resizeMode: "cover",
								}}
							/>
						</View>
						<PinInputSheet
							header={`Welcome back, ${firstName}`}
							subheader="Enter passcode to continue"
							pin={pin}
							setPin={setPin}
							pinCount={4}
							hasBiometrics={true}
						/>
						<View
							style={{
								alignItems: "center",
								justifyContent: "flex-end",

								height: 20,
							}}
						>
							<TouchableOpacity>
								<Text
									style={{
										fontFamily: "PoppinsSemiBold",
										color: Colors.orange,
									}}
								>
									Forgot passcode?
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</>
			)}
		</>
	);
};

export default AuthenticatedUser;
