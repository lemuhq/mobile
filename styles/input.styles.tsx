import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const inputStyles = StyleSheet.create({
	container: {
		backgroundColor: Colors.whiteSmoke,
		borderRadius: 15,
		minHeight: 55,
		maxHeight: 55,
		paddingVertical: 5,
		flexDirection: "row",
		gap: 5,
		paddingHorizontal: 10,
	},
	miniText: {
		fontSize: 7,
		color: Colors.black,
		fontWeight: "300",
		position: "absolute",
		top: 0,
		left: 0,
	},
	countryContainer: {
		flex: 0.24,
		position: "relative",
	},
	countryCodeWrapper: {
		width: "100%",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",

		flexDirection: "row",
		gap: 3,
	},
	numberContainer: {
		flex: 1,
		position: "relative",
	},
	phoneInput: { width: "100%", height: "100%" },
	passwordButton: {
		backgroundColor: Colors.orange,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default inputStyles;
