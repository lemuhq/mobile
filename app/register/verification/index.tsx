import PageHeader from "@/components/PageHeader";
import { Colors } from "@/constants/Colors";
import { BORDERRADIUS, FONTSIZE, SPACING } from "@/constants/Theme";
import { ThemeContext } from "@/provider/ThemeProvider";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import {
	Image,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function Verification() {
	const { phoneNumber }: { phoneNumber: string } = useLocalSearchParams();
	const { isDarkMode, theme } = useContext(ThemeContext);
	const [selectedSlug, setSelectedSlug] = useState<string>("");
	const data = [
		{
			header: "BVN (Bank Verification Number)",
			subHeader:
				"Verify your account with your National Identification Number to get started.",
			slug: "bvn",
		},
	];
	return (
		<SafeAreaView
			style={[
				{
					flex: 1,
					backgroundColor: theme.background,
					paddingTop: Platform.OS === "android" ? SPACING.space_30 : 0,
					paddingBottom: Platform.OS === "android" ? SPACING.space_10 : 0,
				},
			]}
		>
			<StatusBar style={isDarkMode ? "light" : "dark"} />
			<View
				style={{
					paddingTop: SPACING.space_10,
					paddingHorizontal: SPACING.space_20,
					flex: 1,
				}}
			>
				<PageHeader
					header="Identy Verfication"
					subHeader="We need this information to upgrade your account and to legally verify who you are."
				/>
				<ScrollView
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{
						flex: 1,
						gap: SPACING.space_20,
						marginTop: SPACING.space_20,
					}}
				>
					{data?.map((item, index) => (
						<TouchableOpacity
							key={item.slug}
							onPress={() => {
								setSelectedSlug(item.slug);
								setTimeout(() => {
									router.push(
										`/register/verification/bvn?phoneNumber=${phoneNumber}`
									);
								}, 2000);
							}}
						>
							<View
								style={[
									styles.card,
									{
										borderColor:
											selectedSlug === item.slug
												? Colors.orangeTintTwo
												: Colors.whiteSmoke,
									},
								]}
							>
								<View style={styles.logoContainer}>
									{item.slug === "nin" && (
										<Image
											source={require(`@/assets/nin-logo.png`)}
											style={styles.logo}
										/>
									)}
									{item.slug === "bvn" && (
										<MaterialCommunityIcons
											name="bank"
											size={24}
											color={
												isDarkMode ? Colors.orange : Colors.black
											}
										/>
									)}
									{item.slug === "passport" && (
										<FontAwesome5
											name="user"
											size={24}
											color={
												isDarkMode ? Colors.orange : Colors.black
											}
										/>
									)}
								</View>
								<Text
									style={[
										styles.headerText,
										{ color: theme.pageTextColor },
									]}
								>
									{item.header}
								</Text>
								<Text
									style={[styles.subHeaderText, { color: theme.text }]}
								>
									{item.subHeader}
								</Text>
							</View>
						</TouchableOpacity>
					))}
				</ScrollView>

				{/* <View
					style={{
						flex: 1,
						marginTop: SPACING.space_20 * 2,
					}}
				>
					
				</View> */}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	card: {
		height: 160,
		borderWidth: 1,
		borderRadius: BORDERRADIUS.radius_10,
		width: "100%",
		paddingHorizontal: SPACING.space_12,
		paddingVertical: SPACING.space_16,
		gap: SPACING.space_10,
	},
	logoContainer: {
		width: 51,
		height: 51,
		borderRadius: BORDERRADIUS.radius_25 + BORDERRADIUS.radius_25,
		padding: 1,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: Colors.whiteSmoke,
		overflow: "hidden",
		backgroundColor: "white",
	},
	logo: {
		resizeMode: "contain",
		width: 45,
		height: 45,
		overflow: "hidden",
	},
	headerText: {
		fontSize: FONTSIZE.size_14,
		fontFamily: "PoppinsSemiBold",
	},
	subHeaderText: {
		fontSize: FONTSIZE.size_12 - 1,
		fontFamily: "PoppinsLight",
	},
});
