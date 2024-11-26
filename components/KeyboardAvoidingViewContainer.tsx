import {
	View,
	Platform,
	KeyboardAvoidingView,
	StyleSheet,
	ScrollView,
} from "react-native";
import React from "react";

const KeyboardAvoidingViewContainer = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const KEYBOARD_VERTICAL_OFFSET = Platform.OS === "android" ? 20 : 0;
	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
		>
			<ScrollView contentContainerStyle={styles.content}>
				{children}
			</ScrollView>
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
