import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Platform,
	Image,
} from "react-native";
import React, { Dispatch, SetStateAction, useContext } from "react";
import FontIcons from "@expo/vector-icons/Fontisto";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/provider/ThemeProvider";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { fontSizes, windowHeight, windowWidth } from "@/constants";

interface IProps {
	header: string;
	subheader: string;
	pin: number[];
	setPin: Dispatch<SetStateAction<number[]>>;
	pinCount?: number;
	hasBiometrics?: boolean;
}

export default function PinInputSheet({
	header,
	subheader,
	pin,
	setPin,
	pinCount = 6,
	hasBiometrics = false,
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
					paddingBottom: SPACING.space_10,
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
						style={styles.biometricsKey}
						onPress={handleDeletePress}
					>
						<Image
							source={require("@/assets/face_id.png")}
							style={{
								width: 24,
								height: 24,
								// borderRadius: 100,
								resizeMode: "cover",
							}}
						/>
					</TouchableOpacity>

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
		fontSize: fontSizes.FONT28,
		fontFamily: "PoppinsBold",
		textAlign: "center",
		marginBottom: 8,
	},
	subtitle: {
		fontSize: fontSizes.FONT14,
		textAlign: "center",
		marginBottom: SPACING.space_30,

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
		// justifyContent: "center",
		position: "relative",
		flex: 1,
	},
	keyPadGroup: {
		flexDirection: "row",
	},
	key: {
		width: windowWidth(100),
		height: windowHeight(65),
		borderRadius: wp(100),
		backgroundColor: "#f0f0f0",
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: windowWidth(20),
		marginVertical: windowHeight(20),
	},
	keyText: {
		fontSize: fontSizes.FONT30,
		color: "#000",
		fontFamily: "PoppinsSemiBold",
	},
	emptyKey: {
		width: windowWidth(100),
		height: windowHeight(65),
		borderRadius: wp(100),
		backgroundColor: "transparent",
		justifyContent: "center",
		alignItems: "center",
	},
	deletKey: {
		width: windowWidth(100),
		height: windowHeight(65),
		borderRadius: wp(100),
		backgroundColor: "transparent",
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		bottom: 20,
		right: -100,
		zIndex: 10,
	},
	biometricsKey: {
		width: windowWidth(100),
		height: windowHeight(65),
		borderRadius: wp(100),
		backgroundColor: "transparent",
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		bottom: 20,
		left: -100,
		zIndex: 10,
	},
});
