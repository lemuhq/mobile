import { View, ModalProps, StyleSheet, TouchableOpacity } from "react-native";
import React, { FC, ReactNode } from "react";
import Modal from "react-native-modal";
import { BORDERRADIUS, SPACING } from "@/constants/Theme";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface IProps {
	isOpen: boolean;
	onDismiss: () => void;
	children: ReactNode;
	fullHeight?: boolean;
	isRounded?: boolean;
}

const BottomSheetModal: FC<IProps> = ({
	isOpen,
	onDismiss,
	children,
	fullHeight,
	isRounded = true,
}) => {
	return (
		<Modal
			isVisible={isOpen}
			statusBarTranslucent={false}
			backdropColor="black"
			backdropOpacity={0.5}
			style={{
				padding: 0,
				margin: 0,
			}}
		>
			<View style={styles.contentWrapper}>
				<TouchableOpacity style={styles.overlay} onPress={onDismiss} />
				<View
					style={[
						styles.modalContent,
						{
							maxHeight: fullHeight ? hp("100%") : hp("92%"),
							height: fullHeight ? "100%" : "auto",
							paddingVertical: fullHeight ? 0 : SPACING.space_20,
							borderTopLeftRadius: isRounded
								? BORDERRADIUS.radius_20
								: 0,
							borderTopRightRadius: isRounded
								? BORDERRADIUS.radius_20
								: 0,
						},
					]}
				>
					{children}
				</View>
			</View>
		</Modal>
	);
};

export default BottomSheetModal;

const styles = StyleSheet.create({
	contentWrapper: {
		flex: 1,
		backgroundColor: "transparent",
		width: wp("100%"),
		position: "relative",
	},
	overlay: {
		...StyleSheet.absoluteFillObject, // Covers the entire screen
	},

	modalContent: {
		width: wp("100%"),
		backgroundColor: "white",
		left: 0,
		right: 0,
		bottom: 0,
		position: "absolute",

		// borderTopLeftRadius: BORDERRADIUS.radius_20,
		// borderTopRightRadius: BORDERRADIUS.radius_20,
	},
});
