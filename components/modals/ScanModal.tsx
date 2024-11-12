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

export default function ScanModal() {
	const { scannerOpen, toggleScannerModal, toggleTransactionModal } =
		useContext(ModalContext);
	const statusHeight =
		Platform.OS === "android" ? Constants.statusBarHeight : 60;

	const handleValueChange = (value: number) => {
		console.log("Slider Value:", value);
	};

	return (
		<BottomSheetModal
			isOpen={scannerOpen}
			onDismiss={toggleScannerModal}
			fullHeight={true}
		>
			<LinearGradient
				colors={["#1C0A01", "#242424"]}
				style={{
					flex: 1,
					padding: SPACING.space_20,
					paddingTop: statusHeight,
					paddingBottom: statusHeight - 30,
					gap: wp("10%"),
					width: "100%",
					overflow: "hidden",
					zIndex: 2,
				}}
			>
				<StatusBar style="light" />
				<View
					style={{
						flex: 1,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "flex-end",
						}}
					>
						<TouchableOpacity onPress={toggleScannerModal}>
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
							alignItems: "center",
							justifyContent: "center",
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
					{/* </View> */}
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
