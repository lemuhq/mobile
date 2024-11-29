import Button from "@/components/Button";
import PasswordInput from "@/components/inputs/PasswordInput";
import VerificationPageHeader from "@/components/VerificationPageHeader";
import { fontSizes, SCREEN_WIDTH, statusBarHeight } from "@/constants";
import { SPACING } from "@/constants/Theme";
import { ThemeContext } from "@/provider/ThemeProvider";
import {
	setFirstTimeOnboardingData,
	setSecondTimeOnboardingData,
} from "@/redux/slice/onboarding.slice";
import { RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
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
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const CreatePasswordScreen = () => {
	//Redux
	const dispatch = useDispatch();
	const { firstTimeUser, secondTimeUser, userStage } = useSelector(
		(state: RootState) => state.onboarding
	);

	const { theme, isDarkMode } = useContext(ThemeContext);
	const KEYBOARD_VERTICAL_OFFSET = Platform.OS === "android" ? 30 : 20;

	const [password, onChangePassword] = useState("");
	const [confirmPassword, onChangeConfirmPassword] = useState("");

	const [confirmError, setConfirmError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const handleSubmit = async () => {
		if (userStage === 1) {
			const newUserData = {
				...firstTimeUser,
				password,
				confirmPassword,
			};

			dispatch(setFirstTimeOnboardingData(newUserData));
			router.navigate("/register/createTransactionPin");
			return;
		}

		if (userStage === 2) {
			const newUserData = {
				...secondTimeUser,
				password,
				confirmPassword,
			};

			dispatch(setSecondTimeOnboardingData(newUserData));
			router.navigate("/register/createTransactionPin");
			return;
		}
	};

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
			<StatusBar style={isDarkMode ? "light" : "dark"} />
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
					<Text style={{ fontFamily: "PoppinsSemiBold" }}>Step 4/</Text>6
				</Text>
			</View>

			<KeyboardAvoidingView
				style={styles.container}
				// behavior={Platform.OS === "ios" ? "padding" : "height"}
				behavior="padding"
				keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
			>
				<ScrollView
					contentContainerStyle={{ gap: 20 }}
					showsVerticalScrollIndicator={false}
				>
					<VerificationPageHeader header="Create new password" />
					<View>
						<Text style={[styles.inputLabel, { color: theme.text }]}>
							Enter new password
						</Text>
						<PasswordInput
							value={password}
							setValue={onChangePassword}
							errorMessage={passwordError}
						/>
					</View>

					<View>
						<Text style={[styles.inputLabel, { color: theme.text }]}>
							Confirm new password
						</Text>
						<PasswordInput
							value={confirmPassword}
							setValue={onChangeConfirmPassword}
							errorMessage={confirmError}
						/>
					</View>
				</ScrollView>
				<Button
					buttonText="Next"
					onPress={handleSubmit}
					disabled={password !== confirmPassword || !password}
				/>
			</KeyboardAvoidingView>
		</View>
	);
};

export default CreatePasswordScreen;

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
