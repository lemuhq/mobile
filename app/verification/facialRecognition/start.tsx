import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from "@/provider/ThemeProvider";
import { Colors } from "@/constants/Colors";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import Button from "@/components/Button";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";


const Start = () => {
	const { isDarkMode, theme } = useContext(ThemeContext);

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
			<StatusBar style={isDarkMode ? "light" : "dark"} />
			<View style={styles.header}>
				<TouchableOpacity onPress={() => router.back()}>
					<Ionicons name="arrow-back-outline" size={24} color={theme.text} />
				</TouchableOpacity>
				<Text style={[styles.stepText, { color: theme.text }]}>
					<Text style={{ fontFamily: "PoppinsSemiBold" }}>Step 2/</Text>3
				</Text>
			</View>
			
			<View style={styles.content}>
				<Text style={[styles.title, { color: theme.pageTextColor }]}>Lemu ID</Text>
				<View style={styles.iconContainer}>
					<Ionicons name="scan-outline" size={100} color={Colors.orange} />
					<View style={styles.smileIcon}>
						<Ionicons name="happy-outline" size={50} color={Colors.white} />
					</View>
				</View>
				
				<Text style={[styles.note, { color: theme.text }]}>
					Note: Please ensure that your <Text style={styles.highlight}>lighting is good</Text>, your face is <Text style={styles.highlight}>inside the frame</Text>, and you're <Text style={styles.highlight}>not wearing glasses</Text>.
				</Text>
			</View>
			
			<Button
                  
				buttonText="Start"
				onPress={() => {
                    router.navigate("/verification/facialRecognition/capture");
					// Handle start action
				}}
				variant="primary"
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
        paddingVertical: 20,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: SPACING.space_20,
	},
	stepText: {
		fontSize: 16,
		fontFamily: "PoppinsLight",
	},
	content: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
        paddingHorizontal: SPACING.space_20,
        paddingTop: SPACING.space_20,
	},
	title: {
		fontSize: FONTSIZE.size_28,
		fontFamily: "PoppinsBold",
		marginBottom: SPACING.space_20,
	},
	iconContainer: {
		position: 'relative',
		marginBottom: SPACING.space_36,
	},
	smileIcon: {
		position: 'absolute',
		bottom: 22,
		backgroundColor: Colors.orange,
		borderRadius: 25,
        padding: 3,
        left: 22
		
	},
	note: {
		fontSize: FONTSIZE.size_12,
		textAlign: 'center',
		fontFamily: "PoppinsLight",
		paddedHorizontal: SPACING.space_20,
		marginBottom: SPACING.space_36,
	},
	highlight: {
		color: Colors.orange,
		fontFamily: "PoppinsSemiBold",
	},
    button: {
       paddingHorizontal: SPACING.space_20,
       paddingVertical: SPACING.space_10,
    }
});

export default Start;
