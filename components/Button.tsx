import { Colors } from "@/constants/Colors";
import { SPACING } from "@/constants/Theme";
import React, { FC, ReactNode } from "react";
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
} from "react-native";

interface ButtonProps {
	buttonText: string;
	onPress?: () => void;
	disabled?: boolean;
	isLoading?: boolean;
	variant?: "dark" | "primary" | "outline" | "outline-dark";
	width?: "full" | "fit";
}

const Button: FC<ButtonProps> = ({
	buttonText,
	onPress,
	isLoading,
	disabled,
	variant = "primary",
	width = "full",
}) => {
	return (
		<TouchableOpacity
			disabled={isLoading || disabled}
			onPress={onPress}
			style={[
				buttonStyles.button,
				{
					width: width === "full" ? "100%" : "auto",
					// height: 54,
					// flex: 1,
					paddingHorizontal: width === "full" ? 0 : SPACING.space_30 + 10,
					backgroundColor:
						variant === "primary"
							? Colors.orange
							: variant === "dark"
							? Colors.gray
							: "transparent",
					borderColor:
						variant === "primary"
							? Colors.orange
							: variant === "dark"
							? Colors.gray
							: variant === "outline"
							? Colors.orange
							: Colors.gray,
					gap: 5,
					opacity: isLoading || disabled ? 0.8 : 1,
				},
			]}
		>
			{isLoading ? (
				<ActivityIndicator size="small" color="#fff" />
			) : (
				<Text
					style={[
						buttonStyles.text,
						{
							color:
								variant === "primary"
									? Colors.white
									: variant === "dark"
									? Colors.white
									: variant === "outline"
									? Colors.orange
									: Colors.gray,
						},
					]}
				>
					{buttonText}
				</Text>
			)}
		</TouchableOpacity>
	);
};

export default Button;

const buttonStyles = StyleSheet.create({
	button: {
		height: 53,
		// width: "100%",
		borderRadius: 15,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
	},
	text: {
		color: Colors.white,
		fontSize: 16,
		fontFamily: "PoppinsSemiBold",
	},
});
