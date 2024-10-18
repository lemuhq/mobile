import { Colors } from "@/constants/Colors";
import { SPACING } from "@/constants/Theme";
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
		flex: 1,

		height: 55,
	},

	safeAreaViewStyles: {
		paddingTop: Platform.OS === "android" ? SPACING.space_30 : 0,
		paddingBottom: Platform.OS === "android" ? SPACING.space_30 : 0,
	},
});

export default globalStyles;
