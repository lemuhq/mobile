import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Image,
	Pressable,
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

export default function Home() {
	const { isDarkMode, theme } = useContext(ThemeContext);
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
				},
				globalStyles.safeAreaViewStyles,
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
				stickyHeaderHiddenOnScroll={false}
				stickyHeaderIndices={[0]}
			>
				<View
					style={[
						styles.stickyHeader,
						{ backgroundColor: theme.background },
					]}
				>
					<View style={styles.stickyHeaderBody}>
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
								color="black"
							/>
						</View>
					</View>
				</View>

				<View style={styles.firstSectionContainer}>
					{/*Card container*/}
					<LinearGradient
						colors={["#3E3E3E", "#1C1C1C"]}
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
										color: Colors.white,
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
											color: Colors.white,
											fontSize: FONTSIZE.size_10,
											fontFamily: "PoppinsRegular",
										}}
									>
										Orange Balance
									</Text>
									<Text
										style={{
											color: Colors.white,
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
											color={Colors.orange}
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
					{/*NAVIGATION BUTTONS*/}
					<View style={styles.widgetsContainer}>
						{widgetsData.map((item, idx) => (
							<View key={idx} style={styles.navigationButtons}>
								<View style={styles.iconWrapper}>
									{item.icon()}
									<View
										style={{
											width: 15,
											height: 15,
											borderRadius: 50,
											backgroundColor: Colors.orangeTint,

											top: 20,
											left: 25,
											position: "absolute",
											zIndex: 1,
										}}
									/>
								</View>
								<Text style={styles.widgetLabel}>{item.name}</Text>
							</View>
						))}
					</View>
					{/*KYC VIEW*/}
					<View>
						<Text>Kyc view </Text>
					</View>
				</View>
			</ScrollView>
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
	},
	card: {
		height: 180,
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
		padding: SPACING.space_20,
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
});
