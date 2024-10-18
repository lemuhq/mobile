import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ThemeContext } from "@/provider/ThemeProvider";
import { Colors } from "@/constants/Colors";
import { FONTSIZE, SPACING, BORDERRADIUS } from "@/constants/Theme";
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";

const TakeSelfie = () => {
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
				<PageHeader
					header="Take a selfie"
					subHeader="We require this selfie to verify your identity"
					variant="center"
				/>

				<View style={styles.selfieContainer}>
					<Image
						source={require('@/assets/default-user.png')}
						style={styles.selfieImage}
					/>
				</View>

				<TouchableOpacity style={styles.retakeButton}>
					<Text style={styles.retakeButtonText}>Retake Selfie</Text>
					<Ionicons name="camera-outline" size={20} color={Colors.orange} />
				</TouchableOpacity>

				<Text style={[styles.note, { color: theme.text }]}>
					Note: Please ensure that your <Text style={styles.highlight}>lighting is good</Text>, your face is <Text style={styles.highlight}>inside the frame</Text>, and you're <Text style={styles.highlight}>not wearing glasses</Text>.
				</Text>
			</View>

			<Button
				buttonText="Set up account"
				onPress={() => {
					// Handle set up account action
				}}
				variant="primary"
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
		paddingHorizontal: SPACING.space_20,
		paddingVertical: SPACING.space_20,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: SPACING.space_20,
	},
	stepText: {
		fontSize: FONTSIZE.size_16,
		fontFamily: "PoppinsLight",
	},
	content: {
		flex: 1,
		alignItems: 'center',
	},
	selfieContainer: {
		width: '80%',
		aspectRatio: 1,
		borderRadius: 1000,
		overflow: 'hidden',
		marginVertical: SPACING.space_36,
	},
	selfieImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
	retakeButton: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: Colors.orange,
		borderRadius: BORDERRADIUS.radius_25,
		paddingHorizontal: SPACING.space_16,
		paddingVertical: SPACING.space_8,
		marginBottom: SPACING.space_20,
	},
	retakeButtonText: {
		color: Colors.orange,
		marginRight: SPACING.space_8,
		fontFamily: 'PoppinsRegular',
	},
	note: {
		fontSize: FONTSIZE.size_12,
		textAlign: 'center',
		fontFamily: "PoppinsLight",
		marginBottom: SPACING.space_36,
	},
	highlight: {
		color: Colors.orange,
		fontFamily: "PoppinsSemiBold",
	},
});

export default TakeSelfie;
