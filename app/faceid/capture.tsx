import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Camera, CameraType } from "expo-camera";
// import * as FaceDetector from 'expo-face-detector';

const Capture = () => {
	const [hasPermission, setHasPermission] = useState(null);
	const [faceDetected, setFaceDetected] = useState(false);
	const [livenessScore, setLivenessScore] = useState(0);
	// const [cameraType, setCameraType] = useState(CameraType.back);
	const cameraRef = useRef(null);

	// useEffect(() => {
	// 	(async () => {
	// 		const { status } = await Camera.requestCameraPermissionsAsync();
	// 		setHasPermission(status === 'granted');
	// 	})();
	// }, []);

	// const handleFacesDetected = ({ faces }: FaceDetectionResult) => {
	// 	if (faces.length > 0) {
	// 		setFaceDetected(true);
	// 		if (faces[0]) {
	// 			checkLiveness(faces[0]);
	// 		}
	// 	} else {
	// 		setFaceDetected(false);
	// 		setLivenessScore(0);
	// 	}
	// };

	// const checkLiveness = (face: FaceDetector.FaceFeature) => {
	// 	let score = 0;

	// 	// Check for eye blink
	// 	if (face.leftEyeOpenProbability < 0.2 && face.rightEyeOpenProbability < 0.2) {
	// 		score += 0.3;
	// 	}

	// 	// Check for smile
	// 	if (face.smilingProbability > 0.7) {
	// 		score += 0.3;
	// 	}

	// 	// Check for head rotation
	// 	if (Math.abs(face.yawAngle) > 10 || Math.abs(face.rollAngle) > 10) {
	// 		score += 0.4;
	// 	}

	// 	setLivenessScore(score);
	// };

	if (hasPermission === null) {
		return (
			<View>
				<Text>Requesting camera permission...</Text>
			</View>
		);
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={styles.container}>
			{hasPermission && (
				<View>
					<Text>Camera</Text>
				</View>
				// <Camera
				// 	style={styles.camera}
				// 	type={cameraType}
				// 	ref={cameraRef}
				// 	onFacesDetected={handleFacesDetected}
				// 	faceDetectorSettings={{
				// 		mode: FaceDetector.FaceDetectorMode.fast,
				// 		detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
				// 		runClassifications: FaceDetector.FaceDetectorClassifications.all,
				// 		minDetectionInterval: 100,
				// 		tracking: true,
				// 	}}
				// >
				// 	<View style={styles.captureArea}>
				// 		<View style={styles.outlineCircle} />
				// 	</View>
				// </Camera>
			)}
			<Text style={styles.capturingText}>
				{faceDetected ? "Face Detected" : "No Face Detected"}
			</Text>
			<Text style={styles.capturingText}>
				Liveness Score: {livenessScore.toFixed(2)}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
	},
	captureArea: {
		width: "80%",
		aspectRatio: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	outlineCircle: {
		width: "100%",
		height: "100%",
		borderRadius: 1000,
		borderWidth: 2,
		borderColor: "#FF6B00",
		borderStyle: "dashed",
	},
	capturingText: {
		marginTop: 20,
		fontSize: 18,
		color: "#000000",
	},
	camera: {
		flex: 1,
		width: "100%",
	},
});

export default Capture;
