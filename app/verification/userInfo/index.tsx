import {
	View,
	Text,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "@/provider/ThemeProvider";
import globalStyles from "@/styles/global.styles";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";
import Input from "@/components/inputs/Input";

export default function UserInfo() {
	const { isDarkMode, theme } = useContext(ThemeContext);
	const [email, setEmail] = useState<string>("");
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [referalCode, setReferalCode] = useState<string>("");

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
								Step 3/
							</Text>
							3
						</Text>
					</View>
					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ flex: 1 }}
					>
						<View
							style={{
								flex: 1,
								marginTop: SPACING.space_20,
								gap: SPACING.space_20,
							}}
						>
							<PageHeader
								header="Account Setup"
								subHeader="Confirm or update the following personal information with your legal name, date of birth etc."
								variant="left"
							/>

							<View
								style={{
									marginVertical: SPACING.space_20,
									gap: SPACING.space_20,
								}}
							>
								<View>
									<Text
										style={[styles.inputLabel, { color: theme.text }]}
									>
										First Name
									</Text>
									<Input
										value={firstName}
										setValue={setFirstName}
										placeholder="Enter First Name"
									/>
								</View>
								<View>
									<Text
										style={[styles.inputLabel, { color: theme.text }]}
									>
										Last Name
									</Text>
									<Input
										value={lastName}
										setValue={setLastName}
										placeholder="Enter Last Name"
									/>
								</View>
								<View>
									<Text
										style={[styles.inputLabel, { color: theme.text }]}
									>
										Email
									</Text>
									<Input
										value={lastName}
										setValue={setLastName}
										placeholder="Enter Email"
									/>
								</View>
								<View>
									<Text
										style={[styles.inputLabel, { color: theme.text }]}
									>
										Referral Code (Optional)
									</Text>
									<Input
										value={referalCode}
										setValue={setReferalCode}
										placeholder="Enter referral code"
									/>
									<Text
										style={[
											{
												color: theme.text,
												marginTop: SPACING.space_10,
												fontSize: FONTSIZE.size_10 + 1,
											},
										]}
									>
										Whoever referred you to us will earn a cash reward
										when you complete the sign up process and carry
										out your first transaction
									</Text>
								</View>
							</View>
						</View>
						<Button
							buttonText="Continue"
							onPress={() => {
								router.navigate("/verification/transactionPin");
							}}
							isLoading={false}
							disabled={false}
							variant="primary"
						/>
					</ScrollView>
				</View>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	inputLabel: {
		fontSize: FONTSIZE.size_14,
		fontFamily: "PoppinsRegular",
		marginBottom: 8,
	},
});
