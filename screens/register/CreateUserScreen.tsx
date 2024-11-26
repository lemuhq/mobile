import {
	View,
	Text,
	Platform,
	TouchableOpacity,
	KeyboardAvoidingView,
} from "react-native";
import React, { Dispatch, FC, SetStateAction, useContext } from "react";
import { fontSizes, SCREEN_WIDTH, statusBarHeight } from "@/constants";
import Button from "@/components/Button";
import { ThemeContext } from "@/provider/ThemeProvider";
import { SPACING } from "@/constants/Theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import VerificationPageHeader from "@/components/VerificationPageHeader";
import { ScrollView } from "react-native";
import Input from "@/components/inputs/Input";

interface PageProps {
	next: () => void;
	prev: () => void;
	firstName: string;
	lastName: string;
	email: string;
	referalCode?: string;
	onChangeFirstName: Dispatch<SetStateAction<string>>;
	onChangeLastName: Dispatch<SetStateAction<string>>;
	onChangeEmail: Dispatch<SetStateAction<string>>;
	onChangeReferalCode: Dispatch<SetStateAction<string>>;
}

const CreateUserScreen: FC<PageProps> = ({
	next,
	prev,
	firstName,
	lastName,
	email,
	referalCode,
	onChangeFirstName,
	onChangeLastName,
	onChangeEmail,
	onChangeReferalCode,
}) => {
	const { theme } = useContext(ThemeContext);
	const KEYBOARD_VERTICAL_OFFSET = Platform.OS === "android" ? 10 : 20;
	return (
		<View
			style={{
				backgroundColor: theme.background,
				flexGrow: 1,
				width: SCREEN_WIDTH,
				paddingTop: statusBarHeight + 20,
				paddingBottom: statusBarHeight - 20,
				paddingHorizontal: SPACING.space_20,
			}}
		>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<TouchableOpacity
					onPress={() => prev()}
					style={{ width: 30, height: 30 }}
				>
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
						fontSize: fontSizes.FONT20,
					}}
				>
					<Text style={{ fontFamily: "PoppinsSemiBold" }}>Step 3/</Text>6
				</Text>
			</View>
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
			>
				<ScrollView
					contentContainerStyle={{ gap: 20 }}
					showsVerticalScrollIndicator={false}
				>
					<VerificationPageHeader
						header="Account Setup"
						subHeader="Confirm or update the following personal information with your legal name, date of birth etc."
					/>
					<View>
						<Text style={[styles.inputLabel, { color: theme.text }]}>
							First Name
						</Text>
						<Input
							value={firstName}
							setValue={onChangeFirstName}
							placeholder="Enter First Name"
							editable={false}
						/>
					</View>
					<View>
						<Text style={[styles.inputLabel, { color: theme.text }]}>
							Last Name
						</Text>
						<Input
							value={lastName}
							setValue={onChangeLastName}
							placeholder="Enter Last Name"
							editable={false}
						/>
					</View>
					<View>
						<Text style={[styles.inputLabel, { color: theme.text }]}>
							Email
						</Text>
						<Input
							value={email}
							setValue={onChangeEmail}
							placeholder="Enter Email"
						/>
					</View>
					<View>
						<Text style={[styles.inputLabel, { color: theme.text }]}>
							Referral Code (Optional)
						</Text>
						<Input
							value={referalCode || ""}
							setValue={onChangeReferalCode}
							placeholder="Enter referral code"
						/>
						<Text
							style={{
								color: theme.text,
								marginTop: SPACING.space_10,
								marginBottom: SPACING.space_20,
								fontSize: fontSizes.FONT14,
							}}
						>
							Whoever referred you to us will earn a cash reward when you
							complete the sign up process and carry out your first
							transaction
						</Text>
					</View>
				</ScrollView>
				<Button
					buttonText="Continue"
					onPress={next}
					disabled={!email || !lastName || !firstName}
				/>
			</KeyboardAvoidingView>
		</View>
	);
};

export default CreateUserScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		justifyContent: "space-between",
	},
	content: {
		flex: 1,
	},
	inputLabel: {
		fontSize: fontSizes.FONT14,
		fontFamily: "PoppinsRegular",
		marginBottom: 8,
	},
});
