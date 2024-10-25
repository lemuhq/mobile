import {
	View,
	Text,
	Platform,
	Dimensions,
	StyleSheet,
	SafeAreaView,
	TouchableOpacity,
	Image,
} from "react-native";
import React, {
	Dispatch,
	FC,
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
} from "react";
import {
	BottomSheetModal,
	BottomSheetView,
	BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { ModalContext } from "@/provider/ModalProvider";
import { BORDERRADIUS, FONTSIZE, SPACING } from "@/constants/Theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors";

const { height } = Dimensions.get("screen");

const ProfileModal = () => {
	const { profileOpen, handleProfileOpen } = useContext(ModalContext);
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const { dismiss, dismissAll } = useBottomSheetModal();

	const handleClose = useCallback(() => {
		bottomSheetModalRef?.current?.close();
		handleProfileOpen(false);
	}, []);

	useEffect(() => {
		if (profileOpen) {
			bottomSheetModalRef.current?.present();
		}
	}, [profileOpen]);

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
					}}
				>
					<View style={styles.profileInfoContainer}>
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
						<View style={styles.imageWrapper}>
							<Image
								source={require("@/assets/default-user.png")}
								style={{
									width: 93,
									height: 93,
									backgroundColor: Colors.whiteSmoke,
									borderRadius: BORDERRADIUS.radius_25 * 2,
									marginBottom: SPACING.space_10,
								}}
							/>
							<View>
								<Text style={styles.fullName}>Joshua Magani</Text>
								<Text style={styles.accountType}>
									Lemu Premium Account
								</Text>
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
									width: 220,
									height: 220,
									borderTopLeftRadius: 50,
									borderBottomRightRadius: 50,
									paddingTop: SPACING.space_10,
								}}
							>
								<Image
									source={require("@/assets/profile-scanner.png")}
									style={{
										width: 180,
										height: 180,
										// backgroundColor: Colors.whiteSmoke,
										// borderRadius: BORDERRADIUS.radius_25 * 2,
										marginBottom: SPACING.space_10,
										objectFit: "contain",
									}}
								/>
							</View>
							<Text style={styles.accountType}>
								Scan the QR code above to send or receive money.
							</Text>
						</View>

						{/*User profile*/}
						<View style={styles.userInfoWrapper}>
							<View>
								<Text style={styles.userTitle}>Account Name</Text>
								<Text style={styles.userName}>Joshua Magani</Text>
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
									<Text style={styles.userTitle}>Bank Name</Text>
									<Text style={styles.userName}>Safe Haven MFB</Text>
								</View>
								<TouchableOpacity
									style={{
										flexDirection: "row",
										justifyContent: "space-between",
										gap: SPACING.space_2,
									}}
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
							</View>
						</View>
					</View>
				</SafeAreaView>
			</BottomSheetView>
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
		height: Platform.OS === "ios" ? height : 0,
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
		marginBottom: SPACING.space_20,
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
