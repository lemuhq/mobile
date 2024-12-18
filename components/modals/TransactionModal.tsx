import {
	View,
	Text,
	StyleSheet,
	Platform,
	TouchableOpacity,
	Image,
} from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useContext, useEffect, useState } from "react";
import FontIcons from "@expo/vector-icons/Fontisto";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BORDERRADIUS, FONTSIZE, SPACING } from "@/constants/Theme";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { ModalContext } from "@/provider/ModalProvider";
import Constants from "expo-constants";
import BottomSheetModal from "./BottomSheetModal";
import { useGetCurrentUserQuery } from "@/redux/services/auth";

export default function TransactionModal() {
	const { transactionOpen, toggleTransactionModal } = useContext(ModalContext);
	const { data } = useGetCurrentUserQuery();

	const [amount, onChangeAmount] = useState<string>("");
	const [isActive, setIsActive] = useState<boolean>(false);
	const statusHeight =
		Platform.OS === "android" ? Constants.statusBarHeight : 50;

	const formatCurrency = (val: string) => {
		const cleanedValue = val.replace(/[^0-9]/g, "");

		if (/[^0-9]/.test(val.slice(-1))) {
			return;
		}

		let numberValue = (parseInt(cleanedValue, 10) / 100).toFixed(2);

		// Format the number to add commas for thousands
		return new Intl.NumberFormat("en-US", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(parseFloat(numberValue));
	};

	const handlePress = (digit: string) => {
		let newValue = amount.replace(".", "").replace(/^0+/, "") + digit;

		onChangeAmount(formatCurrency(newValue)!);
	};

	const handleDeletePress = () => {
		let newValue = amount.replace(".", "");
		newValue = newValue.slice(0, -1);
		onChangeAmount(formatCurrency(newValue)!);
	};

	useEffect(() => {
		if (amount === "" || amount === "0.00") {
			setIsActive(false);
		} else {
			setIsActive(true);
		}
	}, [amount]);

	return (
		<BottomSheetModal
			isOpen={transactionOpen}
			onDismiss={toggleTransactionModal}
			fullHeight={true}
		>
			<StatusBar style="light" backgroundColor="black" />
			<View style={styles.contentContainer}>
				<View
					style={[
						styles.formWrapper,
						{
							paddingTop: statusHeight,
							paddingBottom: statusHeight - 30,
						},
					]}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "flex-end",
						}}
					>
						<TouchableOpacity onPress={toggleTransactionModal}>
							<MaterialCommunityIcons
								name="close"
								size={24}
								color="white"
							/>
						</TouchableOpacity>
					</View>

					<View
						style={{
							flex: 1,
							paddingBottom: SPACING.space_20,
						}}
					>
						<View
							style={{
								marginBottom: SPACING.space_10,
							}}
						>
							<Text style={styles.currentBalance}>Current Balance</Text>

							<Text style={styles.amountText}>
								₦{data?.accountBalance}
							</Text>
						</View>

						<View
							style={{
								flex: 1,
							}}
						>
							<View
								style={{
									backgroundColor: Colors.gunMetal,
									minHeight: 164 - 20,
									borderRadius: BORDERRADIUS.radius_15,
									paddingHorizontal: SPACING.space_20,
								}}
							>
								<View
									style={{
										flex: 1.9,
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<View style={{ flexDirection: "row" }}>
										<Text
											style={{
												textAlign: "center",
												color: "white",
												fontSize: FONTSIZE.size_30 + 3,
												fontFamily: "PoppinsSemiBold",
											}}
										>
											₦{amount || "0.00"}
										</Text>
									</View>
								</View>
								<View
									style={{
										flex: 1.6,
										borderTopWidth: 1,
										borderColor: Colors.black,
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<View
										style={{
											width: "100%",
											marginHorizontal: "auto",
											height: 50,
											borderRadius: 50,
											flexDirection: "row",
											backgroundColor: "#1A1A1A",
											alignItems: "center",
											paddingHorizontal: 10,
											gap: SPACING.space_10,
										}}
									>
										<Image
											source={require(`@/assets/user-transaction.png`)}
											style={{
												width: 36,
												height: 36,
												resizeMode: "cover",
											}}
										/>
										<View>
											<Text style={styles.receiverName}>
												Thami Frama
											</Text>
											<Text style={styles.receiverAccountNumber}>
												1234567891
											</Text>
										</View>
									</View>
								</View>
							</View>

							<View style={styles.keypad}>
								<View style={styles.keyPadGroup}>
									{[1, 2, 3].map((number) => (
										<TouchableOpacity
											key={number}
											style={styles.key}
											onPress={() => handlePress(String(number))}
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
											onPress={() => handlePress(String(number))}
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
											onPress={() => handlePress(String(number))}
										>
											<Text style={styles.keyText}>{number}</Text>
										</TouchableOpacity>
									))}
								</View>

								<View
									style={{
										flexDirection: "row",
										alignItems: "flex-end",
									}}
								>
									<TouchableOpacity
										style={styles.key}
										onPress={() => handlePress(String(0))}
									>
										<Text style={styles.keyText}>0</Text>
									</TouchableOpacity>

									<TouchableOpacity
										style={styles.deletKey}
										onPress={handleDeletePress}
									>
										<FontIcons
											name="close"
											size={18}
											color={"#fff"}
										/>
									</TouchableOpacity>
								</View>
							</View>

							<View
								style={{
									flexDirection: "row",
									width: "100%",
									gap: SPACING.space_10,
									alignItems: "center",
									paddingBottom: Platform.OS === "ios" ? 10 : 0,
								}}
							>
								<TouchableOpacity
									style={{
										backgroundColor: Colors.gunMetal,

										borderRadius: 10,
										justifyContent: "center",
										alignItems: "center",

										flex: 1,
										height: 52,

										borderWidth: 1,
										borderColor: Colors.silver,
									}}
									onPress={() => toggleTransactionModal()}
								>
									<Text
										style={{
											color: "white",
											fontFamily: "PoppinsSemiBold",
											fontSize: 18,
										}}
									>
										Cancel
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={{
										backgroundColor: isActive
											? Colors.orange
											: Colors.gunMetal,
										borderRadius: 10,
										justifyContent: "center",
										alignItems: "center",
										flex: 1,
										height: 52,
										opacity: isActive ? 1 : 0.65,
										borderWidth: 1,
										borderColor: isActive
											? Colors.orange
											: Colors.gunMetal,
									}}
									onPress={toggleTransactionModal}
									disabled={!isActive}
								>
									<Text
										style={{
											color: "white",
											fontFamily: "PoppinsSemiBold",
											fontSize: 18,
										}}
									>
										Send
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</View>
		</BottomSheetModal>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: "grey",
	},
	sheetContainer: {
		marginHorizontal: 24,
	},
	contentContainer: {
		backgroundColor: "black",
		width: "100%",
		zIndex: 2,
		flex: 1,
	},
	formWrapper: {
		flex: 1,
		padding: SPACING.space_20,
		gap: wp("5%"),
		width: "100%",
		overflow: "hidden",
		zIndex: 2,
	},

	keypad: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		position: "relative",
		gap: 10,
		marginTop: 10,
	},
	keyPadGroup: {
		flexDirection: "row",
		gap: Platform.OS === "android" ? 5 : 10,
		marginVertical: Platform.OS === "android" ? 0 : 15,
	},
	key: {
		width: wp("20%"),
		height: Platform.OS === "ios" ? hp("9%") : hp("10%"),

		borderRadius: wp("100%"),
		backgroundColor: Colors.gunMetal,
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 10,
	},

	keyText: {
		fontSize: 24,
		color: "#FFF",
		fontFamily: "PoppinsMedium",
	},
	emptyKey: {
		width: 70,
		height: 70,
		borderRadius: 50,
		backgroundColor: "transparent",
		justifyContent: "center",
		alignItems: "center",
		margin: 10,
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

	currentBalance: {
		color: "white",
		fontFamily: "PoppinsRegular",
		fontSize: FONTSIZE.size_10,
	},

	amountText: {
		color: "white",
		fontFamily: "PoppinsSemiBold",
		fontSize: FONTSIZE.size_20,
	},

	receiverName: {
		fontSize: 12,
		fontFamily: "PoppinsSemiBold",
		color: "#fff",
	},

	receiverAccountNumber: {
		fontSize: 12,
		fontFamily: "PoppinsRegular",
		color: "#fff",
	},
});
