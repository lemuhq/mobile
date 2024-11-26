import { View, Text, TouchableOpacity } from "react-native";
import React, { FC, useContext } from "react";
import { ModalContext } from "@/provider/ModalProvider";
import BottomSheetModal from "./BottomSheetModal";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";
import { Colors } from "@/constants/Colors";
import { BORDERRADIUS, FONTSIZE, SPACING } from "@/constants/Theme";
import { fontSizes, SCREEN_HEIGHT, SCREEN_WIDTH } from "@/constants";

interface ModalProps {
	header: string;
	subHeader?: string;
	handleProceed?: () => void;
}

const SuccessScreenModal: FC<ModalProps> = ({ header, subHeader }) => {
	const { toggleSuccessScreen, successScreenVisible } =
		useContext(ModalContext);
	return (
		<BottomSheetModal
			isOpen={successScreenVisible}
			onDismiss={toggleSuccessScreen}
			fullHeight={true}
			isRounded={false}
		>
			<StatusBar style="dark" />
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: Colors.gunMetal,
					position: "relative",
					overflow: "hidden",
				}}
			>
				<View
					style={{
						alignItems: "center",
						justifyContent: "center",
						zIndex: 2,
					}}
				>
					<View
						style={{
							width: 68,
							height: 68,
							overflow: "hidden",
							marginBottom: SPACING.space_20,
						}}
					>
						<Image
							source={require(`@/assets/success-icon.png`)}
							style={{
								resizeMode: "cover",
								width: "100%",
								height: "100%",
								zIndex: -1,
							}}
						/>
					</View>
					<Text
						style={{
							color: "#fff",
							marginBottom: SPACING.space_10,
							fontFamily: "PoppinsSemiBold",
							fontSize: fontSizes.FONT28,
							textAlign: "center",
						}}
					>
						{header}
					</Text>
					<Text
						style={{
							color: "#fff",
							marginBottom: SPACING.space_10,
							fontFamily: "PoppinsLight",
							fontSize: fontSizes.FONT16,
							textAlign: "center",
							paddingHorizontal: SPACING.space_20,
						}}
					>
						{subHeader}
					</Text>

					{/* {handleProceed && (
						<TouchableOpacity
							style={{
								backgroundColor: "transparent",
								borderWidth: 1,
								borderColor: Colors.white,
								paddingHorizontal: SPACING.space_30,
								paddingVertical: SPACING.space_10,
								borderRadius: BORDERRADIUS.radius_10,
							}}
							onPress={handleProceed}
						>
							<Text
								style={{
									color: Colors.white,
									fontFamily: "PoppinsMedium",
									fontSize: FONTSIZE.size_14,
									textAlign: "center",
								}}
							>
								Done
							</Text>
						</TouchableOpacity>
					)} */}
				</View>
				<View
					style={{
						position: "absolute",
						bottom: 0,
						left: 0,
						width: SCREEN_WIDTH,
						height: SCREEN_HEIGHT / 1.5,
					}}
				>
					<Image
						source={require(`@/assets/success-bg.png`)}
						style={{
							resizeMode: "cover",
							width: "100%",
							height: "100%",
							zIndex: -1,
						}}
					/>
				</View>
			</View>
		</BottomSheetModal>
	);
};

export default SuccessScreenModal;
