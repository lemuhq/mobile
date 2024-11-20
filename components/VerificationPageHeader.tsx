import { ThemeContext } from "@/provider/ThemeProvider";
import React, { FC, useContext } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
		fontSize: wp("6%"),
		fontFamily: "PoppinsSemiBold",
	},
	subText: {
		fontSize: wp("3%"),
		lineHeight: 18,
		fontFamily: "PoppinsLight",
	},
});
