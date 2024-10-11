import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/provider/ThemeProvider";

export default function OnboardingPagination({
	data,
	currentIndex,
}: {
	data: any[];
	currentIndex: number;
}) {
	const { isDarkMode, theme } = useContext(ThemeContext);
	return (
		<View style={styles.container}>
			{data?.map((_, idx) => (
				<View
					style={[
						styles.line,
						{
							backgroundColor:
								currentIndex >= idx
									? Colors.orange
									: isDarkMode
									? Colors.white
									: Colors.gray,
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
