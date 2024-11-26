import {
	View,
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from "react-native";
import React, { Dispatch, FC, SetStateAction, useContext } from "react";
import { SCREEN_WIDTH, statusBarHeight, windowWidth } from "@/constants";
import Button from "@/components/Button";
import { ThemeContext } from "@/provider/ThemeProvider";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import { StyleSheet } from "react-native";
import VerificationPageHeader from "@/components/VerificationPageHeader";
import Input from "@/components/inputs/Input";

interface PageProps {
	next: () => void;
	bvnNumber: string;
	onChangeBvnNumber: Dispatch<SetStateAction<string>>;
	isLoading: boolean;
}

const BvnScreen: FC<PageProps> = ({
	next,
	bvnNumber,
	onChangeBvnNumber,
	isLoading,
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
					justifyContent: "flex-end",
					alignItems: "center",
				}}
			>
				{/* <TouchableOpacity onPress={() => router.back()}>
					<Ionicons
						name="arrow-back-outline"
						size={30}
						color={theme.text}
					/>
				</TouchableOpacity> */}

				<Text
					style={{
						color: theme.text,
						fontFamily: "PoppinsLight",
						fontSize: FONTSIZE.size_20,
					}}
				>
					<Text style={{ fontFamily: "PoppinsSemiBold" }}>Step 1/</Text>6
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
						header="Bank Verification Number (BVN)"
						subHeader="To verify your account enter your BVN"
					/>
					<Input
						value={bvnNumber}
						setValue={onChangeBvnNumber}
						placeholder="Enter your BVN"
						keyboardType="number-pad"
						maxLength={11}
					/>
				</ScrollView>

				<Button
					buttonText="Continue"
					onPress={next}
					disabled={bvnNumber.length < 11 || isLoading}
					isLoading={isLoading}
				/>
			</KeyboardAvoidingView>
		</View>
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
