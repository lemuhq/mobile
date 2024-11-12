import { FONTSIZE, SPACING } from "@/constants/Theme";
import { ModalContext } from "@/provider/ModalProvider";
import React, { useContext } from "react";
import {
	Image,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Button from "../Button";
import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BottomSheetModal from "./BottomSheetModal";

const EmailVerificationModal = () => {
	const { emailVerificationOpen, toggleEmailVerification } =
		useContext(ModalContext);

	return (
		<BottomSheetModal
			isOpen={emailVerificationOpen}
			onDismiss={toggleEmailVerification}
		>
			<View
				style={[
					{
						backgroundColor: "#fff",

						width: "100%",

						paddingHorizontal: SPACING.space_20,
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
				<View
					style={{
						flexDirection: "row",
						justifyContent: "flex-end",
					}}
				>
					<TouchableOpacity onPress={toggleEmailVerification}>
						<MaterialCommunityIcons
							name="close"
							size={24}
							color="black"
						/>
					</TouchableOpacity>
				</View>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",

						height: hp("70%"),
					}}
				>
					<View
						style={{
							height: Platform.OS === "ios" ? hp("10%") : hp("11%"),
							width: wp("23%"),
							borderRadius: wp("100%"),

							marginBottom: SPACING.space_20,
							overflow: "hidden",
						}}
					>
						<Image
							source={require("@/assets/email-verify.png")}
							style={{
								width: "100%",
								height: "100%",
								backgroundColor: Colors.whiteSmoke,
								// borderRadius: BORDERRADIUS.radius_25 * 2,
							}}
						/>
					</View>
					<View>
						<Text style={styles.infoHeader}>
							Verify your email address
						</Text>
						<Text style={styles.infoText}>
							Well done, you’re almost there. We will send an email to
							your address via afy@gmail.com.
						</Text>
						<Text style={styles.infoText}>
							PS. If you don’t see this email, you may need to check your
							spam folder.
						</Text>
						<Text style={styles.infoText}>
							Click the button below to complete this process.
						</Text>
					</View>
				</View>
				<Button variant="primary" buttonText="Verify email address" />
			</View>
		</BottomSheetModal>
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
