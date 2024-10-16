import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const Index = () => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Ionicons name="arrow-back" size={24} color="#000" />
				<Text style={styles.stepText}>Step 2/3</Text>
			</View>
			
			<View style={styles.content}>
				<Text style={styles.title}>Take a selfie</Text>
				<Text style={styles.subtitle}>We require this selfie to verify your identity</Text>
				
				<View style={styles.selfieContainer}>
					<Ionicons name="person" size={64} color="#000" />
				</View>
				
				<Text style={styles.note}>
					Note: Please ensure that your <Text style={styles.highlight}>lighting is good</Text>, your face is <Text style={styles.highlight}>inside the frame</Text>, and you're <Text style={styles.highlight}>not wearing glasses</Text>.
				</Text>
			</View>
			
			<TouchableOpacity
				style={styles.button}
				onPress={() => router.navigate("/verification/facialRecognition/start")}
			>
				<Text style={styles.buttonText}>Take a selfie</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingTop: 20,
	},
	stepText: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	content: {
		flex: 1,
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingTop: 40,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 16,
		textAlign: 'center',
		marginBottom: 40,
	},
	selfieContainer: {
		width: 200,
		height: 200,
		borderRadius: 100,
		backgroundColor: '#f0f0f0',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 40,
	},
	note: {
		fontSize: 14,
		textAlign: 'center',
		paddingHorizontal: 20,
	},
	highlight: {
		color: '#ff6600', // Adjust this color to match your theme
		fontWeight: 'bold',
	},
	button: {
		backgroundColor: '#ff6600', // Adjust this color to match your theme
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderRadius: 10,
		marginBottom: 20,
		marginHorizontal: 20,
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});

export default Index;
