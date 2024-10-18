import {
	View,
	Text,
	StyleSheet,
	Image,
	Platform,
	SafeAreaView,
	Dimensions,
} from "react-native";
import React, { useContext } from "react";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/provider/ThemeProvider";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import globalStyles from "@/styles/global.styles";

const { width, height } = Dimensions.get("window");

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
	const { theme } = useContext(ThemeContext);
	return (
		<SafeAreaView
			style={[
				{
					flex: 1,
				},
				globalStyles.safeAreaViewStyles,
			]}
		>
			<View style={{ flex: 1, width: width }}>
				<View
					style={[
						styles.contentContainer,
						{
							justifyContent: index === 2 ? "flex-start" : "center",
						},
					]}
				>
					<Text style={[styles.header, { color: Colors.black }]}>
						{item.header}
					</Text>
					<Text style={[styles.subHeader, { color: Colors.black }]}>
						{item.subHeader}
					</Text>
				</View>
				{index === 0 && (
					<View
						style={{
							position: "relative",
							zIndex: 1,

							paddingBottom: "30%",
						}}
					>
						<Image
							source={item.image}
							style={{
								resizeMode: "cover",
								width: "100%",
								height: "100%",
								zIndex: 2,
							}}
						/>
						<View
							style={{
								width: 250,
								height: 250,
								borderRadius: 200,
								backgroundColor: Colors.orangeTint,
								position: "absolute",
								left: "8%",
								top: "10%",
							}}
						/>
					</View>
				)}

				{index === 1 && (
					<View
						style={{
							position: "relative",
							zIndex: 1,
							paddingBottom: "45%",
						}}
					>
						<Image
							source={item.image}
							style={{
								resizeMode: "cover",
								width: "100%",
								height: "100%",
								zIndex: 2,
							}}
						/>
						<View
							style={{
								width: 220,
								height: 220,
								borderRadius: 200,
								backgroundColor: Colors.orangeTint,
								position: "absolute",
								right: "8%",
								bottom: "40%",
							}}
						/>
					</View>
				)}
				{index === 2 && (
					<View
						style={{
							position: "relative",
							zIndex: 1,
							paddingBottom: "45%",
						}}
					>
						<Image
							source={item.image}
							style={{
								resizeMode: "contain",
								width: "100%",
								height: "95%",
								zIndex: 3,
								position: "absolute",
								top: height > 800 ? 0 : 0,
								transform: [{ translateY: height > 800 ? 80 : 55 }],
							}}
						/>

						<Image
							source={require(`@/assets/Onboarding/hand-card.png`)}
							style={{
								resizeMode: "contain",
								width: "100%",
								height: "100%",
								transform: [{ translateY: height > 800 ? -220 : -180 }],
								zIndex: 2,
							}}
						/>
						<View
							style={{
								width: 250,
								height: 250,
								borderRadius: 200,
								backgroundColor: Colors.orangeTint,
								position: "absolute",
								left: "8%",
								top: "10%",
							}}
						/>
					</View>
				)}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: "relative",
	},
	header: {
		textAlign: "center",
		fontSize: FONTSIZE.size_24,
		marginBottom: 1,
		fontFamily: "PoppinsSemiBold",
	},
	subHeader: {
		textAlign: "center",
		fontFamily: "PoppinsLight",
		fontSize: FONTSIZE.size_10 + 1,
		maxWidth: "90%",
		marginHorizontal: "auto",
	},
	contentContainer: {
		height: 115,
		paddingHorizontal:
			Platform.OS === "ios" ? SPACING.space_15 - 1 : SPACING.space_10,
		zIndex: 30,
		alignItems: "center",
	},
});
