import { fontSizes } from "@/constants";
import { ThemeContext } from "@/provider/ThemeProvider";
import React, { FC, useContext } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";

const VerificationPageHeader: FC<{ header: string; subHeader?: string }> = ({
	header,
	subHeader,
}) => {
	const { isDarkMode, theme } = useContext(ThemeContext);
	return (
		<View>
			<Text
				style={[
					styles.welcomeH2,
					{
						color: theme.pageTextColor,
						marginTop: 20,
						textAlign: "left",
					},
				]}
			>
				{header}
			</Text>
			{subHeader && (
				<Text
					style={[
						styles.subText,
						{
							color: theme.text,
							marginTop: 2,
						},
					]}
				>
					{subHeader}
				</Text>
			)}
		</View>
	);
};

export default VerificationPageHeader;
const styles = StyleSheet.create({
	welcomeH2: {
		fontSize: fontSizes.FONT25,
		fontFamily: "PoppinsSemiBold",
	},
	subText: {
		fontSize: fontSizes.FONT16,
		fontFamily: "PoppinsLight",
	},
});
