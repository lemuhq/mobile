import { View, Text, TouchableOpacity, StyleSheet, Platform, TextInput, ToastAndroid, Alert } from "react-native";
import React, { useContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "@/provider/ThemeProvider";
import { Colors } from "@/constants/Colors";
import { BORDERRADIUS, FONTSIZE, SPACING } from "@/constants/Theme";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Constants from "expo-constants";
import { useRouter } from "expo-router";

export default function Scan() {
	const { isDarkMode, theme } = useContext(ThemeContext);
	const [amount, setAmount] = useState("");
	const [transactionType, setTransactionType] = useState<'send' | 'receive'>('receive');
	const statusHeight = Platform.OS === "android" ? Constants.statusBarHeight : 60;
	const [error, setError] = useState<string>("");
	const router = useRouter();

	const showError = (message: string) => {
		setError(message);
		if (Platform.OS === 'android') {
			ToastAndroid.show(message, ToastAndroid.SHORT);
		} else {
			Alert.alert('Error', message);
		}
		
		// Clear error after 3 seconds
		setTimeout(() => {
			setError("");
		}, 3000);
	};

	const handleMethodSelect = (method: 'qr' | 'nfc') => {
		if (!amount) {
			showError('Please enter an amount first');
			return;
		}
		
		if (method === 'qr') {
			router.push({
				pathname: '/scan/qrcode',
				params: { amount, type: transactionType }
			});
		} else if (method === 'nfc') {
			router.push({
				pathname: '/scan/nfc',
				params: { amount, type: transactionType }
			});
		}
	};

	return (
		<View style={styles.container}>
			<StatusBar style="dark" />
			
			<View style={styles.toggleContainer}>
				<TouchableOpacity 
					style={[
						styles.toggleButton, 
						transactionType === 'receive' && styles.activeToggle
					]}
					onPress={() => setTransactionType('receive')}
				>
					<Text style={[
						styles.toggleText,
						transactionType === 'receive' && styles.activeToggleText
					]}>Receive</Text>
				</TouchableOpacity>
				<TouchableOpacity 
					style={[
						styles.toggleButton, 
						transactionType === 'send' && styles.activeToggle
					]}
					onPress={() => setTransactionType('send')}
				>
					<Text style={[
						styles.toggleText,
						transactionType === 'send' && styles.activeToggleText
					]}>Send</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.header}>
				<Text style={styles.headerText}>
					{transactionType === 'receive' ? 'Accept Transfer' : 'Send Transfer'}
				</Text>
				<Text style={styles.subHeaderText}>
					Enter amount and select method
				</Text>
			</View>

			<View style={[styles.amountContainer]}>
				{error ? <Text style={styles.errorText}>{error}</Text> : null}
				<Text style={styles.amountLabel}>
					Amount to {transactionType === 'receive' ? 'Receive' : 'Send'}
				</Text>
				<View style={styles.amountInputContainer}>
					<Text style={styles.currencySymbol}>₦</Text>
					<TextInput
						style={styles.amountInput}
						value={amount}
						onChangeText={setAmount}
						keyboardType="decimal-pad"
						placeholder="0.00"
						placeholderTextColor="rgba(0,0,0,0.4)"
					/>
				</View>
			</View>

			<View style={styles.methodsContainer}>
				<TouchableOpacity 
					style={styles.methodCard}
					onPress={() => handleMethodSelect('qr')}
				>
					<View style={styles.iconContainer}>
						<MaterialCommunityIcons
							name={transactionType === 'receive' ? "qrcode-scan" : "qrcode"}
							size={30}
							color={Colors.orange}
						/>
					</View>
					<Text style={styles.methodTitle}>
						{transactionType === 'receive' ? 'Scan QR Code' : 'Show QR Code'}
					</Text>
					<Text style={styles.methodDescription}>
						{transactionType === 'receive' 
							? 'Scan QR code to accept'
							: 'Show QR code to send'}
					</Text>
				</TouchableOpacity>

				<TouchableOpacity 
					style={styles.methodCard}
					onPress={() => handleMethodSelect('nfc')}
				>
					<View style={styles.iconContainer}>
						<MaterialCommunityIcons
							name="nfc"
							size={30}
							color={Colors.orange}
						/>
					</View>
					<Text style={styles.methodTitle}>NFC Tap & Go</Text>
					<Text style={styles.methodDescription}>
						Tap your phone on NFC card
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: SPACING.space_12,
		paddingTop: Platform.OS === "android" ? Constants.statusBarHeight + 10 : 50,
		backgroundColor: 'white',
	},
	header: {
		marginBottom: hp("2%"),
	},
	headerText: {
		fontSize: FONTSIZE.size_18,
		fontFamily: "PoppinsSemiBold",
		color: Colors.black,
		marginBottom: SPACING.space_8,
	},
	subHeaderText: {
		fontSize: FONTSIZE.size_14,
		fontFamily: "PoppinsRegular",
		color: Colors.black,
		opacity: 0.8,
	},
	amountContainer: {
		marginBottom: hp("2%"),
	},
	amountLabel: {
		fontSize: FONTSIZE.size_16,
		fontFamily: "PoppinsRegular",
		color: Colors.black,
		opacity: 0.8,
		marginBottom: SPACING.space_8,
	},
	amountInputContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.05)",
		borderRadius: BORDERRADIUS.radius_15,
		padding: SPACING.space_20,
		borderWidth: 1,
		borderColor: "rgba(0,0,0,0.1)",
	},
	currencySymbol: {
		fontSize: FONTSIZE.size_24,
		fontFamily: "PoppinsSemiBold",
		color: Colors.black,
		marginRight: SPACING.space_8,
	},
	amountInput: {
		flex: 1,
		fontSize: FONTSIZE.size_24,
		fontFamily: "PoppinsSemiBold",
		color: Colors.black,
		padding: 0,
	},
	methodsContainer: {
		flex: 1,
		justifyContent: "flex-start",
		gap: SPACING.space_12,
	},
	methodCard: {
		backgroundColor: "rgba(0,0,0,0.05)",
		borderRadius: BORDERRADIUS.radius_15,
		padding: SPACING.space_12,
		alignItems: "center",
		borderWidth: 1,
		borderColor: "rgba(0,0,0,0.1)",
	},
	iconContainer: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "rgba(255,84,0,0.1)",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: SPACING.space_10,
	},
	methodTitle: {
		fontSize: FONTSIZE.size_14,
		fontFamily: "PoppinsSemiBold",
		color: Colors.black,
		marginBottom: SPACING.space_4,
	},
	methodDescription: {
		fontSize: FONTSIZE.size_12,
		fontFamily: "PoppinsRegular",
		color: Colors.black,
		opacity: 0.8,
		textAlign: "center",
	},
	toggleContainer: {
		flexDirection: 'row',
		backgroundColor: 'rgba(0,0,0,0.05)',
		borderRadius: BORDERRADIUS.radius_25,
		padding: SPACING.space_4,
		marginBottom: hp("2%"),
	},
	toggleButton: {
		flex: 1,
		paddingVertical: SPACING.space_10,
		paddingHorizontal: SPACING.space_20,
		borderRadius: BORDERRADIUS.radius_25,
	},
	activeToggle: {
		backgroundColor: Colors.orange,
	},
	toggleText: {
		textAlign: 'center',
		fontFamily: "PoppinsRegular",
		color: Colors.black,
		fontSize: FONTSIZE.size_14,
	},
	activeToggleText: {
		color: 'white',
		fontFamily: "PoppinsSemiBold",
	},
	errorText: {
		color: 'red',
		fontSize: FONTSIZE.size_14,
		fontFamily: "PoppinsRegular",
		marginBottom: SPACING.space_8,
	},
});
