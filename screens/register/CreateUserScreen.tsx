import {
	View,
	Text,
	Platform,
	TouchableOpacity,
	KeyboardAvoidingView,
} from "react-native";
import React, { Dispatch, FC, SetStateAction, useContext, useState } from "react";
import { fontSizes, SCREEN_WIDTH, statusBarHeight } from "@/constants";
import Button from "@/components/Button";
import { ThemeContext } from "@/provider/ThemeProvider";
import { SPACING } from "@/constants/Theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import VerificationPageHeader from "@/components/VerificationPageHeader";
import { ScrollView } from "react-native";
import Input from "@/components/inputs/Input";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setOnboardingData } from "@/redux/slice/onboarding.slice";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

const CreateUserScreen: FC = () => {
	const { theme } = useContext(ThemeContext);
	const KEYBOARD_VERTICAL_OFFSET = Platform.OS === "ios" ? 120 : 30;
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [referralCode, setReferralCode] = useState("");
	
	const onboardingData:any = useSelector((state: RootState) => state.onboarding.value);
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const handleNext = () => {
		const newOnboardingData = {...onboardingData};
		newOnboardingData.referralCode = referralCode;
		newOnboardingData.email = email;
		dispatch(setOnboardingData(newOnboardingData));
		console.log("🚀 ~ handleNext ~ newOnboardingData:", newOnboardingData);
		router.navigate('/register/createPassword');
		//navigation.navigate('NextScreen'); // Replace with your actual navigation
	};

	const handlePrev = () => {
		navigation.goBack();
	};

	return (
		<KeyboardAvoidingView
			style={[styles.container, { backgroundColor: theme.background }]}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
		>
			<ScrollView
				style={{ flex: 1 }}
				contentContainerStyle={{ 
					flexGrow: 1,
					paddingTop: statusBarHeight + 20,
					paddingHorizontal: SPACING.space_20,
					paddingBottom: SPACING.space_20
				}}
				showsVerticalScrollIndicator={false}
				bounces={false}
			>
				<View style={styles.header}>
					<TouchableOpacity
						onPress={handlePrev}
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
				<VerificationPageHeader
					header="Account Setup"
					subHeader="Confirm or update the following personal information with your legal name, date of birth etc."
					style={{ marginBottom: SPACING.space_20 }}
				/>
				<View>
					<Text style={[styles.inputLabel, { color: theme.text }]}>
						First Name
					</Text>
					<Input
						value={onboardingData?.providerResponse?.firstName}

						editable={false}
						placeholder={onboardingData?.providerResponse?.firstName}
					/>
				</View>
				<View>
					<Text style={[styles.inputLabel, { color: theme.text }]}>
						Last Name
					</Text>
					<Input
						value={onboardingData?.providerResponse?.lastName}
						editable={false}
						placeholder={onboardingData?.providerResponse?.lastName}
					/>
				</View>
				<View>
					<Text style={[styles.inputLabel, { color: theme.text }]}>
						Email
					</Text>
					<Input
						value={email}
						setValue={setEmail}
						placeholder="Enter Email"
					/>
				</View>
				<View>
					<Text style={[styles.inputLabel, { color: theme.text }]}>
						Referral Code (Optional)
					</Text>
					<Input
						value={referralCode}
						setValue={setReferralCode}
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
			
			<View style={styles.buttonContainer}>
				<Button
					onPress={handleNext}
					buttonText="Continue"
					disabled={!onboardingData?.providerResponse?.email || !onboardingData?.providerResponse?.lastName || !onboardingData?.providerResponse?.firstName}
				/>
			</View>
		</KeyboardAvoidingView>
	);
};

export default CreateUserScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: SPACING.space_20,
	},
	buttonContainer: {
		justifyContent: "flex-end",
		paddingHorizontal: SPACING.space_20,
		paddingBottom: Platform.OS === 'ios' ? 34 : 0,
		backgroundColor: 'transparent',
	},
	inputLabel: {
		fontSize: fontSizes.FONT14,
		fontFamily: "PoppinsRegular",
		marginBottom: 8,
	},
});
