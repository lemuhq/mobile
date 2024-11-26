import Button from "@/components/Button";
import PasswordInput from "@/components/inputs/PasswordInput";
import VerificationPageHeader from "@/components/VerificationPageHeader";
import { fontSizes, SCREEN_WIDTH, statusBarHeight } from "@/constants";
import { SPACING } from "@/constants/Theme";
import { ThemeContext } from "@/provider/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
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

interface PageProps {
	password: string;
	confirmPassword: string;
	onChangePassword: Dispatch<SetStateAction<string>>;
	onChangeConfirmPassword: Dispatch<SetStateAction<string>>;
	next: () => void;
	prev: () => void;
}

const CreatePasswordScreen: FC<PageProps> = ({
	next,
	prev,
	password,
	confirmPassword,
	onChangeConfirmPassword,
	onChangePassword,
}) => {
	const { theme } = useContext(ThemeContext);
	const KEYBOARD_VERTICAL_OFFSET = Platform.OS === "android" ? 10 : 20;

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
					<Text style={{ fontFamily: "PoppinsSemiBold" }}>Step 4/</Text>6
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
					onPress={next}
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
