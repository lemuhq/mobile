import {
	View,
	Text,
	SafeAreaView,
	Platform,
	TouchableOpacity,
	Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/provider/ThemeProvider";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import SuccessScreenItem from "@/components/SuccessScreenItem";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import { Ionicons } from "@expo/vector-icons";
import PinInputSheet from "@/components/PinInputSheet";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "@/constants/Colors";
import Constants from "expo-constants";

const AuthenticatedUser = () => {
	const { isDarkMode, theme } = useContext(ThemeContext);
	const [pin, setPin] = useState<number[]>([]);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const statusHeight =
		Platform.OS === "android" ? Constants.statusBarHeight : 60;

	useEffect(() => {
		if (pin.length === 6) {
			setTimeout(() => {
				setIsSuccess(true);
			}, 2000);

			setTimeout(() => {
				router.push("/(tabs)/home");
			}, 5000);
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
							header="Welcome back, Afy"
							subheader="Enter passcode to continue"
							pin={pin}
							setPin={setPin}
							pinCount={6}
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
				// <SafeAreaView
				// 	style={[
				// 		{
				// 			flex: 1,
				// 			backgroundColor: theme.background,
				// 			paddingTop:
				// 				Platform.OS === "android" ? SPACING.space_20 : 0,
				// 			paddingBottom:
				// 				Platform.OS === "android" ? SPACING.space_10 : 0,
				// 		},
				// 	]}
				// >

				// </SafeAreaView>
			)}
		</>
	);
};

export default AuthenticatedUser;
