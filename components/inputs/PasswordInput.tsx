import { View, TextInput } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import inputStyles from "../../styles/input.styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";

export default function PasswordInput({
	value,
	setValue,
}: {
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
}) {
	const [focus, setFocus] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	return (
		<View
			style={[
				inputStyles.container,
				{
					borderWidth: 1,
					borderColor: focus ? Colors.orange : Colors.whiteSmoke,
					position: "relative",
				},
			]}
		>
			<TextInput
				placeholder="Enter Password"
				style={{ flex: 1 }}
				value={value}
				keyboardType="default"
				secureTextEntry={!showPassword}
				onChangeText={setValue}
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
			/>

			<Ionicons
				name={showPassword ? "eye" : "eye-off"}
				size={24}
				color={Colors.gray}
				style={{
					position: "absolute",

					right: 10,

					transform: [{ translateY: 14 }],
				}}
				onPress={() => setShowPassword(!showPassword)}
			/>
		</View>
	);
}