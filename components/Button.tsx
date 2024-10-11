import { Colors } from "@/constants/Colors";
import React, { FC, ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
	buttonText: string;
	onPress?: () => void;
	disabled?: boolean;
	isLoading?: boolean;
	variant?: "dark" | "primary" | "outline" | "outline-dark";
}

const Button: FC<ButtonProps> = ({
	buttonText,
	onPress,
	isLoading,
	disabled,
	variant = "primary",
}) => {
	return (
		<TouchableOpacity
			disabled={isLoading || disabled}
			onPress={onPress}
			style={[
				buttonStyles.button,
				{
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
				},
			]}
		>
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
		</TouchableOpacity>
	);
};

export default Button;

const buttonStyles = StyleSheet.create({
	button: {
		height: 53,
		width: "100%",
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
