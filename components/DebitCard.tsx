import {
	View,
	Text,
	Image,
	StyleSheet,
	Platform,
	TouchableOpacity,
} from "react-native";
import React, { FC, useContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeContext } from "@/provider/ThemeProvider";
import { Colors } from "@/constants/Colors";
import { BORDERRADIUS, FONTSIZE, SPACING } from "@/constants/Theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { formatNumberWithCommas } from "@/helpers/formatter";
import { User } from "@/types/user";
import { Skeleton } from "moti/skeleton";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface CardProps {
	isLoading: boolean;
	currentUser: User;
}

const DebitCard: FC<CardProps> = ({ isLoading, currentUser }) => {
	const { isDarkMode, theme } = useContext(ThemeContext);
	const colorMode: "light" | "dark" = isDarkMode ? "dark" : "light";

	const [balanceVisible, setBalanceVisible] = useState<boolean>(true);

	if (isLoading) {
		return (
			<Skeleton
				width={"100%"}
				height={hp("18%")}
				colorMode={colorMode}
			></Skeleton>
		);
	}
	return (
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
								color: isDarkMode ? Colors.black : Colors.white,
								fontSize: FONTSIZE.size_10,
								fontFamily: "PoppinsRegular",
								marginBottom: 5,
							}}
						>
							Orange Balance
						</Text>
						<Text
							style={{
								color: isDarkMode ? Colors.black : Colors.white,
								fontSize: FONTSIZE.size_20,
								fontFamily: "PoppinsSemiBold",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Text>{"\u20A6"}</Text>{" "}
							<Text>
								{balanceVisible
									? formatNumberWithCommas(currentUser?.accountBalance)
									: "****"}
							</Text>
						</Text>
					</View>

					<TouchableOpacity
						onPress={() => {
							console.log("Clicked me");
							setBalanceVisible(!balanceVisible);
						}}
						style={{
							width: 40,
							height: 40,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						{balanceVisible ? (
							<MaterialCommunityIcons
								name="eye"
								size={24}
								color={isDarkMode ? Colors.black : Colors.white}
							/>
						) : (
							<MaterialCommunityIcons
								name="eye-off"
								size={24}
								color={isDarkMode ? Colors.black : Colors.white}
							/>
						)}
					</TouchableOpacity>
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
	);
};

export default DebitCard;

const styles = StyleSheet.create({
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
});
