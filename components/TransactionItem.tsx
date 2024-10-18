import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { Colors } from "@/constants/Colors";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import TransactionStatus from "./TransactionStatus";
import { ThemeContext } from "@/provider/ThemeProvider";

export default function TransactionItem({
	amount,
	status,
	type,
	date,
}: {
	status: "success" | "failed" | "pending";
	amount: string;
	type: string;
	date: string;
}) {
	const { isDarkMode, theme } = useContext(ThemeContext);
	return (
		<View style={styles.container}>
			<View>
				<View style={{ flexDirection: "row", gap: SPACING.space_20 }}>
					<Text
						style={{
							fontSize: FONTSIZE.size_14,
							fontFamily: "PoppinsSemiBold",
							color: theme.text,
						}}
					>
						{type}
					</Text>
					<TransactionStatus status={status} />
				</View>
				<Text
					style={{
						fontSize: FONTSIZE.size_10,
						fontFamily: "PoppinsLight",
						color: theme.text,
					}}
				>
					{date}
				</Text>
			</View>
			<Text
				style={{
					fontSize: FONTSIZE.size_16,
					color: theme.text,
					fontFamily: "PoppinsSemiBold",
				}}
			>
				<Text>{"\u20A6"}</Text>
				{amount}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		borderBottomWidth: 1,
		borderColor: Colors.whiteSmoke,
		paddingVertical: SPACING.space_10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});
