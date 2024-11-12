import { View, TextInput, Text } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import inputStyles from "@/styles/input.styles";
import { Colors } from "@/constants/Colors";

export default function Input({
	value,
	setValue,
	keyboardType = "default",
	placeholder,
	editable = true,
	maxLength = 1000,
}: {
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	keyboardType?:
		| "default"
		| "number-pad"
		| "decimal-pad"
		| "numeric"
		| "email-address"
		| "phone-pad"
		| "url";
	placeholder?: string;
	editable?: boolean;
	maxLength?: number;
}) {
	const [focus, setFocus] = useState(false);
	return (
		<View
			style={[
				inputStyles.container,
				{
					borderWidth: 1,
					borderColor: focus ? Colors.orange : Colors.whiteSmoke,
				},
			]}
		>
			<TextInput
				placeholder={placeholder || "Enter text"}
				placeholderTextColor={Colors.silver}
				style={[{ flex: 1, opacity: editable ? 1 : 0.3 }]}
				value={value}
				keyboardType={keyboardType}
				onChangeText={setValue}
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
				editable={editable}
				maxLength={maxLength}
			/>
		</View>
	);
}
