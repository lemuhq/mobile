import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import FontIcons from "@expo/vector-icons/Fontisto";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/provider/ThemeProvider";
import { router } from "expo-router";
import { FONTSIZE, SPACING } from "@/constants/Theme";

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
	const { isDarkMode, theme } = useContext(ThemeContext);

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
			<Text style={[styles.title, { color: theme.pageTextColor }]}>
				{header}
			</Text>
			<Text style={[styles.subtitle, { color: theme.text }]}>
				{subheader}
			</Text>

			<View style={styles.pinContainer}>
				{Array.from({ length: pinCount }, (_, i) => (
					<View
						key={i}
						style={[
							styles.circle,
							{ borderColor: pin[i] ? Colors.orange : theme.text },
						]}
					>
						{pin[i] ? <View style={styles.circleText} /> : null}
					</View>
				))}
			</View>

			<View style={styles.keypad}>
				{[1, 2, 3].map((number) => (
					<TouchableOpacity
						key={number}
						style={styles.key}
						onPress={() => handleNumberPress(number)}
					>
						<Text style={styles.keyText}>{number}</Text>
					</TouchableOpacity>
				))}
				{[4, 5, 6].map((number) => (
					<TouchableOpacity
						key={number}
						style={styles.key}
						onPress={() => handleNumberPress(number)}
					>
						<Text style={styles.keyText}>{number}</Text>
					</TouchableOpacity>
				))}
				{[7, 8, 9].map((number) => (
					<TouchableOpacity
						key={number}
						style={styles.key}
						onPress={() => handleNumberPress(number)}
					>
						<Text style={styles.keyText}>{number}</Text>
					</TouchableOpacity>
				))}
				{/* Placeholder for empty space */}
				<View style={styles.emptyKey} />
				{/* 0 Button */}
				<TouchableOpacity
					style={styles.key}
					onPress={() => handleNumberPress(0)}
				>
					<Text style={styles.keyText}>0</Text>
				</TouchableOpacity>
				{/* Delete Button */}
				<TouchableOpacity
					style={styles.emptyKey}
					onPress={handleDeletePress}
				>
					{/* <Text style={styles.keyText}>⌫</Text> */}
					<FontIcons name="close" size={18} color={theme.pageTextColor} />
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//  justifyContent: 'center',
		padding: 16,
	},
	title: {
		fontSize: FONTSIZE.size_28,
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
		marginTop: 30,
		marginBottom: 50,
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
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		gap: 10,
	},
	key: {
		width: 80,
		height: 80,
		borderRadius: 40,
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
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: "transparent",
		justifyContent: "center",
		alignItems: "center",
		margin: 10,
	},
});
