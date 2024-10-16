import {
	View,
	Text,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "@/provider/ThemeProvider";
import { StatusBar } from "expo-status-bar";
import globalStyles from "@/styles/global.styles";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";

export default function FacialRecogntion() {
	const { isDarkMode, theme } = useContext(ThemeContext);
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<StatusBar style={isDarkMode ? "light" : "dark"} />
			<SafeAreaView
				style={[
					{
						flex: 1,
						backgroundColor: theme.background,
					},
					globalStyles.safeAreaViewStyles,
				]}
			>
				<View
					style={{
						paddingBottom: SPACING.space_10,
						paddingTop: SPACING.space_36,
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
								Step 2/
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
							header="Take a selfie"
							subHeader="We require this sellfie to verify your identity"
							variant="center"
						/>
					</View>
					<Button
						buttonText="Take a selfie"
						onPress={() => {
							router.navigate("/verification/userInfo");
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
