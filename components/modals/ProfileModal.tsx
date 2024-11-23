import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	Platform,
} from "react-native";
import React, { useContext } from "react";
import { ModalContext } from "@/provider/ModalProvider";
import { BORDERRADIUS, FONTSIZE, SPACING } from "@/constants/Theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useGetCurrentUserQuery } from "@/redux/services/auth";
import BottomSheetModal from "./BottomSheetModal";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";

const ProfileModal = () => {
	const { profileOpen, toggleProfileVisible } = useContext(ModalContext);
	const { data, error, isLoading, refetch } = useGetCurrentUserQuery();
	const { handleCopyText } = useCopyToClipboard();

	return (
		<BottomSheetModal isOpen={profileOpen} onDismiss={toggleProfileVisible}>
			<View
				style={[
					{
						width: "100%",
						padding: SPACING.space_20,
						overflow: "hidden",
						zIndex: 2,
						paddingBottom:
							Platform.OS === "ios"
								? SPACING.space_30
								: SPACING.space_10,
						flex: 1,
						gap: wp("10%"),
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
					onPress={toggleProfileVisible}
				>
					<MaterialCommunityIcons name="close" size={24} color="black" />
				</TouchableOpacity>
				<View style={styles.imageWrapper}>
					<View
						style={{
							height: Platform.OS === "ios" ? hp("10%") : hp("11%"),
							width: wp("23%"),
							borderRadius: wp("100%"),

							marginBottom: SPACING.space_10,
							overflow: "hidden",
						}}
					>
						<Image
							// source={require("@/assets/default-user.png")}
							source={{ uri: data?.image }}
							style={{
								width: "100%",
								height: "100%",
								backgroundColor: Colors.whiteSmoke,
								borderRadius: wp("100%"),
								objectFit: "cover",
							}}
						/>
					</View>

					<View>
						<Text style={styles.fullName}>
							{data?.firstName + " " + data?.lastName}
						</Text>
						<Text style={styles.accountType}>Lemu Premium Account</Text>
					</View>
				</View>

				<View style={styles.scannerWrapper}>
					<View
						style={{
							// padding: 10,
							borderWidth: 2,
							borderColor: Colors.whiteSmoke,
							alignItems: "center",
							justifyContent: "center",
							width: wp("50%"),
							height: hp("25%"),
							borderTopLeftRadius: 50,
							borderBottomRightRadius: 50,
							paddingTop: SPACING.space_10,
							// backgroundColor: "red",
						}}
					>
						<Image
							source={require("@/assets/profile-scanner.png")}
							style={{
								width: "90%",
								height: "90%",

								marginBottom: SPACING.space_8,
								objectFit: "contain",
							}}
						/>
					</View>
					<Text style={styles.accountType}>
						Scan the QR code above to send or receive money.
					</Text>
				</View>

				<View style={styles.userInfoWrapper}>
					<View>
						<Text style={styles.userTitle}>Account Name</Text>
						<Text style={styles.userName}>{data?.accountName}</Text>
					</View>
					<View>
						<Text style={styles.userTitle}>Bank Name</Text>
						<Text style={styles.userName}>Safe Haven MFB</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<View>
							<Text style={styles.userTitle}>Account Number</Text>
							<Text style={styles.userName}>{data?.accountNumber}</Text>
						</View>

						{data?.accountNumber && (
							<TouchableOpacity
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									gap: SPACING.space_2,
								}}
								onPress={() => handleCopyText(data?.accountNumber)}
							>
								<Text
									style={{
										fontSize: FONTSIZE.size_12,
										fontFamily: "PoppinsMedium",
										color: Colors.black,
									}}
								>
									Copy
								</Text>
								<MaterialIcons
									name="content-copy"
									size={18}
									color={Colors.orange}
								/>
							</TouchableOpacity>
						)}
					</View>
				</View>
			</View>
		</BottomSheetModal>
	);
};

export default ProfileModal;

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

		zIndex: 10,
		backgroundColor: "white",
	},

	profileInfoContainer: {
		flex: 1,
		position: "relative",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: SPACING.space_20,
	},

	userInfoWrapper: {
		width: "100%",
		backgroundColor: Colors.whiteSmoke,
		padding: SPACING.space_10,
		borderRadius: BORDERRADIUS.radius_10 - 1,
		gap: SPACING.space_8,
	},
	userTitle: {
		fontFamily: "PoppinsLight",
		fontSize: FONTSIZE.size_10 + 1,
		marginBottom: SPACING.space_2,
	},
	userName: {
		fontFamily: "PoppinsSemiBold",
		fontSize: FONTSIZE.size_14,
		color: Colors.black,
	},

	imageWrapper: {
		alignItems: "center",
		marginBottom: SPACING.space_10,
	},
	scannerWrapper: {
		marginBottom: SPACING.space_10,
		alignItems: "center",
		justifyContent: "center",
		gap: SPACING.space_10,
	},
	fullName: {
		textAlign: "center",
		fontSize: SPACING.space_24,
		fontFamily: "PoppinsSemiBold",
		color: Colors.black,
	},
	accountType: {
		textAlign: "center",
		fontSize: FONTSIZE.size_12,
		color: Colors.black,
		fontFamily: "PoppinsLight",
	},
});
