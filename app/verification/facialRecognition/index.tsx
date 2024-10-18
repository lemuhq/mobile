import React, { useContext } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	SafeAreaView,
	Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ThemeContext } from "@/provider/ThemeProvider";
import globalStyles from "@/styles/global.styles";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import { StatusBar } from "expo-status-bar";
import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";

const Index = () => {
	const { isDarkMode, theme } = useContext(ThemeContext);
	return (
		<SafeAreaView
			style={[
				{
					flex: 1,
					backgroundColor: theme.background,
					paddingTop: Platform.OS === "android" ? SPACING.space_30 : 0,
					paddingBottom: Platform.OS === "android" ? SPACING.space_10 : 0,
				},
			]}
		>
			<StatusBar style={isDarkMode ? "light" : "dark"} />
			<View
				style={{
					// paddingTop: SPACING.space_10,
					paddingHorizontal: SPACING.space_20,
					flex: 1,
				}}
			>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						// paddingHorizontal: SPACING.space_10,
					}}
				>
					<TouchableOpacity onPress={() => router.back()}>
						<Ionicons
							name="arrow-back-outline"
							size={30}
							color={theme.text}
						/>
					</TouchableOpacity>

					<Text
						style={{
							color: theme.text,
							fontFamily: "PoppinsLight",
							fontSize: FONTSIZE.size_20,
						}}
					>
						<Text style={{ fontFamily: "PoppinsSemiBold" }}>Step 2/</Text>
						3
					</Text>
				</View>

				<View style={styles.content}>
					<PageHeader
						header="Take a selfie"
						subHeader="We require this selfie to verify your identity"
						variant="center"
					/>

					<View style={styles.selfieContainer}>
						<Ionicons name="person" size={64} color="#000" />
					</View>

					<Text style={[styles.note, { color: theme.text }]}>
						Note: Please ensure that your{" "}
						<Text style={styles.highlight}>lighting is good</Text>, your
						face is <Text style={styles.highlight}>inside the frame</Text>
						, and you're{" "}
						<Text style={styles.highlight}>not wearing glasses</Text>.
					</Text>
				</View>

				<Button
					buttonText="Take a selfie"
					onPress={() => {
						router.navigate("/verification/facialRecognition/start");
					}}
					isLoading={false}
					disabled={false}
					variant="primary"
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingTop: 20,
	},
	stepText: {
		fontSize: 16,
		fontFamily: "PoppinsBold",
	},
	content: {
		flex: 1,
		alignItems: "center",

		paddingTop: SPACING.space_30 + 10,
	},
	title: {
		fontSize: 28,
		fontFamily: "PoppinsBold",
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 40,
	},
	selfieContainer: {
		width: 300,
		height: 300,
		borderRadius: 200,
		backgroundColor: "#f0f0f0",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 40,
		marginTop: 40,
	},
	note: {
		fontSize: 14,
		textAlign: "center",
		paddingHorizontal: 20,
	},
	highlight: {
		color: "#ff6600", // Adjust this color to match your theme
		fontFamily: "PoppinsBold",
	},
	button: {
		backgroundColor: "#ff6600", // Adjust this color to match your theme
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderRadius: 10,
		marginBottom: 20,
		marginHorizontal: 20,
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		fontFamily: "PoppinsBold",
		textAlign: "center",
	},
});

export default Index;
