import { BORDERRADIUS, FONTSIZE, SPACING } from "@/constants/Theme";
import { ModalContext } from "@/provider/ModalProvider";
import React, { useContext, useEffect, useRef } from "react";
import {
	Dimensions,
	Image,
	Modal,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Button from "../Button";
import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("screen");

const EmailVerificationModal = () => {
	const { emailVerificationOpen, toggleEmailVerification } =
		useContext(ModalContext);

	const translateY = useSharedValue(SCREEN_HEIGHT);

	const closeModal = () => {
		translateY.value = withSpring(SCREEN_HEIGHT, { damping: 20 }, () => {
			runOnJS(toggleEmailVerification)();
		});
	};

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: translateY.value }],
		};
	});

	useEffect(() => {
		if (emailVerificationOpen) {
			translateY.value = withSpring(0, { damping: 20 });
		}
	}, [emailVerificationOpen]);

	return (
		<Modal
			transparent
			visible={emailVerificationOpen}
			animationType="none"
			onRequestClose={closeModal}
		>
			<>
				<View
					style={[
						{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							flex: 1,
							zIndex: 1,
							backgroundColor: "rgba(0,0,0,.8)",
							height: "100%",
						},
						,
					]}
				>
					<Animated.View
						style={[
							animatedStyle,
							{
								backgroundColor: "#fff",
								position: "absolute",
								bottom: 0,
								height:
									Platform.OS === "ios"
										? SCREEN_HEIGHT - 70
										: SCREEN_HEIGHT - 100,
								width: "100%",
								borderTopRightRadius: BORDERRADIUS.radius_25,
								borderTopLeftRadius: BORDERRADIUS.radius_25,
								padding: SPACING.space_20,
								overflow: "hidden",
								zIndex: 2,
								paddingBottom:
									Platform.OS === "ios"
										? SPACING.space_30
										: SPACING.space_10,
								flex: 1,
							},
						]}
					>
						<TouchableOpacity
							style={{
								position: "absolute",
								right: SPACING.space_20,
								top: "3%",
								zIndex: 3,
							}}
							onPress={closeModal}
						>
							<MaterialCommunityIcons
								name="close"
								size={24}
								color="black"
							/>
						</TouchableOpacity>
						<View
							style={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Image
								source={require("@/assets/email-verify.png")}
								style={{
									width: 93,
									height: 93,
									backgroundColor: Colors.whiteSmoke,
									borderRadius: BORDERRADIUS.radius_25 * 2,
									marginBottom: SPACING.space_20,
								}}
							/>
							<View>
								<Text style={styles.infoHeader}>
									Verify your email address
								</Text>
								<Text style={styles.infoText}>
									Well done, you’re almost there. We will send an email
									to your address via afy@gmail.com.
								</Text>
								<Text style={styles.infoText}>
									PS. If you don’t see this email, you may need to
									check your spam folder.
								</Text>
								<Text style={styles.infoText}>
									Click the button below to complete this process.
								</Text>
							</View>
						</View>
						<Button variant="primary" buttonText="Verify email address" />
					</Animated.View>
				</View>
			</>
		</Modal>
	);
};

const styles = StyleSheet.create({
	infoHeader: {
		fontFamily: "PoppinsSemiBold",
		fontSize: FONTSIZE.size_24,
		textAlign: "center",
		color: Colors.black,
	},
	infoText: {
		fontFamily: "PoppinsLight",
		fontSize: FONTSIZE.size_11,
		textAlign: "center",
		marginBottom: SPACING.space_8,
	},
});

export default EmailVerificationModal;
