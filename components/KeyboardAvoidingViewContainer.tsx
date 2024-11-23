import { View, Platform, KeyboardAvoidingView, StyleSheet } from "react-native";
import React from "react";

const KeyboardAvoidingViewContainer = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const KEYBOARD_VERTICAL_OFFSET = Platform.OS === "android" ? 60 : 75;
	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
		>
			<View style={styles.content}>{children}</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		width: "100%",
	},
	content: {
		flex: 1,
	},
});

export default KeyboardAvoidingViewContainer;
