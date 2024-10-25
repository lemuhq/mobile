import { BORDERRADIUS, FONTSIZE, SPACING } from "@/constants/Theme";
import { ModalContext } from "@/provider/ModalProvider";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useContext, useEffect, useRef } from "react";
import {
	Dimensions,
	Image,
	Platform,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Button from "../Button";
import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { height } = Dimensions.get("screen");

const EmailVerificationModal = () => {
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const { emailVerificationOpen, handlEmailVerificationOpen } =
		useContext(ModalContext);

	const handleClose = useCallback(() => {
		bottomSheetModalRef?.current?.close();
		handlEmailVerificationOpen(false);
	}, []);

	useEffect(() => {
		if (emailVerificationOpen) {
			bottomSheetModalRef.current?.present();
		}
	}, [emailVerificationOpen]);

	return (
		<BottomSheetModal
			ref={bottomSheetModalRef}
			index={0}
			snapPoints={["100%"]}
			handleIndicatorStyle={{ display: "none" }}
			topInset={-30}
			onDismiss={() => {
				handleClose();
			}}
		>
			<BottomSheetView style={styles.contentContainer}>
				<SafeAreaView
					style={{
						flex: 1,
						paddingTop: Platform.OS === "android" ? SPACING.space_36 : 0,
						paddingBottom:
							Platform.OS === "android" ? SPACING.space_10 : 0,
						justifyContent: "center",
					}}
				>
					<View
						style={{
							height: height - 100,
							paddingHorizontal: SPACING.space_20,
							position: "relative",
						}}
					>
						<TouchableOpacity
							style={{
								position: "absolute",
								right: SPACING.space_20,
								top: "3%",
								zIndex: 3,
							}}
							onPress={handleClose}
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
					</View>
				</SafeAreaView>
			</BottomSheetView>
		</BottomSheetModal>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
	},
	sheetContainer: {
		marginHorizontal: 24,
	},
	contentContainer: {
		flex: 1,
		height: Platform.OS === "ios" ? height : 0,
		zIndex: 10,
		backgroundColor: "white",
	},
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
