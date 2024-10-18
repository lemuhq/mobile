import { View, SafeAreaView, TouchableOpacity } from "react-native";
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
						},
						globalStyles.safeAreaViewStyles,
					]}
				>
					<StatusBar style={isDarkMode ? "light" : "dark"} />
					<View
						style={{
							paddingHorizontal: SPACING.space_20,

							flex: 1,
						}}
					>
						<TouchableOpacity onPress={() => router.back()}>
							<Ionicons
								name="arrow-back-outline"
								size={30}
								color={theme.text}
							/>
						</TouchableOpacity>
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
