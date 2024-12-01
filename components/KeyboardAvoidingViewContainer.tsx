import {
	View,
	Platform,
	KeyboardAvoidingView,
	StyleSheet,
	ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { KEYBOARD_VERTICAL_OFFSET, statusBarHeight } from "@/constants";
import { ThemeContext } from "@/provider/ThemeProvider";
import { SPACING } from "@/constants/Theme";
import { Keyboard } from "react-native";

const KeyboardAvoidingViewContainer = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { isDarkMode, theme } = useContext(ThemeContext);
	const [iosOffset, setIosOffset] = useState<number>(0);

	return (
		<KeyboardAvoidingView
			style={[styles.container, { backgroundColor: theme.background }]}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
		>
			<ScrollView
				style={{ flexGrow: 1 }}
				contentContainerStyle={{
					flexGrow: 1,
					paddingTop: statusBarHeight + 20,
					paddingHorizontal: SPACING.space_20,
					paddingBottom:
						Platform.OS === "ios" ? SPACING.space_30 : SPACING.space_20,
					justifyContent: "space-between",
					gap: SPACING.space_20,
				}}
				showsVerticalScrollIndicator={false}
				bounces={false}
			>
				{children}
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default KeyboardAvoidingViewContainer;
