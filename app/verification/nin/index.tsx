import {
	View,
	Text,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import { ThemeContext } from "@/provider/ThemeProvider";
import { StatusBar } from "expo-status-bar";
import globalStyles from "@/styles/global.styles";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import PageHeader from "@/components/PageHeader";
import Input from "@/components/inputs/Input";
import Button from "@/components/Button";

export default function NinVerification() {
	const { isDarkMode, theme } = useContext(ThemeContext);
	const [ninNumber, setNinNumber] = useState<string>("");

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 0}
			style={{ flex: 1, backgroundColor: theme.background }}
		>
			<StatusBar style={isDarkMode ? "light" : "dark"} />
			<SafeAreaView
				style={[
					{
						flex: 1,
						backgroundColor: theme.background,
						paddingTop: Platform.OS === "android" ? SPACING.space_30 : 0,
						paddingBottom:
							Platform.OS === "android" ? SPACING.space_10 : 0,
					},
				]}
			>
				<View
					style={{
						// paddingTop: SPACING.space_10,
						paddingHorizontal: SPACING.space_20,
						flex: 1,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
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
								Step 1/
							</Text>
							3
						</Text>
					</View>
					<View
						style={{
							flex: 1,
							marginTop: SPACING.space_20,
							gap: SPACING.space_20,
						}}
					>
						<PageHeader
							header="National Identification Number (NIN)"
							subHeader="To verify your account enter your NIN"
						/>

						<Input
							value={ninNumber}
							setValue={setNinNumber}
							placeholder="Enter your NIN"
							keyboardType="number-pad"
						/>
					</View>
					<Button
						buttonText="Verify NIN"
						onPress={() => {
							router.navigate("/verification/facialRecognition");
						}}
						isLoading={false}
						disabled={false}
						variant="primary"
					/>
				</View>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}
