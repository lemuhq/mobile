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
import { fetchCurrentUser } from "@/redux/slice/user.slice";
import useToast from "@/hooks/useToast";
import { storage } from "@/utils/storage";

const AuthenticatedUser = () => {
	const { isDarkMode, theme } = useContext(ThemeContext);
	const { showCustomToast } = useToast();
	const [pin, setPin] = useState<number[]>([]);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const statusHeight =
		Platform.OS === "android" ? Constants.statusBarHeight : 60;
	const [lockKey, setLockKey] = useState<string>("");
	const [firstName, setFirstName] = useState<string>("");

	async function verifyPin() {
		try {
			if (pin.join("").toString() === lockKey) {
				// console.log("Pin already");
				setIsSuccess(true);
				const response = await fetchCurrentUser();

				if (response) {
					if (response.message === "Invalid token.") {
						showCustomToast("error", response.message);

						router.push("/login");

						return;
					}

					router.push("/(tabs)/home");
				}
			} else {
				alert("Incorrect pin");
			}
			setPin([]);
		} catch (error) {
			console.log(error);
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
							paddingBottom: statusHeight - 20,
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
									// borderRadius: 100,
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
								height: 40,
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
