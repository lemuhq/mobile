import {
	View,
	Text,
	Platform,
	TouchableOpacity,
	StyleSheet,
	Image,
} from "react-native";
import React, { FC, useContext } from "react";
import BottomSheetModal from "./BottomSheetModal";
import { ModalContext } from "@/provider/ModalProvider";
import { BORDERRADIUS, FONTSIZE, SPACING } from "@/constants/Theme";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { User } from "@/types/user";
import { BeneficiaryUser } from "@/types/transfer";
import Button from "../Button";

interface ModalProps {
	amount: string;
	currentUser: User;
	beneficiaryUser: BeneficiaryUser;
	handleProceed: () => void;
}

const ConfirmTransactionModal: FC<ModalProps> = ({
	amount,
	currentUser,
	beneficiaryUser,
	handleProceed,
}) => {
	const { confirmTransactionOpen, toggleConfirmTransactionModal } =
		useContext(ModalContext);

	return (
		<BottomSheetModal
			isOpen={confirmTransactionOpen}
			onDismiss={toggleConfirmTransactionModal}
		>
			<View
				style={[
					{
						width: "100%",
						paddingHorizontal: SPACING.space_20,
						overflow: "hidden",
						zIndex: 2,
						paddingBottom:
							Platform.OS === "ios"
								? SPACING.space_30
								: SPACING.space_10,
						flex: 1,
						gap: 20,
					},
				]}
			>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<Text>Confirm transaction</Text>
					<TouchableOpacity onPress={toggleConfirmTransactionModal}>
						<MaterialCommunityIcons
							name="close"
							size={24}
							color="black"
						/>
					</TouchableOpacity>
				</View>
				<LinearGradient
					colors={["#F99B6D", "#FF6113", "#FF6113"]}
					// Start at the left side
					start={{ x: 0, y: 0 }}
					// End at the right side
					end={{ x: 1, y: 0 }}
					style={styles.trendItem}
				>
					<LinearGradient
						colors={["#414346", "#000"]}
						style={{
							width: 58,
							height: 58,
							borderRadius: wp("100%"),
							backgroundColor: "white",
							justifyContent: "center",
							alignItems: "center",
							borderWidth: 2,
							borderColor: Colors.orange,
						}}
					>
						<Image
							source={require(`@/assets/lemu-icon.png`)}
							style={{
								width: 20,
								height: 20,
								resizeMode: "contain",
							}}
						/>
					</LinearGradient>
					<Text
						style={{
							zIndex: 2,
							fontFamily: "PoppinsSemiBold",
							fontSize: wp("5%"),
							color: Colors.white,
						}}
					>
						₦ {amount}
					</Text>
					<Image
						source={require(`@/assets/trend-pattern.png`)}
						style={{
							width: 230,
							height: 180,
							resizeMode: "contain",
							position: "absolute",
							top: -38,
							right: -40,
							opacity: 0.5,
						}}
					/>
				</LinearGradient>

				<View style={styles.userInfoWrapper}>
					<View style={styles.infoItem}>
						<Text style={styles.infoTitle}>From</Text>
						<View style={styles.descContainer}>
							<Text style={styles.infoHeader}>
								{currentUser?.accountName}
							</Text>
							<Text style={styles.infoDesc}>
								{currentUser?.accountNumber}
							</Text>
						</View>
					</View>

					<View style={styles.infoItem}>
						<Text style={styles.infoTitle}>To</Text>
						<View style={styles.descContainer}>
							<Text style={styles.infoHeader}>
								{beneficiaryUser?.accountName}
							</Text>
							<Text style={styles.infoDesc}>
								{beneficiaryUser?.accountNumber}
							</Text>
						</View>
					</View>

					<View style={styles.infoItem}>
						<Text style={styles.infoTitle}>Fee</Text>
						<View style={styles.descContainer}>
							<Text style={styles.feeText}>₦ 15.00</Text>
						</View>
					</View>
				</View>

				<Button buttonText="Send money" onPress={handleProceed} />
			</View>
		</BottomSheetModal>
	);
};

export default ConfirmTransactionModal;

const styles = StyleSheet.create({
	trendItem: {
		paddingHorizontal: SPACING.space_20,
		paddingVertical: SPACING.space_20,
		minHeight: 109,
		borderRadius: BORDERRADIUS.radius_10,
		overflow: "hidden",
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		position: "relative",
	},

	userInfoWrapper: {
		width: "100%",
		backgroundColor: Colors.whiteSmoke,
		paddingHorizontal: SPACING.space_10,
		paddingVertical: SPACING.space_20,
		borderRadius: BORDERRADIUS.radius_10 - 1,
		gap: SPACING.space_8,
	},

	infoItem: {
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
	},
	descContainer: {
		// backgroundColor: "red",
		width: "85%",
		gap: 10,
	},
	infoTitle: {
		fontFamily: "PoppinsMedium",
		fontSize: FONTSIZE.size_12,
		color: Colors.black,
	},
	infoHeader: {
		fontFamily: "PoppinsSemiBold",
		fontSize: FONTSIZE.size_14,
		color: Colors.black,
	},
	infoDesc: {
		fontFamily: "PoppinsLight",
		fontSize: FONTSIZE.size_12,
		color: Colors.black,
	},
	feeText: {
		fontFamily: "PoppinsBold",
		fontSize: FONTSIZE.size_14,
		color: Colors.black,
	},
});
