import {
	View,
	Text,
	Platform,
	TouchableOpacity,
	KeyboardAvoidingView,
} from "react-native";
import React, {
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { fontSizes, SCREEN_WIDTH, statusBarHeight } from "@/constants";
import Button from "@/components/Button";
import { ThemeContext } from "@/provider/ThemeProvider";
import { SPACING } from "@/constants/Theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import VerificationPageHeader from "@/components/VerificationPageHeader";
import { ScrollView } from "react-native";
import Input from "@/components/inputs/Input";
import { router } from "expo-router";
import KeyboardAvoidingViewContainer from "@/components/KeyboardAvoidingViewContainer";
import { StatusBar } from "expo-status-bar";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
	setFirstTimeOnboardingData,
	setSecondTimeOnboardingData,
} from "@/redux/slice/onboarding.slice";

const CreateUserScreen = () => {
	//Redux
	const dispatch = useDispatch();
	const { firstTimeUser, secondTimeUser, userStage } = useSelector(
		(state: RootState) => state.onboarding
	);

	console.log("🚀 ~ CreateUserScreen ~ userStage:", userStage);
	console.log("🚀 ~ CreateUserScreen ~ secondTimeUser:", secondTimeUser);

	const [email, onChangeEmail] = useState<string>("");
	const [firstName, onChangeFirstName] = useState<string>("");
	const [lastName, onChangeLastName] = useState<string>("");
	const [referalCode, onChangeReferalCode] = useState<string>("");

	const { theme, isDarkMode } = useContext(ThemeContext);

	const handleSubmit = async () => {
		if (userStage === 1) {
			const newUserData = {
				...firstTimeUser,
				emailAddress: email,
				firstName,
				lastName,
				referalCode,
			};

			dispatch(setFirstTimeOnboardingData(newUserData));
			router.navigate("/register/createPassword");
			return;
		}

		if (userStage === 2) {
			const newUserData = {
				...secondTimeUser,
				emailAddress: email,
				firstName,
				lastName,
				referalCode,
			};

			dispatch(setSecondTimeOnboardingData(newUserData));
			router.navigate("/register/createPassword");
			return;
		}
	};

	useEffect(() => {
		if (userStage === 1) {
			onChangeFirstName(
				firstTimeUser?.data?.providerResponse.firstName || ""
			);
			onChangeLastName(firstTimeUser?.data?.providerResponse.lastName || "");
		} else {
			onChangeFirstName(secondTimeUser?.providerResponse.firstName || "");
			onChangeLastName(secondTimeUser?.providerResponse.lastName || "");
		}
	}, [userStage, firstTimeUser, secondTimeUser]);

	return (
		<KeyboardAvoidingViewContainer>
			<StatusBar style={isDarkMode ? "light" : "dark"} />
			<View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<TouchableOpacity
						onPress={() => router.back()}
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
						<Text style={{ fontFamily: "PoppinsSemiBold" }}>Step 3/</Text>
						6
					</Text>
				</View>

				<VerificationPageHeader
					header="Account Setup"
					subHeader="Confirm or update the following personal information with your legal name, date of birth etc."
				/>

				<View
					style={{ gap: SPACING.space_20, marginTop: SPACING.space_20 }}
				>
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
				</View>
			</View>
			<Button
				buttonText="Continue"
				onPress={handleSubmit}
				disabled={!email || !lastName || !firstName}
			/>
		</KeyboardAvoidingViewContainer>
		// <View
		// 	style={{
		// 		backgroundColor: theme.background,
		// 		flexGrow: 1,
		// 		width: SCREEN_WIDTH,
		// 		paddingTop: statusBarHeight + 20,
		// 		paddingBottom: statusBarHeight - 20,
		// 		paddingHorizontal: SPACING.space_20,
		// 	}}
		// >
		// <View
		// 	style={{
		// 		flexDirection: "row",
		// 		justifyContent: "space-between",
		// 		alignItems: "center",
		// 	}}
		// >
		// 	<TouchableOpacity
		// 		onPress={() => router.back()}
		// 		style={{ width: 30, height: 30 }}
		// 	>
		// 		<Ionicons
		// 			name="arrow-back-outline"
		// 			size={30}
		// 			color={theme.text}
		// 		/>
		// 	</TouchableOpacity>

		// 	<Text
		// 		style={{
		// 			color: theme.text,
		// 			fontFamily: "PoppinsLight",
		// 			fontSize: fontSizes.FONT20,
		// 		}}
		// 	>
		// 		<Text style={{ fontFamily: "PoppinsSemiBold" }}>Step 3/</Text>6
		// 	</Text>
		// </View>
		// 	<KeyboardAvoidingView
		// 		style={styles.container}
		// 		behavior={Platform.OS === "ios" ? "padding" : "height"}
		// 		keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
		// 	>
		// 		<ScrollView
		// 			contentContainerStyle={{ gap: 20 }}
		// 			showsVerticalScrollIndicator={false}
		// 		>
		// <VerificationPageHeader
		// 	header="Account Setup"
		// 	subHeader="Confirm or update the following personal information with your legal name, date of birth etc."
		// />
		// <View>
		// 	<Text style={[styles.inputLabel, { color: theme.text }]}>
		// 		First Name
		// 	</Text>
		// 	<Input
		// 		value={firstName}
		// 		setValue={onChangeFirstName}
		// 		placeholder="Enter First Name"
		// 		editable={false}
		// 	/>
		// </View>
		// <View>
		// 	<Text style={[styles.inputLabel, { color: theme.text }]}>
		// 		Last Name
		// 	</Text>
		// 	<Input
		// 		value={lastName}
		// 		setValue={onChangeLastName}
		// 		placeholder="Enter Last Name"
		// 		editable={false}
		// 	/>
		// </View>
		// <View>
		// 	<Text style={[styles.inputLabel, { color: theme.text }]}>
		// 		Email
		// 	</Text>
		// 	<Input
		// 		value={email}
		// 		setValue={onChangeEmail}
		// 		placeholder="Enter Email"
		// 	/>
		// </View>
		// <View>
		// 	<Text style={[styles.inputLabel, { color: theme.text }]}>
		// 		Referral Code (Optional)
		// 	</Text>
		// 	<Input
		// 		value={referalCode || ""}
		// 		setValue={onChangeReferalCode}
		// 		placeholder="Enter referral code"
		// 	/>
		// 	<Text
		// 		style={{
		// 			color: theme.text,
		// 			marginTop: SPACING.space_10,
		// 			marginBottom: SPACING.space_20,
		// 			fontSize: fontSizes.FONT14,
		// 		}}
		// 	>
		// 		Whoever referred you to us will earn a cash reward when you
		// 		complete the sign up process and carry out your first
		// 		transaction
		// 	</Text>
		// </View>
		// 		</ScrollView>
		// <Button
		// 	buttonText="Continue"
		// 	// onPress={next}
		// 	disabled={!email || !lastName || !firstName}
		// />
		// 	</KeyboardAvoidingView>
		// </View>
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
