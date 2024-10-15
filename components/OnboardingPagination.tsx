import { View, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function OnboardingPagination({
	data,
	currentIndex,
}: {
	data: any[];
	currentIndex: number;
}) {
	return (
		<View style={styles.container}>
			{data?.map((_, idx) => (
				<View
					style={[
						styles.line,
						{
							backgroundColor:
								currentIndex === idx ? Colors.orange : Colors.white,
						},
					]}
					key={idx.toString()}
				/>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		// flex: 0.5,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingTop: Colors.spacing,
		gap: Colors.spacing,
	},
	line: {
		width: 40,
		height: 2,
		// backgroundColor: Colors.orange,
	},
});
