import Button from "@/components/Button";
import PasswordInput from "@/components/inputs/PasswordInput";
import VerificationPageHeader from "@/components/VerificationPageHeader";
import { fontSizes, SCREEN_WIDTH, statusBarHeight } from "@/constants";
import { SPACING } from "@/constants/Theme";
import { ThemeContext } from "@/provider/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "@/redux/store";
import { setOnboardingData } from "@/redux/slice/onboarding.slice";
import React, {
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { ScrollView } from "react-native";
import { Platform, StyleSheet } from "react-native";
import {
	KeyboardAvoidingView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const CreatePasswordScreen: FC = () => {
	const onboardingData:any = useSelector((state: RootState) => state.onboarding.value);
	const dispatch = useDispatch();
	const { theme } = useContext(ThemeContext);
	const KEYBOARD_VERTICAL_OFFSET = Platform.OS === "ios" ? 90 : 0;

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [confirmError, setConfirmError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	function passwordValidation() {
		if (password) {
			if (password.length < 8) {
				setPasswordError("Password must be at least 8 characters long");
			} else if (!/[a-z]/.test(password)) {
				setPasswordError(
					"Password must contain at least one lowercase letter"
				);
			} else if (!/[A-Z]/.test(password)) {
				setPasswordError(
					"Password must contain at least one uppercase letter"
				);
			} else if (!/[0-9]/.test(password)) {
				setPasswordError("Password must contain at least one number");
			} else if (!/[!@#$%^&.,*()]/.test(password)) {
				setPasswordError(
					"Password must contain at least one special character"
				);
			} else {
				setPasswordError("");
			}

			if (confirmPassword.length !== 0) {
				if (password !== confirmPassword) {
					setConfirmError("Passwords do not match");
				} else {
					setConfirmError("");
				}
			} else {
				setConfirmError("");
			}
		} else {
			setPasswordError("");
			setConfirmError("");
		}
	}

	useEffect(() => {
		passwordValidation();
	}, [password, confirmPassword]);

	const handleNext = () => {
		console.log("🚀 ~ handleNext ~ password:", password);
		const newOnboardingData = {...onboardingData};
		newOnboardingData.password = password;
		dispatch(setOnboardingData(newOnboardingData));
		console.log("🚀 ~ handleNext ~ newOnboardingData:", newOnboardingData);
		router.navigate('/register/loginPin');
	}

	const handlePrev = () => {
		// Add your navigation logic here
	}

	return (
		<KeyboardAvoidingView
			style={[styles.container, { backgroundColor: theme.background }]}
			behavior={Platform.OS === "ios" ? "padding" : undefined}
			keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
		>
			<View
				style={{
					width: SCREEN_WIDTH,
					paddingTop: statusBarHeight + 20,
					paddingBottom: statusBarHeight - 20,
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
						<Text style={{ fontFamily: "PoppinsSemiBold" }}>Step 4/</Text>6
					</Text>
				</View>

				<ScrollView
					contentContainerStyle={{ flexGrow: 1, gap: 20 }}
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps="handled"
				>
					<VerificationPageHeader header="Create new password" />
					<View>
						<Text style={[styles.inputLabel, { color: theme.text }]}>
							Enter new password
						</Text>
						<PasswordInput
							value={password}
							setValue={setPassword}
							errorMessage={passwordError}
						/>
					</View>

					<View>
						<Text style={[styles.inputLabel, { color: theme.text }]}>
							Confirm new password
						</Text>
						<PasswordInput
							value={confirmPassword}
							setValue={setConfirmPassword}
							errorMessage={confirmError}
						/>
					</View>
				</ScrollView>
				<Button
					buttonText="Next"
					onPress={handleNext}
					disabled={password !== confirmPassword || !password}
				/>
			</View>
		</KeyboardAvoidingView>
	);
};

export default CreatePasswordScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
