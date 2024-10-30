import {
	View,
	Text,
	SafeAreaView,
	Platform,
	TouchableOpacity,
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
} from "react-native";
import React, { useContext, useState } from "react";
import { ThemeContext } from "@/provider/ThemeProvider";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import PageHeader from "@/components/PageHeader";
import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import Input from "@/components/inputs/Input";

export default function CreateUser() {
	const { isDarkMode, theme } = useContext(ThemeContext);
	const [email, setEmail] = useState<string>("");
	const [firstName, setFirstName] = useState<string>("Joshua");
	const [lastName, setLastName] = useState<string>("Lemu");
	const [referalCode, setReferalCode] = useState<string>("");
	return (
		<SafeAreaView
			style={[
				{
					flex: 1,
					backgroundColor: theme.background,
					paddingTop: Platform.OS === "android" ? SPACING.space_30 : 0,
					paddingBottom: Platform.OS === "android" ? SPACING.space_10 : 0,
				},
			]}
		>
			<StatusBar style={isDarkMode ? "light" : "dark"} />

			<View style={{ flex: 1 }}>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						paddingHorizontal: SPACING.space_20,
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
						<Text style={{ fontFamily: "PoppinsSemiBold" }}>Step 2/</Text>
						4
					</Text>
				</View>

				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
					style={{ flex: 1 }}
				>
					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ paddingBottom: SPACING.space_20 }}
					>
						<View
							style={{
								marginTop: SPACING.space_20,
								gap: SPACING.space_20,
								paddingHorizontal: SPACING.space_20,
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
								{/* Input Fields */}
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
										editable={false}
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
										editable={false}
									/>
								</View>
								<View>
									<Text
										style={[styles.inputLabel, { color: theme.text }]}
									>
										Email
									</Text>
									<Input
										value={email}
										setValue={setEmail}
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
										style={{
											color: theme.text,
											marginTop: SPACING.space_10,
											fontSize: FONTSIZE.size_10 + 1,
										}}
									>
										Whoever referred you to us will earn a cash reward
										when you complete the sign up process and carry
										out your first transaction
									</Text>
								</View>
							</View>
						</View>
						<View
							style={{
								// backgroundColor: Colors.white,
								paddingHorizontal: SPACING.space_20,
								flex: 1,
								justifyContent: "flex-end",
							}}
						>
							<Button
								buttonText="Continue"
								onPress={() => {
									router.navigate(
										"/register/verification/createTransactionPin"
									);
								}}
								isLoading={false}
								disabled={false}
								variant="primary"
							/>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	inputLabel: {
		fontSize: FONTSIZE.size_14,
		fontFamily: "PoppinsRegular",
		marginBottom: 8,
	},
});
