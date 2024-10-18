import { View, Text, TextInput } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import inputStyles from "@/styles/input.styles";
import { Colors } from "@/constants/Colors";

export default function MoneyInput({
	value,
	setValue,
}: {
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
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
			<Text
				style={{
					position: "absolute",
					left: 10,
					transform: "translateY(14%)",
					fontSize: 20,
					fontFamily: "PoppinsBold",
					color: Colors.orange,
				}}
			>
				N
			</Text>
			<TextInput
				placeholder="Enter text"
				style={{ flex: 1, paddingLeft: 20 }}
				placeholderTextColor={Colors.silver}
				value={value}
				keyboardType="default"
				onChangeText={setValue}
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
			/>
		</View>
	);
}
