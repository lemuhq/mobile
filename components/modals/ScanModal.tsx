import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
	Platform,
	Pressable,
} from "react-native";
import React, { useContext } from "react";

import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { ModalContext } from "@/provider/ModalProvider";
import CustomSlider from "../CustomSlider";
import Constants from "expo-constants";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BottomSheetModal from "./BottomSheetModal";
import { Camera, CameraView, useCameraPermissions } from "expo-camera";

export default function ScanModal() {
	const { scannerOpen, toggleScannerModal, toggleTransactionModal } =
		useContext(ModalContext);
	const statusHeight =
		Platform.OS === "android" ? Constants.statusBarHeight : 60;

	const [permission, requestPermission] = useCameraPermissions();

	const handleValueChange = (value: number) => {
		console.log("Slider Value:", value);
	};

	const isPermissionGranted = Boolean(permission?.granted);

	const handleBarCodeScan = async ({ data }: any) => {
		if (!isPermissionGranted) {
			// requestPermission();
			return;
		}

		console.log("🚀 ~ handleBarCodeScan ~ data:", data);
	};

	return (
		
		<BottomSheetModal
			isOpen={scannerOpen}
			onDismiss={() => {
				toggleScannerModal();
				toggleTransactionModal();
			}}
			fullHeight={true}
		>
			<LinearGradient
				colors={["#1C0A01", "#242424"]}
				style={{
					flex: 1,
					padding: SPACING.space_20,
					paddingTop: statusHeight + SPACING.space_20,
					paddingBottom: Platform.OS === 'ios' ? 34 : SPACING.space_20,
					gap: wp("5%"),
					width: "100%",
					height: '100%',
					position: 'relative',
				}}
			>
				<StatusBar style="light" />
				<TouchableOpacity 
					onPress={() => {
						toggleScannerModal();
						toggleTransactionModal();
					}}
					style={{
						position: 'absolute',
						top: statusHeight + SPACING.space_20,
						right: SPACING.space_20,
						zIndex: 999,
						padding: 10,
						backgroundColor: 'rgba(0,0,0,0.3)',
						borderRadius: 20,
					}}
					hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
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
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: SPACING.space_20,
					}}
				>
					<Image
						source={require("@/assets/SplashLogo.png")}
						style={{
							width: wp("30%"),
							height: 50,
							resizeMode: "contain",
							marginHorizontal: "auto",
							marginBottom: SPACING.space_30,
						}}
					/>
					<Pressable
						onPress={() => {
							toggleScannerModal();
							toggleTransactionModal();
						}}
					>
						<View
							style={{
								width: wp("70%"),
								height: hp("35%"),
							}}
						>
							<CameraView
								style={StyleSheet.absoluteFillObject}
								facing="back"
								onBarcodeScanned={handleBarCodeScan}
							/>
							{/* <Image
								source={require(`@/assets/scanner.png`)}
								style={{
									width: "100%",
									height: "100%",
									resizeMode: "cover",
								}}
							/> */}
						</View>
					</Pressable>
					<View
						style={{
							paddingHorizontal: SPACING.space_20,
							marginVertical: SPACING.space_30 + 20,
							width: "100%",
						}}
					>
						<CustomSlider
							min={0}
							max={100}
							step={1}
							onValueChange={handleValueChange}
						/>
					</View>

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
				</View>
			</LinearGradient>
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
});
