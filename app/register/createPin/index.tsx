import { View, SafeAreaView, TouchableOpacity, Platform } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "@/provider/ThemeProvider";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import PinInputSheet from "@/components/PinInputSheet";
import globalStyles from "@/styles/global.styles";
import { StatusBar } from "expo-status-bar";
import { SPACING } from "@/constants/Theme";
import SuccessScreenItem from "@/components/SuccessScreenItem";

export default function CreatePin() {
	const { isDarkMode, theme } = useContext(ThemeContext);
	const [pin, setPin] = useState<number[]>([]);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	useEffect(() => {
		if (pin.length === 6) {
			setTimeout(() => {
				setIsSuccess(true);
			}, 2000);

			setTimeout(() => {
				router.push("/verification");
			}, 5000);
		}
	}, [pin]);
	return (
		<>
			<StatusBar style={isDarkMode ? "light" : "dark"} />
			{isSuccess && (
				<SuccessScreenItem
					header="Passcode set"
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
							header="Create Login Pin"
							subheader=" To log into your account securely, you need to create a login pin. Please don’t share this with anyone."
							pin={pin}
							setPin={setPin}
						/>
					</View>
				</SafeAreaView>
			)}
		</>
	);
}
