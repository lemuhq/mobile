import { View, Text, StyleSheet, Button, Image, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { router, useLocalSearchParams } from 'expo-router';
import { Camera } from "expo-camera";
import { CameraView, useCameraPermissions } from "expo-camera";
import { MaterialIcons } from '@expo/vector-icons';

export default function QRCode() {
	const { amount, type: transactionType } = useLocalSearchParams<{ amount: string; type: 'send' | 'receive' }>();
	const [hasPermission, requestPermission] = useCameraPermissions();
	const [scanned, setScanned] = useState(false);
	const [zoom, setZoom] = useState(0);
	const [facing, setFacing] = useState<'front' | 'back'>('back');

	useEffect(() => {
		(async () => {
			if (!hasPermission) {
				await requestPermission();
			}
		})();
	}, [hasPermission, requestPermission]);

	const handleBarCodeScanned = ({ type, data }: BarCodeScanningResult) => {
		setScanned(true);
		router.push({
			pathname: '/(tabs)/scan/confirm',
			params: {
				scannedData: data,
				amount: amount,
				type: transactionType,
			}
		});
		
		
		console.log('Scanned Amount:', amount);
		console.log('Transaction Type:', transactionType);
		console.log('Scanned Data:', data);
	};

	const handleZoomChange = (value: number) => {
		setZoom(Math.max(0, Math.min(1, value)));
	};

	if (hasPermission === null) {
		return <Text>Requesting camera permission...</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image
					source={require("../../../assets/SplashLogoTwo.png")}
					style={styles.logo}
				/>
				<Pressable 
					onPress={() => {
                        // bacck to scan page
                        router.navigate('/(tabs)/scan');
                    }} 
					style={styles.closeButton}
				>
					<MaterialIcons 
						name="close" 
						size={24} 
						color="#FF6B00"
					/>
				</Pressable>
				
			</View>

			<View style={styles.cameraContainer}>
				<CameraView
					style={styles.camera}
					facing={facing}
					onBarcodeScanned={handleBarCodeScanned}
					zoom={zoom}
				/>
				<View style={styles.qrFrame}>
					{/* QR frame overlay */}
				</View>
			</View>

			<View style={styles.footer}>
				<View style={styles.slider}>
					<View 
						style={[
							styles.sliderTrack, 
							{ width: `${zoom * 100}%` }
						]} 
					/>
					<View 
						style={[
							styles.sliderThumb,
							{ left: `${zoom * 100}%` }
						]} 
					/>
					<Pressable 
						style={styles.sliderPressable}
						onTouchMove={(e) => {
							const { locationX } = e.nativeEvent;
							const sliderWidth = e.currentTarget.measure((x, y, width) => {
								const newZoom = Math.max(0, Math.min(1, locationX / width));
								handleZoomChange(newZoom);
							});
						}}
					/>
				</View>
				<Text style={styles.footerText}>Adjust zoom to scan</Text>
                <Pressable 
					onPress={() => setFacing(facing === 'front' ? 'back' : 'front')}
					style={styles.iconButton}
				>
					<MaterialIcons 
						name={facing === 'front' ? 'camera-rear' : 'camera-front'} 
						size={24} 
						color="#FF6B00"
					/>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 20,
		paddingTop: 40,
	},
	logo: {
		width: 100,
		height: 30,
		resizeMode: 'contain',
	},
	closeButton: {
		color: '#fff',
		fontSize: 24,
	},
	cameraContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	camera: {
		width: '100%',
		height: '100%',
	},
	qrFrame: {
		position: 'absolute',
		width: 250,
		height: 250,
		borderWidth: 2,
		borderColor: '#fff',
		borderRadius: 20,
	},
	footer: {
		padding: 20,
		alignItems: 'center',
	},
	slider: {
		width: '80%',
		height: 4,
		backgroundColor: '#333',
		borderRadius: 2,
		marginBottom: 20,
	},
	sliderTrack: {
		position: 'absolute',
		left: 0,
		width: '30%',
		height: '100%',
		backgroundColor: '#FF6B00',
		borderRadius: 2,
	},
	sliderThumb: {
		position: 'absolute',
		left: '30%',
		width: 20,
		height: 20,
		backgroundColor: '#FF6B00',
		borderRadius: 10,
		transform: [{ translateX: -10 }, { translateY: -8 }],
	},
	footerText: {
		color: '#000',
		fontSize: 20,
		textAlign: 'center',
		fontFamily: 'System',
	},
	sliderPressable: {
		position: 'absolute',
		width: '100%',
		height: 20,
		backgroundColor: 'transparent',
	},
	iconButton: {
		padding: 10,
		marginTop: 10,
	},
});