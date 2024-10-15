import { View, Text, Image, useWindowDimensions } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { FONTSIZE, SPACING } from "@/constants/Theme";

export default function SuccessScreenItem({
	header,
	subHeader,
}: {
	header: string;
	subHeader: string;
}) {
	const { width, height } = useWindowDimensions();

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: Colors.gunMetal,
				position: "relative",
				overflow: "hidden",
			}}
		>
			<View
				style={{
					alignItems: "center",
					justifyContent: "center",
					zIndex: 2,
				}}
			>
				<View
					style={{
						width: 68,
						height: 68,
						overflow: "hidden",
						marginBottom: SPACING.space_20,
					}}
				>
					<Image
						source={require(`@/assets/success-icon.png`)}
						style={{
							resizeMode: "cover",
							width: "100%",
							height: "100%",
							zIndex: -1,
						}}
					/>
				</View>
				<Text
					style={{
						color: "#fff",
						marginBottom: SPACING.space_10,
						fontFamily: "PoppinsSemiBold",
						fontSize: FONTSIZE.size_24,
						textAlign: "center",
					}}
				>
					{header}
				</Text>
				<Text
					style={{
						color: "#fff",
						marginBottom: SPACING.space_10,
						fontFamily: "PoppinsLight",
						fontSize: FONTSIZE.size_10 + 1,
						textAlign: "center",
						paddingHorizontal: SPACING.space_20,
					}}
				>
					{subHeader}
				</Text>
			</View>
			<View
				style={{
					position: "absolute",
					bottom: 0,
					left: 0,
					width: width,
					height: height / 1.5,
				}}
			>
				<Image
					source={require(`@/assets/success-bg.png`)}
					style={{
						resizeMode: "cover",
						width: "100%",
						height: "100%",
						zIndex: -1,
					}}
				/>
			</View>
		</View>
	);
}
