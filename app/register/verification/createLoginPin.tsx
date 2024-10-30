import {
	View,
	Text,
	SafeAreaView,
	Platform,
	TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import PinInputSheet from "@/components/PinInputSheet";
import { ThemeContext } from "@/provider/ThemeProvider";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import SuccessScreenItem from "@/components/SuccessScreenItem";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import { Ionicons } from "@expo/vector-icons";

export default function CreateLoginPin() {
	const { isDarkMode, theme } = useContext(ThemeContext);
	const [pin, setPin] = useState<number[]>([]);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);

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
					header="Login Pin Set"
					subHeader="Congratulations. You can now sign into your account with your passcode."
				/>
			)}
			{!isSuccess && (
				<SafeAreaView
					style={[
						{
							flex: 1,
							backgroundColor: theme.background,
							paddingTop:
								Platform.OS === "android" ? SPACING.space_30 : 0,
							paddingBottom:
								Platform.OS === "android" ? SPACING.space_10 : 0,
						},
					]}
				>
					<StatusBar style={isDarkMode ? "light" : "dark"} />
					<View
						style={{
							// paddingVertical: SPACING.space_10,
							flex: 1,
						}}
					>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								paddingHorizontal: SPACING.space_20,
								marginBottom: SPACING.space_20,
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
								<Text style={{ fontFamily: "PoppinsSemiBold" }}>
									Step 4/
								</Text>
								4
							</Text>
						</View>
						<PinInputSheet
							header="Create Login Pin"
							subheader="Create a 6 digit pin to Login"
							pin={pin}
							setPin={setPin}
							pinCount={6}
						/>
					</View>
				</SafeAreaView>
			)}
		</>
	);
}
