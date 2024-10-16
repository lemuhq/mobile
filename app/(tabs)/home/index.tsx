import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Image,
} from "react-native";
import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "@/provider/ThemeProvider";
import globalStyles from "@/styles/global.styles";
import { Colors } from "@/constants/Colors";
import { BORDERRADIUS, SPACING } from "@/constants/Theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Avatar from "@/components/Avatar";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
	const { isDarkMode, theme } = useContext(ThemeContext);
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
				<View style={styles.cardContainer}>
					<LinearGradient
						colors={["#3E3E3E", "#1C1C1C"]}
						style={styles.card}
					>
						<View style={styles.cardContentWrapper}>
							<Text>Card</Text>
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
					<View>
						<Text>Buttons</Text>
					</View>
					<View>
						<Text>Kyc</Text>
					</View>
				</View>
				{/* <View
					style={{
						flex: 1,
						minHeight: 300,
						backgroundColor: Colors.silver,
					}}
				>
					<Text>Navbar</Text>
				</View> */}
				{/* <View
					style={{
						flex: 1,
						minHeight: 300,
						backgroundColor: Colors.gray,
					}}
				>
					<Text>Navbar</Text>
				</View> */}
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

	cardContainer: {
		paddingVertical: SPACING.space_30,
		paddingHorizontal: SPACING.space_20,
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
		opacity: 0.1,
	},
	cardContentWrapper: {
		position: "relative",
		padding: SPACING.space_10,
		height: "100%",
		width: "100%",
	},
});
