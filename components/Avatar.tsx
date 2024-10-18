import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

interface IProps {
	imageUrl: any;
	variant?: "sm" | "md" | "lg";
}

export default function Avatar({ imageUrl, variant = "md" }: IProps) {
	return (
		<View
			style={[
				styles.avatar,
				{
					width: variant === "sm" ? 25 : variant === "md" ? 70 : 93,
					height: variant === "sm" ? 25 : variant === "md" ? 70 : 93,
				},
			]}
		>
			<Image
				source={imageUrl}
				style={{
					resizeMode: "cover",
					width: "100%",
					height: "100%",
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	avatar: {
		borderRadius: 50,
		overflow: "hidden",
		backgroundColor: "gray",
	},
});
