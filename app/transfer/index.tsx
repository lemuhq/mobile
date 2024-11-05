import {
	View,
	Text,
	Platform,
	StyleSheet,
	TouchableOpacity,
	KeyboardAvoidingView,
	ScrollView,
} from "react-native";
import React, { useContext } from "react";
import Constants from "expo-constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "@/provider/ThemeProvider";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router } from "expo-router";

export default function TransferPage() {
	const statusHeight =
		Platform.OS === "android" ? Constants.statusBarHeight + 5 : 60;

	const { isDarkMode, theme } = useContext(ThemeContext);
	return (
		<View
			style={[
				styles.container,
				{
					paddingTop: statusHeight,
					paddingBottom: statusHeight - 40,
					backgroundColor: theme.background,
				},
			]}
		>
			<StatusBar style={isDarkMode ? "light" : "dark"} />
			<View style={{ flex: 1 }}>
				<View style={styles.headerWrapper}>
					<TouchableOpacity onPress={() => router.back()}>
						<MaterialIcons
							name="keyboard-arrow-left"
							size={36}
							color="black"
						/>
					</TouchableOpacity>
					<Text style={styles.pageHeader}>Transfer to Bank Account</Text>
				</View>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
					style={{ flex: 1 }}
				>
					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{
							paddingBottom: SPACING.space_20,
							flex: 1,
						}}
					></ScrollView>
				</KeyboardAvoidingView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: SPACING.space_10,
	},
	headerWrapper: {
		flexDirection: "row",
		alignItems: "center",
	},
	pageHeader: {
		fontSize: wp("6%"),
		fontFamily: "PoppinsSemiBold",
		color: "black",
		// marginLeft: SPACING.space_10,
	},
});
