import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Colors } from "@/constants/Colors";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import TransactionStatus from "./TransactionStatus";
import { ThemeContext } from "@/provider/ThemeProvider";
import { Transaction } from "@/types/transfer";
import moment from "moment";
import { formatNumberWithCommas } from "@/helpers/formatter";
import { router } from "expo-router";

export default function TransactionItem({
	_id,
	transactionType,
	amount,
	createdAt,
	status,
}: Transaction) {
	const { isDarkMode, theme } = useContext(ThemeContext);

	function formatDate(date: string) {
		const inputDate = moment(date);

		if (inputDate.isSame(moment(), "day")) {
			return `Today, ${inputDate.format("h:mm A")}`;
		} else if (inputDate.isSame(moment().subtract(1, "day"), "day")) {
			return `Yesterday, ${inputDate.format("h:mm A")}`;
		} else {
			return inputDate.format("MMMM D, YYYY h:mm A");
		}
	}
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => {
				router.push(`/(tabs)/history/${_id}`);
			}}
		>
			<View>
				<View
					style={{
						flexDirection: "row",
						gap: SPACING.space_20,
						marginBottom: 8,
					}}
				>
					<Text
						style={{
							fontSize: FONTSIZE.size_14,
							fontFamily: "PoppinsSemiBold",
							color: theme.text,
						}}
					>
						{transactionType === "Outwards" ? "Debit" : "Credit"}
					</Text>
					<TransactionStatus
						status={
							status === "Completed"
								? "success"
								: status === "Pending"
								? "pending"
								: "failed"
						}
					/>
				</View>
				<Text
					style={{
						fontSize: FONTSIZE.size_10,
						fontFamily: "PoppinsLight",
						color: theme.text,
					}}
				>
					{formatDate(createdAt)}
				</Text>
			</View>
			<Text
				style={{
					fontSize: FONTSIZE.size_16,
					color: theme.text,
					fontFamily: "PoppinsSemiBold",
				}}
			>
				<Text>{"\u20A6"} </Text>
				{formatNumberWithCommas(amount)}
			</Text>
		</TouchableOpacity>
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
