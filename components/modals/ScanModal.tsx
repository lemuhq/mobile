import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
	Dimensions,
	Platform,
	Pressable,
} from "react-native";
import React, {
	Dispatch,
	ReactNode,
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useRef,
} from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { ModalContext } from "@/provider/ModalProvider";

const { height } = Dimensions.get("screen");
export default function ScanModal() {
	const { scannerOpen, handleScannerOpen, handleTransactionOpen } =
		useContext(ModalContext);
	// ref
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	useEffect(() => {
		if (scannerOpen) {
			bottomSheetModalRef.current?.present();
		}
	}, [scannerOpen]);

	const handleClose = useCallback(() => {
		bottomSheetModalRef?.current?.close();
		handleScannerOpen(false);
	}, []);

	return (
		<BottomSheetModal
			ref={bottomSheetModalRef}
			index={1}
			snapPoints={["100%"]}
			onDismiss={() => {
				handleClose();
			}}
			handleIndicatorStyle={{ display: "none" }}
			topInset={-25}
		>
			<View style={{ flex: 1 }}>
				<StatusBar style="light" />
				<BottomSheetView style={styles.contentContainer}>
					<LinearGradient
						colors={["#1C0A01", "#242424"]}
						style={{
							flex: 2,
							position: "relative",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<TouchableOpacity
							style={{
								position: "absolute",
								right: SPACING.space_20,
								top: "6%",
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
								flex: 1,
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Image
								source={require("@/assets/SplashLogo.png")}
								style={{
									width: 100,
									height: 50,
									resizeMode: "contain",
									marginHorizontal: "auto",
									marginBottom: SPACING.space_30,
								}}
							/>
							<Pressable
								onPress={() => {
									handleClose();
									handleTransactionOpen(true);
								}}
							>
								<View
									style={{
										width: 231,
										height: 231,
									}}
								>
									<Image
										source={require(`@/assets/scanner.png`)}
										style={{
											width: "100%",
											height: "100%",
											resizeMode: "cover",
										}}
									/>
								</View>
							</Pressable>
							<View style={{ height: 100 }}></View>

							<Text
								style={{
									color: Colors.white,
									fontSize: FONTSIZE.size_20,
									fontFamily: "PoppinsSemiBold",
									textAlign: "center",
								}}
							>
								Scan QR Code to
							</Text>
							<Text
								style={{
									color: Colors.white,
									fontSize: FONTSIZE.size_20,
									fontFamily: "PoppinsSemiBold",
									textAlign: "center",
								}}
							>
								transact
							</Text>
							{/* {children} */}
						</View>
					</LinearGradient>
				</BottomSheetView>
			</View>
		</BottomSheetModal>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
	},
	sheetContainer: {
		// add horizontal space
		marginHorizontal: 24,
	},
	contentContainer: {
		flex: 1,
		height: Platform.OS === "ios" ? height : 0,
	},
});