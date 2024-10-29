import { View, Text, Image, Modal } from "react-native";
import React, { useContext, useEffect } from "react";
import { ModalContext } from "@/provider/ModalProvider";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import Button from "../Button";
import { Colors } from "@/constants/Colors";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	runOnJS,
} from "react-native-reanimated";

const BiometricsModal = () => {
	const { biometricsVisible, toggleBiometrics } = useContext(ModalContext);
	const modalOpacity = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: modalOpacity.value,
			transform: [{ scale: modalOpacity.value }],
		};
	});

	const closeModal = () => {
		modalOpacity.value = withTiming(0, { duration: 300 }, () => {
			runOnJS(toggleBiometrics)();
		});
	};

	useEffect(() => {
		if (biometricsVisible) {
			modalOpacity.value = withTiming(1, { duration: 300 });
		}
	}, [biometricsVisible]);

	return (
		<Modal
			transparent
			visible={biometricsVisible}
			animationType="none"
			onRequestClose={closeModal}
		>
			<View
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					flex: 1,
					zIndex: 1,
					backgroundColor: "rgba(0,0,0,.8)",
					height: "100%",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Animated.View
					style={[
						{
							backgroundColor: "white",
							padding: 20,
							borderRadius: 10,
							width: "90%",
							height: "auto",
							elevation: 5,
							alignItems: "center",
							justifyContent: "center",
							gap: SPACING.space_15,
						},
						animatedStyle,
					]}
				>
					<Image
						source={require("@/assets/biometrics-icon.png")}
						style={{
							height: 39,
							width: 39,
						}}
					/>

					<View
						style={{
							justifyContent: "center",
						}}
					>
						<Text
							style={{
								fontFamily: "PoppinsSemiBold",
								fontSize: FONTSIZE.size_24,
								textAlign: "center",
								color: Colors.black,
							}}
						>
							Enable Biometrics
						</Text>
						<Text
							style={{
								fontFamily: "PoppinsLight",
								fontSize: FONTSIZE.size_11,
								textAlign: "center",
								marginBottom: SPACING.space_8,
							}}
						>
							Log in & authorise transactions with Face ID.
						</Text>
					</View>

					<View
						style={{
							flexDirection: "row",
							gap: SPACING.space_20,
						}}
					>
						<Button
							buttonText="Cancel"
							variant="outline-dark"
							width="fit"
							onPress={closeModal}
						/>
						<Button
							variant="primary"
							buttonText="Enable"
							width="fit"
							onPress={closeModal}
						/>
					</View>
				</Animated.View>
			</View>
		</Modal>
	);
};

export default BiometricsModal;
