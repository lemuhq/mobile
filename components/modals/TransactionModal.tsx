import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Platform,
	TouchableOpacity,
	Image,
} from "react-native";

import React, {
	Dispatch,
	ReactNode,
	SetStateAction,
	useCallback,
	useEffect,
	useRef,
} from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import FontIcons from "@expo/vector-icons/Fontisto";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BORDERRADIUS, FONTSIZE, SPACING } from "@/constants/Theme";
import { Colors } from "@/constants/Colors";

const { height } = Dimensions.get("screen");
export default function TransactionModal({
	isOpen,
	setIsOpen,
}: {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
	// ref
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	// variables
	const snapPoints = ["90%"];

	useEffect(() => {
		if (isOpen) {
			bottomSheetModalRef.current?.present();
		}
	}, [isOpen]);
	const handleClose = useCallback(() => {
		bottomSheetModalRef?.current?.close();
		setIsOpen(false);
	}, []);

	const handleNumberPress = (number: number) => {
		console.log(number);
	};

	const handleDeletePress = () => {
		console.log("Delete");
	};
	return (
		<BottomSheetModal
			ref={bottomSheetModalRef}
			index={1}
			snapPoints={["100%", "100%"]}
			onDismiss={() => {
				handleClose();
			}}
		>
			<View style={{ flex: 1, backgroundColor: "red" }}>
				<BottomSheetView style={styles.contentContainer}>
					<TouchableOpacity
						style={{
							position: "absolute",
							right: SPACING.space_20,
							top: SPACING.space_20,
							zIndex: 3,
						}}
						onPress={handleClose}
					>
						<MaterialCommunityIcons
							name="close"
							size={24}
							color="white"
						/>
					</TouchableOpacity>
					<View
						style={{
							paddingHorizontal: SPACING.space_20,
							paddingTop: SPACING.space_30,
							marginBottom: SPACING.space_10,
						}}
					>
						<Text
							style={{
								color: "white",
								fontFamily: "PoppinsRegular",
								fontSize: FONTSIZE.size_10,
							}}
						>
							Current Balance
						</Text>
						<Text
							style={{
								color: "white",
								fontFamily: "PoppinsSemiBold",
								fontSize: FONTSIZE.size_20,
							}}
						>
							₦5000.00
						</Text>
					</View>

					<View
						style={{
							paddingHorizontal: SPACING.space_20,
							marginBottom: SPACING.space_20,
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
								<Text
									style={{
										fontSize: 24,
										fontFamily: "PoppinsSemiBold",
										color: "#fff",
									}}
								>
									₦0.00
								</Text>
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
										width: "90%",
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
										<Text
											style={{
												fontSize: 12,
												fontFamily: "PoppinsSemiBold",
												color: "#fff",
											}}
										>
											Thami Frama
										</Text>
										<Text
											style={{
												fontSize: 12,
												fontFamily: "PoppinsRegular",
												color: "#fff",
											}}
										>
											1234567891
										</Text>
									</View>
								</View>
							</View>
						</View>
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
							<FontIcons name="close" size={18} color={"black"} />
						</TouchableOpacity>
					</View>
					<View
						style={{
							flexDirection: "row",
							width: "100%",
							paddingHorizontal: SPACING.space_20,
							gap: SPACING.space_20,
							flex: 1,

							alignItems: "flex-end",
							paddingBottom:
								Platform.OS === "ios" ? SPACING.space_30 : 5,
						}}
					>
						<TouchableOpacity
							style={{
								backgroundColor: Colors.gunMetal,
								paddingVertical: 15,
								borderRadius: 10,
								justifyContent: "center",
								alignItems: "center",
								flex: 1,
							}}
							onPress={handleClose}
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
						<TouchableOpacity
							style={{
								backgroundColor: Colors.gunMetal,
								// height: 52,
								borderRadius: 10,
								justifyContent: "center",
								alignItems: "center",
								flex: 1,
								paddingVertical: 15,
							}}
							onPress={() => console.log("Transaction Successful")}
						>
							<Text
								style={{
									color: "white",
									fontFamily: "PoppinsSemiBold",
									fontSize: 18,
								}}
							>
								Recieve
							</Text>
						</TouchableOpacity>
					</View>
				</BottomSheetView>
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
		// add horizontal space
		marginHorizontal: 24,
	},
	contentContainer: {
		flex: 1,
		backgroundColor: "black",
		height: Platform.OS === "ios" ? height : 0,
	},

	key: {
		width: Platform.OS === "ios" ? 80 : 75,
		height: Platform.OS === "ios" ? 80 : 75,
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
		width: Platform.OS === "ios" ? 80 : 75,
		height: Platform.OS === "ios" ? 80 : 75,
		borderRadius: 40,
		backgroundColor: "transparent",
		justifyContent: "center",
		alignItems: "center",
		margin: 10,
	},
	keypad: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		gap: 10,
		// flex: 1,
	},
});
