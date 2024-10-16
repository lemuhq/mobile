import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ThemeContext } from "@/provider/ThemeProvider";
import { Colors } from "@/constants/Colors";
import { FONTSIZE, SPACING, BORDERRADIUS } from "@/constants/Theme";
import { StatusBar } from "expo-status-bar";

const Capture = () => {
	const { isDarkMode, theme } = useContext(ThemeContext);
	// const [isCapturing, setIsCapturing] = useState(false);

	// useEffect(() => {
	// 	if (isCapturing) {
	// 		// Simulating capture process
	// 		const timer = setTimeout(() => {
	// 			setIsCapturing(false);
	// 			// Uncomment the following line when you're ready to navigate to the result screen
	// 			// router.push("/verification/facialRecognition/result");
	// 		}, 3000);

	// 		return () => clearTimeout(timer);
	// 	}
	// }, [isCapturing]);

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => router.back()}>
					<Ionicons name="arrow-back" size={24} color={theme.text} />
				</TouchableOpacity>
				<Text style={styles.headerText}>Facial Recognition</Text>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: SPACING.space_20,
		paddingTop: SPACING.space_20,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: SPACING.space_20,
	},
	headerText: {
		fontSize: FONTSIZE.size_18,
		fontFamily: "PoppinsSemiBold",
	},
	captureArea: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	faceOutline: {
		width: 250,
		height: 300,
		borderWidth: 2,
		borderColor: Colors.orange,
		borderRadius: 150,
		borderStyle: 'dashed',
	},
	captureText: {
		textAlign: 'center',
		fontSize: FONTSIZE.size_16,
		fontFamily: "PoppinsRegular",
		marginVertical: SPACING.space_20,
	},
	captureButton: {
		backgroundColor: Colors.orange,
		paddingVertical: SPACING.space_15,
		paddingHorizontal: SPACING.space_20,
		borderRadius: BORDERRADIUS.radius_25,
		alignSelf: 'center',
		marginBottom: SPACING.space_20,
	},
	captureButtonText: {
		color: Colors.white,
		fontSize: FONTSIZE.size_16,
		fontFamily: "PoppinsSemiBold",
	},
});

export default Capture;
