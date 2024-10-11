import { StyleSheet } from "react-native";

const splashStyles = StyleSheet.create({
	pageContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	logoContainer: {
		width: 200,
		//  marginHorizontal: 'auto',
		height: 100,
	},
	logo: {
		objectFit: "contain",
		width: 200,
		height: 100,
	},
});

export default splashStyles;
