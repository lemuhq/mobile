import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Platform,
	StyleSheet,
	Image,
} from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { clearCurrentUser, selectUser } from "@/redux/slice/user.slice";
import { storage } from "@/utils/storage";
import { router } from "expo-router";
import { clearAuthCache, useGetCurrentUserQuery } from "@/redux/services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

import { Colors } from "@/constants/Colors";
import Constants from "expo-constants";
import { SPACING } from "@/constants/Theme";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import { formatNumberWithCommas } from "@/helpers/formatter";

export default function Profile() {
	const { data, isLoading } = useGetCurrentUserQuery();

	const statusHeight =
		Platform.OS === "android" ? Constants.statusBarHeight + 30 : 70;

	const { handleCopyText } = useCopyToClipboard();

	const ACTIONS_ICON = {
		WALLET: <MaterialCommunityIcons name="wallet" size={20} color="black" />,
		BELL: (
			<MaterialCommunityIcons name="bell-outline" size={20} color="black" />
		),
		SECURITY: <MaterialIcons name="security" size={20} color="black" />,
		INFO: (
			<MaterialCommunityIcons name="shield-alert" size={20} color="black" />
		),
		TERMS: <MaterialIcons name="edit-note" size={20} color="black" />,
		HELP: (
			<MaterialCommunityIcons name="chat-question" size={20} color="black" />
		),
		LOGOUT: <MaterialIcons name="logout" size={20} color="#FF2C2C" />,
		DELETE: (
			<MaterialCommunityIcons name="delete" size={20} color="#FF2C2C" />
		),
	};
	return (
		<View
			style={[
				styles.container,
				{ paddingTop: statusHeight, paddingBottom: statusHeight - 60 },
			]}
		>
			<View style={styles.userContainer}>
				<TouchableOpacity onPress={() => router.back()}>
					<MaterialIcons
						name="keyboard-arrow-left"
						size={36}
						color="black"
					/>
				</TouchableOpacity>

				<View style={{ justifyContent: "center", alignItems: "center" }}>
					<View
						style={{
							height: Platform.OS === "ios" ? hp("10%") : hp("11%"),
							width: wp("23%"),
							borderRadius: wp("100%"),

							marginBottom: SPACING.space_10,
							overflow: "hidden",
						}}
					>
						<Image
							source={require("@/assets/default-user.png")}
							// source={{ uri: data?.image }}
							style={{
								width: "100%",
								height: "100%",
								backgroundColor: Colors.whiteSmoke,
								borderRadius: wp("100%"),
								objectFit: "cover",
							}}
						/>
					</View>
					<Text style={styles.userFullname}>
						{data?.firstName + " " + data?.lastName}
					</Text>
					<TouchableOpacity
						onPress={() => handleCopyText(data?.accountNumber!)}
					>
						<Text style={styles.userAccountNumber}>
							{data?.accountNumber}
						</Text>
					</TouchableOpacity>
				</View>

				<TouchableOpacity onPress={() => router.back()}>
					<MaterialCommunityIcons
						name="pencil-outline"
						size={24}
						color="black"
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.userActionWrapper}>
				<View style={styles.actionRow}>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: SPACING.space_10,
						}}
					>
						<View
							style={[
								styles.iconWrapper,
								{ backgroundColor: Colors.orangeTint },
							]}
						>
							{ACTIONS_ICON["WALLET"]}
						</View>
						<Text style={styles.actionText}>Wallet</Text>
					</View>
					<Text
						style={{
							fontSize: wp("4%"),
							fontFamily: "PoppinsSemiBold",
							color: Colors.black,
						}}
					>
						{"\u20A6"}
						{formatNumberWithCommas(data?.accountBalance!)}
					</Text>
				</View>
				<View style={styles.actionRow}>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: SPACING.space_10,
						}}
					>
						<View
							style={[
								styles.iconWrapper,
								{ backgroundColor: Colors.orangeTint },
							]}
						>
							{ACTIONS_ICON["BELL"]}
						</View>
						<Text style={styles.actionText}>Notifications</Text>
					</View>
				</View>
				<View style={styles.actionRow}>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: SPACING.space_10,
						}}
					>
						<View
							style={[
								styles.iconWrapper,
								{ backgroundColor: Colors.orangeTint },
							]}
						>
							{ACTIONS_ICON["SECURITY"]}
						</View>
						<Text style={styles.actionText}>Account Security</Text>
					</View>
				</View>

				<View style={styles.actionRow}>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: SPACING.space_10,
						}}
					>
						<View
							style={[
								styles.iconWrapper,
								{ backgroundColor: Colors.orangeTint },
							]}
						>
							{ACTIONS_ICON["INFO"]}
						</View>
						<Text style={styles.actionText}>Privacy Policy</Text>
					</View>
				</View>

				<View style={styles.actionRow}>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: SPACING.space_10,
						}}
					>
						<View
							style={[
								styles.iconWrapper,
								{ backgroundColor: Colors.orangeTint },
							]}
						>
							{ACTIONS_ICON["TERMS"]}
						</View>
						<Text style={styles.actionText}>Terms of use</Text>
					</View>
				</View>
				<View style={styles.actionRow}>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: SPACING.space_10,
						}}
					>
						<View
							style={[
								styles.iconWrapper,
								{ backgroundColor: Colors.orangeTint },
							]}
						>
							{ACTIONS_ICON["HELP"]}
						</View>
						<Text style={styles.actionText}>Get Help</Text>
					</View>
				</View>

				<View style={styles.actionRow}>
					<TouchableOpacity
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: SPACING.space_10,
						}}
						onPress={async () => {
							await AsyncStorage.clear();
							await SecureStore.deleteItemAsync("token");
							await SecureStore.deleteItemAsync("refreshToken");
							router.navigate("/login");
						}}
					>
						<View style={[styles.iconWrapper]}>
							{ACTIONS_ICON["LOGOUT"]}
						</View>
						<Text style={[styles.actionText, { color: "#FF2C2C" }]}>
							Logout
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.actionRow}>
					<TouchableOpacity
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: SPACING.space_10,
						}}
					>
						<View style={[styles.iconWrapper]}>
							{ACTIONS_ICON["DELETE"]}
						</View>
						<Text style={[styles.actionText, { color: "#FF2C2C" }]}>
							Delete Account
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white,
		flex: 1,
		// paddingHorizontal: SPACING.space_10,
	},
	userContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		// paddingVertical: SPACING.space_10,
		paddingHorizontal: SPACING.space_20,
		paddingBottom: 15,
		borderBottomWidth: 1,
		borderColor: "#999999",
	},
	userFullname: {
		fontSize: wp("5%"),
		fontFamily: "PoppinsSemiBold",
		textAlign: "center",
	},
	userAccountNumber: {
		textAlign: "center",
		fontSize: wp("3.5%"),
		fontFamily: "PoppinsLight",
		color: Colors.gray,
		marginTop: SPACING.space_4,
	},
	userActionWrapper: {
		flex: 1,
		paddingHorizontal: SPACING.space_20,
		paddingTop: SPACING.space_20,
		gap: hp("1.2%"),
	},
	actionRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: SPACING.space_10,
		alignItems: "center",
	},
	iconWrapper: {
		width: 24,
		height: 24,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5,
	},
	actionText: {
		fontSize: 14,
		fontFamily: "PoppinsLight",
		color: Colors.black,
	},
});
