import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/provider/ThemeProvider";
import { FONTSIZE } from "@/constants/Theme";

export default function PageHeader({
	header,
	subHeader,
	variant = "left",
}: {
	header: string;
	subHeader?: string;
	variant?: "left" | "center";
}) {
	const { isDarkMode, theme } = useContext(ThemeContext);
	return (
		<View style={{ gap: Colors.spacing / 4 }}>
			<Text
				style={[
					styles.header,
					{
						color: theme.pageTextColor,
						textAlign: variant === "center" ? "center" : "left",
					},
				]}
			>
				{header}
			</Text>
			{subHeader && (
				<Text
					style={[
						styles.subHeader,
						{
							color: theme.text,
							textAlign: variant === "center" ? "center" : "left",
						},
					]}
				>
					{subHeader}
				</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		fontSize: FONTSIZE.size_24,
		fontFamily: "PoppinsSemiBold",
	},
	subHeader: {
		fontFamily: "PoppinsLight",
		fontSize: 11,
	},
});
