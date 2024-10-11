import { Colors } from "@/constants/Colors";
import { Platform, StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
	divider: {
		backgroundColor: Colors.lineGray,
		marginHorizontal: 2,
	},

	otpTextInputStyle: {
		backgroundColor: Colors.whiteSmoke,
		borderWidth: 0,
		borderBottomWidth: 0,
		borderRadius: 11,
		color: Colors.orange,
	},

	safeAreaViewStyles: {
		paddingTop: Platform.OS === "android" ? 50 : 0,
		paddingBottom: Platform.OS === "android" ? 30 : 0,
	},
});

export default globalStyles;
