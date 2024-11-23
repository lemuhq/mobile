import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/provider/ThemeProvider";
import { FONTSIZE } from "@/constants/Theme";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function PageHeader({
	header,
	subHeader,
	variant = "left",
	backButton = false,
}: {
	header: string;
	subHeader?: string;
	variant?: "left" | "center";
	backButton?: boolean;
}) {
	const { isDarkMode, theme } = useContext(ThemeContext);
	return (
		<View style={{ gap: Colors.spacing / 4, flexDirection: "row" }}>
			{backButton && (
				<TouchableOpacity onPress={() => router.back()}>
					<MaterialIcons
						name="keyboard-arrow-left"
						size={36}
						color="black"
					/>
				</TouchableOpacity>
			)}
			<View
				style={{
					width: wp("80%") - Colors.spacing / 4,
				}}
			>
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
