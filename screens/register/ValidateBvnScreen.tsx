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
import { ScrollView } from "react-native";
import VerificationPageHeader from "@/components/VerificationPageHeader";
import OtpInput from "@/components/inputs/OtpInput";

const ValidateBvnScreen: FC<{
	next: () => void;
	prev: () => void;
	otpValue: string;
	onChangeOtp: Dispatch<SetStateAction<string>>;
	isLoading: boolean;
}> = ({ next, prev, otpValue, onChangeOtp, isLoading }) => {
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
					<Text style={{ fontFamily: "PoppinsSemiBold" }}>Step 2/</Text>6
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
						header="Confirm BVN"
						subHeader="Enter OTP code sent to the number assigned to your BVN"
					/>

					<View style={{ flex: 1 }}>
						<OtpInput otpVal={otpValue} setOtpVal={onChangeOtp} />
					</View>
				</ScrollView>
				<Button
					buttonText="Next"
					onPress={next}
					disabled={otpValue.length !== 4 || isLoading}
					isLoading={isLoading}
				/>
			</KeyboardAvoidingView>
		</View>
	);
};

export default ValidateBvnScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		justifyContent: "space-between",
	},
	content: {
		flex: 1,
	},
});
