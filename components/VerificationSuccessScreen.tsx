import {
	View,
	Text,
	Image,
	Platform,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BORDERRADIUS, FONTSIZE, SPACING } from "@/constants/Theme";
import Constants from "expo-constants";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function VerificationSuccess() {
	const statusHeight =
		Platform.OS === "android" ? Constants.statusBarHeight : 50;
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: Colors.gunMetal,
				position: "absolute",
				overflow: "hidden",
				zIndex: 100,
				left: 0,
				right: 0,
				bottom: 0,
				top: 0,
			}}
		>
			<View
				style={[
					{
						flex: 1,
						position: "relative",
						paddingTop:
							Platform.OS === "ios"
								? statusHeight + 20
								: statusHeight + 60,
						paddingBottom: statusHeight - 10,
						paddingHorizontal: SPACING.space_20,
						zIndex: 2,
					},
				]}
			>
				<View style={{ flex: 1 }}>
					<Text
						style={{
							fontFamily: "PoppinsSemiBold",
							fontSize: 24,
							color: Colors.white,
						}}
					>
						Verification Successful
					</Text>
					<Text
						style={{
							fontFamily: "PoppinsLight",
							fontSize: 11,
							color: Colors.white,
						}}
					>
						Upgrade your Lemu account to enjoy more benefits
					</Text>
					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{
							paddingVertical: SPACING.space_20,
							gap: SPACING.space_30 + 10,
						}}
					>
						<View style={styles.accountOne}>
							<View style={styles.topAccountInfo}>
								<View style={styles.userAccountWrapper}>
									<View style={styles.userAccountInfo}>
										<Text style={styles.infoTitle}>
											Account Number
										</Text>
										<Text style={styles.userHeader}>0987654321</Text>
									</View>

									<TouchableOpacity
										style={[
											styles.cardButton,
											{ borderColor: Colors.success },
										]}
									>
										<Text
											style={[
												styles.buttonText,
												{ color: Colors.success },
											]}
										>
											Approved
										</Text>
									</TouchableOpacity>
								</View>
								<View style={styles.userAccountInfo}>
									<Text style={styles.infoTitle}>Account Name</Text>
									<Text style={styles.userHeader}>Joshua Magani</Text>
								</View>
							</View>
							<View style={styles.bottomAccountInfo}>
								<View style={styles.infoItem}>
									<Text style={styles.infoTitle}>
										Daily Transaction Limit
									</Text>
									<Text style={styles.infoValue}>N50,000</Text>
								</View>
								<View style={styles.infoItem}>
									<Text style={styles.infoTitle}>
										Single Transaction Limit
									</Text>
									<Text style={styles.infoValue}>N50,000</Text>
								</View>
								<View style={styles.infoItem}>
									<Text style={styles.infoTitle}>Maximum Balance</Text>
									<Text style={styles.infoValue}>N50,000</Text>
								</View>
							</View>
						</View>
						<View style={styles.accountTwo}>
							<View
								style={{
									paddingTop: SPACING.space_20,
									paddingBottom: SPACING.space_10,
									paddingHorizontal: SPACING.space_10,
								}}
							>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "space-between",
									}}
								>
									<Text
										style={[
											styles.userHeader,
											{ fontFamily: "PoppinsSemiBold" },
										]}
									>
										Upgrade to premium
									</Text>
									<TouchableOpacity
										style={[
											styles.cardButton,
											{ borderColor: Colors.pending },
										]}
									>
										<Text
											style={[
												styles.buttonText,
												{ color: Colors.pending },
											]}
										>
											Upgrade
										</Text>
									</TouchableOpacity>
								</View>
								<View style={styles.premiumAccountInfo}>
									<View style={styles.infoItem}>
										<Text style={styles.infoTitle}>
											Daily Transaction Limit
										</Text>
										<Text style={styles.infoValue}>N500,000</Text>
									</View>
									<View style={styles.infoItem}>
										<Text style={styles.infoTitle}>
											Single Transaction Limit
										</Text>
										<Text style={styles.infoValue}>N100,000</Text>
									</View>
									<View style={styles.infoItem}>
										<Text style={styles.infoTitle}>
											Maximum Balance
										</Text>
										<Text style={styles.infoValue}>N500,000</Text>
									</View>
								</View>
							</View>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
									height: 67,
									backgroundColor: Colors.gunMetal,
									borderBottomLeftRadius: BORDERRADIUS.radius_10 - 1,
									borderBottomRightRadius: BORDERRADIUS.radius_10 - 1,
									paddingHorizontal: SPACING.space_10,
								}}
							>
								<Text
									style={{
										fontSize: FONTSIZE.size_14,
										color: "#fff",
										fontFamily: "PoppinsSemiBold",
									}}
								>
									Become a Premium User
								</Text>
								<MaterialIcons
									name="keyboard-arrow-right"
									size={24}
									color="white"
								/>
							</View>
						</View>
					</ScrollView>
				</View>
				<TouchableOpacity
					style={{
						backgroundColor: Colors.black,
						alignItems: "center",
						justifyContent: "center",
						height: 52,
						borderRadius: BORDERRADIUS.radius_15,
					}}
					onPress={() => router.push("/(tabs)/home")}
				>
					<Text
						style={{
							fontFamily: "PoppinsSemiBold",
							fontSize: 14,
							color: Colors.white,
							textAlign: "center",
						}}
					>
						Skip for now
					</Text>
				</TouchableOpacity>
			</View>
			<View
				style={{
					position: "absolute",
					bottom: 0,
					left: 0,
					width: wp("100%"),
					height: hp("100%") / 1.5,
				}}
			>
				<Image
					source={require(`@/assets/success-bg.png`)}
					style={{
						resizeMode: "cover",
						width: "100%",
						height: "100%",
						zIndex: -1,
					}}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	accountOne: {
		borderWidth: 1,
		borderColor: Colors.success,
		padding: SPACING.space_10,
		backgroundColor: Colors.white,
		borderRadius: BORDERRADIUS.radius_10 - 1,
	},
	topAccountInfo: {
		paddingVertical: SPACING.space_8,
		gap: 10,
	},
	bottomAccountInfo: {
		paddingVertical: SPACING.space_8,
		borderTopWidth: 1,
		borderColor: Colors.whiteSmoke,
		gap: 8,
	},
	infoItem: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	infoValue: {
		fontFamily: "PoppinsSemiBold",
		fontSize: 11,
		color: Colors.black,
	},
	infoTitle: {
		fontFamily: "PoppinsLight",
		fontSize: 11,
		color: Colors.black,
	},
	userAccountWrapper: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	userAccountInfo: {
		gap: 3,
	},
	userHeader: {
		fontFamily: "PoppinsMedium",
		fontSize: 16,
		color: Colors.black,
		paddingRight: 10,
	},
	cardButton: {
		borderWidth: 1,
		borderRadius: BORDERRADIUS.radius_25,
		paddingHorizontal: SPACING.space_20,

		paddingVertical: SPACING.space_8,
	},
	buttonText: {
		fontFamily: "PoppinsSemiBold",
		fontSize: 11,

		textAlign: "center",
	},

	accountTwo: {
		borderWidth: 1,
		borderColor: Colors.pending,
		// padding: SPACING.space_10,
		backgroundColor: Colors.white,
		borderRadius: BORDERRADIUS.radius_10 - 1,
		overflow: "hidden",
	},
	premiumAccountInfo: {
		paddingVertical: SPACING.space_8,

		gap: 8,
	},
});
