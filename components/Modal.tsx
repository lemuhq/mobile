import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Platform,
	Image,
} from "react-native";
import React, {
	Dispatch,
	ReactNode,
	SetStateAction,
	useCallback,
	useEffect,
	useRef,
} from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Modal({
	children,
	isOpen,
	modalType,
	setIsOpen,
}: {
	children: ReactNode;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	modalType: "scanner";
}) {
	// ref
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	// variables
	const snapPoints = ["90%"];

	useEffect(() => {
		if (isOpen) {
			bottomSheetModalRef.current?.present();
		}
	}, [isOpen]);
	const handleClose = useCallback(() => {
		bottomSheetModalRef?.current?.close();
		setIsOpen(false);
	}, []);

	return (
		<BottomSheetModal
			ref={bottomSheetModalRef}
			index={1}
			snapPoints={snapPoints}
			// onChange={handleSheetChanges}
			style={{}}
		>
			<BottomSheetView style={styles.contentContainer}>
				{children}
			</BottomSheetView>
		</BottomSheetModal>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: "grey",
	},
	sheetContainer: {
		// add horizontal space
		marginHorizontal: 24,
	},
	contentContainer: {
		flex: 1,
	},
});
