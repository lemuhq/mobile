import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
	Dimensions,
	Platform,
	Pressable,
	Modal,
} from "react-native";
import React, { useContext, useEffect } from "react";

import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { ModalContext } from "@/provider/ModalProvider";
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import {
	GestureDetector,
	Gesture,
	GestureHandlerRootView,
} from "react-native-gesture-handler";
import CustomSlider from "../CustomSlider";
import Constants from "expo-constants";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const { height: SCREEN_HEIGHT } = Dimensions.get("screen");
export default function ScanModal() {
	const { scannerOpen, toggleScannerModal, toggleTransactionModal } =
		useContext(ModalContext);
	const statusHeight =
		Platform.OS === "android" ? Constants.statusBarHeight : 50;

	const translateY = useSharedValue(SCREEN_HEIGHT);

	const closeModal = () => {
		translateY.value = withSpring(SCREEN_HEIGHT, { damping: 20 }, () => {
			runOnJS(toggleScannerModal)();
		});
	};

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: translateY.value }],
		};
	});

	const handleValueChange = (value: number) => {
		console.log("Slider Value:", value);
	};

	const gesture = Gesture.Pan()
		.onUpdate((e) => {
			if (e.translationY > 0) {
				translateY.value = e.translationY;
			}
		})
		.onEnd((e) => {
			if (e.translationY > SCREEN_HEIGHT / 4) {
				closeModal();
			} else {
				translateY.value = withSpring(0, { damping: 20 });
			}
		});

	useEffect(() => {
		if (scannerOpen) {
			translateY.value = withSpring(0, { damping: 20 });
		}
	}, [scannerOpen]);

	// useEffect(() => {
	// 	if (scannerOpen) {
	// 		setTimeout(() => {
	// 			toggleTransactionModal();
	// 			toggleScannerModal();
	// 		}, 4000);
	// 	}
	// }, [scannerOpen]);

	return (
		<Modal
			transparent
			visible={scannerOpen}
			animationType="none"
			onRequestClose={closeModal}
		>
			<GestureDetector gesture={gesture}>
				<Animated.View
					style={[
						animatedStyle,
						{
							backgroundColor: "#fff",
							position: "absolute",
							bottom: 0,
							height: SCREEN_HEIGHT,
							width: "100%",

							overflow: "hidden",
							zIndex: 2,

							flex: 1,
						},
					]}
				>
					<StatusBar style="light" />
					<LinearGradient
						colors={["#1C0A01", "#242424"]}
						style={{
							flex: 1,
						}}
					>
						<View
							style={[
								{
									flex: 1,
									position: "relative",
									paddingTop:
										Platform.OS === "ios"
											? statusHeight
											: statusHeight + 60,
									paddingHorizontal: SPACING.space_20,
								},
							]}
						>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "flex-end",
								}}
							>
								<TouchableOpacity onPress={closeModal}>
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
										width: wp(""),
										height: 50,
										resizeMode: "contain",
										marginHorizontal: "auto",
										marginBottom: SPACING.space_30,
									}}
								/>
								<Pressable
									onPress={() => {
										closeModal();
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
						</View>
					</LinearGradient>
				</Animated.View>
			</GestureDetector>
		</Modal>
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
