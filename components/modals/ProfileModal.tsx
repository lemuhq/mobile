import {
	View,
	Text,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	Image,
	Modal,
	ScrollView,
	Platform,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { ModalContext } from "@/provider/ModalProvider";
import { BORDERRADIUS, FONTSIZE, SPACING } from "@/constants/Theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors";
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("screen");

const ProfileModal = () => {
	const { profileOpen, toggleProfileVisible } = useContext(ModalContext);

	const translateY = useSharedValue(SCREEN_HEIGHT);

	const closeModal = () => {
		translateY.value = withSpring(SCREEN_HEIGHT, { damping: 20 }, () => {
			runOnJS(toggleProfileVisible)();
		});
	};

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: translateY.value }],
		};
	});

	useEffect(() => {
		if (profileOpen) {
			translateY.value = withSpring(0, { damping: 20 });
		}
	}, [profileOpen]);

	return (
		<Modal
			transparent
			visible={profileOpen}
			animationType="none"
			onRequestClose={closeModal}
		>
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
								width: 200,
								height: 200,
								borderTopLeftRadius: 50,
								borderBottomRightRadius: 50,
								paddingTop: SPACING.space_10,
								// backgroundColor: "red",
							}}
						>
							<Image
								source={require("@/assets/profile-scanner.png")}
								style={{
									width: 150,
									height: 150,

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
				</Animated.View>
			</View>
		</Modal>
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