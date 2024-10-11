import {
	View,
	Text,
	StyleSheet,
	useWindowDimensions,
	Image,
} from "react-native";
import React, { useContext } from "react";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/provider/ThemeProvider";

export default function OnboardingItem({
	item,
}: {
	item: {
		header: string;
		subHeader: string;
		image: any;
	};
}) {
	const { width } = useWindowDimensions();
	const { isDarkMode, theme } = useContext(ThemeContext);
	return (
		<View style={[styles.container, { width }]}>
			<View style={styles.contentContainer}>
				<Text style={[styles.header, { color: theme.pageTextColor }]}>
					{item.header}
				</Text>
				<Text style={[styles.subHeader, { color: theme.text }]}>
					{item.subHeader}
				</Text>
			</View>
			{/* <Image
				source={item.image}
				style={[styles.image, { width, resizeMode: "cover" }]}
			/> */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "red",
		position: "relative",
	},
	image: {
		flex: 0.9,
		// position: "absolute",
	},
	header: {
		// fontWeight: "600",
		textAlign: "center",
		fontSize: 30,
		marginBottom: 16,
		fontFamily: "PoppinsSemiBold",
	},
	subHeader: {
		textAlign: "center",
		fontFamily: "PoppinsLight",
		fontSize: 14,
	},
	contentContainer: {
		flex: 0.3,
		justifyContent: "center",
		// alignItems: "center",
		paddingTop: Colors.spacing * 4,
		paddingHorizontal: 20,
	},
});
