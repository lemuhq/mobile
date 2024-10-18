import { View, Text } from "react-native";
import React from "react";
import { FONTSIZE, SPACING } from "@/constants/Theme";

export default function TransactionStatus({
	status,
}: {
	status: "success" | "failed" | "pending";
}) {
	return (
		<View
			style={{
				backgroundColor:
					status === "success"
						? "#68F611"
						: status === "pending"
						? "#DC9F44"
						: "#FF2C2C",
				alignItems: "center",
				justifyContent: "center",
				borderRadius: 8,
				paddingHorizontal: SPACING.space_10 - 3,
				paddingVertical: 5,
				minWidth: 44,
				height: 20,
			}}
		>
			<Text
				style={{
					fontSize: FONTSIZE.size_10 - 2,
					fontFamily: "PoppinsLight",
					color: "#000",
					textTransform: "capitalize",
				}}
			>
				{status}
			</Text>
		</View>
	);
}
