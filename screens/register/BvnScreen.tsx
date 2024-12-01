import { View, Text } from "react-native";
import React, { useContext } from "react";
import Button from "@/components/Button";
import { ThemeContext } from "@/provider/ThemeProvider";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import { StyleSheet } from "react-native";
import VerificationPageHeader from "@/components/VerificationPageHeader";
import Input from "@/components/inputs/Input";
import KeyboardAvoidingViewContainer from "@/components/KeyboardAvoidingViewContainer";
import { StatusBar } from "expo-status-bar";
import { useInitiateBvnVerficationMutation } from "@/redux/services/auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setFirstTimeOnboardingData } from "@/redux/slice/onboarding.slice";
import { router } from "expo-router";
import useToast from "@/hooks/useToast";

const BvnScreen = () => {
	const { theme, isDarkMode } = useContext(ThemeContext);
	const { showCustomToast } = useToast();

	//Redux
	const dispatch = useDispatch();
	const { firstTimeUser, secondTimeUser } = useSelector(
		(state: RootState) => state.onboarding
	);

	const [bvnNumber, onChangeBvnNumber] = React.useState(
		firstTimeUser?.bvnNumber ?? ""
	);

	const [initiateBvnVerfication, { isLoading }] =
		useInitiateBvnVerficationMutation();

	const handleBvnSubmit = async () => {
		try {
			const payload = {
				bvnNumber: bvnNumber,
				phoneNumber: firstTimeUser?.phoneNumber,
			};
			console.log("🚀 ~ handleBvnSubmit ~ payload:", payload);

			const response = await initiateBvnVerfication(payload);
			console.log("🚀 ~ handleBvnSubmit ~ response:", response);

			const newUserData = {
				...firstTimeUser,
				identityId: response.data.identityId,
				bvn: bvnNumber,
			};
			dispatch(setFirstTimeOnboardingData({ ...newUserData }));
			router.navigate("/register/verification/verifyBvn");
			return;
		} catch (error) {
			showCustomToast("error", "Invalid BVN number");
		}
	};

	return (
		<KeyboardAvoidingViewContainer>
			<StatusBar style={isDarkMode ? "light" : "dark"} />
			<View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "flex-end",
						alignItems: "center",
					}}
				>
					<Text
						style={{
							color: theme.text,
							fontFamily: "PoppinsLight",
							fontSize: FONTSIZE.size_20,
						}}
					>
						<Text style={{ fontFamily: "PoppinsSemiBold" }}>Step 1/</Text>
						6
					</Text>
				</View>
				<VerificationPageHeader
					header="Bank Verification Number (BVN)"
					subHeader="To verify your account enter your BVN"
				/>
				<View style={{ marginTop: SPACING.space_20 }}>
					<Input
						value={bvnNumber}
						setValue={onChangeBvnNumber}
						placeholder="Enter your BVN"
						keyboardType="number-pad"
						maxLength={11}
					/>
				</View>
			</View>

			<Button
				buttonText="Continue"
				onPress={handleBvnSubmit}
				disabled={bvnNumber.length < 11}
				isLoading={isLoading}
			/>
		</KeyboardAvoidingViewContainer>
	);
};

export default BvnScreen;

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
