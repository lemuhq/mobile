import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import TransactionStatus from "./TransactionStatus";

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
	return (
		<View style={styles.container}>
			<View>
				<View style={{ flexDirection: "row", gap: SPACING.space_20 }}>
					<Text
						style={{
							fontSize: FONTSIZE.size_14,
							fontFamily: "PoppinsSemiBold",
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
					}}
				>
					{date}
				</Text>
			</View>
			<Text
				style={{
					fontSize: FONTSIZE.size_16,
					color: Colors.black,
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
