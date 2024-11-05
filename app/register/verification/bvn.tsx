import {
	View,
	Text,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/Button";
import { router, useLocalSearchParams } from "expo-router";
import Input from "@/components/inputs/Input";
import { ThemeContext } from "@/provider/ThemeProvider";
import PageHeader from "@/components/PageHeader";
import { useInitiateBvnVerficationMutation } from "@/redux/services/auth";

const BvnVerification = () => {
	const { isDarkMode, theme } = useContext(ThemeContext);
	const [bvnNumber, setBvnNumber] = useState<string>("");
	const { phoneNumber }: { phoneNumber: string } = useLocalSearchParams();

	const [initiateBvnVerfication, { isLoading }] =
		useInitiateBvnVerficationMutation();

	const handleBvnSubmit = async () => {
		if (bvnNumber.length < 11) {
			console.log("Inavlid bvn");
			return;
		}

		try {
			const { data, error } = await initiateBvnVerfication({
				bvnNumber,
				phoneNumber,
			});

			if (error) {
				console.log("��� ~ handleBvnSubmit ~ error:", error);
				return;
			}

			console.log("🚀 ~ handleBvnSubmit ~ data:", data);
			router.push(
				`/register/verification/validateBvn?identityId=${data?.identityId}&phoneNumber=${phoneNumber}`
			);
		} catch (error) {
			console.log("🚀 ~ handleBvnSubmit ~ error:", error);
		}
	};
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
							6
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
							header="Bank Verification Number (BVN)"
							subHeader="To verify your account enter your BVN"
						/>

						<Input
							value={bvnNumber}
							setValue={setBvnNumber}
							placeholder="Enter your BVN"
							keyboardType="number-pad"
						/>
					</View>
					<Button
						buttonText="Verify BVN"
						onPress={() => {
							handleBvnSubmit();
						}}
						isLoading={isLoading}
						disabled={isLoading}
						variant="primary"
					/>
				</View>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
};

export default BvnVerification;
