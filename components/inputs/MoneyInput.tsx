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

	const formatCurrency = (val: string) => {
		const cleanedValue = val.replace(/[^0-9]/g, "");

		if (/[^0-9]/.test(val.slice(-1))) {
			return;
		}

		let numberValue = (parseInt(cleanedValue, 10) / 100).toFixed(2);

		// Format the number to add commas for thousands
		return new Intl.NumberFormat("en-US", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(parseFloat(numberValue));
	};

	const handleChange = (digit: string) => {
		let newValue = digit?.replace(".", "").replace(/^0+/, "");

		let formattedValue = formatCurrency(newValue);
		if (formattedValue === "NaN") {
			setValue("0.00");
			return;
		}

		setValue(formattedValue!);
	};
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
					transform: [{ translateY: 17 }],
					fontSize: 20,
					fontFamily: "PoppinsBold",
					color: Colors.orange,
				}}
			>
				₦
			</Text>
			<TextInput
				placeholder="Enter amount"
				style={{ flex: 1, paddingLeft: 25, fontFamily: "PoppinsMedium" }}
				placeholderTextColor={Colors.silver}
				value={String(value)}
				keyboardType="default"
				onChangeText={handleChange}
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
			/>
		</View>
	);
}
