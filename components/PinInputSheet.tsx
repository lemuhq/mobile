import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Platform,
} from "react-native";
import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import FontIcons from "@expo/vector-icons/Fontisto";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/provider/ThemeProvider";
import { router } from "expo-router";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import { StatusBar } from "expo-status-bar";

interface IProps {
	header: string;
	subheader: string;
	pin: number[];
	setPin: Dispatch<SetStateAction<number[]>>;
	pinCount?: number;
}

export default function PinInputSheet({
	header,
	subheader,
	pin,
	setPin,
	pinCount = 6,
}: IProps) {
	const { theme } = useContext(ThemeContext);

	const handleNumberPress = (number: number) => {
		if (pin.length < pinCount) {
			setPin([...pin, number]);
		}
	};

	const handleDeletePress = () => {
		setPin(pin.slice(0, -1));
	};

	return (
		<View style={styles.container}>
			<View
				style={{
					paddingHorizontal: SPACING.space_20,
					paddingBottom: SPACING.space_30,
				}}
			>
				<Text style={[styles.title, { color: theme.pageTextColor }]}>
					{header}
				</Text>
				<Text style={[styles.subtitle, { color: theme.text }]}>
					{subheader}
				</Text>
			</View>

			<View style={styles.pinContainer}>
				{Array.from({ length: pinCount }, (_, i) => {
					return (
						<View
							key={i}
							style={[
								styles.circle,
								{
									borderColor:
										pin[i] >= 0 ? Colors.orange : theme.text,
								},
							]}
						>
							{pin[i] >= 0 ? <View style={styles.circleText} /> : null}
						</View>
					);
				})}
			</View>

			<View style={styles.keypad}>
				<View style={styles.keyPadGroup}>
					{[1, 2, 3].map((number) => (
						<TouchableOpacity
							key={number}
							style={styles.key}
							onPress={() => handleNumberPress(number)}
						>
							<Text style={styles.keyText}>{number}</Text>
						</TouchableOpacity>
					))}
				</View>

				<View style={styles.keyPadGroup}>
					{[4, 5, 6].map((number) => (
						<TouchableOpacity
							key={number}
							style={styles.key}
							onPress={() => handleNumberPress(number)}
						>
							<Text style={styles.keyText}>{number}</Text>
						</TouchableOpacity>
					))}
				</View>

				<View style={styles.keyPadGroup}>
					{[7, 8, 9].map((number) => (
						<TouchableOpacity
							key={number}
							style={styles.key}
							onPress={() => handleNumberPress(number)}
						>
							<Text style={styles.keyText}>{number}</Text>
						</TouchableOpacity>
					))}
				</View>

				{/* <View style={styles.emptyKey} /> */}
				<View
					style={{
						flexDirection: "row",
						// justifyContent: "center",
						alignItems: "flex-end",
					}}
				>
					<TouchableOpacity
						style={styles.key}
						onPress={() => handleNumberPress(0)}
					>
						<Text style={styles.keyText}>0</Text>
					</TouchableOpacity>
					{/* Delete Button */}
					<TouchableOpacity
						style={styles.deletKey}
						onPress={handleDeletePress}
					>
						<FontIcons
							name="close"
							size={18}
							color={theme.pageTextColor}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		fontSize: FONTSIZE.size_24,
		fontFamily: "PoppinsBold",
		textAlign: "center",
		marginBottom: 8,
	},
	subtitle: {
		fontSize: FONTSIZE.size_10 + 1,
		textAlign: "center",
		marginBottom: SPACING.space_30,
		lineHeight: 16.5,
		fontFamily: "PoppinsLight",
	},
	pinContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginBottom: SPACING.space_30,
	},
	circle: {
		width: 15,
		height: 15,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: "#000",
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 10,
		overflow: "hidden",
	},
	circleText: {
		width: 15,
		height: 15,
		backgroundColor: Colors.orange,
		borderRadius: 10,
	},
	keypad: {
		alignItems: "center",
		justifyContent: "center",

		position: "relative",
	},
	keyPadGroup: {
		flexDirection: "row",
		gap: Platform.OS === "android" ? 5 : 10,
		marginVertical: Platform.OS === "android" ? 0 : 15,
	},
	key: {
		width: Platform.OS === "android" ? 70 : 75,
		height: Platform.OS === "android" ? 70 : 75,
		borderRadius: 50,
		backgroundColor: "#f0f0f0",
		justifyContent: "center",
		alignItems: "center",
		margin: 10,
	},
	keyText: {
		fontSize: 24,
		color: "#000",
		fontFamily: "PoppinsRegular",
	},
	emptyKey: {
		width: 75,
		height: 75,
		borderRadius: 40,
		backgroundColor: "transparent",
		justifyContent: "center",
		alignItems: "center",
		// margin: 10,
	},
	deletKey: {
		width: 75,
		height: 75,
		borderRadius: 40,
		backgroundColor: "transparent",
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		bottom: 10,
		right: -100,
		zIndex: 10,
	},
});
