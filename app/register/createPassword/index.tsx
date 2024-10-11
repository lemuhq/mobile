import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import React, { useContext, useState } from "react";
import { ThemeContext } from "@/provider/ThemeProvider";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import Button from "@/components/Button";
import PasswordInput from "@/components/inputs/PasswordInput";

export default function CreatePassword() {
	const { isDarkMode, theme } = useContext(ThemeContext);
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: theme.background,
				paddingHorizontal: Colors.spacing * 2,
			}}
		>
			<SafeAreaView style={{ flex: 1 }}>
				<View style={[styles.pageContainer, { paddingBottom: 10 }]}>
					<TouchableOpacity onPress={() => router.back()}>
						<Ionicons
							name="arrow-back-outline"
							size={30}
							color={theme.text}
						/>
					</TouchableOpacity>

					<Text
						style={[
							styles.welcomeH2,
							{
								color: theme.pageTextColor,
								marginTop: 20,
								textAlign: "left",
							},
						]}
					>
						Create new password
					</Text>
					<Text
						style={[
							styles.subText,
							{
								color: theme.text,
								marginTop: 2,
							},
						]}
					>
						Enter new password
					</Text>

					<View style={{ marginTop: 20, flex: 1 }}>
						<View>
							<Text style={[styles.inputLabel, { color: theme.text }]}>
								Enter new password
							</Text>
							<PasswordInput value={password} setValue={setPassword} />
						</View>
						<View style={{ marginTop: 20 }}>
							<Text style={[styles.inputLabel, { color: theme.text }]}>
								Confirm new password
							</Text>
							<PasswordInput
								value={confirmPassword}
								setValue={setConfirmPassword}
							/>
						</View>
					</View>

					<Button
						buttonText="Continue"
						onPress={() => {
							router.push("/register/createPin");
						}}
						isLoading={false}
						disabled={false}
						variant="primary"
					/>
				</View>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	pageContainer: {
		// paddingHorizontal: 15,
		paddingTop: 10,
		flex: 1,
	},
	welcomeH2: {
		fontSize: 28,
		fontFamily: "PoppinsBold",
	},
	subText: {
		fontSize: 11,
		lineHeight: 18,
		fontFamily: "PoppinsLight",
	},

	inputLabel: {
		fontSize: 14,
		fontFamily: "PoppinsRegular",
		marginBottom: 8,
	},
});
