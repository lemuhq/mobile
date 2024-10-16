import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	Platform,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/provider/ThemeProvider";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import SuccessScreenItem from "@/components/SuccessScreenItem";
import PinInputSheet from "@/components/PinInputSheet";
import { Ionicons } from "@expo/vector-icons";
import globalStyles from "@/styles/global.styles";
import { Colors } from "@/constants/Colors";
import { SPACING } from "@/constants/Theme";

export default function ConfirmTransactionPin() {
	const { isDarkMode, theme } = useContext(ThemeContext);
	const [pin, setPin] = useState<number[]>([]);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	useEffect(() => {
		if (pin.length === 4) {
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
					header="Pin Set"
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
							paddingVertical: SPACING.space_10,
							flex: 1,
						}}
					>
						<View
							style={{
								paddingHorizontal: SPACING.space_20,
								marginBottom: SPACING.space_10,
							}}
						>
							<TouchableOpacity onPress={() => router.back()}>
								<Ionicons
									name="arrow-back-outline"
									size={30}
									color={theme.text}
								/>
							</TouchableOpacity>
						</View>
						<PinInputSheet
							header="Confirm transaction Pin"
							subheader="Create a 4 digit pin for all your transactions"
							pin={pin}
							setPin={setPin}
							pinCount={4}
						/>
					</View>
				</SafeAreaView>
			)}
		</>
	);
}
