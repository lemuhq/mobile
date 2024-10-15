import {
	View,
	Text,
	StyleSheet,
	useWindowDimensions,
	Image,
	Platform,
} from "react-native";
import React, { useContext } from "react";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/provider/ThemeProvider";
import { FONTSIZE, SPACING } from "@/constants/Theme";

export default function OnboardingItem({
	item,
	index,
}: {
	item: {
		header: string;
		subHeader: string;
		image: any;
	};
	index: number;
}) {
	const { width, height } = useWindowDimensions();

	const { theme } = useContext(ThemeContext);
	return (
		<View style={[styles.container, { width }]}>
			<View style={styles.contentContainer}>
				<Text style={[styles.header, { color: Colors.black }]}>
					{item.header}
				</Text>
				<Text style={[styles.subHeader, { color: theme.black }]}>
					{item.subHeader}
				</Text>
			</View>
			{index === 0 && (
				<View
					style={{
						position: "absolute",
						left: -50,
						top: 120,
						width: width * 1.16,
						height: height / 1.2,
						zIndex: 1,
						transform: [{ scale: index === 0 ? 0.8 : 1 }],
					}}
				>
					<Image
						source={item.image}
						style={{
							resizeMode: "cover",
							width: "100%",
							height: "100%",
						}}
					/>
				</View>
			)}

			{index === 1 && (
				<View
					style={{
						position: "absolute",
						width: "100%",
						height: height / 1.5,

						zIndex: 1,
						bottom: 0,
						paddingTop: SPACING.space_28,
						overflow: "hidden",
						// transform: [{ scale: index === 1 ? 0.8 : 1 }],
					}}
				>
					<Image
						source={item.image}
						style={{
							resizeMode: "cover",
							width: "100%",
							height: "100%",
						}}
					/>
				</View>
			)}
			{index === 2 && (
				<View
					style={{
						position: "absolute",
						width: width * 1.16,
						height: "100%",

						zIndex: 1,
						alignItems: "center",
						justifyContent: "center",
						overflow: "hidden",
					}}
				>
					<Image
						source={item.image}
						style={{
							resizeMode: "contain",
							width: "100%",
							height: height / 1.6,
							transform: [
								{ translateX: -(width / 2) },
								{ translateY: 155 },
							],
							left: width / 2.3,
							zIndex: 2,
						}}
					/>

					<Image
						source={require(`@/assets/Onboarding/hand-card.png`)}
						style={{
							resizeMode: "contain",
							width: "100%",
							height: 550,
							position: "absolute",
							top: 25,
							right: 40,
						}}
					/>
				</View>
			)}
			<View
				style={{
					width: 250,
					height: 250,
					borderRadius: 200,
					backgroundColor: Colors.orangeTint,
					position: "absolute",
					left: index === 1 ? 110 : 40,
					top: index === 1 ? 380 : index === 2 ? 280 : 200,
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: "relative",
	},
	header: {
		textAlign: "center",
		fontSize: 30,
		marginBottom: 10,
		fontFamily: "PoppinsSemiBold",
	},
	subHeader: {
		textAlign: "center",
		fontFamily: "PoppinsLight",
		fontSize: FONTSIZE.size_10 + 1,
	},
	contentContainer: {
		flex: 0.32,
		justifyContent: "flex-start",
		paddingTop:
			Platform.OS === "ios"
				? SPACING.space_30 * 2.8
				: SPACING.space_20 * 2.2,
		paddingHorizontal: SPACING.space_20 * 1.4,
		zIndex: 30,
		// backgroundColor: "yellow",
	},
});
