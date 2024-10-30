import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Image,
	Pressable,
	Platform,
	TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "@/provider/ThemeProvider";
import globalStyles from "@/styles/global.styles";
import { Colors } from "@/constants/Colors";
import { BORDERRADIUS, FONTSIZE, SPACING } from "@/constants/Theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Avatar from "@/components/Avatar";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import TransactionItem from "@/components/TransactionItem";
import TransactionModal from "@/components/modals/TransactionModal";
import { ModalContext } from "@/provider/ModalProvider";

const transactionData: {
	status: "success" | "failed" | "pending";
	amount: string;
	type: string;
	date: string;
}[] = [
	{ status: "success", type: "Debit", amount: "1,000", date: "Today 12:30pm" },
	{
		status: "pending",
		type: "Credit",
		amount: "1,000",
		date: "Today 12:30pm",
	},
	{ status: "failed", type: "Debit", amount: "1,000", date: "Today 12:30pm" },
	{ status: "success", type: "Debit", amount: "1,000", date: "Today 12:30pm" },
	{
		status: "pending",
		type: "Credit",
		amount: "1,000",
		date: "Today 12:30pm",
	},
	{ status: "failed", type: "Debit", amount: "1,000", date: "Today 12:30pm" },
	{ status: "success", type: "Debit", amount: "1,000", date: "Today 12:30pm" },
	{
		status: "pending",
		type: "Credit",
		amount: "1,000",
		date: "Today 12:30pm",
	},
	{ status: "failed", type: "Debit", amount: "1,000", date: "Today 12:30pm" },
];

export default function Home() {
	const { isDarkMode, theme } = useContext(ThemeContext);
	const {
		toggleProfileVisible,
		toggleTransactionModal,
		toggleEmailVerification,
	} = useContext(ModalContext);
	const [balanceVisible, setBalanceVisible] = useState<boolean>(true);

	const widgetsData: { name: string; icon: any }[] = [
		{
			name: "Account",
			icon: () => (
				<MaterialCommunityIcons
					name="bank"
					size={24}
					color="black"
					style={{ zIndex: 3 }}
				/>
			),
		},
		{
			name: "Send",
			icon: () => (
				<FontAwesome5
					name="telegram-plane"
					size={24}
					color="black"
					style={{ zIndex: 3 }}
				/>
			),
		},
		{
			name: "Top-Up",
			icon: () => (
				<Entypo
					name="circle-with-plus"
					size={24}
					color="black"
					style={{ zIndex: 3 }}
				/>
			),
		},
		{
			name: "More",
			icon: () => (
				<Ionicons
					name="grid"
					size={24}
					color="black"
					style={{ zIndex: 3 }}
				/>
			),
		},
	];

	return (
		<SafeAreaView
			style={[
				{
					flex: 1,
					backgroundColor: isDarkMode ? Colors.gray : Colors.white,
					paddingTop: Platform.OS === "android" ? SPACING.space_30 : 0,
				},
			]}
		>
			<StatusBar style={isDarkMode ? "light" : "dark"} />

			<ScrollView
				style={[
					styles.scrollViewContainer,
					{
						backgroundColor: isDarkMode ? Colors.gray : Colors.whiteSmoke,
					},
				]}
				alwaysBounceVertical={false}
				showsVerticalScrollIndicator={false}
				stickyHeaderIndices={[0]}
				contentContainerStyle={{ flex: 0 }}
			>
				<View
					style={[
						styles.stickyHeader,
						{ backgroundColor: theme.background },
					]}
				>
					<View style={styles.stickyHeaderBody}>
						<TouchableOpacity onPress={() => toggleProfileVisible()}>
							<View style={styles.userInfoContainer}>
								<Avatar
									variant="sm"
									imageUrl={require(`@/assets/default-user.png`)}
								/>
								<Text>Hello, Joshua</Text>
								<MaterialIcons
									name="keyboard-arrow-down"
									size={18}
									color="black"
									style={{ marginLeft: 5 }}
								/>
							</View>
						</TouchableOpacity>
						<View style={{ position: "relative" }}>
							<View
								style={{
									position: "absolute",
									width: 8,
									height: 8,
									borderRadius: 50,
									backgroundColor: Colors.orange,
									right: 3,
								}}
							/>
							<MaterialCommunityIcons
								name="bell-outline"
								size={24}
								color={isDarkMode ? Colors.orange : Colors.black}
							/>
						</View>
					</View>
				</View>
				<View
					style={[
						styles.firstSectionContainer,
						{
							backgroundColor: isDarkMode
								? Colors.gray
								: Colors.whiteSmoke,
						},
					]}
				>
					<LinearGradient
						colors={
							isDarkMode
								? [Colors.orangeTint, Colors.orange]
								: ["#3E3E3E", "#1C1C1C"]
						}
						style={styles.card}
					>
						<View style={styles.cardContentWrapper}>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<Image
									source={require(`@/assets/lemu-icon.png`)}
									style={{
										width: 18,
										height: 18,
										resizeMode: "cover",
									}}
								/>

								<Text
									style={{
										fontSize: FONTSIZE.size_12,
										color: isDarkMode ? Colors.black : Colors.white,
										fontFamily: "PoppinsLight",
									}}
								>
									Show Account Details
								</Text>
							</View>

							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<View>
									<Text
										style={{
											color: isDarkMode
												? Colors.black
												: Colors.white,
											fontSize: FONTSIZE.size_10,
											fontFamily: "PoppinsRegular",
										}}
									>
										Orange Balance
									</Text>
									<Text
										style={{
											color: isDarkMode
												? Colors.black
												: Colors.white,
											fontSize: FONTSIZE.size_20,
											fontFamily: "PoppinsSemiBold",
										}}
									>
										<Text>{"\u20A6"}</Text> 3,000
									</Text>
								</View>

								<Pressable>
									{balanceVisible ? (
										<MaterialCommunityIcons
											name="eye"
											size={24}
											color={
												isDarkMode ? Colors.black : Colors.white
											}
										/>
									) : (
										<MaterialCommunityIcons
											name="eye-off"
											size={24}
											color={Colors.orange}
										/>
									)}
								</Pressable>
							</View>
						</View>

						<View style={styles.cardBackgroundImage}>
							<Image
								source={require(`@/assets/card-icons.png`)}
								style={{
									resizeMode: "cover",
									width: "100%",
									height: "100%",
								}}
							/>
						</View>
					</LinearGradient>

					<View style={styles.widgetsContainer}>
						{widgetsData.map((item, idx) => (
							<TouchableOpacity
								key={idx}
								style={styles.navigationButtons}
								onPress={() => {
									if (item.name === "Send") {
										toggleTransactionModal();
									}
								}}
							>
								<View
									style={[
										styles.iconWrapper,
										{
											backgroundColor: isDarkMode
												? Colors.orangeTint
												: Colors.white,
										},
									]}
								>
									{item.icon()}
									<View
										style={{
											width: 15,
											height: 15,
											borderRadius: 50,
											backgroundColor: isDarkMode
												? Colors.orangeTintTwo
												: Colors.orangeTint,

											top: 20,
											left: 25,
											position: "absolute",
											zIndex: 1,
										}}
									/>
								</View>
								<Text
									style={[
										styles.widgetLabel,
										{
											color: isDarkMode
												? Colors.orangeTint
												: Colors.black,
											fontFamily: "PoppinsRegular",
										},
									]}
								>
									{item.name}
								</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>
				<Pressable onPress={() => toggleEmailVerification()}>
					<View
						style={{
							borderTopWidth: 1,
							borderColor: "#34393E40",
							paddingVertical: SPACING.space_20,
							paddingHorizontal: SPACING.space_20,
							backgroundColor: isDarkMode
								? Colors.gray
								: Colors.whiteSmoke,
						}}
					>
						<View style={styles.kycWrapper}>
							<Text style={styles.kycText}>
								Get your flame on with Lemu.
							</Text>
							<Text style={styles.kycText}>
								<Text style={{ color: Colors.orangeTint }}>
									Update your KYC
								</Text>
								information today!.
							</Text>

							<Image
								source={require(`@/assets/kyc.png`)}
								style={{
									width: 135,
									height: 135,
									position: "absolute",
									bottom: -39,
									right: 0,
									resizeMode: "contain",
								}}
							/>
						</View>
					</View>
				</Pressable>
				<View
					style={{
						backgroundColor: isDarkMode ? Colors.gray : Colors.white,
						flex: 1,
					}}
				>
					<View style={styles.trendContainer}>
						<Text
							style={{
								fontFamily: "PoppinsSemiBold",
								// fontWeight: "500",
								fontSize: FONTSIZE.size_14 - 1,
								color: isDarkMode ? Colors.orange : Colors.black,
							}}
						>
							Trending today
						</Text>
						<LinearGradient
							colors={["#F99B6D", "#FF6113"]}
							style={styles.trendItem}
						>
							<Text style={styles.trendHeader}>Orange sure looks</Text>
							<Text style={styles.trendHeader}>good on you!</Text>
							<Text
								style={{
									fontFamily: "PoppinsRegular",
									fontSize: FONTSIZE.size_10 - 2,
									color: Colors.black,
									zIndex: 3,
								}}
							>
								Get cashback on every transaction
							</Text>
							<Image
								source={require(`@/assets/trend-person.png`)}
								style={{
									width: 220,
									height: 200,
									resizeMode: "contain",
									position: "absolute",
									top: -40,
									right: -10,
									zIndex: 2,
								}}
							/>

							<Image
								source={require(`@/assets/trend-pattern.png`)}
								style={{
									width: 230,
									height: 180,
									resizeMode: "contain",
									position: "absolute",
									top: -38,
									right: -40,
								}}
							/>
						</LinearGradient>
					</View>

					<View
						style={{
							backgroundColor: isDarkMode ? Colors.gray : Colors.white,
							flex: 1,
						}}
					>
						{/*Transaction header*/}
						<View
							style={[
								styles.transactionHeader,
								{
									backgroundColor: isDarkMode
										? Colors.orangeTintTwo
										: Colors.whiteSmoke,
								},
							]}
						>
							<Text
								style={{
									fontFamily: "PoppinsSemiBold",
									// fontWeight: "500",
									fontSize: FONTSIZE.size_14 - 1,
									color: isDarkMode ? Colors.orange : Colors.black,
								}}
							>
								Transaction History
							</Text>

							<Pressable style={styles.viewButton}>
								<Text
									style={{
										color: Colors.orange,
										fontFamily: "PoppinsSemiBold",
										fontSize: FONTSIZE.size_10 + 3,
									}}
								>
									View all
								</Text>
								<MaterialIcons
									name="keyboard-arrow-right"
									size={20}
									color={Colors.orange}
								/>
							</Pressable>
						</View>
						<View style={styles.transactionContainer}>
							{transactionData.map((transaction, index) => (
								<TransactionItem key={index} {...transaction} />
							))}
						</View>
					</View>
				</View>
			</ScrollView>
			<TransactionModal />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	scrollViewContainer: {
		flex: 1,
	},
	stickyHeader: {
		minHeight: 80,
		height: 80,
		borderBottomLeftRadius: BORDERRADIUS.radius_20,
		borderBottomRightRadius: BORDERRADIUS.radius_20,
		paddingHorizontal: SPACING.space_20,
	},
	stickyHeaderBody: {
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
		height: "100%",
	},

	userInfoContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.whiteSmoke,
		paddingHorizontal: SPACING.space_10,
		paddingVertical: SPACING.space_10 - 5,
		gap: SPACING.space_10,
		borderRadius: 200,
	},

	firstSectionContainer: {
		paddingVertical: SPACING.space_30,
		paddingHorizontal: SPACING.space_20,
		gap: SPACING.space_30,
		backgroundColor: Colors.whiteSmoke,
	},
	card: {
		minHeight: 150,
		maxHeight: Platform.OS === "ios" ? 170 : 160,
		borderRadius: BORDERRADIUS.radius_20,
		overflow: "hidden",
		position: "relative",
	},
	cardBackgroundImage: {
		position: "absolute",
		bottom: 0,
		right: 0,
		width: 400,
		height: "100%",
		opacity: 0.05,
	},
	cardContentWrapper: {
		position: "relative",
		padding: SPACING.space_18,
		height: "100%",
		width: "100%",
		justifyContent: "space-between",
	},

	widgetsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},

	navigationButtons: {
		alignItems: "center",
		justifyContent: "center",
		gap: SPACING.space_10 - 5,
	},
	iconWrapper: {
		width: 54,
		height: 54,
		borderRadius: 50,
		position: "relative",
		backgroundColor: Colors.white,
		alignItems: "center",
		justifyContent: "center",
		zIndex: 2,
	},
	widgetLabel: {
		fontFamily: "PoppinsLight",
		fontSize: FONTSIZE.size_12,
		color: Colors.gunMetal,
	},
	kycWrapper: {
		backgroundColor: Colors.blue,
		paddingHorizontal: SPACING.space_20,
		paddingVertical: SPACING.space_15,
		position: "relative",
		overflow: "hidden",
		width: "100%",
		borderRadius: BORDERRADIUS.radius_10,
		flex: 1,
	},
	kycText: {
		textAlign: "left",
		fontSize: FONTSIZE.size_12,
		color: Colors.white,
		lineHeight: 18,
		fontFamily: "PoppinsSemiBold",
		// paddingHorizontal: SPACING.space_10,
	},
	trendContainer: {
		// backgroundColor: Colors.white,
		paddingHorizontal: SPACING.space_20,
		paddingVertical: SPACING.space_20,
		gap: SPACING.space_10,
	},
	trendItem: {
		paddingHorizontal: SPACING.space_20,
		paddingVertical: SPACING.space_20,
		minHeight: 109,
		borderRadius: BORDERRADIUS.radius_10,
		overflow: "hidden",
		justifyContent: "center",
		position: "relative",
	},
	trendHeader: {
		fontSize: FONTSIZE.size_20,
		color: Colors.black,
		lineHeight: 22,
		fontFamily: "PoppinsSemiBold",
		zIndex: 3,
	},
	transactionHeader: {
		paddingVertical: SPACING.space_10,
		paddingHorizontal: SPACING.space_20,
		backgroundColor: Colors.whiteSmoke,
		borderTopRightRadius: BORDERRADIUS.radius_20,
		borderTopLeftRadius: BORDERRADIUS.radius_20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	viewButton: {
		flexDirection: "row",
		alignItems: "center",
	},
	transactionContainer: {
		paddingBottom: SPACING.space_10,
		paddingHorizontal: SPACING.space_20,
		flex: 1,
		paddingTop: SPACING.space_10 - 5,
	},
});
